import { useState, useEffect } from 'react';
import type { ClipboardItem } from '../types/clipboard';
import { electronBridge } from '../utils/electronBridge';
import toast from 'react-hot-toast';

const MAX_HISTORY_ITEMS = 50;

export function useClipboard() {
  const [clipboardHistory, setClipboardHistory] = useState<ClipboardItem[]>([]);
  const [pinnedItems, setPinnedItems] = useState<ClipboardItem[]>([]);

  useEffect(() => {
    electronBridge.ipcRenderer.on('clipboard-change', (newItem: ClipboardItem) => {
      setClipboardHistory(prev => [newItem, ...prev.slice(0, MAX_HISTORY_ITEMS - 1)]);
    });

    return () => {
      electronBridge.ipcRenderer.removeAllListeners('clipboard-change');
    };
  }, []);

  const handlePin = (item: ClipboardItem) => {
    electronBridge.ipcRenderer.send('pin-item', item);
    setPinnedItems(prev => [...prev, { ...item, isPinned: true }]);
    toast.success('Item pinned successfully!');
  };

  const handleUnpin = (timestamp: number) => {
    electronBridge.ipcRenderer.send('unpin-item', timestamp);
    setPinnedItems(prev => prev.filter(item => item.timestamp !== timestamp));
    toast.success('Item unpinned successfully!');
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
      console.error('Copy failed:', error);
    }
  };

  return {
    clipboardHistory,
    pinnedItems,
    handlePin,
    handleUnpin,
    copyToClipboard,
  };
}