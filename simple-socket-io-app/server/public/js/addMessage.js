import addMessageToLocalStorage from "./addMessageToLocalStorage";

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
  chatContainer.appendChild(newChatEl);
  chat.scrollTo({
    top: chat.scrollHeight,
    behavior: "smooth",
  });

  // new Notification("A new message from a roommate", {
  //   body: newChat,
  //   image: "./vite.svg",
  // });
}

export default addMessage;
