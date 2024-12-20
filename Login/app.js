// Firebase imports
import { database } from "../firebaseConfig.js";
import { ref, query, orderByChild, equalTo, push, onValue, update, set, remove, child } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

//Users and authentication
const usersRef = ref(database, "users");
const authRef = ref(database, "auth");

//Buttons
const loginButton = document.getElementById("loginButton");
const showPassword = document.getElementById("showPassword");

//InputFields
const nameInput = document.getElementById("name");
const passwordClass = document.querySelectorAll('.password');
const passInput = document.getElementById("loginPassword");


//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {

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

loginButton.addEventListener('click', function(){
    login();
    // console.log(localStorage.getItem('userStatus'));
});

//Listen for if showPassword checkbox is checked
showPassword.addEventListener('change', function(event) {
    if (event.target.checked) {
        passInput.type = "text";
    } else {
        passInput.type = "password";
    }
});

//Checking login validation
function login() {
    onValue(usersRef, function(userSnapshot) {

        //Check permission status
        const nameQuery = query(usersRef, orderByChild('name'), equalTo(nameInput.value));
        onValue(nameQuery, (snapshot) => {
            if (snapshot.exists()) {
                console.log("User found:", snapshot.val());
                const userData = snapshot.val();
                Object.keys(userData).forEach((key) => {
                    console.log(`Found user at key ${key}:`, userData[key]);

                    // Define user location reference
                    const userLocation = ref(database, `users/${key}`);
                    onValue(userLocation, function(permissionSnapshot) {
                        const permissionData = permissionSnapshot.val();
                        if (permissionData) {
                            console.log('permission: ' + permissionData.permission);

                            if(permissionData.permission == 'admin') {
                                passwordClass.forEach((element) => {
                                    element.style.display = 'block';
                                });
                            }

                        } else {
                            console.log('No permission data found.');
                        }
                    });

                });
            } else {
                console.log("User not found!");
            }
        });



        // const memberUserValue = Object.values(userSnapshot.val()).join(''); // Get member's username from Firebase 
        // console.log("Member username from Firebase:", memberUserValue);
        // console.log("Username input:", userInput.value);
        
        // // Verify username
        // if (userInput.value == memberUserValue) {
        //     localStorage.setItem('memberUser', 'userValid'); // Store user validation locally

        //     // After setting the user validation, check the password
        //     onValue(memberPass, function(passSnapshot) {
        //         const memberPassValue = Object.values(passSnapshot.val()).join(''); // Get member's password from Firebase
        //         console.log("Member password from Firebase:", memberPassValue);
        //         console.log("Password input:", passInput.value);
                
        //         // Verify password
        //         if (passInput.value == memberPassValue) {
        //             localStorage.setItem('memberPass', 'passValid'); // Store pass validation locally
        //             console.log("Password is valid.");

        //             // Both user and pass are valid, set user status and alert
        //             localStorage.setItem('userStatus', 'member');
        //             window.history.back();
        //         } else {
        //             // Password is invalid
        //             console.log("Password is invalid.");
        //             clearUserStatus();
        //             localStorage.setItem('userStatus', 'guest');
        //             alert("Email/password is invalid. Please try again!")
        //             userInput.value = '';
        //             passInput.value = '';
        //         }
        //     });
        // } else {
        //     // Username is invalid
        //     console.log("Username is invalid.");
        //     clearUserStatus();
        //     localStorage.setItem('userStatus', 'guest');
        //     alert("Email/password is invalid. Please try again!")
        //     userInput.value = '';
        //     passInput.value = '';
        // }
    });
}

// function clearUserStatus() {
//     //clear user status locally
//     localStorage.clear('memberUser');
//     localStorage.clear('memberPass');
//     localStorage.setItem('userStatus', 'guest'); //set user as guest

//     console.log(localStorage.getItem('memberUser'));
//     console.log(localStorage.getItem('memberPass'));
// }
});