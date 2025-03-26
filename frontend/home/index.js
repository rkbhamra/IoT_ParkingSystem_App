const greeting = document.getElementById("greeting");
const user = localStorage.getItem("user");

greeting.innerHTML = `Welcome, ${user}!`;

fetch(`http://localhost:5000/user/${user}`, { method: "GET" }).then((res) => {
  res.json().then((data) => {
    console.log(data.reservations);
    const reservationsDiv = document.getElementById("reservations");
    const sortedReservations = data.reservations.sort((a, b) => new Date(a.time) - new Date(b.time));
    sortedReservations.forEach((reservation) => {
      const reservationElement = document.createElement("div");
      reservationElement.className = "card mb-3";
      if (reservation.cost) {
        reservationElement.style.backgroundColor = "rgba(0, 100, 255, 0.1)";
      }
      reservationElement.innerHTML = `
      <div class="card-body">
        <h1 class="card-title float-end display-1">${reservation.spot}</h1>
        <p class="card-text"><b>Time:</b> ${reservation.time}</p>
        <p class="card-text"><b>Make:</b> ${reservation.make}</p>
        <p class="card-text"><b>Plate:</b> ${reservation.plate}</p>
        ${reservation.cost ? `<p class="card-text float-end"><b>Cost:</b> $${reservation.cost.toFixed(2)}</p>` : ""}
        <button class="btn btn-danger delete-btn">Delete</button>
      </div>
      `;

      const deleteButton = reservationElement.querySelector(".delete-btn");
      deleteButton.addEventListener("click", () => {
        fetch(`http://localhost:5000/parking/reserve/${user}/${reservation.spot}/${reservation.time}`, {
          method: "DELETE",
        });
        reservationElement.remove();
      });

      reservationsDiv.appendChild(reservationElement);
    });

    if (sortedReservations.length === 0) {
      let noReservation = '<p class="card-text">You have no reservations at the moment.</p>';
      reservationsDiv.innerHTML = noReservation;
    }
  });
});

function reserve() {
  fetch(`http://localhost:5000/parking/save`, { method: "GET" });
  window.location.href = "../parking";
}
