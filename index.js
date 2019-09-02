function makeRoom() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  let positionX = 12;
  let positionY = 12;
  let positionHeadX = 16;
  let positionHeadY = 22;
  let previousOperation = 'down';
  let currentOperation = 'up';

  function fillCanvas() {
    let xCoord = 0;
    let yCoord = 0;
    ctx.strokeStyle = 'rgba(0, 0, 0, .01)';
    for (let i = 0; i <= 7; i += 1) {
      ctx.moveTo(xCoord, yCoord);
      ctx.lineTo(xCoord, width);
      ctx.stroke();
      xCoord += 40;

    }
    xCoord = 0;
    for (let i = 0; i <= 7; i += 1) {
      ctx.moveTo(xCoord, yCoord);
      ctx.lineTo(width, yCoord);
      ctx.stroke();
      yCoord += 40;
    }
  }
  fillCanvas();

  function drawHuman() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(positionX, positionY, 15, 15);
  }

  function drawHead() {
    ctx.fillStyle = 'orange';
    if (currentOperation === 'down' || currentOperation === 'up' || currentOperation === '') {
      ctx.fillRect(positionHeadX,positionHeadY, 7, 5);
    } else {
      ctx.fillRect(positionHeadX,positionHeadY, 5, 7);
    }
  }
  drawHuman();
  drawHead();

  function goDown(event) {
    if (event.keyCode === 40 && positionY < 252) {
      currentOperation = 'down';
      ctx.clearRect(positionX, positionY, 15, 15);
      positionY += 40;
      drawHuman();
      if (previousOperation === 'down' || previousOperation === 'up') {
        ctx.clearRect(positionHeadX,positionHeadY, 7, 5);
      } else {
        ctx.clearRect(positionHeadX,positionHeadY, 5, 7);
      }
      const upPosition = positionY - positionHeadY;
      if (previousOperation === 'up') positionHeadY += 10;
      else if (upPosition === 36) {
        previousOperation === 'right' ?
        positionHeadX -= 6 : positionHeadX += 4;
        positionHeadY += 6;
     }
      positionHeadY += 40;
      drawHead();
      previousOperation = 'down';
    } else if (event.keyCode === 40 && positionY >= 252 && previousOperation !== 'down') {
      currentOperation = 'down';
      ctx.clearRect(positionX, positionY, 15, 15);
      if (previousOperation === 'down' || previousOperation === 'up') {
        ctx.clearRect(positionHeadX,positionHeadY, 7, 5);
      } else {
        ctx.clearRect(positionHeadX,positionHeadY, 5, 7);
      }
      drawHuman();
      if (previousOperation === 'up') positionHeadY += 10;
      else if (previousOperation === 'right' || previousOperation === 'left') {
        previousOperation === 'right' ?
        positionHeadX -= 6 : positionHeadX += 4;
        positionHeadY += 6;
      }
      drawHead();
      previousOperation = 'down';
    }
  }

  function goUp(event) {
    if (event.keyCode === 38 && positionY > 12) {
      currentOperation = 'up';
      ctx.clearRect(positionX, positionY, 15, 15);
      positionY -= 40;
      drawHuman();
      if (previousOperation === 'down' || previousOperation === 'up') {
        ctx.clearRect(positionHeadX,positionHeadY, 7, 5);
      } else {
        ctx.clearRect(positionHeadX,positionHeadY, 5, 7);
      }
      if (previousOperation === 'down') positionHeadY -= 10;
      else if (previousOperation === 'right' || previousOperation === 'left') {
        previousOperation === 'right' ?
        positionHeadX -= 6 : positionHeadX += 4;
        positionHeadY -= 4;
      }
      positionHeadY -= 40;
      drawHead();
      previousOperation = 'up';
    } else if (event.keyCode === 38 && positionY <= 12 && previousOperation !== 'up') {
      currentOperation = 'up';
      ctx.clearRect(positionX, positionY, 15, 15);
      if (previousOperation === 'down' || previousOperation === 'up') {
        ctx.clearRect(positionHeadX,positionHeadY, 7, 5);
      } else {
        ctx.clearRect(positionHeadX,positionHeadY, 5, 7);
      }
      drawHuman();
      if (previousOperation === 'up') positionHeadY -= 10;
      else if (previousOperation === 'right' || previousOperation === 'left') {
        previousOperation === 'right' ?
        positionHeadX -= 6 : positionHeadX += 4;
        positionHeadY -= 4;
      }
      drawHead();
      previousOperation = 'up';
    }
  }

  function goRight(event) {
    if (event.keyCode === 39 && positionX < 252) {
      currentOperation = 'right';
      ctx.clearRect(positionX, positionY, 15, 15);
      positionX += 40;
      drawHuman();
      if (previousOperation === 'down' || previousOperation === 'up') {
        ctx.clearRect(positionHeadX,positionHeadY, 7, 5);
      } else {
        ctx.clearRect(positionHeadX,positionHeadY, 5, 7);
      }

      if (previousOperation === 'down') {
         positionHeadX += 6;
         positionHeadY -= 6;
      } else if (previousOperation === 'left') {
        positionHeadX += 10;
      } else if (previousOperation === 'up') {
        positionHeadX += 6;
        positionHeadY += 4;
      }
      positionHeadX += 40;
      drawHead();
      previousOperation = 'right';
    } else if (event.keyCode === 39 && positionX >= 252 && previousOperation !== 'right') {
      currentOperation = 'right';
      ctx.clearRect(positionX, positionY, 15, 15);
      if (previousOperation === 'down' || previousOperation === 'up') {
        ctx.clearRect(positionHeadX,positionHeadY, 7, 5);
      } else {
        ctx.clearRect(positionHeadX,positionHeadY, 5, 7);
      }
      drawHuman();
      if (previousOperation === 'down') {
        positionHeadX += 6;
        positionHeadY -= 6;
     } else if (previousOperation === 'left') {
       positionHeadX += 10;
     } else if (previousOperation === 'up') {
       positionHeadX += 6;
       positionHeadY += 4;
     }
      drawHead();
      previousOperation = 'right';
    }
  }

  function goLeft() {
    if (event.keyCode === 37 && positionX > 12) {
      currentOperation = 'left';
      ctx.clearRect(positionX, positionY, 15, 15);
      positionX -= 40;
      drawHuman();
      if (previousOperation === 'down' || previousOperation === 'up') {
        ctx.clearRect(positionHeadX - 1,positionHeadY, 8, 6);
      } else if (previousOperation === 'right') {
        ctx.clearRect(positionHeadX,positionHeadY, 5, 7);
      }
      if (previousOperation === 'right') {
        positionHeadX -= 10;
      } else if (previousOperation === 'down') {
        positionHeadX -= 4;
        positionHeadY -= 6;
      } else if (previousOperation === 'up') {
        positionHeadX -= 4;
        positionHeadY += 4;
      }
      positionHeadX -= 40;
      drawHead();
      previousOperation = 'left';
    } else if (event.keyCode === 37 && positionX <= 12 && previousOperation !== 'left') {
      currentOperation = 'right';
      ctx.clearRect(positionX, positionY, 15, 15);
      if (previousOperation === 'down' || previousOperation === 'up') {
        ctx.clearRect(positionHeadX,positionHeadY, 7, 5);
      } else {
        ctx.clearRect(positionHeadX,positionHeadY, 5, 7);
      }
      drawHuman();
      if (previousOperation === 'right') {
        positionHeadX -= 10;
      } else if (previousOperation === 'down') {
        positionHeadX -= 4;
        positionHeadY -= 6;
      } else if (previousOperation === 'up') {
        positionHeadX -= 4;
        positionHeadY += 4;
      }
      drawHead();
      previousOperation = 'left';
    }
  }

  document.addEventListener('keyup', goDown);
  document.addEventListener('keyup', goUp);
  document.addEventListener('keyup', goRight);
  document.addEventListener('keyup', goLeft);
}

makeRoom();
