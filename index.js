import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
 
const appSettings = {
  databaseURL: "https://shopping-app-dc4f7-default-rtdb.europe-west1.firebasedatabase.app/",
  apiKey: "AIzaSyC-VnYUAoleGqa0u6sW2GwZuEhkuDOgr6A",
  authDomain: "shopping-app-dc4f7.firebaseapp.com",
  projectId: "shopping-app-dc4f7",
  storageBucket: "shopping-app-dc4f7.appspot.com",
  messagingSenderId: "227746429399",
  appId: "1:227746429399:web:338bd38f685d653ac03392"
}

const app = initializeApp(appSettings)
const database = getDatabase(app) //Initialize database service

const itemsInDB = ref(database, "items")

const shoppingList = document.getElementById("shopping-list");
const inputFieldValue = document.getElementById("input-field");
const addButton = document.getElementById("add-button");

onValue(itemsInDB, function(snapshot) {

    if(snapshot.exists())
    { 
        let itemsArray = Object.entries(snapshot.val())
        clearItemList()

        for(let i=0; i < itemsArray.length; i++) {
            let currentItemID = itemsArray[i][0]
            let currentItemValue = itemsArray[i][1]

            addItemToList(currentItemID, currentItemValue)
        }

    } else {
        clearItemList()
        shoppingList.innerHTML = "Sem produtos"
    }
    
})

addButton.addEventListener("click", function () {
    var item = inputFieldValue.value;    
    push(itemsInDB, item);       
    clearInputField()    
});

function clearInputField() {
    inputFieldValue.value = "";
}

function clearItemList() {
    shoppingList.innerHTML = ""
}

function addItemToList(itemID, itemValue) {
    let newElement = document.createElement("li")
    newElement.textContent = itemValue

    newElement.addEventListener("dblclick", function() {
        let exactLocationItem = ref(database, `items/${itemID}`)        
        remove(exactLocationItem); 
        
    }, false)
    
    shoppingList.append(newElement)
}


