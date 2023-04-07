import { setupCounter } from "./counter.js";
const form = document.querySelector("form");
const chat = document.querySelector(".chat");
const chatBox = document.querySelector(".chat-box");
// const counter = document.querySelector("#counter");

// setupCounter(counter);

window.addEventListener("DOMContentLoaded", () => {
  const socket = new io();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (chatBox.value) {
      socket.emit("chat message", chatBox.value);
      addChat(chat, chatBox.value);
      chatBox.value = "";
    }
  });
});

/**
 * @param baseChat Base Element to add chat message to
 * @param newChat New chat to add to base element
 */
function addChat(baseChat, newChat) {
  if (!baseChat || !newChat) {
    return;
  }

  if (!(baseChat instanceof HTMLElement)) {
    return;
  }

  const newChatEl = document.createElement("li");
  newChatEl.classList.add("chat-bubble");
  newChatEl.textContent = newChat;
  baseChat.appendChild(newChatEl);
}
