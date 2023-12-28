export interface IJenkinsProject {
    _class: string;
    actions: IJenkinsProjectAction[];
    description: string;
    displayName: string;
    displayNameOrNull: string | null;
    fullDisplayName: string;
    fullName: string;
    name: string;
    url: string;
    buildable: boolean;
    builds: IJenkinsProjectBuild[];
    color: string;
    firstBuild: IJenkinsProjectBuild;
    healthReport: IJenkinsProjectHealthReport[];
    inQueue: boolean;
    keepDependencies: boolean;
    lastBuild: IJenkinsProjectBuild;
    lastCompletedBuild: IJenkinsProjectBuild;
    lastFailedBuild: IJenkinsProjectBuild | null;
    lastStableBuild: IJenkinsProjectBuild;
    lastSuccessfulBuild: IJenkinsProjectBuild;
    lastUnstableBuild: IJenkinsProjectBuild | null;
    lastUnsuccessfulBuild: IJenkinsProjectBuild;
    nextBuildNumber: number;
    property: IJenkinsProjectProperty[];
    queueItem: unknown | null;
    concurrentBuild: boolean;
    disabled: boolean;
    downstreamProjects: unknown[];
    labelExpression: string | null;
    scm: IJenkinsProjectSCM;
    upstreamProjects: unknown[];
}

export interface IJenkinsProjectAction {
    _class: string;
    parameterDefinitions?: IJenkinsProjectParameterDefinition[];
}

export interface IJenkinsProjectParameterDefinition {
    _class: string;
    defaultParameterValue: IJenkinsProjectParameterValue;
    description: string | null;
    name: string;
    type: string;
    value?: string;
    choices?: string[];
}

export interface IJenkinsProjectParameterValue {
    _class: string;
    name?: string;
    value: unknown;
}

export interface IJenkinsProjectBuild {
    _class: string;
    number: number;
    url: string;
}

export interface IJenkinsProjectHealthReport {
    description: string;
    iconClassName: string;
    iconUrl: string;
    score: number;
}

export interface IJenkinsProjectProperty {
    _class: string;
    parameterDefinitions: IJenkinsProjectParameterDefinition[];
}

export interface IJenkinsProjectSCM {
    _class: string;
}

// refernece 
export interface IJenkinsProjectMultibranch extends IJenkinsProject {
    jobs?: IJenkinsProject[];
}