import { ImportColorsMessage } from 'declarations/messages';

const ROWS = 8;

export function importColors(message: ImportColorsMessage) {
  const { colors } = message;

  const allPaintStyles = figma.getLocalPaintStyles();

  const styles: PaintStyle[] = [];

  for (const c of colors) {
    const { name, r, g, b, a } = c;

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

    const existingStyle = allPaintStyles.find((ps) => ps.name === name);

    if (existingStyle) {
      existingStyle.paints = paints;
      styles.push(existingStyle);
    } else {
      const style = figma.createPaintStyle();

      style.name = name;
      style.paints = paints;

      styles.push(style);
    }
  }

  const nodes = [];

  for (const [i, style] of styles.entries()) {
    const x = i % ROWS;
    const y = Math.floor(i / ROWS);

    const rect = figma.createRectangle();
    rect.x = x * 150;
    rect.y = y * 150;
    rect.fillStyleId = style.id;
    figma.currentPage.appendChild(rect);
    nodes.push(rect);
  }

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}
