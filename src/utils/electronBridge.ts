// Type-safe electron bridge that works in both web and electron environments
interface ElectronBridge {
  ipcRenderer: {
    on: (channel: string, func: (...args: any[]) => void) => void;
    send: (channel: string, ...args: any[]) => void;
    removeAllListeners: (channel: string) => void;
  };
}

// Check if we're running in Electron
const isElectron = 'electron' in window;

// Create a mock bridge for web environment
const webBridge: ElectronBridge = {
  ipcRenderer: {
    on: () => {},
    send: () => {},
    removeAllListeners: () => {},
  },
};

// Export the appropriate bridge based on environment
export const electronBridge: ElectronBridge = isElectron 
  ? (window as any).electron 
  : webBridge;