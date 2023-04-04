chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "exportPdf") {
    exportPdf();
    sendResponse({ success: true });
  } else if (request.action === "exportHTML") {
    exportHTML();
    sendResponse({ success: true });
  }
});

// Your exportPdf and exportHTML functions go here
// Export chat as PDF
function exportPdf() {
  return new Promise((resolve) => {
    const chatElement = createTemporaryChatContainer(false);
    const opt = {
      margin: 1,
      filename: "chat-export.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait", putOnlyUsedFonts: true, compressPdf: false },
    };
    html2pdf().set(opt).from(chatElement).save().then(() => {
      resolve();
    });
  });
}

function exportHTML() {
  const chatElement = createTemporaryChatContainer(true);
  const css = Array.from(document.styleSheets).reduce((acc, sheet) => {
    try {
      if (sheet.cssRules) {
        return acc + Array.from(sheet.cssRules).reduce((acc, rule) => acc + rule.cssText, "");
      }
    } catch (e) {
      console.warn("Error while reading CSS rules from " + sheet.href, e);
    }
    return acc;
  }, "");
  const htmlContent = `
    <html>
      <head>
        <title>Chat Export</title>
        <style>${css}</style>
      </head>
      <body>
      <div style="margin-left: 20px; margin-right: 20px;">
        ${chatElement.outerHTML}
        </div>
      </body>
    </html>
  `;
  const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "chat-export.html";
  link.click();
}



// Create a temporary chat container
function createTemporaryChatContainer(ishtml) {
  const chatElements = document.querySelectorAll(".group .w-full");
  const tempContainer = document.createElement("div");
  chatElements.forEach((element) => {
    tempContainer.appendChild(element.cloneNode(true));
  });
  if (ishtml) {
    const iframe = tempContainer.querySelector("iframe");
  if (iframe) {
    iframe.setAttribute("allow-same-origin", "true");
  }
  }
  return tempContainer; 
}