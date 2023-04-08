import { setupCounter } from "./counter.js";
const form = document.querySelector("form");
const chat = document.querySelector(".chat .container");
const chatInput = document.querySelector(".chat-input");
// const counter = document.querySelector("#counter");
// setupCounter(counter);

window.addEventListener("DOMContentLoaded", () => {
  const socket = new io();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (chatInput.value) {
      socket.emit("chat message", chatInput.value);
      addMessage(chat, chatInput.value);
      chatInput.value = "";
    }
  });

  socket.on("new connection", () => {
    addMessage(chat, "A Roommate connected", {
      type: "information",
    });
  });

  socket.on("user disconnection", () => {
    addMessage(chat, "A Roommate just left", {
      type: "information",
    });
  });

  socket.on("chat message", (msg) => {
    addMessage(chat, msg, { type: "broadcast" });
  });
});

/**
 * @param baseChat Base Element to add chat message to
 * @param newChat New chat to add to base element
 */
function addMessage(baseChat, newChat, options = {}) {
  if (!baseChat || !newChat) {
    return;
  }

  if (!(baseChat instanceof HTMLElement)) {
    return;
  }

  const newChatEl = document.createElement("li");
  const content = document.createElement("div");
  newChatEl.classList.add("chat-bubble");
  content.className = "content to-everyone sent";

  if (options.type) {
    if (options.type === "broadcast") {
      content.className = "content to-everyone received";
    }

    if (options.type === "information") {
      newChatEl.classList.add("info");
      newChatEl.classList.remove("chat-bubble");
    }
  }
  content.textContent = newChat;
  newChatEl.appendChild(content);
  chat.appendChild(newChatEl);
}
