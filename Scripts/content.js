chrome.storage.local.get("userData", (result) => {
    const userData = result.userData;
    if (userData) {
        document.querySelectorAll("input").forEach((input) => {
            if (input.name.toLowerCase().includes("name")) input.value = userData.name || "";
            if (input.name.toLowerCase().includes("email")) input.value = userData.email || "";
            if (input.name.toLowerCase().includes("address")) input.value = userData.address || "";
            if (input.name.toLowerCase().includes("phone")) input.value = userData.phone || "";
        });
    }
});