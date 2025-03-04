canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

function drawParkingLot() {
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const numSpacesX = 5;
  const numSpacesY = 2;
  const spaceWidth = canvas.width / numSpacesX;
  const spaceHeight = canvas.height / numSpacesY;

  for (let i = 0; i < numSpacesX; i++) {
    for (let j = 0; j < numSpacesY; j++) {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(i * spaceWidth, j * spaceHeight, 5, spaceHeight);
      ctx.fillRect(i * spaceWidth, j * spaceHeight, spaceWidth, 5);
    }
  }
}

drawParkingLot();
// random ass boxes for now
