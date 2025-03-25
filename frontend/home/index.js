const greeting = document.getElementById("greeting");
const user = localStorage.getItem("user");

greeting.innerHTML = `Welcome, ${user}!`;

fetch(`http://localhost:5000/user/${user}`, { method: "GET" }).then((res) => {
  res.json().then((data) => {
    console.log(data.reservations);
    const reservationsDiv = document.getElementById("reservations");
    data.reservations.forEach((reservation) => {
      const reservationElement = document.createElement("div");
      reservationElement.className = "card mb-3";
      reservationElement.innerHTML = `
      <div class="card-body">
        <h1 class="card-title float-end display-1">${reservation.spot}</h1>
        <p class="card-text"><b>Time:</b> ${reservation.time}</p>
        <p class="card-text"><b>Make:</b> ${reservation.make}</p>
        <p class="card-text"><b>Plate:</b> ${reservation.plate}</p>
      </div>
      `;
      reservationsDiv.appendChild(reservationElement);
    });

    if (data.reservations.length === 0) {
      let noReservation = '<p class="card-text">You have no reservations at the moment.</p>';
      reservationsDiv.innerHTML = noReservation;
    }
  });
});
