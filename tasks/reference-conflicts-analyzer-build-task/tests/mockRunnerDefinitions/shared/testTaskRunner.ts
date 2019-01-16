import { ITestRunConfiguration } from "./ITestRunConfiguration";
import { getAttachmentUrl } from "../../../referenceConflictsAnalyzer/attachmentsHelper";
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
    taskMockRunner.setInput("diagramAttachmentEnabled", "true");
    taskMockRunner.setInput("diagramZoomLevel", "1");
    taskMockRunner.setInput("treatVersionConflictsAs", "warnings");
    taskMockRunner.setInput("treatResolvedVersionConflictsAs", "warnings");
    taskMockRunner.setInput("treatOtherConflictsAs", "warnings");
    taskMockRunner.setInput("treatUnusedAssembliesAs", "warnings");
    taskMockRunner.setInput("treatMissedAssembliesAs", "warnings");

    if (testRunConfiguration.workingFolder) {
        taskMockRunner.setInput("workingFolder", testRunConfiguration.workingFolder);
    }

    if (testRunConfiguration.ignoreSystemAssemblies) {
        taskMockRunner.setInput("ignoreSystemAssemblies", testRunConfiguration.ignoreSystemAssemblies.toString());
    } else {
        taskMockRunner.setInput("ignoreSystemAssemblies", "true");
    }

    taskMockRunner.registerMockExport("uploadFile", () => {
        console.log("Uploading file...");
    });

    taskMockRunner.registerMockExport("addAttachment", () => {
        console.log("Adding attachment...");
    });

    taskMockRunner.registerMock("./attachmentsHelper", {
        getAttachmentUrl: () => {
            console.log("Getting attachment url...");
        }
    });

    taskMockRunner.run();
};

export default runTestTask;
