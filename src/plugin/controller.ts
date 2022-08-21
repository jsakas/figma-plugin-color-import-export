import { MessageTypes, SetSelectedPaintStylesMessage } from 'declarations/messages';
import { isRectangleNode } from 'utils/guards';

figma.showUI(__html__, {
  width: 400,
  height: 400,
  themeColors: true,
});

figma.on('selectionchange', () => {
  const paintStyles = figma.getLocalPaintStyles();

  const selectedPaintStyles: PaintStyle[] = paintStyles
    .filter((ps) => {
      return figma.currentPage.selection.filter(isRectangleNode).find((node) => node.fillStyleId === ps.id);
    })
    .map(
      (ps) =>
        ({
          id: ps.id,
          description: ps.description,
          key: ps.key,
          name: ps.name,
          paints: ps.paints,
          remote: ps.remote,
          type: ps.type,
        } as PaintStyle)
    );

  const message: SetSelectedPaintStylesMessage = {
    type: MessageTypes.SET_SELECTED_PAINT_STYLES,
    styles: selectedPaintStyles,
  };

  figma.ui.postMessage(message);
});

figma.ui.onmessage = (msg) => {
  console.log('figma.ui.onmessage', msg);
};
