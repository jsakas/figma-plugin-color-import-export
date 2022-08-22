import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  paramCase,
  pascalCase,
  snakeCase,
} from 'change-case';

export enum Case {
  CAMEL = 'CAMEL',
  CAPITAL = 'CAPITAL',
  CONSTANT = 'CONSTANT',
  DOT = 'DOT',
  HEADER = 'HEADER',
  PARAM = 'PARAM',
  PASCAL = 'PASCAL',
  SNAKE = 'SNAKE',
}

export type CaseTypes = `${Case}`;

export const CaseMap: Record<CaseTypes, (input: string) => string> = {
  [Case.CAMEL]: camelCase,
  [Case.CAPITAL]: capitalCase,
  [Case.CONSTANT]: constantCase,
  [Case.DOT]: dotCase,
  [Case.HEADER]: headerCase,
  [Case.PARAM]: paramCase,
  [Case.PASCAL]: pascalCase,
  [Case.SNAKE]: snakeCase,
};
