import { MessageTypes, SetSelectedPaintStylesMessage } from 'declarations/messages';
import { recurseChildren } from 'utils/figma';
import { isRectangleNode } from 'utils/guards';
import { copyToClipboard } from './handlers/copyToClipboard';
import { importColors } from './handlers/importColors';

figma.showUI(__html__, {
  width: 400,
  height: 600,
  themeColors: true,
});

function setSelectedPaintStyled() {
  const paintStyles = figma.getLocalPaintStyles();

  const selectedSceneNodes = Array.from(recurseChildren(figma.currentPage.selection)).filter((node) => {
    return 'fillStyleId' in node;
  });

  const selectedPaintStyles: PaintStyle[] = paintStyles
    .filter((ps) => {
      return selectedSceneNodes.filter(isRectangleNode).find((node) => node.fillStyleId === ps.id);
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
}

figma.on('selectionchange', () => {
  setSelectedPaintStyled();
});

figma.on('run', () => {
  setSelectedPaintStyled();
});

figma.ui.onmessage = (message) => {
  console.log('figma.ui.onmessage', message);

  switch (message.type) {
    case MessageTypes.NOTIFY:
      copyToClipboard(message);
      break;
    case MessageTypes.IMPORT_COLORS:
      importColors(message);
    default:
      break;
  }
};
