"use strict";

const username = prompt("What is your name?", "Anonymous");

const socket = io();

const userCountElement = document.getElementById("user-count");
const chatBoxElement = document.getElementById("chat-box");
const messageInputLabelElement = document.getElementById("message-input-label");
const messageInputElement = document.getElementById("message-input");
const sendButtonElement = document.getElementById("send-button");

messageInputElement.onblur = ev => {
  if (ev.target.value.length !== 0) {
    messageInputLabelElement.style.display = "none";
  } else {
    messageInputLabelElement.style.display = "block";
  }
};

messageInputElement.oninput = ev => {
  if (ev.target.value.length !== 0) {
    messageInputLabelElement.style.display = "none";
  }
};

sendButtonElement.onclick = () => {
  if (messageInputElement.value.length <= 0) return;

  const messageElement = document.createElement("div");
  messageElement.classList.add("message-item-self");
  messageElement.innerHTML = `</div><div class="message-username-self">You</div><div class="message-box">${messageInputElement.value}</div>`;

  chatBoxElement.appendChild(messageElement);

  socket.emit("message-from-client", {
    username: username || "Anonymous",
    message: messageInputElement.value
  });

  messageInputElement.value = "";
  messageInputLabelElement.style.display = "block";
};

socket.on("user-count", data => {
  userCountElement.innerHTML = `${data} online`;
});

socket.on("message-from-server", data => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message-item");
  messageElement.innerHTML = `<div class="message-username">${data.username ||
    "Anonymous"}</div><div class="message-box">${data.message}</div>`;

  chatBoxElement.appendChild(messageElement);
});
