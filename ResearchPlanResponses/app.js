// Firebase imports
import { database } from "../firebaseConfig.js";
import { ref, query, orderByChild, equalTo, push, onValue, update, set, get, remove, child } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed.");

    //Firebase references
    const usersRef = ref(database, 'users');

    //HTML elements
    const formContainer = document.getElementById("form-container");
    const displayContainer = document.getElementById("display-container");
    const nameSelectForm = document.getElementById("select-name-form");

    const nameInput = document.getElementById("name");
    const nextButton = nameSelectForm.querySelector('button[type="button"]');
    const backButton = document.getElementById('backButton');
    const submitButton = document.getElementById("submitButton");

    //Initialize; keeps track if function is called
    let displayDataIsCalled = false; 

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

    nextButton.addEventListener('click', function(){
        formContainer.style.display = 'none';

        setTimeout(() => {
            displayContainer.style.display = 'block';
        }, 500);

        if(!displayDataIsCalled) {
            getfeedbackStatus().then((status) => {
                if (status) {
                    console.log("Submission exists!");
                    submitButton.style.display = 'none';
                    displayContainer.innerHTML = `<p>Feedback has already been submitted.</p>`;
                    displayContainer.style.backgroundColor = 'green';
                } else {
                    console.log("No submission found.");
                    submitButton.style.display = 'block';
                    displayData();
                }
            });
        }
    });

    backButton.addEventListener('click', function(){
        displayContainer.style.display = 'none';
        submitButton.style.display = 'none';
        setTimeout(() => {
            formContainer.style.display = 'block';
        }, 500);
    });

    submitButton.addEventListener('click', function() {
        uploadFeedback(nameInput.value);

        window.location.reload();
    });
    

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

    // Function to fetch and display the data
    function displayData() {

        displayDataIsCalled = true; // Set true when the function is called

        getUserLocation((key) => {
            if (key) {
                const submissionDataRef = ref(database, `users/${key}/submissions/researchPlan`);
                onValue(submissionDataRef, function(snapshot) {
                    
                    const userInfo = snapshot.val()?.info;
                    const userResponses = snapshot.val()?.responses;
                    console.log("User responses:", userResponses);
    
                    // Loop through the keys and values of the data
                    if (userInfo && userResponses) {
                        Object.keys(userInfo).forEach((key) => {
                            // Create an element for each key-value pair
                            const dataElement = document.createElement("p");
                            dataElement.textContent = `${key}: ${userInfo[key]}`;
                            displayContainer.appendChild(dataElement);
                        });

                        generateResponses(userResponses, displayContainer);

                    } else {
                        console.log('No info found for the selected user.');
                        submitButton.style.display = 'none';
                        displayContainer.innerHTML = `<p>No data available for the selected user.</p>`;
                    }
                });
            } else {
                console.log('No key found for the selected user.');
                submitButton.style.display = 'none';
                alert("An error has occurred! Please let Ky Duyen know.");
            }
        }, nameInput.value);
    }

    function uploadFeedback(name) {
        const nameQuery = query(usersRef, orderByChild('name'), equalTo(name));
    
        // Use `get` for a one-time read to avoid an endless loop
        get(nameQuery)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log("User found:", snapshot.val());
                    const userData = snapshot.val();
    
                    Object.keys(userData).forEach((key) => {
                        console.log(`Uploading data for user key: ${key}`);
    
                        const feedbackRef = ref(database, `users/${key}/submissions/researchPlan/feedbacks`);
                        const feedbackInputs = document.querySelectorAll('[id^="feedback_"]');
                        const feedbacks = {};
    
                        console.log(feedbackRef);
    
                        feedbackInputs.forEach((input, i) => {
                            // Extract keys from input id
                            const [sectionKey, subsectionKey, promptKey] = input.id
                                .split('_')[1]
                                .split('.'); // Extract section, subsection, and prompt keys
    
                            feedbacks[i] = {
                                sectionKey: sectionKey,
                                subsectionKey: subsectionKey,
                                promptKey: promptKey,
                                feedback: input.value,
                                id: input.id
                            };
                        });
    
                        // Upload feedbacks to Firebase
                        set(feedbackRef, feedbacks)
                            .then(() => {
                                console.log("Feedback successfully uploaded:", feedbacks);
                                alert("Feedback successfully uploaded.");
                            })
                            .catch((error) => {
                                console.error("Error uploading feedback to Firebase:", error);
                                alert("Error uploading feedback. Please try again.");
                            });
                    });
                } else {
                    console.error("User not found!");
                    alert("Error: User not found.");
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
                alert("Error fetching user data. Please try again.");
            });
    }

    function getfeedbackStatus() {
        return new Promise((resolve, reject) => {
            getUserLocation((key) => {
                if (key) {
                    const feedbackDataRef = ref(database, `users/${key}/submissions/researchPlan/feedbacks`);
                    onValue(feedbackDataRef, function(snapshot) {
                        const feedback = snapshot.val();
    
                        if (feedback) {
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

    function generateResponses(array, html_el) {
        for (let i = 0; i < array.length; i++) {

            // Get keys for prompt
            const sectionKey = array[i].sectionKey.slice(-1);
            const subsectionKey = array[i].subsectionKey.slice(-1);
            const promptKey = array[i].promptKey;

            // Create titles
            if (i === 0 || array[i].sectionTitle !== array[i - 1]?.sectionTitle) {
                const sectionTitle = document.createElement("h2");
                sectionTitle.textContent = array[i].sectionTitle;
                html_el.appendChild(sectionTitle);
            }
    
            if (i === 0 || array[i].subsectionTitle !== array[i - 1]?.subsectionTitle) {
                const subsectionTitle = document.createElement("h3");
                subsectionTitle.textContent = array[i].subsectionTitle;
                html_el.appendChild(subsectionTitle);
            }
    
            // Create prompt and response box
            const prompt = document.createElement("h5");
            prompt.textContent = array[i].prompt;
            html_el.appendChild(prompt);
    
            //Append user response
            const responseBox = document.createElement("div");
            responseBox.classList.add("response-box");
            responseBox.textContent = array[i].response ? `Response: ${array[i].response}` : "No response provided.";
            html_el.appendChild(responseBox);

            //Create feeback boxes
            const textarea = document.createElement('textarea');
            textarea.id =  `feedback_${sectionKey}.${subsectionKey}.${promptKey}`;
            textarea.placeholder = 'Comments...';
            html_el.appendChild(textarea);

        }
    }    

    function reorderObject(originalObject) {
        // Sort the keys based on the numeric part of `section_#`
        const sortedKeys = Object.keys(originalObject).sort((a, b) => {
            return parseInt(a.split('_')[1], 10) - parseInt(b.split('_')[1], 10);
        });

        // Create a new object to store the reordered data
        const reorderedObject = {};

        // Loop through the sorted keys and populate the new object
        sortedKeys.forEach((key) => {
            reorderedObject[key] = originalObject[key];
        });

        return reorderedObject;
    }
    
});