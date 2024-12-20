//Firebase imports
import { database } from "./firebaseConfig.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed.");

    //HTML elements
    const welcomeLine = document.getElementById("welcome-line");
    const loginLink = document.getElementById("login-link");
  
    //Get login status
    const name_local = localStorage.getItem('name');
    const permissionLevel = localStorage.getItem('permission');

    if (name_local) {
        console.log('Name is present:', name_local);
        welcomeLine.textContent = `Welcome, ${name_local}`;
        loginLink.textContent = 'Switch User'
    } else {
        console.warn('No user data found in localStorage.');
        window.location.href = "login.html";
    }
    

    
});
  