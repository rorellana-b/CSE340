
const dates = document.querySelector("#currentyear");
const last = document.querySelector("#lastModified");

const today = new Date();


dates.innerHTML = `&copy<span>${today.getFullYear()}</span> Ronal Balmore Orellana Bonilla - El Salvador`;

last.innerHTML = `Last Modification:${document.lastModified}`;