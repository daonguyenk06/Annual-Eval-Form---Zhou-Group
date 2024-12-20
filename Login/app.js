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

console.log("Name: " + localStorage.getItem('name'));
console.log("Permission Level: " + localStorage.getItem('permission'));

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


nameInput.addEventListener('change', function () {
    // Reset password field visibility initially
    passwordClass.forEach((element) => {
        element.style.display = 'none';
    });

    const selectedName = nameInput.value;
    if (!selectedName) {
        console.log('No name selected.');
        return;
    }

    // Fetch the user location based on the selected name
    getUserLocation((key) => {
        if (key) {
            // console.log('Returned key:', key);

            // Fetch permission for the selected user
            getPermission(key, (permission) => {
                if (permission) {
                    // console.log('Returned permission:', permission);

                    // Handle permission levels
                    if (permission === 'admin') {
                        passwordClass.forEach((element) => {
                            element.style.display = 'block';
                        });
                    } else if (permission === 'member') {
                        null;
                    } else {
                        alert('Permission not defined for this user.');
                        nameInput.value = null;
                    }
                } else {
                    console.log('No permission found.');
                }
            });
        } else {
            console.log('No key found for the selected user.');
            alert("An error has occured!!!\n\nPlease let Ky Duyen know via email:\nkyduyen.daonguyen@mines.sdsmt.edu \n\nThanks!");
        }
    });
});


loginButton.addEventListener('click', function(){
    getUserLocation((key) => {
        if (key) {
            // console.log('Returned key:', key);

            // Fetch permission for the selected user
            getPermission(key, (permission) => {
                if (permission == 'admin') {
                    //Set user status to admin
                    onValue(authRef, function(snapshot) {
                        const auth = snapshot.val();
                        // console.log(auth.password);
                        // console.log(typeof auth.password);

                        if(nameInput.value && passInput.value) {
                            if(passInput.value == auth.password) {
                                login(permission);
                            }else{
                                clearUserStatus();
                                alert('Wrong password. Please try again!');
                            }
                        }else {
                            alert('Invalid name or password. Please try again!');
                        }
                    });
                }else if (permission == 'member') {
                    login(permission);
                }else {
                    console.log("Permission not found.")
                    clearUserStatus();
                    alert("An error has occured!!!\n\nPlease let Ky Duyen know via email:\nkyduyen.daonguyen@mines.sdsmt.edu \n\nThanks!");
                }
            });
        } else {
            console.log('No key found for the selected user.');
            alert("An error has occured!!!\n\nPlease let Ky Duyen know via email:\nkyduyen.daonguyen@mines.sdsmt.edu \n\nThanks!");
        }
    });
});

//Listen for if showPassword checkbox is checked
showPassword.addEventListener('change', function(event) {
    if (event.target.checked) {
        passInput.type = "text";
    } else {
        passInput.type = "password";
    }
});

//Save login status
function login(permission) {
    localStorage.setItem('name', nameInput.value);
    localStorage.setItem('permission', permission);
    console.log(localStorage.getItem('name'));
    console.log(localStorage.getItem('permission'));
    setTimeout(() => {
        history.back();
    }, 500);
}


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


//Function to check permission status
function getPermission(key, callback) {
    const userLocation = ref(database, `users/${key}`);

    onValue(userLocation, function(permissionSnapshot) {
        const permissionData = permissionSnapshot.val();
        if (permissionData) {
            // console.log('permission: ' + permissionData.permission);
            callback(permissionData.permission); // Pass the permission to the callback
        } else {
            console.log('No permission data found.');
            callback(null); // Pass null if no data found
            alert("An error has occured!!!\n\nPlease let Ky Duyen know via email:\nkyduyen.daonguyen@mines.sdsmt.edu \n\nThanks!");
        }
    });
}


function clearUserStatus() {
    //clear user status locally
    localStorage.clear('name');
    localStorage.clear('permission');

    console.log('User status cleared:');
    console.log(localStorage.getItem('name'));
    console.log(localStorage.getItem('permission'));
}
});