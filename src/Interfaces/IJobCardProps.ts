export interface JobCardProps {
    displayName?: string;
    description?: string;
    result?: string;
    active?: boolean;
    buildNumber?: number;
    pinned?: boolean;
    notification_set?: boolean;
    onClick?: () => void;
  }