document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");
    const resumeInput = document.getElementById("resumeInput");

    // Load saved data
    chrome.storage.sync.get("userData", (result) => {
        const userData = result.userData || {};
        document.getElementById("name").value = userData.name || "";
        document.getElementById("email").value = userData.email || "";
        document.getElementById("phone").value = userData.phone || "";
        document.getElementById("address").value = userData.address || "";
        document.getElementById("city").value = userData.city || "";
    });

    // Save form data
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            address: document.getElementById("address").value.trim(),
            city: document.getElementById("city").value.trim(),
        };
        chrome.storage.sync.set({ userData }, () => {
            showNotification("Data saved successfully!");
        });
    });

    // Handle Resume Upload
    resumeInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            const text = event.target.result;
            autoFillFormFromText(text);
        };

        if (file.type === "application/pdf") {
            showNotification("PDF not supported. Please upload a .txt file.", "error");
        } else {
            reader.readAsText(file);
        }
    });

    function autoFillFormFromText(text) {
        const nameMatch = text.match(/Name[:\-]?\s*(.*)/i);
        const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
        const phoneMatch = text.match(/(\+?\d{1,3}[\s-]?)?(\d{10})/);
        const addressMatch = text.match(/Address[:\-]?\s*(.*)/i);
        const cityMatch = text.match(/City[:\-]?\s*(.*)/i);

        if (nameMatch) document.getElementById("name").value = nameMatch[1];
        if (emailMatch) document.getElementById("email").value = emailMatch[0];
        if (phoneMatch) document.getElementById("phone").value = phoneMatch[0];
        if (addressMatch) document.getElementById("address").value = addressMatch[1];
        if (cityMatch) document.getElementById("city").value = cityMatch[1];

        showNotification("Form auto-filled. Please review and Save.");
    }

    // Custom notification function
    function showNotification(message, type = "success") {
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                ${type === "success" ? "✔️" : "❌"}
            </div>
            <div class="notification-message">${message}</div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add("fade-out");
            notification.addEventListener("transitionend", () => notification.remove());
        }, 3000);
    }
});