export interface ITestRunConfiguration {
    pathOfFileToAnalyze?: string;
    pathOfConfigFile?: string;
    ignoreSystemAssemblies?: boolean;
    referenceConflictsAnalyzerCliDownloadUrl?: string;
    workingFolder?: string;
}
