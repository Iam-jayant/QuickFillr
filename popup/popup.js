// const darkModeButton = document.getElementById("darkModeButton");
// const settingsButton = document.getElementById("settingsButton");
// const fillFormButton = document.getElementById("fillFormButton");
// const clearFormButton = document.getElementById("clearFormButton");

// darkModeButton.addEventListener("click", () => {
//     document.body.classList.toggle("dark");
//     const icon = darkModeButton.querySelector("i");
//     if (document.body.classList.contains("dark")) {
//         icon.classList.remove("fa-moon");
//         icon.classList.add("fa-sun");
//     } else {
//         icon.classList.remove("fa-sun");
//         icon.classList.add("fa-moon");
//     }
// });

// // Open settings.html in the popup
// settingsButton.addEventListener("click", () => {
//     window.location.href = "settings.html";
// });

// // Trigger form auto-fill
// fillFormButton.addEventListener("click", () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             files: ["Scripts/content.js"],
//         });
//     });
// });

// // Placeholder for Clear Form button functionality
// clearFormButton.addEventListener("click", () => {
//     alert("Clear Form button clicked! Clear functionality will be implemented.");
// });

// Autofill functionality
document.getElementById("fillNow").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["Scripts/content.js"]
        });
    });
});

// Open settings page
document.getElementById("settings").addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
});

// Dark mode toggle functionality
document.getElementById("darkModeToggle").addEventListener("change", function () {
    document.body.classList.toggle("dark", this.checked);
    chrome.storage.sync.set({ darkMode: this.checked });
});

// Load dark mode state
chrome.storage.sync.get("darkMode", (data) => {
    if (data.darkMode) {
        document.getElementById("darkModeToggle").checked = true;
        document.body.classList.add("dark");
    }
});