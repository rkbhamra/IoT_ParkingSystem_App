const params = new URLSearchParams(window.location.search);
const s = params.get("status");
const msgElement = document.getElementById("msg");
console.log(s);
if (s == "success") {
  msgElement.innerHTML = `
    <div class="alert alert-success" role="alert">
      Your reservation has been successfully confirmed!
    </div>
  `;
} else {
  msgElement.innerHTML = `
    <div class="alert alert-danger" role="alert">
      An Error has occurred.
    </div>
  `;
}
