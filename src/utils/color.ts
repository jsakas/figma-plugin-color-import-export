import Color from 'color';
import { ColorModels, ColorModelType } from 'declarations/models';

export function solidPaintToColor(paint: SolidPaint): Color {
  const alpha = Number(typeof paint.opacity === 'number' ? paint.opacity : 1);

  return Color({
    r: paint.color.r * 255,
    g: paint.color.g * 255,
    b: paint.color.b * 255,
  }).alpha(Number(alpha.toFixed(2)));
}

export function colorToString(color: Color, model: ColorModelType = ColorModels.RGB) {
  switch (model) {
    case 'HSL':
      return color.hsl().string(0);
    case 'RGB':
      return color.rgb().string(0);
    case 'HEX':
      const hex = color.hexa();
      if (hex.length === 9 && hex.substring(7, 9) === 'FF') {
        return hex.substring(0, 7);
      }

      return hex;
    default:
      return color.toString();
  }
}
