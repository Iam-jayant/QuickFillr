// Autofill functionality
document.getElementById("fillNow").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                chrome.storage.sync.get("userData", (data) => {
                    const userData = data.userData || {};
                    document.querySelectorAll("input").forEach(input => {
                        const name = input.name.toLowerCase();
                        if (name.includes("name")) input.value = userData.name || "";
                        else if (name.includes("email")) input.value = userData.email || "";
                        else if (name.includes("phone")) input.value = userData.phone || "";
                        else if (name.includes("address")) input.value = userData.address || "";
                        else if (name.includes("city")) input.value = userData.city || "";
                    });
                });
            }
        });
    });
});

// Fake fill functionality
document.getElementById("fakeFill").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                const fakeData = {
                    name: "John Doe",
                    email: "john.doe@example.com",
                    phone: "9876543210",
                    address: "123 Fake Street",
                    city: "Faketown"
                };
                document.querySelectorAll("input").forEach(input => {
                    const name = input.name.toLowerCase();
                    if (name.includes("name")) input.value = fakeData.name;
                    else if (name.includes("email")) input.value = fakeData.email;
                    else if (name.includes("phone")) input.value = fakeData.phone;
                    else if (name.includes("address")) input.value = fakeData.address;
                    else if (name.includes("city")) input.value = fakeData.city;
                });
            }
        });
    });
});

// Clear form functionality
document.getElementById("clearForm").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => {
                document.querySelectorAll("input").forEach(input => {
                    input.value = "";
                });
            }
        });
    });
});

// Open settings.html in the popup
document.getElementById("settings").addEventListener("click", () => {
    window.location.href = "settings.html";
});

// Dark mode toggle functionality
document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark");
    const isDarkMode = document.body.classList.contains("dark");
    chrome.storage.sync.set({ darkMode: isDarkMode });

    // Update sun/moon icon visibility
    const sunIcon = document.querySelector(".dark-mode-icon.sun");
    const moonIcon = document.querySelector(".dark-mode-icon.moon");
    if (isDarkMode) {
        sunIcon.style.opacity = "0";
        moonIcon.style.opacity = "1";
    } else {
        sunIcon.style.opacity = "1";
        moonIcon.style.opacity = "0";
    }
});

// Load dark mode state
chrome.storage.sync.get("darkMode", (data) => {
    const isDarkMode = data.darkMode;
    if (isDarkMode) {
        document.body.classList.add("dark");
        document.querySelector(".dark-mode-icon.sun").style.opacity = "0";
        document.querySelector(".dark-mode-icon.moon").style.opacity = "1";
    } else {
        document.querySelector(".dark-mode-icon.sun").style.opacity = "1";
        document.querySelector(".dark-mode-icon.moon").style.opacity = "0";
    }
});