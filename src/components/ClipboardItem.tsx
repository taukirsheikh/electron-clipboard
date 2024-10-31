import React from 'react';
import { Clipboard, Pin, PinOff, Trash2 } from 'lucide-react';
import type { ClipboardItem as ClipboardItemType } from '../types/clipboard';

interface Props {
  item: ClipboardItemType;
  isPinnedTab?: boolean;
  onPin: (item: ClipboardItemType) => void;
  onUnpin: (timestamp: number) => void;
  onCopy: (content: string) => void;
}

export function ClipboardItem({ item, isPinnedTab = false, onPin, onUnpin, onCopy }: Props) {
  return (
    <div className="card bg-base-200 shadow-xl mb-4">
      <div className="card-body">
        {item.type === 'text' ? (
          <pre className="whitespace-pre-wrap font-mono text-sm">{item.content}</pre>
        ) : (
          <img src={item.content} alt="Clipboard content" className="max-w-full h-auto" />
        )}
        <div className="card-actions justify-end mt-4">
          <button
            className="btn btn-circle btn-sm"
            onClick={() => onCopy(item.content)}
          >
            <Clipboard className="h-4 w-4" />
          </button>
          {!isPinnedTab ? (
            <button
              className="btn btn-circle btn-sm"
              onClick={() => onPin(item)}
            >
              <Pin className="h-4 w-4" />
            </button>
          ) : (
            <button
              className="btn btn-circle btn-sm"
              onClick={() => onUnpin(item.timestamp)}
            >
              <PinOff className="h-4 w-4" />
            </button>
          )}
          {isPinnedTab && (
            <button
              className="btn btn-circle btn-sm btn-error"
              onClick={() => onUnpin(item.timestamp)}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}