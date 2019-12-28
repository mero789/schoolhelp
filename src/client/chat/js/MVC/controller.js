module.exports = {
  load: (callback) => {
    document.addEventListener("DOMContentLoaded", () => {
      callback();
    });
  },
  addListener: (event, element, callback) => {
    element.addEventListener(event, () => {
      callback();
    });
  }
}
