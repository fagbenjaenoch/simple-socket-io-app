import addMessage from "./addMessage";
import addMessageToLocalStorage from "./addMessageToLocalStorage";
import getMessageFromLocalStorage from "./getMessageFromLocalStorage";
import loadMessages from "./loadMessages";

const form = document.querySelector("form");
const chat = document.querySelector(".chat");
const chatContainer = document.querySelector(".chat .container");
const chatInput = document.querySelector(".chat-input");

window.addEventListener("DOMContentLoaded", async () => {
  const socket = new io();
  await loadMessages(chatContainer, getMessageFromLocalStorage());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let chatMessage = chatInput.value;
    const chatMessageObject = {
      message: chatMessage,
    };
    if (chatMessage) {
      socket.emit("chat message", chatMessage);
      addMessage(chatContainer, chatMessage);
      addMessageToLocalStorage(chatMessageObject);
      // TODO: Think on whether the addMessageToLocalStorage should be added to the addMessage function
      chatInput.value = "";
    }
  });

  socket.on("new connection", () => {
    addMessage(chatContainer, "A Roommate connected", {
      type: "information",
    });
  });

  socket.on("user disconnection", () => {
    addMessage(chatContainer, "A Roommate just left", {
      type: "information",
    });
  });

  socket.on("chat message", (msg) => {
    addMessage(chatContainer, msg, { type: "broadcast" });
    const messageObject = {
      message: msg,
      type: "broadcast",
    };
    addMessageToLocalStorage(messageObject);
  });

  // TODO: work on the ux, not everytime you ask for permission
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      addMessage(chatContainer, "Notifications are now enabled 💬", {
        type: "information",
      });
    }
  });
});
