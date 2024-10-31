import React from 'react';

interface Props {
  activeTab: 'history' | 'pinned';
  onTabChange: (tab: 'history' | 'pinned') => void;
}

export function TabSelector({ activeTab, onTabChange }: Props) {
  return (
    <div className="tabs tabs-boxed justify-center mb-6">
      <button
        className={`tab ${activeTab === 'history' ? 'tab-active' : ''}`}
        onClick={() => onTabChange('history')}
      >
        History
      </button>
      <button
        className={`tab ${activeTab === 'pinned' ? 'tab-active' : ''}`}
        onClick={() => onTabChange('pinned')}
      >
        Pinned
      </button>
    </div>
  );
}