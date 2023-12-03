interface Parameter {
    _class: string;
    name: string;
    value: string | boolean;
}

interface Cause {
    _class: string;
    shortDescription: string;
    userId?: string;
    userName?: string;
}

interface Artifact {
    displayPath: string;
    fileName: string;
    relativePath: string;
}

interface ChangeLogItem {
    _class: string;
    items: any[]; // You can specify a more specific type if needed
    kind: string | null;
}

export interface IBuildData {
    _class: string;
    actions: Array<{
        _class: string;
        parameters?: Parameter[];
        causes?: Cause[];
    }>;
    artifacts: Artifact[];
    building: boolean;
    description: null | string;
    displayName: string;
    duration: number;
    estimatedDuration: number;
    executor: null | any; // You can specify a more specific type if needed
    fullDisplayName: string;
    id: string;
    inProgress: boolean;
    keepLog: boolean;
    number: number;
    queueId: number;
    result: string;
    timestamp: number;
    url: string;
    builtOn: string;
    changeSet: ChangeLogItem;
    culprits: any[]; // You can specify a more specific type if needed
}

export interface FeatureButton {
	name: string;
	purpose: string;
	titleBar: string;
	hidden?: boolean;
}