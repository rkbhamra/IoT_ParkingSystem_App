let reservations;
const urlParams = new URLSearchParams(window.location.search);
const spot = urlParams.get("spot");

function reserve() {
  const time = document.getElementById("time").value;
  const make = document.getElementById("make").value;
  const plate = document.getElementById("plate").value;
  const user = localStorage.getItem("user");

  console.log(JSON.stringify({ time, make, plate }));

  if (!time || !make || !plate) {
    alert("Please fill in all fields.");
    return;
  }

  fetch(`http://localhost:5000/parking/reserve/${spot}`, {
    method: "POST",
    body: JSON.stringify({ time, make, plate, user }),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = `../confirm/?status=${data.status}`;
    });
}

function formatTime(date, timezone) {
  return new Date(date)
    .toLocaleString("en-CA", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
}

function roundToNextSlot(date) {
  const minutes = date.getMinutes();
  const remainder = minutes % 30;

  date.setMinutes(minutes - remainder);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

function getAvailableTimes() {
  const now = new Date();
  const roundedTime = roundToNextSlot(now);
  const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const slots = [];
  let currentTime = new Date(roundedTime.getTime());

  while (currentTime <= next24Hours) {
    slots.push(formatTime(currentTime));
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return slots.filter((time) => {
    return !reservations.some((reservation) => reservation.time === time);
  });
}

function populateTimeSelect() {
  const timeSelect = document.getElementById("time");
  const availableTimes = getAvailableTimes();

  availableTimes.forEach((time) => {
    const option = document.createElement("option");
    option.value = time;
    option.textContent = time;
    timeSelect.appendChild(option);
  });
}

async function init() {
  reservations = await fetch(`http://localhost:5000/parking/reserve/${spot}`, { method: "GET" }).then((res) =>
    res.json()
  );
  console.log(reservations);
  populateTimeSelect();
}

init();
