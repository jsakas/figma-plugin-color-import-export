import Color from 'color';
import { solidPaintToColor } from 'utils/color';
import { isSolidPaint, isRectangleNode, isFrameNode, isTextNode } from 'utils/guards';

export function createColorCardComponentInstance(
  name: string,
  style: PaintStyle,
  component: ComponentNode
): InstanceNode | null {
  const paint = style.paints[0];

  let color: Color;

  if (isSolidPaint(paint)) {
    color = solidPaintToColor(paint);
  } else {
    return null;
  }

  const componentInstance = component.createInstance();

  componentInstance.name = name;

  if (isRectangleNode(componentInstance.children[0])) {
    componentInstance.children[0].fillStyleId = style.id;
  }

  if (isFrameNode(componentInstance.children[1])) {
    const children = componentInstance.children[1].children;

    if (isTextNode(children[0])) {
      children[0].characters = name;
    }

    if (isTextNode(children[1])) {
      if (color.alpha() < 1) {
        children[1].characters = color.hexa().toString();
      } else {
        children[1].characters = color.hex().toString();
      }
    }

    if (isTextNode(children[2])) {
      children[2].characters = color.rgb().toString();
    }
  }

  return componentInstance;
}
