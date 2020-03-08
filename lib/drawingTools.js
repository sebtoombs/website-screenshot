// Some canvas drawing functions

// Just a handy helper
export function fillEllipse(ctx) {
  //Apparently this is more performant than slice
  var args = new Array(arguments.length - 1);
  for (var i = 0; i < args.length; ++i) {
    args[i] = arguments[i + 1];
  }

  ctx.beginPath();
  ctx.ellipse.apply(ctx, args);
  ctx.fill();
}

//Take a borderRadius param and convert it to 4 corners
//This shouldnt really be in this file
const parseBorderRadius = (radius, _defaultRadius = 0) => {
  if (typeof radius === "undefined") {
    radius = _defaultRadius;
  }
  if (typeof radius === "number") {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    const defaultRadius = {
      tl: _defaultRadius,
      tr: _defaultRadius,
      br: _defaultRadius,
      bl: _defaultRadius
    };
    for (let side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  return radius;
};

// Uh "borrowed" from someone on stackoverflow
export function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke === "undefined") {
    stroke = false;
  }

  radius = parseBorderRadius(radius);

  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

export function drawFrame(
  ctx,
  canvasWidth,
  canvasHeight,
  frameWidth,
  { borderRadius = 20, fillStyle = "#2D3748" } = {}
) {
  borderRadius = parseBorderRadius(borderRadius);
  //ctx.strokeStyle = "rgb(255, 0, 0)";
  ctx.fillStyle = fillStyle;
  roundRect(
    ctx,
    0,
    0,
    canvasWidth,
    frameWidth.h,
    { tl: borderRadius.tl, tr: borderRadius.tr },
    true
  );
  roundRect(
    ctx,
    0,
    canvasHeight - frameWidth.h,
    canvasWidth,
    frameWidth.h,
    { bl: borderRadius.bl, br: borderRadius.br },
    true
  );

  ctx.fillRect(0, frameWidth.h, frameWidth.v, canvasHeight - 2 * frameWidth.h);
  ctx.fillRect(
    canvasWidth - frameWidth.v,
    frameWidth.h,
    frameWidth.v,
    canvasHeight - 2 * frameWidth.h
  );

  const dotSize = frameWidth.h * 0.16;
  const dotMarginLeft = frameWidth.h * (2 / 3);

  // red 'close' dot
  ctx.fillStyle = "#E53E3E";
  fillEllipse(
    ctx,
    dotMarginLeft,
    frameWidth.h / 2,
    dotSize,
    dotSize,
    0,
    0,
    2 * Math.PI
  );

  //yellow 'min' dot
  ctx.fillStyle = "#F6E05E";
  fillEllipse(
    ctx,
    dotMarginLeft + dotSize * 3,
    frameWidth.h / 2,
    dotSize,
    dotSize,
    0,
    0,
    2 * Math.PI
  );

  ctx.fillStyle = "#68D391";
  fillEllipse(
    ctx,
    dotMarginLeft + dotSize * 6,
    frameWidth.h / 2,
    dotSize,
    dotSize,
    0,
    0,
    2 * Math.PI
  );
}
