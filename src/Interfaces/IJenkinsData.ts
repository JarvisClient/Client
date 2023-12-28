export interface JenkinsData {
    _class: string;
    assignedLabels: JenkinsDataLabel[];
    mode: string;
    nodeDescription: string;
    nodeName: string;
    numExecutors: number;
    description: string | null;
    jobs: JenkinsDataJob[];
    overallLoad: JenkinsDataOverallLoad;
    primaryView: JenkinsDataView;
    quietDownReason: string | null;
    quietingDown: boolean;
    slaveAgentPort: number;
    unlabeledLoad: JenkinsDataUnlabeledLoad;
    url: string;
    useCrumbs: boolean;
    useSecurity: boolean;
    views: JenkinsDataView[];
}

export interface JenkinsDataLabel {
    name: string;
}

export interface JenkinsDataJob {
    _class: string;
    name: string;
    url: string;
    color: string;
    favorite?: boolean;
}

export interface JenkinsDataOverallLoad {
    // Add specific properties for overallLoad if available
}

export interface JenkinsDataView {
    _class: string;
    name: string;
    url: string;
}

export interface JenkinsDataUnlabeledLoad {
    _class: string;
    // Add specific properties for unlabeledLoad if available
}

export interface JenkinsDataJobMultibranch {
    _class: string;
    name: string;
    url: string;
    color: string;
    favorite?: boolean;
    jobs: JenkinsData[];
}