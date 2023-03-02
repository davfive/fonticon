import draw from './draw.js';

import spectrum from 'spectrum-colorpicker';

function colorFromPicker(color) {
  const col = color.$.spectrum('get');
  return 'rgba(' + col.toRgb().r + ', ' + col.toRgb().g + ', ' + col.toRgb().b + ', ' + col.toRgb().a + ')';
}

function updateColor(color, fromPicker, doDraw) {
  if (!fromPicker) {
    color.$.spectrum('set', color.$text.val());
  }

  const rgba = colorFromPicker(color);
  color.setState(rgba);
  color.$.css('background-color', rgba);

  if (fromPicker) {
    color.$text.val(rgba);
  }
  if (doDraw) {
    draw();
  }
}

function initColors(state) {
  const $backgroundColor = $('#background_color');
  const $backgroundColorText = $('#background_color_text');
  const $iconColor = $('#icon_color');
  const $iconColorText = $('#icon_color_text');
  const $stackedColor = $('#stacked_color');
  const $stackedColorText = $('#stacked_color_text');

  const colors = {
    background: {
      setState: c => (state.backgroundColor = c),
      $: $backgroundColor,
      $text: $backgroundColorText,
    },
    icon: {
      setState: c => (state.iconColor = c),
      $: $iconColor,
      $text: $iconColorText,
    },
    stacked: {
      setState: c => (state.stackedColor = c),
      $: $stackedColor,
      $text: $stackedColorText,
    },
  };

  $backgroundColor.spectrum({
    color: state.backgroundColor,
    showButtons: false,
    showAlpha: true,
    move: updateColor.bind(updateColor, colors.background, true, true),
  });

  $iconColor.spectrum({
    color: state.iconColor,
    showButtons: false,
    showAlpha: true,
    move: updateColor.bind(updateColor, colors.icon, true, true),
  });

  $stackedColor.spectrum({
    color: state.stackedColor,
    showButtons: false,
    showAlpha: true,
    move: updateColor.bind(updateColor, colors.stacked, true, true),
  });

  $backgroundColorText.on('input', updateColor.bind(updateColor, colors.background, false, true));
  $iconColorText.on('input', updateColor.bind(updateColor, colors.icon, false, true));
  $stackedColorText.on('input', updateColor.bind(updateColor, colors.stacked, false, true));

  updateColor(colors.icon, true, false);
  updateColor(colors.background, true, false);
  updateColor(colors.stacked, true, false);
}

function initControls(state) {
  initColors(state);

  const $iconSize = $('#icon_size');
  $iconSize.on('input', () => {
    state.iconSize = $iconSize.val();
    draw();
  });

  const $useStackedColor = $('#use_stacked_color');
  const $stackedColorInput = $('#stacked_settings .color_input');
  const $stackedSize = $('#stacked_size');

  $useStackedColor.on('click', () => {
    state.useStackedColor = $useStackedColor.is(':checked');
    state.useStackedColor ? $stackedColorInput.show() : $stackedColorInput.hide();
    draw();
  });

  $stackedSize.on('input', () => {
    state.stackedSize = $stackedSize.val();
    draw();
  });

  const $useStackedIcon = $('#use_stacked_icon');
  const $stackedSettings = $('#stacked_settings');
  $useStackedIcon.on('click', () => {
    state.useStackedIcon = $useStackedIcon.is(':checked');
    state.useStackedIcon ? $stackedSettings.show() : $stackedSettings.hide();
    draw();
  });

  draw();
}

export { initControls };
