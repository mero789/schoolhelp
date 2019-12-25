module.exports = {
  load: (callback) => {
    document.addEventListener("DOMContentLoaded", () => {
      callback();
    });
  }
}
