import { ImportColor } from './colors';
import { CaseTypes } from './case';

export enum MessageTypes {
  SET_SELECTED_PAINT_STYLES = 'SET_SELECTED_PAINT_STYLES',
  NOTIFY = 'NOTIFY',
  IMPORT_COLORS = 'IMPORT_COLORS',
}

export interface SetSelectedPaintStylesMessage {
  type: MessageTypes.SET_SELECTED_PAINT_STYLES;
  styles: PaintStyle[];
}

export interface NotifyMessage {
  type: MessageTypes.NOTIFY;
  message: string;
  options?: NotificationOptions;
}

export interface ImportColorsMessage {
  type: MessageTypes.IMPORT_COLORS;
  colors: ImportColor[];
  caseType: CaseTypes;
}

export type FigmaMessage<T> = {
  pluginId?: string;
  pluginMessage: T;
};

export type PluginMessage = SetSelectedPaintStylesMessage | NotifyMessage | ImportColorsMessage;

export type ParentMessage = FigmaMessage<PluginMessage>;
