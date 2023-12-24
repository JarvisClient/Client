export interface FeatureButtonProps {
  title: string;
  titleBar: string;
  bg_color: string;
  icon_color: string;
  icon: React.ElementType;
  secondaryIcon?: React.ElementType;
  purpose: "JOB" | "PROJECT" | "BOTH";
  hidden?: boolean;
}

export interface FeautreButton_S {
  name: string;
}