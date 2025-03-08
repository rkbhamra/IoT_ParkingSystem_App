const parking = document.getElementById("parking");
const parkingSpots = {
  1: {
    status: "occupied",
    time: "2021-09-01T12:00:00Z",
  },
  2: {
    status: "free",
  },
  3: {
    status: "occupied",
    time: "2021-09-01T12:00:00Z",
  },
  4: {
    status: "reserved",
    time: "2021-09-01T12:00:00Z",
  },
  5: {
    status: "free",
  },
  6: {
    status: "free",
  },
  7: {
    status: "free",
  },
  8: {
    status: "free",
  },
  9: {
    status: "free",
  },
  10: {
    status: "free",
  },
};

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

function renderParkingSpots() {
  let row = document.createElement("div");
  row.className = "row g-3";
  let count = 0;

  for (const [n, spot] of Object.entries(parkingSpots)) {
    if (count == 5) {
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

renderParkingSpots();
