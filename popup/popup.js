const darkModeButton = document.getElementById("darkModeButton");
const settingsButton = document.getElementById("settingsButton");

darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const icon = darkModeButton.querySelector("i");
    if (document.body.classList.contains("dark")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});

settingsButton.addEventListener("click", () => {
    alert("Settings button clicked!");
});

function fillForm() {
    alert("Fill Form button clicked!");
}

function clearForm() {
    alert("Clear Form button clicked!");
}