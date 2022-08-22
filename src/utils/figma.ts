export function* recurseChildren(nodes: readonly SceneNode[]): Generator<SceneNode> {
  for (const node of nodes) {
    yield node;

    if ('children' in node) {
      yield* recurseChildren(node.children);
    }
  }
}
