chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "injectScripts") {
      chrome.tabs.executeScript({ file: "html2canvas.min.js" }, function () {
        chrome.tabs.executeScript({ file: "html2pdf.min.js" }, function () {
          chrome.tabs.executeScript({ file: "content_script.js" }, function () {
            sendResponse({ success: true });
          });
        });
      });
    }
    return true;
  });
  