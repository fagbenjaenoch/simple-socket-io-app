import { setupCounter } from "./counter.js";
const form = document.querySelector("form");
const chat = document.querySelector(".chat");
const chatBox = document.querySelector(".chat-box");
// const counter = document.querySelector("#counter");

// setupCounter(counter);

const socket = new io();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (chatBox.value) {
    socket.emit("chat message", chatBox.value);
    chatBox.value = "";
  }
});
