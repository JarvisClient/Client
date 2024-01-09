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

export interface JenkinsBuildChangeLogChangeSet {
    _class: string;
    items: JenkinsBuildchangeLogItem[];
    kind: string | null;
}

export interface JenkinsBuildchangeLogItem {
    _class: string;
    affectedPaths: string[];
    commitId: string;
    timestamp: number;
    author: JenkinsBuildchangeLogAuthor;
    authorEmail: string;
    comment: string;
    date: string;
    id: string;
    msg: string;
    paths: JenkinsBuildchangeLogPath[];
}

export interface JenkinsBuildchangeLogAuthor {
    absoluteUrl: string;
    fullName: string;
}

export interface JenkinsBuildchangeLogPath {
    editType: string;
    file: string;
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
    result: "SUCCESS" | "UNSTABLE" | "FAILURE" | "ABORTED" | null;
    timestamp: number;
    url: string;
    builtOn: string;
    color: string;
    changeSet: JenkinsBuildChangeLogChangeSet;
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
