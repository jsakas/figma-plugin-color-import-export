export enum MessageTypes {
  SET_SELECTED_PAINT_STYLES = 'SET_SELECTED_PAINT_STYLES',
  NOTIFY = 'NOTIFY',
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

export type FigmaMessage<T> = {
  pluginId?: string;
  pluginMessage: T;
};

export type PluginMessage = SetSelectedPaintStylesMessage | NotifyMessage;

export type ParentMessage = FigmaMessage<PluginMessage>;
