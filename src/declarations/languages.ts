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

import Handlebars from 'handlebars';

import TemplateCSS from 'templates/CSS.hbs';
import TemplateJavaScript from 'templates/JavaScript.hbs';
import TemplateSass from 'templates/Sass.hbs';

export enum Languages {
  JSON = 'JSON',
  CSS = 'CSS',
  Sass = 'Sass',
  JavaScript = 'JavaScript',
}

export type LanguageTypes = `${Languages}`;

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

export type TemplateVariables = {
  colors: { [key: string]: string };
};

export type LanguageOptions = {
  enabled: boolean;
  extension: string;
  mimeType: string;
  templateFunction?: HandlebarsTemplateDelegate<TemplateVariables>;
  supportedCaseStyles: CaseTypes[];
};

export const HandlebarsTemplateCSS = Handlebars.compile<TemplateVariables>(TemplateCSS);
export const HandlebarsTemplateJavaScript = Handlebars.compile<TemplateVariables>(TemplateJavaScript);
export const HandlebarsTemplateSass = Handlebars.compile<TemplateVariables>(TemplateSass);

export type LanguageRecord = Record<LanguageTypes, LanguageOptions>;

export const LanguageRecord: LanguageRecord = {
  [Languages.JSON]: {
    enabled: false,
    extension: '.json',
    mimeType: 'application/json',
    supportedCaseStyles: [
      Case.CAMEL,
      Case.CAPITAL,
      Case.CONSTANT,
      Case.DOT,
      Case.HEADER,
      Case.PARAM,
      Case.PASCAL,
      Case.SNAKE,
    ],
    templateFunction: (vars) => JSON.stringify(vars.colors, null, 2),
  },
  [Languages.CSS]: {
    enabled: false,
    extension: '.css',
    mimeType: 'text/css',
    supportedCaseStyles: [Case.CAMEL, Case.CONSTANT, Case.HEADER, Case.PARAM, Case.PASCAL, Case.SNAKE],
    templateFunction: HandlebarsTemplateCSS,
  },
  [Languages.Sass]: {
    enabled: false,
    extension: '.scss',
    mimeType: 'text/css',
    supportedCaseStyles: [Case.CAMEL, Case.CONSTANT, Case.HEADER, Case.PARAM, Case.PASCAL, Case.SNAKE],
    templateFunction: HandlebarsTemplateSass,
  },
  [Languages.JavaScript]: {
    enabled: false,
    extension: '.js',
    mimeType: 'text/javascript',
    supportedCaseStyles: [Case.CAMEL, Case.CONSTANT, Case.HEADER, Case.PARAM, Case.SNAKE],
    templateFunction: HandlebarsTemplateJavaScript,
  },
};

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
