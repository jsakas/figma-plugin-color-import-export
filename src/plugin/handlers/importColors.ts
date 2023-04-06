import { ImportColorsMessage } from 'declarations/messages';
import { CaseMap } from 'declarations/case';
import { createColorCardComponent } from '../utils/createColorCardComponent';
import { createPaintStyle } from '../utils/createPaintStyle';
import { createColorCardComponentInstance } from '../utils/createComponentInstance';
import { getOrCreateGroupStack } from '../utils/getOrCreateGroupStack';

const ROWS = 8;
const COLOR_BLOCK_WIDTH = 240;
const COLOR_BLOCK_HEIGHT = 140;
const INFO_BLOCK_HEIGHT = 80;
const COLOR_BLOCK_SPACE = 40;

export async function importColors(message: ImportColorsMessage) {
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });

  const { colors, caseType } = message;

  const caseFn = CaseMap[caseType];

  const component = createColorCardComponent({
    colorBlockWidth: COLOR_BLOCK_WIDTH,
    colorBlockHeight: COLOR_BLOCK_HEIGHT,
    infoBlockHeight: INFO_BLOCK_HEIGHT,
  });

  const nodes: InstanceNode[] = [];

  for (const [i, color] of colors.entries()) {
    try {
      const x = i % ROWS;
      const y = Math.floor(i / ROWS);

      const paintStyle = createPaintStyle(color, caseFn);
      const groupStack = getOrCreateGroupStack(color.cardPath);
      const componentInstance = createColorCardComponentInstance(caseFn(color.name), paintStyle, component);

      componentInstance.x = x * (COLOR_BLOCK_WIDTH + COLOR_BLOCK_SPACE);
      componentInstance.y = y * (COLOR_BLOCK_HEIGHT + INFO_BLOCK_HEIGHT + COLOR_BLOCK_SPACE);

      let componentToAppend: GroupNode | InstanceNode = componentInstance;

      for (const groupRef of groupStack) {
        if (groupRef.ref) {
          groupRef.ref.appendChild(componentToAppend);

          componentToAppend = groupRef.ref;
        } else {
          const newGroup = figma.group([componentToAppend], figma.currentPage);

          newGroup.name = groupRef.name;

          componentToAppend = newGroup;
        }
      }

      figma.currentPage.appendChild(componentToAppend);

      nodes.push(componentInstance);
    } catch (e) {
      console.error(e);
      // TODO - The Sentry code seems to cause a crash in Figma
      //
      // figma_app.min.js.br:5 Error: Syntax error on line 401: Unexpected token ...
      // at WAo (figma_app.min.js.br:1520:98)
      // at async figma_app.min.js.br:1650:6868
      //
      // Sentry.captureException(e)
    }
  }

  figma.currentPage.selection = nodes;
  figma.viewport.scrollAndZoomIntoView(nodes);
}
