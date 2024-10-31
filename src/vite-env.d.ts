/// <reference types="vite/client" />

interface Window {
  electron: {
    ipcRenderer: {
      on: (channel: string, func: (...args: any[]) => void) => void;
      send: (channel: string, ...args: any[]) => void;
      removeAllListeners: (channel: string) => void;
    };
  };
}