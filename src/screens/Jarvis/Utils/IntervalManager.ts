// Extend the Window interface to include your custom property
declare global {
    interface Window {
      jarvisMainIntervalId: NodeJS.Timeout | null;
    }
  }
  
  // Initialize the property on the window object
  if (typeof window.jarvisMainIntervalId === 'undefined') {
    window.jarvisMainIntervalId = null;
  }
  
  export function setIntervalId(newIntervalId: NodeJS.Timeout | null) {
    if (window.jarvisMainIntervalId !== null) {
      clearInterval(window.jarvisMainIntervalId);
    }
    window.jarvisMainIntervalId = newIntervalId;
  }
  
  export function getIntervalId(): NodeJS.Timeout | null {
    return window.jarvisMainIntervalId;
  }
  
  export function clearIntervalId() {
    if (window.jarvisMainIntervalId !== null) {
      clearInterval(window.jarvisMainIntervalId);
      window.jarvisMainIntervalId = null;
    }
  }
  