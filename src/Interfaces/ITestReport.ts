export interface TestCase {
    name: string;
    status: "PASSED" | "FAILED";
    skipped: boolean;
    className: string;
    failedSince?: string;
    duration?: number;
    stdout?: string;
    errorDetails?: string;
    skippedMessage?: string;
    errorStackTrace?: string;
}

export interface TestSuite {
    cases: TestCase[];
    name: string;
}