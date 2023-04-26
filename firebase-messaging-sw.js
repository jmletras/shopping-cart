// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// import { getMessaging } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js";

// const appSettings = {
//   databaseURL: "https://shopping-app-dc4f7-default-rtdb.europe-west1.firebasedatabase.app/",
//   projectId: "shopping-app-dc4f7",
//   apiKey: "AIzaSyC-VnYUAoleGqa0u6sW2GwZuEhkuDOgr6A",
//   appId: "shopping-app-dc4f7",
//   messagingSenderId: '227746429399'
// }


// const messaging_app = initializeApp(appSettings)

// const messaging = getMessaging();



// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log(
//       "[firebase-messaging-sw.js] Received background message ",
//       payload,
//   );
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//       body: "Background Message body.",
//       icon: "/itwonders-web-logo.png",
//   };

//   return self.registration.showNotification(
//       notificationTitle,
//       notificationOptions,
//   );
// });