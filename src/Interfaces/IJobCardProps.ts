export interface JobCardProps {
    displayName?: string;
    description?: string;
    result?: "SUCCESS" | "UNSTABLE" | "FAILURE" | "ABORTED" | null;
    active?: boolean;
    buildNumber?: number;
    pinned?: boolean;
    notification_set?: boolean;
    onClick?: () => void;
  }