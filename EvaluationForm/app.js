// Firebase imports
import { database } from "../firebaseConfig.js";
import { ref, query, orderByChild, equalTo, push, onValue, update, set, remove, child } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

// Import layout
import { evaluation_form_layout, flattenPrompts, createForm } from "./layout.js";


//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed.");

    // Firebase references
    const usersRef = ref(database, "users");

    // HTML Elements
    const formDiv = document.getElementById('form-div');
    const researcherInfoForm = document.getElementById('researcher-info-form');

    const nameInput = document.getElementById('name');
    const positionInput = document.getElementById('position');
    const advisorInput = document.getElementById('advisor');
    const projectTitleInput = document.getElementById('project-title');
    const evalDateInput = document.getElementById('evaluation-date');

    const nextButton = researcherInfoForm.querySelector('button[type="button"]');
    const backButton = document.getElementById('backButton');
    const submitButton = document.getElementById('submitButton');

    let nextButtonClicked = false;

    //List users
    onValue(usersRef, function(snapshot) {
        const usersList = Object.values(snapshot.val());
        const users_sorted = usersList.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
        for(let i = 0; i < users_sorted.length; i++) {
            const newOption = document.createElement('option');
            newOption.textContent = users_sorted[i].name; 
            newOption.value = users_sorted[i].name;
            newOption.id = 'name_' + i;
            nameInput.appendChild(newOption);
        }
    });

    //Display user info if existed
    displayInfo();

    //Next Button: uploads info; shows the questions; hide the form
    nextButton.addEventListener('click', function() {
        
        // Gather researcher info
        const researcherInfo = {
            name: nameInput.value,
            position: positionInput.value,
            advisor: advisorInput.value,
            projectTitle: projectTitleInput.value,
            evalDate: evalDateInput.value,
        };

        // Validate the form fields
        if (!researcherInfo.name || !researcherInfo.position || !researcherInfo.advisor || 
            !researcherInfo.projectTitle || !researcherInfo.evalDate) {
            alert("Please fill in all fields before proceeding.");
            return;
        }

        //Compare nameInput with login name
        if (researcherInfo.name != localStorage.getItem("name")) {
            alert("Your name does not match your login information.\nPlease verify your account.\nOR\nCheck if you're logged in.");
            return;
        }

        // Validate date format (MM/DD/YYYY)
        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;

        if (!dateRegex.test(researcherInfo.evalDate)) {
            alert("Start Date must be in the format MM/DD/YYYY.");
            return;
        }

        // Hide the info form
        researcherInfoForm.style.display = "none";

        if(!nextButtonClicked) {
            getUserLocation((key) => {
                if (key) {
                    const submissionDataRef = ref(database, `users/${key}/submissions/evaluationForm/`);
                    onValue(submissionDataRef, function(snapshot) {
                        const submission = snapshot.val();
                        
                        getSubmissionStatus().then((status) => {
                            if (status) {
                                console.log("Submission exists!");

                                generateFeedbacksAndResponses(submission.responses, submission.feedbacks, formDiv);
                                
                                submitButton.disabled = true;
                                let currentOpacity = parseFloat(window.getComputedStyle(submitButton).opacity);
                                submitButton.style.opacity = (currentOpacity - 0.5).toFixed(1);
                                submitButton.style.pointerEvents = 'none';
                            } else {
                                console.log("No submission found.");
                                createForm(flattenPrompts(evaluation_form_layout), formDiv);
                            }
                        });

                    }, (error) => {
                        console.error('Error reading data:', error);
                        reject(error); // Reject the promise if there's an error
                    });
                } else {
                    console.log('No key found for the selected user.');
                    alert("An error has occurred! Please let Ky Duyen know.");
                    resolve(false); // Resolve as `false` if no key is found
                }
            }, nameInput.value);
        }
        
        // Show the next section: Create the form with questions
        setTimeout(() => {
            formDiv.style.display = 'block';
            submitButton.style.display = 'block';
        }, 500);
        
        nextButtonClicked = true;
    });

    //Back button: Hides the questions; shows the form
    backButton.addEventListener('click', function () {
        formDiv.style.display = "none"; // Hide questions section
        submitButton.style.display = 'none';
        setTimeout(() => {
            researcherInfoForm.style.display = "block"; // Show the form
        }, 500);
    });

    submitButton.addEventListener('click', function () {
        // Gather researcher info
        const userInfo = {
            name: nameInput.value,
            position: positionInput.value,
            advisor: advisorInput.value,
            projectTitle: projectTitleInput.value,
            evalDate: evalDateInput.value,
        };
    
        // Validate required fields
        if (!userInfo.name || !userInfo.position || !userInfo.advisor ||
            !userInfo.projectTitle || !userInfo.evalDate) {
            alert("Please fill in all fields before submitting.");
            return;
        }
    
        let userResponse = {};
        // Iterate through `evaluation_form_layout` to include all sections, subsections, and responses
        Object.keys(evaluation_form_layout).forEach((sectionKey) => {
            const section = evaluation_form_layout[sectionKey];
            userResponse[sectionKey] = {
                title: section.title,
                subsections: {}
            };
    
            Object.keys(section.subsections).forEach((subsectionKey) => {
                const subsection = section.subsections[subsectionKey];
                userResponse[sectionKey].subsections[subsectionKey] = {
                    title: subsection.title,
                    prompts: {}
                };
    
                Object.keys(subsection.prompts).forEach((promptKey) => {
                    const prompt = subsection.prompts[promptKey];
    
                    // Locate the corresponding input field by ID
                    const inputId = `input_${sectionKey.slice(-1)}.${subsectionKey.slice(-1)}.${promptKey}`;
                    const input = document.getElementById(inputId);
    
                    // Capture the prompt and response
                    userResponse[sectionKey].subsections[subsectionKey].prompts[promptKey] = {
                        prompt: prompt.prompt,
                        response: input ? input.value : "" // Default to empty string if no response
                    };
                });
            });
        });
    
        // Upload to Firebase
        Firebase_upload(userInfo, flattenArray(userResponse));
    
        alert("You have successfully submitted the evaluation form.");
        setTimeout(() => {
            history.back();
        }, 500);
    });
    

    //Function to upload to Firebase
    function Firebase_upload(userInfo, userResponse) {
        const nameQuery = query(usersRef, orderByChild('name'), equalTo(userInfo.name));
        onValue(nameQuery, (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                Object.keys(userData).forEach((key) => {
                    const researcherInfoRef = ref(database, `users/${key}/submissions/evaluationForm/info`);
                    const researcherResponseRef = ref(database, `users/${key}/submissions/evaluationForm/responses`);
    
                    // Upload user info
                    set(researcherInfoRef, userInfo)
                        .then(() => console.log("Researcher info uploaded:", userInfo))
                        .catch((error) => console.error("Error uploading researcher info:", error));
    
                    // Upload user responses
                    set(researcherResponseRef, userResponse)
                        .then(() => console.log("Researcher responses uploaded:", userResponse))
                        .catch((error) => console.error("Error uploading researcher responses:", error));
                });
            } else {
                console.log("User not found!");
            }
        });
    }   
    
    function generateFeedbacksAndResponses(response_array, feedback_array = [], html_el) {
        for (let i = 0; i < response_array.length; i++) {

            // Create titles
            if (i === 0 || response_array[i].sectionTitle !== response_array[i - 1]?.sectionTitle) {
                const sectionTitle = document.createElement("h2");
                sectionTitle.textContent = response_array[i].sectionTitle;
                html_el.appendChild(sectionTitle);
            }
    
            if (i === 0 || response_array[i].subsectionTitle !== response_array[i - 1]?.subsectionTitle) {
                const subsectionTitle = document.createElement("h3");
                subsectionTitle.textContent = response_array[i].subsectionTitle;
                html_el.appendChild(subsectionTitle);
            }
    
            // Create prompt and response box
            const prompt = document.createElement("h5");
            prompt.textContent = response_array[i].prompt;
            html_el.appendChild(prompt);
    
            //Append user response
            const responseBox = document.createElement("div");
            responseBox.classList.add("response-box");
            responseBox.textContent = response_array[i].response ? `Response: ${response_array[i].response}` : "No response provided.";
            html_el.appendChild(responseBox);

            // Append feedbacks, with a safe fallback if feedback_array is undefined or shorter than response_array
            const feedback = feedback_array[i]?.feedback || "No feedback provided.";
            const feedbackBox = document.createElement("div");
            feedbackBox.classList.add("feedback-box");
            feedbackBox.textContent = `Feedback: ${feedback}`;
            html_el.appendChild(feedbackBox);
        }
    }   


    function getSubmissionStatus() {
        return new Promise((resolve, reject) => {
            getUserLocation((key) => {
                if (key) {
                    const submissionDataRef = ref(database, `users/${key}/submissions/evaluationForm/`);
                    onValue(submissionDataRef, function(snapshot) {
                        const submission = snapshot.val();
    
                        if (submission) {
                            resolve(true); // Fulfill the promise with `true`
                        } else {
                            resolve(false); // Fulfill the promise with `false`
                        }
                    }, (error) => {
                        console.error('Error reading data:', error);
                        reject(error); // Reject the promise if there's an error
                    });
                } else {
                    console.log('No key found for the selected user.');
                    alert("An error has occurred! Please let Ky Duyen know.");
                    resolve(false); // Resolve as `false` if no key is found
                }
            }, nameInput.value);
        });
    }


    // Function to fetch and display user info
    function displayInfo() {
        getUserLocation((key) => {
            if (key) {
                const submissionDataRef = ref(database, `users/${key}/submissions/evaluationForm`);
                onValue(submissionDataRef, function(snapshot) {
                    const userInfo = snapshot.val()?.info;
    
                    // Loop through the keys and values of the data
                    if (userInfo) {
                        nameInput.value = userInfo.name;
                        positionInput.value = userInfo.position;
                        projectTitleInput.value = userInfo.projectTitle;
                        advisorInput.value = userInfo.advisor;
                        evalDateInput.value = userInfo.evalDate;

                    } else {
                        console.log('No info found for the selected user.');
                    }
                });
            } else {
                console.log('No key found for the selected user.');
                alert("An error has occurred! Please let Ky Duyen know.");
            }
        }, localStorage.getItem("name"));
    }
    
    function getUserLocation(callback, name) {
        const nameQuery = query(usersRef, orderByChild('name'), equalTo(name));
        onValue(nameQuery, (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                Object.keys(userData).forEach((key) => {
                    callback(key); // Pass the key to the callback
                });
            } else {
                console.log("User not found!");
                callback(null); // Pass null if no user is found
                alert("An error has occured!!!\n\nPlease let Ky Duyen know via email:\nkyduyen.daonguyen@mines.sdsmt.edu \n\nThanks!");
            }
        });
    }

    //Flattens the big arrays
    function flattenArray(array) {
        const prompts = [];

        Object.keys(array).forEach((sectionKey) => {
            const section = array[sectionKey];
            Object.keys(section.subsections).forEach((subsectionKey) => {
                const subsection = section.subsections[subsectionKey];
                Object.keys(subsection.prompts).forEach((promptKey) => {
                    const promptObj = subsection.prompts[promptKey];
                    prompts.push({
                        sectionKey: sectionKey,
                        subsectionKey: subsectionKey, 
                        promptKey: promptKey, 
                        sectionTitle: section.title,
                        subsectionTitle: subsection.title,
                        ...promptObj, // Spread other prompt details
                    });
                });
            });
        });

        return prompts;
    }

});
