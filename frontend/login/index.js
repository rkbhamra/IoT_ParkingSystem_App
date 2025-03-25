function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(`http://localhost:5000/user/login/${username}/${password}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        localStorage.setItem("user", username);
        window.location.href = "../home";
      } else {
        alert("Invalid username or password");
      }
    });
}

localStorage.removeItem("user");
