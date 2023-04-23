/**
 * @param {HTMLElement} base what to add the `from` to
 * @param {Array} from what to add to the base
 */
async function loadMessages(base, from) {
  if (!(typeof base !== "HTMLElement") || !(typeof from !== "Array")) {
    return;
  }

  if (!Array.isArray(from)) {
    addMessage(chatContainer, "This is a new conversation 💡", {
      type: "information",
    });
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

export default loadMessages;
