//Firebase imports
// import { database } from "./firebaseConfig.js";
// import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed.");

    //HTML elements
    const welcomeLine = document.getElementById("welcome-line");
    const loginLink = document.getElementById("login-link");
    const menuContainer = document.getElementById("menu-container");
  
    // Check if localStorage exists
    if (typeof window.localStorage !== "undefined") {
        
        //Get login status
        const name_local = localStorage.getItem('name') ?? null;
        const permissionLevel = localStorage.getItem('permission') ?? null;

        if (name_local) {
            menuContainer.innerHTML = '';
            console.log('User:', name_local);
            welcomeLine.textContent = `Welcome, ${name_local}`;
            loginLink.textContent = 'Switch User';
        } else {
            console.warn('No user data found in localStorage for "name".');
        }

        if (permissionLevel) {
            menuContainer.innerHTML = '';

            if (permissionLevel === 'admin') {
                menuContainer.appendChild(createMemberMenu());
                menuContainer.appendChild(createAdminMenu());
            } else if (permissionLevel === 'member') {
                menuContainer.appendChild(createMemberMenu());
            } else {
                console.warn('Unexpected permission level:', permissionLevel);
            }
        } else {
            console.warn('No permission level found in localStorage.');
        }
    } else {
        console.error('localStorage is not supported in this browser.');
    }

});


// Function to create the "member-menu" <nav>
function createMemberMenu() {
    const memberMenu = document.createElement("nav");
    memberMenu.id = "member-menu";

    // Add the <h2> and <a> elements to the "member-menu"
    const memberMenuHeading = document.createElement("h2");
    memberMenuHeading.innerHTML = "<u>Forms</u>";
    memberMenu.appendChild(memberMenuHeading);

    // const memberMenuLink1 = document.createElement("a");
    // memberMenuLink1.href = "/EvaluationForm/index.html";
    // memberMenuLink1.textContent = "Annual Evaluation Form";
    // memberMenu.appendChild(memberMenuLink1);

    const memberMenuLink2 = document.createElement("a");
    memberMenuLink2.href = "/ResearchPlanForm/index.html";
    memberMenuLink2.textContent = "Research Plan for Materials Science Research";
    memberMenu.appendChild(memberMenuLink2);

    return memberMenu;
}

// Function to create the "admin-menu" <nav>
function createAdminMenu() {
    const adminMenu = document.createElement("nav");
    adminMenu.className = "admin";
    adminMenu.id = "admin-menu";

    // Add the <h2> and <a> elements to the "admin-menu"
    const adminMenuHeading = document.createElement("h2");
    adminMenuHeading.innerHTML = "<u>Responses</u>";
    adminMenu.appendChild(adminMenuHeading);

    const adminMenuLink1 = document.createElement("a");
    adminMenuLink1.href = "/EvaluationResponses/index.html";
    adminMenuLink1.textContent = "Annual Evaluation Responses";
    adminMenu.appendChild(adminMenuLink1);

    const adminMenuLink2 = document.createElement("a");
    adminMenuLink2.href = "/ResearchPlanResponses/index.html";
    adminMenuLink2.textContent = "Research Plans for Materials Science Research";
    adminMenu.appendChild(adminMenuLink2);

    return adminMenu;
}
