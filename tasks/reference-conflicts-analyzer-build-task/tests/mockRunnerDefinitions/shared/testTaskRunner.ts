import { ITestRunConfiguration } from "./ITestRunConfiguration";
import createTaskMockRunner from "./taskMockRunnerFactory";

const runTestTask = (testRunConfiguration: ITestRunConfiguration) => {
    const taskMockRunner = createTaskMockRunner();

    if (!testRunConfiguration.referenceConflictsAnalyzerCliDownloadUrl) {
        testRunConfiguration.referenceConflictsAnalyzerCliDownloadUrl
            = "https://github.com/marss19/reference-conflicts-analyzer/releases/download/v.1.0.7/ReferenceConflictAnalyzer.CommandLine.1.0.7.zip";
    }

    taskMockRunner.setInput("pathOfFileToAnalyze", testRunConfiguration.pathOfFileToAnalyze);
    taskMockRunner.setInput("pathOfConfigFile", testRunConfiguration.pathOfConfigFile);
    taskMockRunner.setInput("referenceConflictsAnalyzerCliDownloadUrl", testRunConfiguration.referenceConflictsAnalyzerCliDownloadUrl);
    taskMockRunner.setInput("treatConflictsAs", "warnings");

    if (testRunConfiguration.workingFolder) {
        taskMockRunner.setInput("workingFolder", testRunConfiguration.workingFolder);
    }

    if (testRunConfiguration.ignoreSystemAssemblies) {
        taskMockRunner.setInput("ignoreSystemAssemblies", testRunConfiguration.ignoreSystemAssemblies.toString());
    } else {
        taskMockRunner.setInput("ignoreSystemAssemblies", "true");
    }

    taskMockRunner.run();
};

export default runTestTask;
