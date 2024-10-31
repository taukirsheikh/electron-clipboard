export interface ClipboardItem {
  type: 'text' | 'image';
  content: string;
  timestamp: number;
  isPinned?: boolean;
}