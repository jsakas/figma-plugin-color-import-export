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

export function isUsableNode(
  node: SceneNode
): node is EllipseNode | RectangleNode | FrameNode | TextNode | LineNode | PolygonNode | StarNode | VectorNode {
  return (
    node.type === 'ELLIPSE' ||
    node.type === 'RECTANGLE' ||
    node.type === 'FRAME' ||
    node.type === 'TEXT' ||
    node.type === 'LINE' ||
    node.type === 'POLYGON' ||
    node.type === 'STAR' ||
    node.type === 'VECTOR'
  );
}

export function isEllipseNode(node: SceneNode): node is EllipseNode {
  return node.type === 'ELLIPSE';
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

export function isLineNode(node: SceneNode): node is LineNode {
  return node.type === 'LINE';
}

export function isPolygonNode(node: SceneNode): node is PolygonNode {
  return node.type === 'POLYGON';
}

export function isStarNode(node: SceneNode): node is StarNode {
  return node.type === 'STAR';
}

export function isVectorNode(node: SceneNode): node is VectorNode {
  return node.type === 'VECTOR';
}

export function isGroupNode(node: SceneNode): node is GroupNode {
  return node.type === 'GROUP';
}
