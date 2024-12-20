// Firebase imports
import { database } from "../firebaseConfig.js";
import { ref, query, orderByChild, equalTo, push, onValue, update, set, remove, child } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

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
    const submitButton = document.getElementById("submitButton");

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

    nextButton.addEventListener('click', function(){
        formContainer.style.display = 'none';
        setTimeout(() => {
            displayInfo();
            displayContainer.style.display = 'block';
        }, 500);
        
    });

    function getUserLocation(callback) {
        const nameQuery = query(usersRef, orderByChild('name'), equalTo(nameInput.value));
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

    // Function to fetch and display the data
    function displayInfo() {
        getUserLocation((key) => {
            if (key) {
                const submissionDataRef = ref(database, `users/${key}/submissions/researchPlan`);
                onValue(submissionDataRef, function(snapshot) {
                    const userInfo = snapshot.val()?.info;
                    const userResponses = flattenArray(snapshot.val()?.responses);
                    console.log(userResponses);
    
                    // Clear any existing content in the container
                    displayContainer.innerHTML = "";
    
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
                        displayContainer.innerHTML = `<p>No data available for the selected user.</p>`;
                    }
                });
            } else {
                console.log('No key found for the selected user.');
                alert("An error has occurred! Please let Ky Duyen know.");
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

    function generateResponses(array, html_el) {
        for (let i = 0; i < array.length; i++) {
            // Get keys for prompt
            const sectionKey = array[i].sectionKey.slice(-1);
            const subsectionKey = array[i].subsectionKey.slice(-1);
            const promptKey = array[i].promptKey;
    
            // Create title and subtitle
            if (i == 0) {
                const sectionTitle = document.createElement("h2");
                sectionTitle.textContent = array[i].sectionTitle;
                sectionTitle.id = array[i].sectionKey;
                html_el.appendChild(sectionTitle);
    
                const subsectionTitle = document.createElement("h3");
                subsectionTitle.textContent = array[i].subsectionTitle;
                subsectionTitle.id = `_${sectionKey}.${subsectionKey}`;
                html_el.appendChild(subsectionTitle);
            } else if (i > 0 && array[i].sectionTitle !== array[i - 1].sectionTitle) {
                const sectionTitle = document.createElement("h2");
                sectionTitle.textContent = array[i].sectionTitle;
                sectionTitle.id = array[i].sectionKey;
                html_el.appendChild(sectionTitle);
    
                const subsectionTitle = document.createElement("h3");
                subsectionTitle.textContent = array[i].subsectionTitle;
                subsectionTitle.id = `_${sectionKey}.${subsectionKey}`;
                html_el.appendChild(subsectionTitle);
            } else if (i > 0 && array[i].subsectionTitle !== array[i - 1].subsectionTitle) {
                const subsectionTitle = document.createElement("h3");
                subsectionTitle.textContent = array[i].subsectionTitle;
                subsectionTitle.id = `_${sectionKey}.${subsectionKey}`;
                html_el.appendChild(subsectionTitle);
            }

            // Create prompt
            const prompt = document.createElement("h5");
            prompt.textContent = array[i].prompt;
            prompt.id = `prompt_${sectionKey}.${subsectionKey}.${promptKey}`;
            html_el.appendChild(prompt);

            // Create response box or message
            const responseBox = document.createElement("div");
            responseBox.classList.add("response-box");
            responseBox.id = `response_${sectionKey}.${subsectionKey}.${promptKey}`;
            responseBox.textContent = `Response: ${array[i].responses}` || "No response provided.";
            html_el.appendChild(responseBox);
        }
    }
    
});