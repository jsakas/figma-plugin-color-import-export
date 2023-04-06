export const DEFAULT_COLOR_BLOCK_WIDTH = 240;
export const DEFAULT_COLOR_BLOCK_HEIGHT = 140;
export const DEFAULT_INFO_BLOCK_HEIGHT = 80;

export type CreateColorCardComponentOptions = {
  colorBlockWidth: number;
  colorBlockHeight: number;
  infoBlockHeight: number;
};

export function createColorCardComponent(
  options = {
    colorBlockWidth: DEFAULT_COLOR_BLOCK_WIDTH,
    colorBlockHeight: DEFAULT_COLOR_BLOCK_HEIGHT,
    infoBlockHeight: DEFAULT_INFO_BLOCK_HEIGHT,
  }
): ComponentNode {
  const { colorBlockWidth, colorBlockHeight, infoBlockHeight } = options;

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

  frameNode.resize(colorBlockWidth, infoBlockHeight);
  frameNode.y = colorBlockHeight;

  const colorRect = figma.createRectangle();
  colorRect.resize(colorBlockWidth, colorBlockHeight);

  const component = figma.createComponent();
  component.visible = false;
  component.name = 'Color Card';
  component.resize(colorBlockWidth, colorBlockHeight);
  component.appendChild(colorRect);
  component.appendChild(frameNode);

  return component;
}
