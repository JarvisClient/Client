import { FeatureButtonProps } from "./IFeatureButtonProps";

export interface Notification {
    id: number;
    title: string;
    message: string;
    featureButtonData: FeatureButtonProps;
    variant: string;
  }
  

export interface BannerNotificcation {
    id: number;
    title: string;
    message: string;
    permanent: boolean;
  }