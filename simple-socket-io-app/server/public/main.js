import { setupCounter } from "./counter.js";
const form = document.querySelector("form");
const chat = document.querySelector(".chat");
const chatInput = document.querySelector(".chat-input");
// const counter = document.querySelector("#counter");
// setupCounter(counter);

window.addEventListener("DOMContentLoaded", () => {
  const socket = new io();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (chatInput.value) {
      socket.emit("chat message", chatInput.value);
      addChat(chat, chatInput.value);
      chatInput.value = "";
    }
  });

  socket.on("new connection", () => {
    const info = document.createElement("div");
    info.classList.add("info");
    info.textContent = "A Roommate connected";
    chat.appendChild(info);
  });

  socket.on("chat message", (msg) => {
    addChat(chat, msg, { type: "broadcast" });
  });
});

/**
 * @param baseChat Base Element to add chat message to
 * @param newChat New chat to add to base element
 */
function addChat(baseChat, newChat, options = {}) {
  if (!baseChat || !newChat) {
    return;
  }

  if (!(baseChat instanceof HTMLElement)) {
    return;
  }

  const newChatEl = document.createElement("li");
  newChatEl.classList.add("chat-bubble");

  if (options.type) {
    if (options.type === "broadcast") {
      newChatEl.classList.add("to-everyone");
    }
  }

  newChatEl.textContent = newChat;
  baseChat.appendChild(newChatEl);
  // window.scrollTo(document.)
}
