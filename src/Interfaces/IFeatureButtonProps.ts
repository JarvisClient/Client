export interface FeatureButtonProps {
  title: string;
  description: string;
  secondaryDescription?: string;
  titleBar: string;
  bg_color: string;
  icon_color: string;
  icon: any;
  secondaryIcon?: React.ElementType;
  purpose: "JOB" | "PROJECT" | "BOTH";
  hidden?: boolean;
}

export interface FeautreButton_S {
  name: string;
}

export interface FeatureButtonComponentProps {
	active?: boolean;
	buildNumber: number | null;
	onClick?: () => void;
	feature: string;
	useSecondaryIcon?: boolean;
}