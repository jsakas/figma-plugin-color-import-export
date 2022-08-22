import { NotifyMessage } from 'declarations/messages';

export function copyToClipboard(message: NotifyMessage) {
  return figma.notify(message.message, message.options);
}
