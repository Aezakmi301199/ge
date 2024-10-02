export const getFileNameWithFormatFile = (url: string): string => {
  return url.split('/').pop() || '';
};
