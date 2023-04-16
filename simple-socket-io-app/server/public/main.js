import { setupCounter } from "./counter.js";
const form = document.querySelector("form");
const chat = document.querySelector(".chat .container");
const chatInput = document.querySelector(".chat-input");
// const counter = document.querySelector("#counter");
// setupCounter(counter);

window.addEventListener("DOMContentLoaded", async () => {
  const socket = new io();
  await loadMessages(chat, getMessageFromLocalStorage());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let chatMessage = chatInput.value;
    const chatMessageObject = {
      message: chatMessage,
    };
    if (chatMessage) {
      socket.emit("chat message", chatMessage);
      addMessage(chat, chatMessage);
      addMessageToLocalStorage(chatMessageObject);
      // TODO: Think on whether the addMessageToLocalStorage should be added to the addMessage function
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
    const messageObject = {
      message: msg,
      type: "broadcast",
    };
    addMessageToLocalStorage(messageObject);
  });
});

/**
 * @param {String} baseChat Element to add chat message to
 * @param {String} newChat chat to add to base element
 * @param {object} options options for additional functionality
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
      addMessageToLocalStorage({ newChat, type: "broadcast" });
    }

    if (options.type === "information") {
      newChatEl.className = "info";
      addMessageToLocalStorage({ newChat, type: "information" });
    }
  }
  content.textContent = newChat;
  newChatEl.appendChild(content);
  chat.appendChild(newChatEl);
  newChatEl.scrollTop = newChatEl.scrollHeight;
}

/**
 * @param {string} message message to add to local storage
 * @returns
 */
function addMessageToLocalStorage({ message, type }) {
  if (!(localStorage in window)) {
    return;
  }

  let previousMessages = getMessageFromLocalStorage();
  previousMessages = JSON.parse(previousMessages);
  if (typeof previousMessages !== "Array" || !previousMessages.length()) {
    previousMessages = [];
  }
  let allMessages = [...previousMessages, { message, type }];
  allMessages = JSON.stringify(allMessages);
  localStorage.setItem("dee-em", allMessages);
}

/**
 * @returns {Object}
 */
function getMessageFromLocalStorage() {
  if (!(localStorage in window)) {
    return;
  }

  let messages = JSON.parse(localStorage.getItem("dee-em"));
  if (!messages) {
    localStorage.setItem("dee-em", JSON.stringify([]));
    return;
  }
  return messages;
}

/**
 * @param {HTMLElement} base what to add the `from` to
 * @param {Array} from what to add to the base
 */
async function loadMessages(base, from) {
  if (!(typeof base !== "HTMLElement") || !(typeof from !== "Array")) {
    return;
  }

  if (!Array.isArray(from)) {
    addMessage(chat, "This is a new conversation 💡", { type: "information" });
    return;
  }

  from.forEach(({ message, type }) => {
    const msgEl = document.createElement("li");
    const content = document.createElement("div");

    msgEl.className = "chat-bubble";
    if (type === "broadcast") {
      content.className = "content to-everyone received";
      content.className = "content to-everyone sent";
      content.textContent = message;
      msgEl.appendChild(content);
    } else if (type === "information") {
      msgEl.className = "info";
    }

    base.appendChild(msgEl);
  });
}
