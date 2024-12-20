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

    //Create form
    createForm(flattenPrompts(form_layout), formDiv);

    const nameInput = document.getElementById('name');
    const positionInput = document.getElementById('position');
    const advisorInput = document.getElementById('advisor');
    const projectTitleInput = document.getElementById('project-title');
    const startDateInput = document.getElementById('start-date');
    const completionDateInput = document.getElementById('completion-date');

    const nextButton = researcherInfoForm.querySelector('button[type="button"]');
    const backButton = document.getElementById('backButton');
    const submitButton = document.getElementById('submitButton');

    //List users
    onValue(usersRef, function(snapshot) {
        const usersList = Object.values(snapshot.val());
        for(let i = 0; i < usersList.length; i++) {
            const newOption = document.createElement('option');
            newOption.textContent = usersList[i].name; 
            newOption.value = usersList[i].name;
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
            startDate: startDateInput.value,
            completionDate: completionDateInput.value,
        };

        // Validate the form fields
        if (!researcherInfo.name || !researcherInfo.position || !researcherInfo.advisor || 
            !researcherInfo.projectTitle || !researcherInfo.startDate || !researcherInfo.completionDate) {
            alert("Please fill in all fields before proceeding.");
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
        let userResponse = {};
        Object.keys(form_layout).forEach((sectionKey) => {
            const section = form_layout[sectionKey];
            userResponse[sectionKey] = {
                title: section.title,
                subsections: {},
            };
    
            Object.keys(section.subsections).forEach((subsectionKey) => {
                const subsection = section.subsections[subsectionKey];
                userResponse[sectionKey].subsections[subsectionKey] = {
                    title: subsection.title,
                    prompts: {},
                };
    
                Object.keys(subsection.prompts).forEach((promptKey) => {
                    const prompt = subsection.prompts[promptKey];
    
                    // Locate the corresponding input by its ID
                    const inputId = `input_${sectionKey.slice(-1)}.${subsectionKey.slice(-1)}.${promptKey}`;
                    const input = document.getElementById(inputId);
    
                    // Add prompt details and the user's response
                    userResponse[sectionKey].subsections[subsectionKey].prompts[promptKey] = {
                        prompt: prompt.prompt,
                        response: input ? input.value : "", // Capture response or empty string if not found
                    };
                });
            });
        });
    
        // Log the resulting structure
        console.log(userResponse);
    
        // Upload to Firebase
        Firebase_upload(userInfo, userResponse);
    
        alert("You have successfully submitted the form.");
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
    
    
    // Function to fetch and display user info
    function displayInfo() {
        getUserLocation((key) => {
            if (key) {
                const submissionDataRef = ref(database, `users/${key}/submissions/researchPlan`);
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
        });
    }

    //Fetch and display user responses
    function displayResponses() {
        getUserLocation((key) => {
            if (key) {
                const submissionDataRef = ref(database, `users/${key}/submissions/evaluationForm`);
                onValue(submissionDataRef, function(snapshot) {
                    console.log("Raw responses:", snapshot.val()?.responses);
                    const userInfo = snapshot.val()?.info;
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
