// Firebase imports
import { database } from "../firebaseConfig.js";
import { ref, push, onValue, update, set, remove, child } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

// Import layout
import { form_layout, flattenPrompts, createForm } from "./layout.js";


//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed.");

    // Firebase references
    const usersRef = ref(database, "users");
    const researchPlanSubmission_ref = ref(database, "submissions/researchPlanForm")

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

    //List users
    onValue(usersRef, function(snapshot) {
        const usersList = Object.values(snapshot.val());
        for(let i = 0; i < usersList.length; i++) {
            const newOption = document.createElement('option');
            newOption.textContent = usersList[i].name; 
            newOption.value = usersList[i].name;
            newOption.id = 'name_' + i;
            nameInput.appendChild(newOption)
        }
    });

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

        //Store researcher info locally
        localStorage.setItem('researcherInfo', JSON.stringify(researcherInfo));
        console.log(JSON.parse(localStorage.getItem('researcherInfo')));
        
        // // Upload researcher info to Firebase
        // const newResearcherRef = push(researchPlanSubmission_ref); // Generate a new unique key
        // set(newResearcherRef, researcherInfo)
        //     .then(() => {
        //         console.log("Researcher info successfully uploaded:", researcherInfo);
        //     })
        //     .catch((error) => {
        //         console.error("Error uploading researcher info:", error);
        //         alert("There was an error uploading your information. Please try again.");
        //         return; // Prevent further actions on error
        //     });

        // Hide the current form
        researcherInfoForm.style.display = "none";

        // Show the next section: Create the form with questions
        setTimeout(() => {
            formDiv.style.display = 'block';
            createForm(flattenPrompts(form_layout), formDiv);
        }, 500);
        
    });
    console.log(backButton); // Should log the button element or `null`

    
    //Back button: Hides the questions; shows the form
    backButton.addEventListener('click', function () {
        formDiv.style.display = "none"; // Hide questions section
        setTimeout(() => {
            researcherInfoForm.style.display = "block"; // Show the form
        }, 500);
    });
});
