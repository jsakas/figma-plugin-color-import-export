import { isGroupNode } from 'utils/guards';

export type GroupRef = {
  name: string;
  ref?: GroupNode;
};

/**
 * Return groups or folders as an array.
 *
 * If group doesn't exist, ref with be undefined and the group will be created later.
 */
export function getOrCreateGroupStack(path: string): GroupRef[] {
  if (!path) return [];

  const ret: GroupRef[] = [];
  const pathParts = path.split('/');

  let group: PageNode | GroupNode | null = figma.currentPage;

  for (const part of pathParts) {
    const existingGroup = group?.children.find((c) => c.name === part && isGroupNode(c));

    if (existingGroup) {
      ret.push({
        name: part,
        ref: existingGroup,
      });

      group = existingGroup;
    } else {
      group = null;

      ret.push({
        name: part,
      });
    }
  }

  return ret.reverse();
}
