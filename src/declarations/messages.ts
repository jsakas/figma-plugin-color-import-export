export enum MessageTypes {
  SET_SELECTED_PAINT_STYLES = 'SET_SELECTED_PAINT_STYLES',
}

export interface SetSelectedPaintStylesMessage {
  type: MessageTypes.SET_SELECTED_PAINT_STYLES;
  styles: PaintStyle[];
}

export type FigmaMessage<T> = {
  pluginId: string;
  pluginMessage: T;
};

export type ParentMessage = FigmaMessage<SetSelectedPaintStylesMessage>;
