import { ImportColorsMessage } from 'declarations/messages';
import { isFrameNode, isRectangleNode, isSolidPaint, isTextNode } from 'utils/guards';
import Color from 'color';
import { capitalCase } from 'change-case';

const ROWS = 8;
const COLOR_BLOCK_SIZE = 160;
const COLOR_BLOCK_SPACE = 20;

export async function importColors(message: ImportColorsMessage) {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });

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

  const primaryFill: Paint = {
    type: 'SOLID',
    color: {
      r: 0,
      g: 0,
      b: 0,
    },
  };

  const secondaryFill: Paint = {
    type: 'SOLID',
    color: {
      r: 0.53,
      g: 0.53,
      b: 0.53,
    },
  };

  const colorTitle = figma.createText();
  colorTitle.fills = [primaryFill];
  colorTitle.fontName = { family: 'Inter', style: 'Semi Bold' };
  colorTitle.fontSize = 14;
  colorTitle.lineHeight = {
    value: 20,
    unit: 'PIXELS',
  };

  const colorHex = figma.createText();
  colorHex.fills = [secondaryFill];
  colorHex.fontName = { family: 'Inter', style: 'Semi Bold' };
  colorHex.fontSize = 12;
  colorHex.lineHeight = {
    value: 16,
    unit: 'PIXELS',
  };

  const colorRgb = figma.createText();
  colorRgb.fills = [secondaryFill];
  colorRgb.fontName = { family: 'Inter', style: 'Semi Bold' };
  colorRgb.fontSize = 12;
  colorRgb.lineHeight = {
    value: 16,
    unit: 'PIXELS',
  };

  colorTitle.characters = 'Color Title';
  colorHex.characters = 'Color HEX';
  colorRgb.characters = 'Color RGB';

  const frameNode = figma.createFrame();

  frameNode.appendChild(colorTitle);
  frameNode.appendChild(colorHex);
  frameNode.appendChild(colorRgb);

  frameNode.layoutMode = 'VERTICAL';
  frameNode.layoutAlign = 'STRETCH';
  frameNode.horizontalPadding = 8;
  frameNode.verticalPadding = 8;
  frameNode.itemSpacing = 4;

  frameNode.resize(COLOR_BLOCK_SIZE, COLOR_BLOCK_SIZE * 0.5);
  frameNode.y = COLOR_BLOCK_SIZE;

  const colorRect = figma.createRectangle();
  colorRect.resize(COLOR_BLOCK_SIZE, COLOR_BLOCK_SIZE);

  const component = figma.createComponent();
  component.resize(COLOR_BLOCK_SIZE, COLOR_BLOCK_SIZE * 1.5);
  component.appendChild(colorRect);
  component.appendChild(frameNode);

  const nodes = [];

  for (const [i, style] of styles.entries()) {
    const paint = style.paints[0];

    let color: Color;

    if (isSolidPaint(paint)) {
      color = Color({
        r: paint.color.r * 255,
        g: paint.color.g * 255,
        b: paint.color.b * 255,
      }).alpha(paint.opacity);
    } else {
      continue;
    }

    const x = i % ROWS;
    const y = Math.floor(i / ROWS);

    const componentInstance = component.createInstance();

    componentInstance.x = x * (COLOR_BLOCK_SIZE + COLOR_BLOCK_SPACE);
    componentInstance.y = y * (COLOR_BLOCK_SIZE + COLOR_BLOCK_SPACE);

    if (isRectangleNode(componentInstance.children[0])) {
      componentInstance.children[0].fillStyleId = style.id;
    }

    if (isFrameNode(componentInstance.children[1])) {
      const children = componentInstance.children[1].children;

      if (isTextNode(children[0])) {
        children[0].characters = capitalCase(style.name);
      }

      if (isTextNode(children[1])) {
        children[1].characters = color.hex().toString();
      }

      if (isTextNode(children[2])) {
        children[2].characters = color.rgb().toString();
      }
    }

    figma.currentPage.appendChild(componentInstance);
    nodes.push(componentInstance);
  }

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}
