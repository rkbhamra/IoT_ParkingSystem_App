const greeting = document.getElementById("greeting");
const user = localStorage.getItem("user");

greeting.innerHTML = `Welcome, ${user}!`;
