import { ImportColor } from './colors';
import { CaseTypes } from './case';

export enum MessageTypes {
  REQUEST_SELECTED_PAINT_STYLES = 'REQUEST_SELECTED_PAINT_STYLES',
  SET_SELECTED_PAINT_STYLES = 'SET_SELECTED_PAINT_STYLES',
  NOTIFY = 'NOTIFY',
  IMPORT_COLORS = 'IMPORT_COLORS',
  RESTART_PLUGIN = 'RESTART_PLUGIN',
}

export interface RequestSelectedPainStylesMessage {
  type: MessageTypes.REQUEST_SELECTED_PAINT_STYLES;
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

export interface RestartPluginMessage {
  type: MessageTypes.RESTART_PLUGIN;
}

export type FigmaMessage<T> = {
  pluginId?: string;
  pluginMessage: T;
};

export type PluginMessage = SetSelectedPaintStylesMessage | NotifyMessage | ImportColorsMessage | RestartPluginMessage;

export type ParentMessage = FigmaMessage<PluginMessage>;
