export interface JenkinsBuildParameter {
    _class: string;
    name: string;
    description?: string;
    value: string;
}

export interface JenkinsBuildCause {
    _class: string;
    shortDescription: string;
    userId?: string;
    userName?: string;
}

export interface JenkinsBuildArtifact {
    displayPath: string;
    fileName: string;
    relativePath: string;
}

export interface JenkinsBuildChangeLogItem {
    _class: string;
    items: unknown;
    kind: string | null;
}

export interface JenkinsBuildAction {
    _class: string;
    parameters?: JenkinsBuildParameter[];
    causes?: JenkinsBuildCause[];
}

export interface IJenkinsBuild {
    _class: string;
    actions: JenkinsBuildAction[];
    artifacts: JenkinsBuildArtifact[];
    building: boolean;
    description: null | string;
    displayName: string;
    duration: number;
    estimatedDuration: number;
    executor: unknown | null ;
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
    color: string;
    changeSet: JenkinsBuildChangeLogItem;
    lastSuccessfulBuild: unknown | unknown[];
    culprits: unknown[]; 
    healthReport: unknown[]; 
}

export interface FeatureButton {
	name: string;
	purpose: string;
	titleBar: string;
	hidden?: boolean;
}
