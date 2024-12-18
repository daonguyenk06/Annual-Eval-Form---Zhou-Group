//Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getDatabase, ref, push, onValue, update, set, remove, child} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";


//**By wrapping the code inside the DOMContentLoaded event listener, you ensure that the code will only run when the DOM is ready.
document.addEventListener("DOMContentLoaded", function() {

const appSettings = {
    databaseURL: process.env.FIREBASE_DATABASE_URL
}

// Initialize Firebase
const app = initializeApp(appSettings);

//Connects database to app
const database = getDatabase(app); //Realtime-database

const testDB = ref(database, "users/user1");

// Upload value
set(testDB, {
    name: "John Doe",
    email: "johndoe@example.com",
    age: 30
  })
    .then(() => {
      console.log("Data uploaded successfully!");
    })
    .catch((error) => {
      console.error("Error uploading data:", error);
    });
});