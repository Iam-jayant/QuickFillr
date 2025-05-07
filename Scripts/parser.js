document.getElementById("parseResumeBtn").addEventListener("click", () => {
    const fileInput = document.getElementById("resumeInput");
    const file = fileInput.files[0];

    if (!file) {
        showNotification("No file selected. Please upload a resume.", "error");
        return;
    }

    const fileType = file.type;
    console.log("Uploaded file type:", fileType); // Debugging log

    if (fileType === "application/pdf") {
        // Handle PDF file
        console.log("Processing PDF file...");
        const reader = new FileReader();
        reader.onload = function (event) {
            const typedArray = new Uint8Array(event.target.result);
            pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
                console.log("PDF loaded successfully:", pdf.numPages, "pages");
                pdf.getPage(1).then((page) => {
                    console.log("Page loaded successfully");
                    page.getTextContent().then((textContent) => {
                        console.log("Text content extracted successfully");
                        const text = textContent.items.map((item) => item.str).join(" ");
                        console.log("Extracted text:", text);
                        autoFillFormFromText(text);
                    }).catch((error) => {
                        console.error("Error extracting text from PDF page:", error);
                        showNotification("Failed to extract text from PDF. Please try again.", "error");
                    });
                }).catch((error) => {
                    console.error("Error loading PDF page:", error);
                    showNotification("Failed to load PDF page. Please try again.", "error");
                });
            }).catch((error) => {
                console.error("Error loading PDF document:", error);
                showNotification("Failed to load PDF. Please try again.", "error");
            });
        };
        reader.readAsArrayBuffer(file);
    } else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        // Handle DOCX file
        console.log("Processing DOCX file...");
        const reader = new FileReader();
        reader.onload = function (event) {
            mammoth.extractRawText({ arrayBuffer: event.target.result }).then((result) => {
                console.log("Extracted text from DOCX:", result.value);
                autoFillFormFromText(result.value);
            }).catch((error) => {
                console.error("Error processing DOCX:", error);
                showNotification("Failed to process DOCX. Please try again.", "error");
            });
        };
        reader.readAsArrayBuffer(file);
    } else {
        showNotification("Unsupported file type. Please upload a PDF or DOCX file.", "error");
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

    showNotification("Form auto-filled. Please review and save.", "success");
}

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

// Debugging log to check if PDF.js is loaded
console.log("PDF.js library loaded:", typeof pdfjsLib !== "undefined");