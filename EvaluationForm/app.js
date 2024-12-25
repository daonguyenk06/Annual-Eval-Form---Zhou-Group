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

    //Create form
    createForm(flattenPrompts(evaluation_form_layout), formDiv);

    const nameInput = document.getElementById('name');
    const positionInput = document.getElementById('position');
    const advisorInput = document.getElementById('advisor');
    const projectTitleInput = document.getElementById('project-title');
    const evalDateInput = document.getElementById('evaluation-date');

    const nextButton = researcherInfoForm.querySelector('button[type="button"]');
    const backButton = document.getElementById('backButton');
    const submitButton = document.getElementById('submitButton');

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

        // Validate date format (MM/DD/YYYY)
        const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;

        if (!dateRegex.test(researcherInfo.evalDate)) {
            alert("Start Date must be in the format MM/DD/YYYY.");
            return;
        }

        // Hide the current form
        researcherInfoForm.style.display = "none";

        // Show the next section: Create the form with questions
        setTimeout(() => {
            formDiv.style.display = 'block';
        }, 500);
        
    });

    //Back button: Hides the questions; shows the form
    backButton.addEventListener('click', function () {
        formDiv.style.display = "none"; // Hide questions section
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
    
        // Log and upload to Firebase
        console.log("User Info:", userInfo);
        console.log("User Response:", userResponse);
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
                console.log("User found:", snapshot.val());
                const userData = snapshot.val();
                Object.keys(userData).forEach((key) => {
                    console.log(`Uploading data for user key: ${key}`);
    
                    // Define Firebase references
                    const infoRef = ref(database, `users/${key}/submissions/evaluationForm/info`);
                    const responseRef = ref(database, `users/${key}/submissions/evaluationForm/responses`);
    
                    // Upload user's info
                    set(infoRef, userInfo)
                        .then(() => {
                            console.log("User info successfully uploaded.");
                        })
                        .catch((error) => {
                            console.error("Error uploading user info:", error);
                            alert("Error uploading user info. Please try again.");
                            return;
                        });
    
                    // Upload user's responses
                    set(responseRef, userResponse)
                        .then(() => {
                            console.log("User responses successfully uploaded.");
                        })
                        .catch((error) => {
                            console.error("Error uploading user responses:", error);
                            alert("Error uploading responses. Please try again.");
                            return;
                        });
                });
            } else {
                console.error("User not found!");
                alert("Error: User not found.");
            }
        });
    }    


    // Function to fetch and display user info
    function displayInfo() {
        getUserLocation((key) => {
            if (key) {
                const submissionDataRef = ref(database, `users/${key}/submissions/evaluationForm`);
                onValue(submissionDataRef, function(snapshot) {
                    console.log("Raw responses:", snapshot.val()?.responses);
                    const userInfo = snapshot.val()?.info;
                    // console.log('userResponses: ' + userResponses);
    
                    // Loop through the keys and values of the data
                    if (userInfo) {
                        // console.log('userInfo: ' + userInfo);
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
        });
    }

    //Fetch and display user responses
    function displayResponses() {
        getUserLocation((key) => {
            if (key) {
                const submissionDataRef = ref(database, `users/${key}/submissions/evaluationForm`);
                onValue(submissionDataRef, function(snapshot) {
                    console.log("Raw responses:", snapshot.val()?.responses);
                    const responsesRaw = snapshot.val()?.responses;
                    const userResponses = flattenArray(responsesRaw);
                    console.log(userResponses);
    
                    // Loop through the keys and values of the data
                    if (userResponses) {
                        // populateResponses(userResponses);
                    } else {
                        console.log('No info found for the selected user.');
                    }
                });
            } else {
                console.log('No key found for the selected user.');
                alert("An error has occurred! Please let Ky Duyen know.");
            }
        });
    }

    //ERROR: 
    function populateResponses(userResponses) {
        Object.keys(userResponses).forEach((sectionKey) => {
            const section = userResponses[sectionKey];
            
            Object.keys(section.subsections).forEach((subsectionKey) => {
                const subsection = section.subsections[subsectionKey];
    
                Object.keys(subsection.prompts).forEach((promptKey) => {
                    const prompt = subsection.prompts[promptKey];
    
                    // Construct the textarea ID based on the pattern
                    const inputId = `input_${sectionKey}.${subsectionKey}.${promptKey}`;
                    const textarea = document.getElementById(inputId);
    
                    // Set the textarea value to the response
                    if (textarea) {
                        textarea.value = prompt.response || ""; // Set to empty string if no response
                    } else {
                        console.warn(`Textarea with ID ${inputId} not found.`);
                    }
                });
            });
        });
    }
    
    function getUserLocation(callback) {
        const nameQuery = query(usersRef, orderByChild('name'), equalTo(localStorage.getItem("name")));
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
