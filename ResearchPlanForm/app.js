// Firebase imports
import { database } from "../firebaseConfig.js";
import { ref, query, orderByChild, equalTo, push, onValue, update, set, remove, child } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

// Import layout
import { form_layout, flattenPrompts, createForm } from "./layout.js";


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
    const startDateInput = document.getElementById('start-date');
    const completionDateInput = document.getElementById('completion-date');

    const nextButton = researcherInfoForm.querySelector('button[type="button"]');
    const backButton = document.getElementById('backButton');
    const submitButton = document.getElementById('submitButton');

    let userResponse = {};
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

    // Display user info if existed
    displayInfo();

    // Next Button: uploads info; shows the questions; hide the form
    nextButton.addEventListener('click', function() {
        
        // Gather researcher info
        const researcherInfo = {
            name: nameInput.value,
            position: positionInput.value,
            advisor: advisorInput.value,
            projectTitle: projectTitleInput.value,
            startDate: startDateInput.value,
            completionDate: completionDateInput.value,
        };

        // Validate the form fields
        if (!researcherInfo.name || !researcherInfo.position || !researcherInfo.advisor || 
            !researcherInfo.projectTitle || !researcherInfo.startDate || !researcherInfo.completionDate) {
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

        if (!dateRegex.test(researcherInfo.startDate)) {
            alert("Start Date must be in the format MM/DD/YYYY.");
            return;
        }

        if (!dateRegex.test(researcherInfo.completionDate)) {
            alert("Completion Date must be in the format MM/DD/YYYY.");
            return;
        }

        // Validate that Completion Date is after Start Date
        const startDate = new Date(researcherInfo.startDate);
        const completionDate = new Date(researcherInfo.completionDate);

        if (completionDate <= startDate) {
            alert("Completion Date must be after Start Date.");
            return;
        }

        // Hide the info form
        researcherInfoForm.style.display = "none";

        if(!nextButtonClicked) {
            getUserLocation((key) => {
                if (key) {
                    const submissionDataRef = ref(database, `users/${key}/submissions/researchPlan/`);
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
                                createForm(flattenPrompts(form_layout), formDiv);
                            }
                        });

                    }, (error) => {
                        console.error('Error reading data:', error);
                        reject(error);
                    });
                } else {
                    console.log('No key found for the selected user.');
                    alert("An error has occurred! Please let Ky Duyen know.");
                    resolve(false);
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

    // Back button: Hides the questions; shows the form
    backButton.addEventListener('click', function () {
        formDiv.style.display = "none";
        submitButton.style.display = 'none';
        setTimeout(() => {
            researcherInfoForm.style.display = "block";
        }, 500);
    });

    submitButton.addEventListener('click', function () {
        // Gather researcher info
        const userInfo = {
            name: nameInput.value,
            position: positionInput.value,
            advisor: advisorInput.value,
            projectTitle: projectTitleInput.value,
            startDate: startDateInput.value,
            completionDate: completionDateInput.value,
        };
    
        // Validate the form fields
        if (!userInfo.name || !userInfo.position || !userInfo.advisor ||
            !userInfo.projectTitle || !userInfo.startDate || !userInfo.completionDate) {
            alert("Please fill in all fields before submitting.");
            return;
        }
    
        // Prepare userResponse to include all sections, subsections, and responses
        Object.keys(form_layout).forEach((sectionKey) => {
            const section = form_layout[sectionKey];
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
    
                    // Locate the corresponding input by its ID
                    const inputId = `input_${sectionKey.split('_')[1]}.${subsectionKey.split('_')[1]}.${promptKey}`;
                    const input = document.getElementById(inputId);
    
                    // Add prompt details and the user's response
                    userResponse[sectionKey].subsections[subsectionKey].prompts[promptKey] = {
                        prompt: prompt.prompt,
                        response: input ? input.value : "" // Capture response or empty string if not found
                    };
                });
            });
        });
    
        console.log(isAllFieldFilled(flattenArray(userResponse)));
        isAllFieldFilled(flattenArray(userResponse));
        console.log(flattenArray(userResponse));
    
        // Upload to Firebase
        if(isAllFieldFilled(flattenArray(userResponse))) {
            Firebase_upload(userInfo, flattenArray(userResponse));
            alert("You have successfully submitted the form.");
            // setTimeout(() => {
            //     window.location.href = "../index.html";
            // }, 500);
        }else {
            alert("Some questions are left unanswered!\nPlease review and complete all questions before proceeding.");
        }
        
    
        
    });
    
    //Function to upload to Firebase
    function Firebase_upload(userInfo, userResponse) {
        const nameQuery = query(usersRef, orderByChild('name'), equalTo(userInfo.name));
        onValue(nameQuery, (snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                Object.keys(userData).forEach((key) => {
                    const researcherInfoRef = ref(database, `users/${key}/submissions/researchPlan/info`);
                    const researcherResponseRef = ref(database, `users/${key}/submissions/researchPlan/responses`);
    
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

    function isAllFieldFilled(userResponse) {
        let emptyFields = [];
    
        userResponse.forEach((entry) => {
            // Check if the response is empty
            try {
                if (!entry.response.trim()) {
                    const inputID = `input_${entry.sectionKey.split('_')[1]}.${entry.subsectionKey.split('_')[1]}.${entry.promptKey}`;
                    emptyFields.push(inputID);
                }
            } catch (error) {
                console.warn("Error processing entry:", entry, error);
            }
            
        });

        console.log(emptyFields);

        if (emptyFields.length > 0) {
            emptyFields.forEach((inputID) => {
                const field = document.getElementById(inputID);

                if (field) {
                    field.style.boxShadow = "0 0 10px 2px red";
                    field.style.borderColor = "red";
                
                    field.addEventListener( "input", () => {
                        if (field.value.trim() === "") {
                            field.style.boxShadow = "0 0 10px 2px red";
                            field.style.borderColor = "red";
                        } else {
                            field.style.boxShadow = "";
                            field.style.borderColor = "";
                        }
                    });

                }else {
                    console.warn(`Field with ID ${inputID} not found.`);
                }                
            });

            // Scroll to the first empty field
            const firstField = document.getElementById(emptyFields[0]);
            if (firstField) {
                firstField.scrollIntoView({ behavior: "smooth", block: "center" });
                firstField.focus();
            }

            return false;

        }else {
            return true;
        }
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
                    const submissionDataRef = ref(database, `users/${key}/submissions/researchPlan/responses`);
                    onValue(submissionDataRef, function(snapshot) {
                        const submission = snapshot.val();
    
                        if (submission) {
                            resolve(true);
                        } else {
                            resolve(false);
                        }
                    }, (error) => {
                        console.error('Error reading data:', error);
                        reject(error);
                    });
                } else {
                    console.log('No key found for the selected user.');
                    alert("An error has occurred! Please let Ky Duyen know.");
                    resolve(false);
                }
            }, nameInput.value);
        });
    }
    
    
    // Function to fetch and display user info
    function displayInfo() {
        getUserLocation((key) => {
            if (key) {
                const submissionDataRef = ref(database, `users/${key}/submissions/researchPlan/info`);
                onValue(submissionDataRef, function(snapshot) {
                    const userInfo = snapshot.val();
    
                    // Loop through the keys and values of the data
                    if (userInfo) {
                        nameInput.value = userInfo.name;
                        positionInput.value = userInfo.position;
                        projectTitleInput.value = userInfo.projectTitle;
                        advisorInput.value = userInfo.advisor;
                        startDateInput.value = userInfo.startDate;
                        completionDateInput.value = userInfo.completionDate;

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
                // console.log("User found:", snapshot.val());
                const userData = snapshot.val();
                Object.keys(userData).forEach((key) => {
                    // console.log(`Found user at key ${key}:`, userData[key]);
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
