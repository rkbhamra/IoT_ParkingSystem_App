function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(`http://localhost:5000/user/signup/${username}/${password}`, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        window.location.href = "../home";
        alert("User created successfully");
      } else {
        alert("Invalid username or password");
      }
    });
}
