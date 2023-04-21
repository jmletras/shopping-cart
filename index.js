import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
 
const appSettings = {
    databaseURL: "https://shopping-app-dc4f7-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const databaseURL = 

console.log(app)

function addItem() {
    var item = document.getElementById("input-field").value;
    console.log(item);
    document.getElementById("input-field").value = "";
}