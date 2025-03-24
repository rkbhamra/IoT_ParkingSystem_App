const parking = document.getElementById("parking");

function createParkingSpotElement(n, spot) {
  const spotElement = document.createElement("div");
  spotElement.className = "col-2 p-4 text-center border";
  if (spot.status === "occupied") {
    spotElement.classList.add("bg-danger", "text-white");
  } else if (spot.status === "reserved") {
    spotElement.classList.add("bg-warning", "text-dark");
  } else {
    spotElement.classList.add("bg-success", "text-white");
  }
  spotElement.innerText = `${n}`;
  spotElement.onclick = () => (window.location.href = `../reserve/?spot=${n}`);
  return spotElement;
}

async function renderParkingSpots() {
  const parkingSpots = await fetch(`http://localhost:5000/parking/test`, { method: "GET" }).then((res) => res.json());

  // Clear existing parking spots
  parking.innerHTML = "";

  let row = document.createElement("div");
  row.className = "row g-3";
  let count = 0;

  for (const [n, spot] of Object.entries(parkingSpots)) {
    if (count == 2) {
      parking.appendChild(row);
      row = document.createElement("div");
      row.className = "row g-3";
      count = 0;
    }

    row.appendChild(createParkingSpotElement(n, spot));
    count++;
  }

  if (count > 0) {
    parking.appendChild(row);
  }
}

// Render parking spots every 1 second
setInterval(renderParkingSpots, 1000);
