document.getElementById("exportPdf").addEventListener("click", function () {
  showSpinner();
  chrome.runtime.sendMessage({ action: "injectScripts" }, function (response) {
    if (response && response.success) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "exportPdf" }, function (response) {
          if (response && response.success) {
            hideSpinner();
          } else {
            hideSpinner();
          }
        });
      });
    } else {
      hideSpinner();
    }
  });
});

document.getElementById("exportHTML").addEventListener("click", function () {
  showSpinner();
  chrome.runtime.sendMessage({ action: "injectScripts" }, function (response) {
    if (response && response.success) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "exportHTML" }, function (response) {
          if (response && response.success) {
            hideSpinner();
          } else {
            hideSpinner();
          }
        });
      });
    } else {
      hideSpinner();
    }
  });
});

function showSpinner() {
  document.getElementById("spinner").classList.remove("hidden");
}

function hideSpinner() {
  document.getElementById("spinner").classList.add("hidden");
}
