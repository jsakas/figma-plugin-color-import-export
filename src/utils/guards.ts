export function isSolidPaint(paint: Paint): paint is SolidPaint {
  return paint.type === 'SOLID';
}

export function isGradientPaint(paint: Paint): paint is GradientPaint {
  return (
    paint.type === 'GRADIENT_LINEAR' ||
    paint.type === 'GRADIENT_RADIAL' ||
    paint.type === 'GRADIENT_ANGULAR' ||
    paint.type === 'GRADIENT_DIAMOND'
  );
}

export function isImagePaint(paint: Paint): paint is ImagePaint {
  return paint.type === 'IMAGE';
}

export function isRectangleNode(node: SceneNode): node is RectangleNode {
  return node.type === 'RECTANGLE';
}

export function isFrameNode(node: SceneNode): node is FrameNode {
  return node.type === 'FRAME';
}

export function isTextNode(node: SceneNode): node is TextNode {
  return node.type === 'TEXT';
}
