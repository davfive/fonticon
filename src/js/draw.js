import canvasToFavicon from './lib/canvas-to-favicon.js';

let canvas;
let ctx;
let canvasSize;
let s;

function initDraw(canvas_, ctx_, canvasSize_, state) {
  canvas = canvas_;
  ctx = ctx_;
  canvasSize = canvasSize_;
  s = state;
}

function setFont(icon, size) {
  let fontWeight = 0;
  let fontSuffix = 'Free';
  switch (icon.st) {
    case 'fas':
      fontWeight = 900;
      break;
    case 'far':
      fontWeight = 400;
      break;
    case 'fab':
      fontWeight = 400;
      fontSuffix = 'Brands';
      break;
    case 'fal':
      fontWeight = 300;
      break;
    default:
      console.error('Unkown icon style: ' + icon.st);
  }
  ctx.font = fontWeight + ' ' + (icon.si * size) / 100 + 'px "Font Awesome 5 ' + fontSuffix + '"';
}

function drawIcon(ctx, icon, iconSize, iconColor) {
  if (canvasSize > 0) {
    setFont(icon, iconSize);
    ctx.globalCompositeOperation = iconColor ? 'destination-out' : 'xor';
    ctx.fillText(icon.uc, canvasSize / 2, canvasSize / 2);
    if (iconColor) {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillStyle = iconColor;
    }
  }
}

function draw() {
  if (canvasSize > 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set Background Color
    ctx.fillStyle = s.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setFont(s.icon, s.iconSize);

    // Set Primary Icon
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillText(s.icon.uc, canvasSize / 2, canvasSize / 2);

    ctx.fillStyle = s.iconColor;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillText(s.icon.uc, canvasSize / 2, canvasSize / 2);

    if (s.useStackedIcon) {
      ctx.save();
      setFont(s.stackedIcon, s.stackedSize);
      ctx.globalCompositeOperation = s.useStackedColor ? 'source-over' : 'xor';
      if (s.useStackedColor) {
        ctx.fillStyle = s.stackedColor;
      }
      ctx.fillText(s.stackedIcon.uc, canvasSize / 2, canvasSize / 2);
      ctx.restore();
    }
    canvasToFavicon(canvas);
  }
}

export { initDraw, draw };
export default draw;
