import { ImportColor } from 'declarations/colors';

export function createPaintStyle(color: ImportColor, caseFn: (input: string) => string): PaintStyle {
  const allPaintStyles = figma.getLocalPaintStyles();

  const { name, r, g, b, a, stylePath } = color;

  const formattedName = stylePath ? [...stylePath.split('/').map(caseFn), caseFn(name)].join('/') : caseFn(name);

  const paints: Paint[] = [
    {
      type: 'SOLID',
      visible: true,
      opacity: a,
      blendMode: 'NORMAL',
      color: {
        r: r / 255,
        g: g / 255,
        b: b / 255,
      },
    },
  ];

  const existingStyle = allPaintStyles.find((ps) => ps.name === formattedName);

  if (existingStyle) {
    existingStyle.paints = paints;

    return existingStyle;
  }

  const style = figma.createPaintStyle();

  style.name = formattedName;
  style.paints = paints;

  return style;
}
