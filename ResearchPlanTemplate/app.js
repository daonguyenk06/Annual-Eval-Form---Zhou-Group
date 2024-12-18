// Firebase imports
import { database } from "../firebaseConfig.js";
import { getDatabase, ref, push, onValue, update, set, remove, child } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

// Import layout
import { form_layout, createForm } from "./layout.js";
console.log("Form Layout:", form_layout);


//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed.");

    // Firebase references
    const userFormDB = ref(database, "users/user_form_data");

    // HTML Elements
    const formContainer = document.getElementById("form-container");
    console.log("Form Container:", formContainer);

    if (formContainer) {
        // Dynamically generate the form using createForm
        createForm(form_layout, "user_form", formContainer);
        console.log("Form generated successfully.");
    } else {
        console.error("Form container not found.");
    }

    // // Example Firebase interaction: Save form data (add your own logic here)
    // document.getElementById("submit-button")?.addEventListener("click", () => {
    //     const formData = {};
    //     // Logic to collect data from the form and store in formData
    //     // This depends on the form structure and input IDs generated

    //     set(userFormDB, formData)
    //         .then(() => {
    //             console.log("Data saved successfully to Firebase.");
    //         })
    //         .catch((error) => {
    //             console.error("Error saving data to Firebase:", error);
    //         });
    // });
});
