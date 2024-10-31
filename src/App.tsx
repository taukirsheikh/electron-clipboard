import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ClipboardItem } from './components/ClipboardItem';
import { TabSelector } from './components/TabSelector';
import { useClipboard } from './hooks/useClipboard';

function App() {
  const [activeTab, setActiveTab] = useState<'history' | 'pinned'>('history');
  const { clipboardHistory, pinnedItems, handlePin, handleUnpin, copyToClipboard } = useClipboard();

  const isElectron = 'electron' in window;

  if (!isElectron) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Electron Environment Required</h1>
          <p className="text-gray-600">
            This application needs to be run in an Electron environment to access clipboard functionality.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="container mx-auto max-w-3xl">
        {activeTab === 'history' ? (
          clipboardHistory.length > 0 ? (
            clipboardHistory.map(item => (
              <ClipboardItem
                key={item.timestamp}
                item={item}
                onPin={handlePin}
                onUnpin={handleUnpin}
                onCopy={copyToClipboard}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No clipboard history yet</div>
          )
        ) : (
          pinnedItems.length > 0 ? (
            pinnedItems.map(item => (
              <ClipboardItem
                key={item.timestamp}
                item={item}
                isPinnedTab
                onPin={handlePin}
                onUnpin={handleUnpin}
                onCopy={copyToClipboard}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No pinned items</div>
          )
        )}
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;