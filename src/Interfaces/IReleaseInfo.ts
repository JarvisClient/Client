export interface ReleaseInfo {
    notes: string;
    platforms: {
      [platform: string]: {
        signature: string;
        url: string;
      };
    };
    pub_date: string;
    version: string;
    error?: string;
  }
