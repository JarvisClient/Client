// Extend the Window interface to include your custom property
declare global {
    interface Window {
      jarvisConsoleIntervalId: NodeJS.Timeout | null;
    }
  }
  
  // Initialize the property on the window object
  if (typeof window.jarvisConsoleIntervalId === 'undefined') {
    window.jarvisConsoleIntervalId = null;
  }
  
  export function setIntervalId(newIntervalId: NodeJS.Timeout | null) {
    if (window.jarvisConsoleIntervalId !== null) {
      clearInterval(window.jarvisConsoleIntervalId);
    }
    window.jarvisConsoleIntervalId = newIntervalId;
  }
  
  export function getIntervalId(): NodeJS.Timeout | null {
    return window.jarvisConsoleIntervalId;
  }
  
  export function clearIntervalId() {
    if (window.jarvisConsoleIntervalId !== null) {
      clearInterval(window.jarvisConsoleIntervalId);
      window.jarvisConsoleIntervalId = null;
    }
  }
  