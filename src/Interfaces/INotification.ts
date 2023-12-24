import { FeatureButtonProps } from "./IFeatureButtonProps";

export interface Notification {
    id: number;
    title: string;
    message: string;
    featureButtonData: FeatureButtonProps;
    variant: string; // Add the "variant" property
  }
  