export interface TestCase {
    testActions: string[];
    age: number;
    className: string;
    duration: number;
    errorDetails: string | null; 
    errorStackTrace: string | null; 
    failedSince: number;
    name: string;
    skipped: boolean;
    skippedMessage: string | null;
    status: string;
    stderr: string | null; 
    stdout: string | null;
}

export interface TestSuite {
    cases: TestCase[];
    duration: number;
    enclosingBlockNames: string[];
    enclosingBlocks: string[];
    id: string | null; 
    name: string;
    nodeId: string | null; 
    stderr: string | null; 
    stdout: string | null; 
    timestamp: string | null; 
}

export interface TestResult {
    _class: string;
    testActions: string[]; 
    duration: number;
    empty: boolean;
    failCount: number;
    passCount: number;
    skipCount: number;
    suites: TestSuite[];
}
