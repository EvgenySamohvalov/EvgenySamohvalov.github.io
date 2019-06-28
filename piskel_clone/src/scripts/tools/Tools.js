import Frames from '../frames/frames';
import Canvas from '../Canvas/Canvas';
import Color from './Color/Color';
import Instruments from '../instruments/instruments';

const mainCanvas = new Canvas(800, 800, 'mainCanvas', 'mainCanvas');
const renderCanvas = new Canvas(800, 800, 'renderCanvas', 'renderCanvas');
const canvasHelper = new Canvas(800, 800, 'canvasHelper', 'canvasHelper');
const colors = new Color('main');
const instruments = new Instruments();
const frames = new Frames();

export default class Tools {
  PenTool(eraser) {
    this.changeTool();

    const canvas = [mainCanvas.getCanvas().canvas][0];
    const ctx = [mainCanvas.getCanvas().ctx][0];

    let x0 = null;
    let y0 = null;
    let x1 = null;
    let y1 = null;
    let coordX = null;
    let coordY = null;

    function draw(e) {
      const pixelsNumber = instruments.getCanvasSize();
      const penSize = instruments.getPenSize();
      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      const divider = canvas.width / pixelsNumber;
      const dx = Math.abs(x1 - x0);
      const dy = Math.abs(y1 - y0);
      const sx = x0 < x1 ? 1 : -1;
      const sy = y0 < y1 ? 1 : -1;
      let err = dx - dy;

      while (true) {
        coordX = Math.floor(x0 / divider);
        coordY = Math.floor(y0 / divider);
        if (penSize == 1 || penSize == 2) {
          coordX *= divider;
          coordY *= divider;
        } else {
          coordX = Math.floor(coordX * divider);
          coordY = Math.floor(coordY * divider);
        }

        ctx.fillRect(coordX, coordY, divider * penSize, divider * penSize);

        if (x0 === x1 && y0 === y1) break;
        const err2 = 2 * err;
        if (err2 > -dy) {
          err -= dy;
          x0 += sx;
        }
        if (err2 < dx) {
          err += dx;
          y0 += sy;
        }
      }

      return 1;
    }

    function startDrawing(e) {
      ctx.beginPath();
      if (eraser) ctx.fillStyle = colors.backgroundColor;
      else ctx.fillStyle = colors.primaryColor;
      x0 = instruments.getCursorCoords(e).x;
      y0 = instruments.getCursorCoords(e).y;
      ctx.moveTo(x0, y0);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('click', draw);
    }

    function stopDrawing() {
      canvas.removeEventListener('mousemove', draw);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
  }

  StrokeTool() {
    this.changeTool();

    const canvasContainer = document.querySelector('.canvas-main-container');
    canvasContainer.appendChild(renderCanvas.create().canvas);
    renderCanvas
      .getCanvas()
      .ctx.clearRect(
        0,
        0,
        renderCanvas.getCanvas().canvas.height,
        renderCanvas.getCanvas().canvas.width
      );

    const canvas = [mainCanvas.getCanvas().canvas][0];
    const ctx = [mainCanvas.getCanvas().ctx][0];

    let pixelsNumber = instruments.getCanvasSize();
    let divider = canvas.width / pixelsNumber;
    let x0 = null;
    let y0 = null;
    let x1 = null;
    let y1 = null;
    let cX0 = null;
    let cY0 = null;
    let cX1 = null;
    let cY1 = null;
    let isDrawing = false;

    function draw(e) {
      pixelsNumber = instruments.getCanvasSize();
      divider = canvas.width / pixelsNumber;

      renderCanvas
        .getCanvas()
        .ctx.clearRect(
          0,
          0,
          renderCanvas.getCanvas().canvas.height,
          renderCanvas.getCanvas().canvas.width
        );

      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      cX1 = Math.floor(x1 / divider);
      cY1 = Math.floor(y1 / divider);
      cX0 = Math.floor(x0 / divider);
      cY0 = Math.floor(y0 / divider);
      instruments.simpleBresenhams(cX0, cY0, cX1, cY1, divider, renderCanvas.getCanvas().ctx);
    }

    function startDrawing(e) {
      isDrawing = true;
      renderCanvas.getCanvas().canvas.style.opacity = '1';
      renderCanvas.getCanvas().ctx.beginPath();
      renderCanvas.getCanvas().ctx.fillStyle = colors.primaryColor;

      x0 = instruments.getCursorCoords(e).x;
      y0 = instruments.getCursorCoords(e).y;

      x0 = Math.floor(x0);
      y0 = Math.floor(y0);

      renderCanvas.getCanvas().ctx.moveTo(x0, y0);
      renderCanvas.getCanvas().canvas.addEventListener('mousemove', draw);
    }

    function stopDrawing(e) {
      ctx.fillStyle = colors.primaryColor;
      renderCanvas.getCanvas().canvas.removeEventListener('mousemove', draw);
      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      cX1 = Math.floor(x1 / divider);
      cY1 = Math.floor(y1 / divider);

      instruments.simpleBresenhams(cX0, cY0, cX1, cY1, divider, ctx);
      isDrawing = false;
      frames.render();
      renderCanvas.getCanvas().canvas.style.opacity = '0';
    }

    function stopDrawingOut(e) {
      ctx.fillStyle = colors.primaryColor;
      renderCanvas.getCanvas().canvas.removeEventListener('mousemove', draw);
      if (e.type === 'mouseout' && !isDrawing) return;
      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      cX1 = Math.floor(x1 / divider);
      cY1 = Math.floor(y1 / divider);

      instruments.simpleBresenhams(cX0, cY0, cX1, cY1, divider, ctx);
      frames.render();
      renderCanvas.getCanvas().canvas.style.opacity = '0';
    }

    renderCanvas.getCanvas().canvas.addEventListener('mousedown', startDrawing);
    renderCanvas.getCanvas().canvas.addEventListener('mouseout', stopDrawingOut);
    renderCanvas.getCanvas().canvas.addEventListener('mouseup', stopDrawing);
  }

  strangeTool() {
    this.changeTool();
    const canvas = [mainCanvas.getCanvas().canvas][0];
    const ctx = [mainCanvas.getCanvas().ctx][0];
    let x0 = null;
    let y0 = null;
    let x1 = null;
    let y1 = null;
    let cX0 = null;
    let cY0 = null;
    let cX1 = null;
    let cY1 = null;
    function draw(e) {
      const pixelsNumber = instruments.getCanvasSize();
      const divider = canvas.width / pixelsNumber;
      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;
      cX1 = Math.floor(x1 / divider);
      cY1 = Math.floor(y1 / divider);
      cX0 = Math.floor(x0 / divider);
      cY0 = Math.floor(y0 / divider);

      const dx = Math.abs(cX1 - cX0);
      const dy = Math.abs(cY1 - cY0);
      const sx = cX0 < cX1 ? 1 : -1;
      const sy = cY0 < cY1 ? 1 : -1;
      let err = dx - dy;
      while (true) {
        ctx.fillRect(cX0 * divider, cY0 * divider, divider, divider);
        if (cX0 === cX1 && cY0 === cY1) break;
        const err2 = 2 * err;
        if (err2 >= -dy) {
          err -= dy;
          cX0 += sx;
        }
        if (err2 <= dx) {
          err += dx;
          cY0 += sy;
        }
      }
    }

    function startDrawing(e) {
      ctx.beginPath();
      ctx.fillStyle = colors.primaryColor;
      x0 = instruments.getCursorCoords(e).x;
      y0 = instruments.getCursorCoords(e).y;
      x0 = Math.floor(x0);
      y0 = Math.floor(y0);
      ctx.moveTo(x0, y0);
      canvas.addEventListener('mousemove', draw);
    }

    function stopDrawing() {
      canvas.removeEventListener('mousemove', draw);
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
  }

  eraserTool() {
    this.changeTool();

    this.PenTool(true);
  }

  bucketTool() {
    this.changeTool();

    const canvas = [mainCanvas.getCanvas().canvas][0];
    const ctx = [mainCanvas.getCanvas().ctx][0];
    // let pixelsNumber = instruments.getCanvasSize();
    // let divider = canvas.width / pixelsNumber;

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    function colorArea(e) {
      imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // pixelsNumber = instruments.getCanvasSize();
      // divider = canvas.width / pixelsNumber;

      let cX0 = instruments.getCursorCoords(e).x;
      let cY0 = instruments.getCursorCoords(e).y;
      ctx.fillStyle = colors.primaryColor;

      const fillColor = instruments.convertHexToRgba(colors.primaryColor);

      cX0 = Math.floor(cX0);
      cY0 = Math.floor(cY0);

      const rgba0 = instruments.getPixelColor(imgData, cX0, cY0);

      // cX0 = Math.floor(cX0 / divider);
      // cY0 = Math.floor(cY0 / divider);
      // cY0 *= divider;
      // cX0 *= divider;

      const pixelStack = [[cX0, cY0]];
      const colorLayerData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const startR = rgba0.r;
      const startG = rgba0.g;
      const startB = rgba0.b;

      if (startR == fillColor.r && startG == fillColor.g && startB == fillColor.b) return;

      while (pixelStack.length) {
        let newPos = [];
        let pixelPos = null;
        let reachLeft = null;
        let reachRight = null;
        let x = null;
        let y = null;

        newPos = pixelStack.pop();
        [x, y] = [newPos[0], newPos[1]];

        pixelPos = (y * canvas.width + x) * 4;

        while (y >= 0 && matchStartColor(pixelPos)) {
          y -= 1;
          pixelPos -= canvas.width * 4;
        }
        pixelPos += canvas.width * 4;
        reachLeft = false;
        reachRight = false;
        while (y < canvas.height - 1 && matchStartColor(pixelPos)) {
          y += 1;
          colorPixel(pixelPos);
          if (x > 0) {
            if (matchStartColor(pixelPos - 4)) {
              if (!reachLeft) {
                pixelStack.push([x - 1, y]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }
          if (x < canvas.width - 1) {
            if (matchStartColor(pixelPos + 4)) {
              if (!reachRight) {
                pixelStack.push([x + 1, y]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }
          pixelPos += canvas.width * 4;
        }
      }
      ctx.putImageData(colorLayerData, 0, 0);

      function matchStartColor(pixelPos) {
        const r = colorLayerData.data[pixelPos];
        const g = colorLayerData.data[pixelPos + 1];
        const b = colorLayerData.data[pixelPos + 2];

        return r == startR && g == startG && b == startB;
      }

      function colorPixel(pixelPos) {
        colorLayerData.data[pixelPos] = fillColor.r;
        colorLayerData.data[pixelPos + 1] = fillColor.g;
        colorLayerData.data[pixelPos + 2] = fillColor.b;
        colorLayerData.data[pixelPos + 3] = 255;
      }
      frames.render();
    }

    canvas.addEventListener('click', e => colorArea(e));
  }

  rectangleTool() {
    this.changeTool();
    const canvasContainer = document.querySelector('.canvas-main-container');
    canvasContainer.appendChild(renderCanvas.create().canvas);
    renderCanvas
      .getCanvas()
      .ctx.clearRect(
        0,
        0,
        renderCanvas.getCanvas().canvas.height,
        renderCanvas.getCanvas().canvas.width
      );

    const canvas = [mainCanvas.getCanvas().canvas][0];
    const ctx = [mainCanvas.getCanvas().ctx][0];

    let pixelsNumber = instruments.getCanvasSize();
    let divider = canvas.width / pixelsNumber;
    let x0 = null;
    let y0 = null;
    let x1 = null;
    let y1 = null;
    let cX0 = null;
    let cY0 = null;
    let cX1 = null;
    let cY1 = null;
    let isDrawing = false;

    function draw(e) {
      pixelsNumber = instruments.getCanvasSize();
      divider = canvas.width / pixelsNumber;

      renderCanvas
        .getCanvas()
        .ctx.clearRect(
          0,
          0,
          renderCanvas.getCanvas().canvas.height,
          renderCanvas.getCanvas().canvas.width
        );

      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      cX1 = Math.floor(x1 / divider);
      cY1 = Math.floor(y1 / divider);
      cX0 = Math.floor(x0 / divider);
      cY0 = Math.floor(y0 / divider);
      instruments.simpleBresenhams(cX0, cY0, cX1, cY0, divider, renderCanvas.getCanvas().ctx);
      instruments.simpleBresenhams(cX1, cY0, cX1, cY1, divider, renderCanvas.getCanvas().ctx);
      instruments.simpleBresenhams(cX1, cY1, cX0, cY1, divider, renderCanvas.getCanvas().ctx);
      instruments.simpleBresenhams(cX0, cY1, cX0, cY0, divider, renderCanvas.getCanvas().ctx);
    }

    function startDrawing(e) {
      isDrawing = true;
      renderCanvas.getCanvas().canvas.style.opacity = '1';
      renderCanvas.getCanvas().ctx.beginPath();
      renderCanvas.getCanvas().ctx.fillStyle = colors.primaryColor;

      x0 = instruments.getCursorCoords(e).x;
      y0 = instruments.getCursorCoords(e).y;

      x0 = Math.floor(x0);
      y0 = Math.floor(y0);

      renderCanvas.getCanvas().ctx.moveTo(x0, y0);
      renderCanvas.getCanvas().canvas.addEventListener('mousemove', draw);
    }

    function stopDrawing(e) {
      ctx.fillStyle = colors.primaryColor;
      renderCanvas.getCanvas().canvas.removeEventListener('mousemove', draw);
      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      cX1 = Math.floor(x1 / divider);
      cY1 = Math.floor(y1 / divider);

      instruments.simpleBresenhams(cX0, cY0, cX1, cY0, divider, ctx);
      instruments.simpleBresenhams(cX1, cY0, cX1, cY1, divider, ctx);
      instruments.simpleBresenhams(cX1, cY1, cX0, cY1, divider, ctx);
      instruments.simpleBresenhams(cX0, cY1, cX0, cY0, divider, ctx);
      isDrawing = false;
      frames.render();

      renderCanvas.getCanvas().canvas.style.opacity = '0';
    }

    function stopDrawingOut(e) {
      ctx.fillStyle = colors.primaryColor;
      renderCanvas.getCanvas().canvas.removeEventListener('mousemove', draw);
      if (e.type === 'mouseout' && !isDrawing) return;
      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      cX1 = Math.floor(x1 / divider);
      cY1 = Math.floor(y1 / divider);

      instruments.simpleBresenhams(cX0, cY0, cX1, cY0, divider, ctx);
      instruments.simpleBresenhams(cX1, cY0, cX1, cY1, divider, ctx);
      instruments.simpleBresenhams(cX1, cY1, cX0, cY1, divider, ctx);
      instruments.simpleBresenhams(cX0, cY1, cX0, cY0, divider, ctx);
      frames.render();
      renderCanvas.getCanvas().canvas.style.opacity = '0';
    }

    renderCanvas.getCanvas().canvas.addEventListener('mousedown', startDrawing);
    renderCanvas.getCanvas().canvas.addEventListener('mouseout', stopDrawingOut);
    renderCanvas.getCanvas().canvas.addEventListener('mouseup', stopDrawing);
  }

  moveTool() {
    this.changeTool();
    const canvas = [mainCanvas.getCanvas().canvas][0];
    const ctx = [mainCanvas.getCanvas().ctx][0];

    const canvasContainer = document.querySelector('.canvas-main-container');
    canvasContainer.appendChild(renderCanvas.create().canvas);
    renderCanvas.getCanvas().ctx.drawImage(canvas, 0, 0);

    const renderCtx = renderCanvas.getCanvas().ctx;
    const renderCanvasC = renderCanvas.getCanvas().canvas;

    renderCtx.imageSmoothingEnabled = false;

    let pixelsNumber = instruments.getCanvasSize();
    let divider = canvas.width / pixelsNumber;
    let x0 = null;
    let y0 = null;
    let x1 = null;
    let y1 = null;
    let isDrawing = false;

    function move(e) {
      pixelsNumber = instruments.getCanvasSize();
      divider = canvas.width / pixelsNumber;

      renderCanvas
        .getCanvas()
        .ctx.clearRect(
          0,
          0,
          renderCanvas.getCanvas().canvas.height,
          renderCanvas.getCanvas().canvas.width
        );

      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;

      x1 = Math.floor(x1 / divider);
      y1 = Math.floor(y1 / divider);

      canvas.style.opacity = '0';

      renderCtx.drawImage(canvas, (x1 - x0) * divider, (y1 - y0) * divider);
    }

    function startMoving(e) {
      renderCanvas.getCanvas().ctx.drawImage(canvas, 0, 0);
      canvas.style.opacity = '0';
      canvasHelper.getCanvas().canvas.style.opacity = '0';
      pixelsNumber = instruments.getCanvasSize();
      divider = canvas.width / pixelsNumber;
      x0 = instruments.getCursorCoords(e).x;
      y0 = instruments.getCursorCoords(e).y;
      isDrawing = true;

      x0 = Math.floor(x0);
      y0 = Math.floor(y0);
      x0 = Math.floor(x0 / divider);
      y0 = Math.floor(y0 / divider);

      renderCanvasC.style.opacity = '1';

      renderCanvasC.addEventListener('mousemove', move);
    }

    function stopMoving(e) {
      renderCanvasC.removeEventListener('mousemove', move);
      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;
      x1 = Math.floor(x1 / divider);
      y1 = Math.floor(y1 / divider);
      ctx.imageSmoothingEnabled = false;
      isDrawing = false;

      mainCanvas.clearCanvas();
      canvas.style.opacity = '1';
      ctx.drawImage(renderCanvasC, 0, 0);
      frames.render();

      canvasHelper.getCanvas().canvas.style.opacity = '1';
      renderCanvasC.style.opacity = '0';
    }

    function stopMovingOut(e) {
      renderCanvasC.removeEventListener('mousemove', move);
      if (e.type === 'mouseout' && !isDrawing) return;
      x1 = instruments.getCursorCoords(e).x;
      y1 = instruments.getCursorCoords(e).y;
      x1 = Math.floor(x1 / divider);
      y1 = Math.floor(y1 / divider);
      ctx.imageSmoothingEnabled = false;

      mainCanvas.clearCanvas();
      canvas.style.opacity = '1';
      ctx.drawImage(renderCanvasC, 0, 0);
      frames.render();

      canvasHelper.getCanvas().canvas.style.opacity = '1';
      renderCanvasC.style.opacity = '0';
    }

    renderCanvasC.addEventListener('mousedown', startMoving);
    renderCanvasC.addEventListener('mouseout', stopMovingOut);
    renderCanvasC.addEventListener('mouseup', stopMoving);
  }

  colorSwap() {
    this.changeTool();

    let canvas = [mainCanvas.getCanvas().canvas][0];
    let ctx = [mainCanvas.getCanvas().ctx][0];
    let pixelsNumber = instruments.getCanvasSize();
    let divider = canvas.width / pixelsNumber;
    // let coordX = null;
    // let coordY = null;

    ctx.fillStyle = colors.primaryColor;

    function colorArea(e) {
      [canvas, ctx] = [[mainCanvas.getCanvas().canvas][0], [mainCanvas.getCanvas().ctx][0]];
      pixelsNumber = instruments.getCanvasSize();
      divider = canvas.width / pixelsNumber;

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let cX0 = instruments.getCursorCoords(e).x;
      let cY0 = instruments.getCursorCoords(e).y;

      ctx.fillStyle = colors.primaryColor;
      const fillColor = instruments.convertHexToRgba(colors.primaryColor);

      cX0 = Math.floor(cX0);
      cY0 = Math.floor(cY0);

      const rgba0 = instruments.getPixelColor(imgData, cX0, cY0);

      const startR = rgba0.r;
      const startG = rgba0.g;
      const startB = rgba0.b;

      [canvas, ctx] = [[mainCanvas.getCanvas().canvas][0], [mainCanvas.getCanvas().ctx][0]];
      pixelsNumber = instruments.getCanvasSize();

      divider = canvas.width / pixelsNumber;

      if (startR == fillColor.r && startG == fillColor.g && startB == fillColor.b) return;

      let i = 0;
      let j = 0;

      while (i < pixelsNumber) {
        j = 0;
        while (j < pixelsNumber) {
          // coordX = Math.floor(x0 / divider);
          // coordY = Math.floor(y0 / divider);
          // if (penSize == 1 || penSize == 2) {
          //   coordX *= divider;
          //   coordY *= divider;
          // } else {
          //   coordX = Math.floor(coordX * divider);
          //   coordY = Math.floor(coordY * divider);
          // }
          const rgba1 = instruments.getPixelColor(imgData, j * divider, i * divider);
          // console.log(1, j);
          if (startR == rgba1.r && startG == rgba1.g && startB == rgba1.b) {
            // console.log(2, j);
            ctx.fillRect(j * divider, i * divider, divider, divider);
          }
          j += 1;
        }
        i += 1;
      }
      frames.render();
    }

    canvas.addEventListener('click', e => colorArea(e));
  }

  addEventListeners() {
    const toolsList = document.querySelectorAll('.tool');

    toolsList[0].addEventListener('click', () => this.PenTool());
    toolsList[1].addEventListener('click', () => this.bucketTool(false));
    toolsList[2].addEventListener('click', () => this.colorSwap());
    toolsList[3].addEventListener('click', () => this.eraserTool());
    toolsList[4].addEventListener('click', () => this.StrokeTool());
    toolsList[5].addEventListener('click', () => this.strangeTool());
    toolsList[6].addEventListener('click', () => this.rectangleTool());
    toolsList[8].addEventListener('click', () => this.moveTool());
  }

  changeTool() {
    const canvasContainer = document.querySelector('.canvas-main-container');
    if (canvasContainer.querySelector('#renderCanvas')) {
      canvasContainer.removeChild(renderCanvas.getCanvas().canvas);
    }
    const image = mainCanvas.convertToFrame(800);
    const canvas = mainCanvas.getCanvas().canvas.cloneNode();
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0, 800, 800);

    mainCanvas.getCanvas().canvas.parentNode.replaceChild(canvas, mainCanvas.getCanvas().canvas);

    canvas.addEventListener('mouseup', () => {
      frames.render();
    });
    canvas.addEventListener('mouseout', frames.render);
    instruments.showCanvasInfo();
  }
}
