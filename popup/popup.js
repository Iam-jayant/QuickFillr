// Autofill functionality
document.getElementById("fillNow").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["Scripts/content.js"]
        });
    });
});

// Open settings.html in the popup
document.getElementById("settings").addEventListener("click", () => {
    window.location.href = "settings.html";
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