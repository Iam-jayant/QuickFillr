// chrome.storage.sync.get("userData", (result) => {
//     const userData = result.userData;
//     if (userData) {
//         document.querySelectorAll("input").forEach((input) => {
//             if (input.name.toLowerCase().includes("name")) input.value = userData.name || "";
//             if (input.name.toLowerCase().includes("email")) input.value = userData.email || "";
//             if (input.name.toLowerCase().includes("phone")) input.value = userData.phone || "";
//             if (input.name.toLowerCase().includes("address")) input.value = userData.address || "";
//             if (input.name.toLowerCase().includes("city")) input.value = userData.city || "";
//         });
//     }
// });

// needfull but not used=================================================
// chrome.storage.sync.get("userData", (data) => {
//     const userData = data.userData || {};
//     const inputs = document.querySelectorAll("input");
//     inputs.forEach(input => {
//         const name = input.name.toLowerCase();
//         if (name.includes("name")) input.value = userData.name || "";
//         else if (name.includes("email")) input.value = userData.email || "";
//         else if (name.includes("phone")) input.value = userData.phone || "";
//         else if (name.includes("address")) {
//             input.value = userData.address1 + " " + userData.address2 || "";
//         } else if (name.includes("city")) input.value = userData.city || "";
//     });
// });

