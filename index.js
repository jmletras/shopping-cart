import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js";
 
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
const messaging = getMessaging(app); // Initialize Firebase Cloud Messaging and get a reference to the service

const tokenDivId = 'token_div';
const permissionDivId = 'permission_div';

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Update the UI to include the received message.
  appendMessage(payload);
});

function resetUI() {
    clearMessages();
    showToken('loading...');
    // Get registration token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    getToken(messaging, {vapidKey: 'BPZev6CW3zD-JvDeRTjDaqfo4ewevqoG6N8T8FMpcZBb3B7K2yPQZG9F6q-Th8xjZjWcN5d-QmyzTogU5X3Ppo8'}).then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
        updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No registration token available. Request permission to generate one.');
        // Show permission UI.
        updateUIForPushPermissionRequired();
        setTokenSentToServer(false);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      showToken('Error retrieving registration token. ', err);
      setTokenSentToServer(false);
    });
  }

  function showToken(currentToken) {
    // Show token in console and UI.
    const tokenElement = document.querySelector('#token');
    tokenElement.textContent = currentToken;
  }

  // Send the registration token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer()) {
      console.log('Sending token to server...');
      // TODO(developer): Send the current token to your server.
      setTokenSentToServer(true);
    } else {
      console.log('Token already sent to server so won\'t send it again ' +
          'unless it changes');
    }
  }

  function isTokenSentToServer() {
    return window.localStorage.getItem('sentToServer') === '1';
  }

  function setTokenSentToServer(sent) {
    window.localStorage.setItem('sentToServer', sent ? '1' : '0');
  }

  function showHideDiv(divId, show) {
    const div = document.querySelector('#' + divId);
    if (show) {
      div.style = 'display: visible';
    } else {
      div.style = 'display: none';
    }
  }

  function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve a registration token for use with FCM.
        // In many cases once an app has been granted notification permission,
        // it should update its UI reflecting this.
        resetUI();
      } else {
        console.log('Unable to get permission to notify.');
      }
    });
  }

  function deleteToken() {
    // Delete registration token.
    messaging.getToken().then((currentToken) => {
      messaging.deleteToken(currentToken).then(() => {
        console.log('Token deleted.');
        setTokenSentToServer(false);
        // Once token is deleted update UI.
        resetUI();
      }).catch((err) => {
        console.log('Unable to delete token. ', err);
      });
    }).catch((err) => {
      console.log('Error retrieving registration token. ', err);
      showToken('Error retrieving registration token. ', err);
    });
  }

  // Add a message to the messages element.
  function appendMessage(payload) {
    const messagesElement = document.querySelector('#messages');
    const dataHeaderElement = document.createElement('h5');
    const dataElement = document.createElement('pre');
    dataElement.style = 'overflow-x:hidden;';
    dataHeaderElement.textContent = 'Received message:';
    dataElement.textContent = JSON.stringify(payload, null, 2);
    messagesElement.appendChild(dataHeaderElement);
    messagesElement.appendChild(dataElement);
  }

  // Clear the messages element of all children.
  function clearMessages() {
    const messagesElement = document.querySelector('#messages');
    while (messagesElement.hasChildNodes()) {
      messagesElement.removeChild(messagesElement.lastChild);
    }
  }

  function updateUIForPushEnabled(currentToken) {
    showHideDiv(tokenDivId, true);
    showHideDiv(permissionDivId, false);
    showToken(currentToken);
  }

  function updateUIForPushPermissionRequired() {
    showHideDiv(tokenDivId, false);
    showHideDiv(permissionDivId, true);
  }

  resetUI();




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


