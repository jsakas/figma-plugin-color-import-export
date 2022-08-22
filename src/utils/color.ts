import Color from 'color';

export function solidPaintToColor(paint: SolidPaint): Color {
  const alpha = Number(typeof paint.opacity === 'number' ? paint.opacity : 1);

  return Color({
    r: paint.color.r * 255,
    g: paint.color.g * 255,
    b: paint.color.b * 255,
  }).alpha(Number(alpha.toFixed(2)));
}
