const firebaseConfig = {
  apiKey: "AIzaSyCSVtkMotInxYNE-fnvfVdaC5aVGlhzj4k",
  authDomain: "realtime-chat-57551.firebaseapp.com",
  projectId: "realtime-chat-57551",
  storageBucket: "realtime-chat-57551.appspot.com",
  messagingSenderId: "937988465507",
  appId: "1:937988465507:web:ccf97f8919226364f8a956",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const username = prompt("What's your name?");

document.getElementById("send-message").addEventListener("submit", postChat);
function postChat(e) {
  e.preventDefault();
  const timestamp = Date.now();
  const chatTxt = document.getElementById("chat-txt");
  const message = chatTxt.value;
  chatTxt.value = "";
  db.ref("messages/" + timestamp).set({
    usr: username,
    msg: message,
  });
}

const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const msg = "<li>" + messages.usr + " : " + messages.msg + "</li>";
  document.getElementById("messages").innerHTML += msg;
});
