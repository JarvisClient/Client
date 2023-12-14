export interface JenkinsInfo {
    _class: string;
    assignedLabels: { name: string }[];
    mode: string;
    nodeDescription: string;
    nodeName: string;
    numExecutors: number;
    description: string | null;
    jobs: JenkinsJob[];
    overallLoad: Record<string, unknown>; // You can define a specific type if needed
    primaryView: {
      _class: string;
      name: string;
      url: string;
    };
    quietDownReason: string | null;
    quietingDown: boolean;
    slaveAgentPort: number;
    unlabeledLoad: {
      _class: string;
    };
    url: string;
    useCrumbs: boolean;
    useSecurity: boolean;
    views: {
      _class: string;
      name: string;
      url: string;
    }[];
  }
  
export interface JenkinsJob {
    _class: string;
    name: string;
    url: string;
    color: string;
    favorite?: boolean;
    projectData?: any
  }
  