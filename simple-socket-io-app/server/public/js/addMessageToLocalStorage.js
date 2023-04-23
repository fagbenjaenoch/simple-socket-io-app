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

export default addMessageToLocalStorage;
