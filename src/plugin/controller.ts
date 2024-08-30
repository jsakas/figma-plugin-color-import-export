import { MessageTypes, SetSelectedColorsMessage } from 'declarations/messages';
import { recurseChildren } from 'utils/figma';
import { isSolidPaint, isUsableNode } from 'utils/guards';
import { copyToClipboard } from './utils/copyToClipboard';
import { importColors } from './handlers/importColors';

figma.showUI(__html__, {
  width: 400,
  height: 600,
  themeColors: true,
});


// properties are dropped when sending messages between the plugin and the UI
// so we need to convert the objects to plain objects
function toPlainObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(item => toPlainObject(item));
  }

  if (obj !== null && typeof obj === 'object') {
    const plainObject: any = {};

    const descriptors = Object.getOwnPropertyDescriptors(obj);

    for (const [key, descriptor] of Object.entries(descriptors)) {
      if (typeof descriptor.get === 'function') {
        // Handle computed properties
        try {
          plainObject[key] = toPlainObject(descriptor.get.call(obj));
        } catch (error) {
          // Handle errors from getter invocation if necessary
          plainObject[key] = undefined;
        }
      } else if ('value' in descriptor) {
        // Handle regular properties
        plainObject[key] = toPlainObject(descriptor.value);
      }
    }

    return plainObject;
  }

  // If it's not an object or array, return it as is (for primitive types)
  return obj;
}

function setSelectedPaintStyled() {
  const paintStyles = figma.getLocalPaintStyles();
  const variables = figma.variables.getLocalVariables();

  console.log('variables', variables)

  const selectedSceneNodes = Array.from(recurseChildren(figma.currentPage.selection)).filter((node) => {
    return 'fillStyleId' in node || 'strokeStyleId' in node;
  });

  const selectedPaintStyles = paintStyles
    .filter((ps) =>
      selectedSceneNodes.filter(isUsableNode).find((node) => node.fillStyleId === ps.id || node.strokeStyleId === ps.id)
    )
    .map(toPlainObject);

  const selectedVariables = variables.filter((variable) =>
    selectedSceneNodes
      .filter(isUsableNode)
      .find(
        (node) =>
          Array.isArray(node.fills) &&
          node.fills.filter(isSolidPaint).find((fill) => fill.boundVariables.color?.id === variable.id)
      )
  ).map(toPlainObject)

  const modes = figma.variables.getLocalVariableCollections().map(toPlainObject);

  console.log('variable collections', modes)

  modes.map((mode) => {
    console.log('mode details', mode.id, figma.variables.getVariableCollectionById(mode.id))
  })

  const message: SetSelectedColorsMessage = {
    type: MessageTypes.SET_SELECTED_COLORS,
    styles: selectedPaintStyles,
    variables: selectedVariables,
    modes: modes,
  };

  console.log('SetSelectedColorsMessage', message);

  figma.ui.postMessage(message);
}

figma.on('selectionchange', () => {
  setSelectedPaintStyled();
});

figma.on('run', () => {
  setSelectedPaintStyled();
});

function restartPlugin() {
  figma.showUI(__html__, {
    width: 400,
    height: 600,
    themeColors: true,
  });
}

figma.ui.onmessage = (message) => {
  console.log('figma.ui.onmessage', message);

  switch (message.type) {
    case MessageTypes.NOTIFY:
      copyToClipboard(message);
      break;
    case MessageTypes.IMPORT_COLORS:
      importColors(message);
      break;
    case MessageTypes.REQUEST_SELECTED_PAINT_STYLES:
      setSelectedPaintStyled();
      break;
    case MessageTypes.RESTART_PLUGIN:
      restartPlugin();
      break;
    default:
      break;
  }
};
