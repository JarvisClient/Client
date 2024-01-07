export interface ReleaseInfo {
  notes: string;
  platforms: {
    "darwin-aarch64": PlatformDetails;
    "darwin-x86_64": PlatformDetails;
    "linux-x86_64": PlatformDetails;
    "windows-x86_64": PlatformDetails;
  };
  pub_date: string;
  version: string;
  error?: string;
}

export interface PlatformDetails {
  signature: string;
  url: string;
}