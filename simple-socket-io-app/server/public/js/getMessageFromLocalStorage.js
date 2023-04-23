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

export default getMessageFromLocalStorage;
