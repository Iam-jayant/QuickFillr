document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");

    // Load saved data when the settings page is opened
    chrome.storage.local.get("userData", (result) => {
        if (result.userData) {
            document.getElementById("name").value = result.userData.name || "";
            document.getElementById("email").value = result.userData.email || "";
            document.getElementById("address").value = result.userData.address || "";
            document.getElementById("phone").value = result.userData.phone || "";
        }
    });

    // Save data when the form is submitted
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const userData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value,
            phone: document.getElementById("phone").value,
        };

        chrome.storage.local.set({ userData }, () => {
            alert("Data saved successfully!");
        });
    });
});