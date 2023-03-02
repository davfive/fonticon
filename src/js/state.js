import icons from './generated/icons.js';

const c = {
  canvas: undefined,
  ctx: undefined,
  canvasSize: 1024,
};

const heart_icon = icons.find(icon => {
  return icon.id === 'heart' && icon.st === 'fas';
});

const s = {
  backgroundColor: 'rgba(255, 255, 255, 0)',
  icon: heart_icon,
  iconColor: 'rgba(255, 56, 96, 1)',
  iconSize: 85,
  stackedIcon: heart_icon,
  stackedColor: 'rgba(83, 56, 255, 1)',
  stackedSize: 60,
  useStackedIcon: false,
  useStackedColor: true,
};

function initState() {
  c.canvas = document.getElementById('canvas');
  c.canvas.width = c.canvasSize;
  c.canvas.height = c.canvasSize;
  c.ctx = c.canvas.getContext('2d');
  c.ctx.textAlign = 'center';
  c.ctx.textBaseline = 'middle';

  Object.freeze(c);
}

export { initState, c, s };
