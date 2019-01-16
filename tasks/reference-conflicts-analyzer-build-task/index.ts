import * as tl from "azure-pipelines-task-lib/task";
import * as fs from "fs";
import * as path from "path";
import { downloadReferenceConflictsAnalyzerCli } from "./referenceConflictsAnalyzerCliDownloader";
import { analyzeReferenceConflicts } from "./referenceConflictsAnalyzer";
import * as rimraf from "rimraf";
import { downloadDgmlToPngCli } from "./dgmlToImageCliDownloader";
import * as filenamify from "filenamify";
import { downloadNuget } from "./nugetDownloader";

const listDirectoryItems = (dir: string) => {
    console.log(dir);

    if (fs.lstatSync(dir).isDirectory()) {
        const items = fs.readdirSync(dir);
        for (const item of items) {
            listDirectoryItems(path.resolve(dir, item));
        }
    }
};

async function run(): Promise<void> {
    let taskDisplayName = tl.getVariable("task.displayname");

    if (!taskDisplayName) {
        taskDisplayName = "reference-conflicts-analyzer";
    }

    console.log(taskDisplayName);

    try {
        const pathOfFileToAnalyze = tl.getPathInput("pathOfFileToAnalyze", true);
        const pathOfConfigFile = tl.getPathInput("pathOfConfigFile", false);
        const ignoreSystemAssemblies = tl.getBoolInput("ignoreSystemAssemblies", true);
        const diagramAttachmentEnabled = tl.getBoolInput("diagramAttachmentEnabled", true);
        const diagramZoomLevel = Number(tl.getInput("diagramZoomLevel", true));
        const treatVersionConflictsAs = tl.getInput("treatVersionConflictsAs", true);
        const treatResolvedVersionConflictsAs = tl.getInput("treatResolvedVersionConflictsAs", true);
        const treatOtherConflictsAs = tl.getInput("treatOtherConflictsAs", true);
        const treatUnusedAssembliesAs = tl.getInput("treatUnusedAssembliesAs", true);
        const treatMissedAssembliesAs = tl.getInput("treatMissedAssembliesAs", true);
        const workingFolder = tl.getPathInput("workingFolder", false);
        const referenceConflictsAnalyzerCliDownloadUrl = tl.getInput("referenceConflictsAnalyzerCliDownloadUrl", true);

        console.log(`pathOfFileToAnalyze: ${pathOfFileToAnalyze}`);
        console.log(`pathOfConfigFile: ${pathOfConfigFile}`);
        console.log(`ignoreSystemAssemblies: ${ignoreSystemAssemblies}`);
        console.log(`diagramAttachmentEnabled: ${diagramAttachmentEnabled}`);
        console.log(`diagramZoomLevel: ${diagramZoomLevel}`);
        console.log(`treatVersionConflictsAs: ${treatVersionConflictsAs}`);
        console.log(`treatResolvedVersionConflictsAs: ${treatResolvedVersionConflictsAs}`);
        console.log(`treatOtherConflictsAs: ${treatOtherConflictsAs}`);
        console.log(`treatUnusedAssembliesAs: ${treatUnusedAssembliesAs}`);
        console.log(`treatMissedAssembliesAs: ${treatMissedAssembliesAs}`);
        console.log(`workingFolder: ${workingFolder}`);
        console.log(`referenceConflictsAnalyzerCliDownloadUrl: ${referenceConflictsAnalyzerCliDownloadUrl}`);

        tl.cd(workingFolder);
        process.chdir(workingFolder);

        const tempWorkingFolder = path.resolve(workingFolder, filenamify(taskDisplayName));

        if (fs.existsSync(tempWorkingFolder)) {
            rimraf.sync(tempWorkingFolder);
        }

        fs.mkdirSync(tempWorkingFolder);

        await downloadReferenceConflictsAnalyzerCli(referenceConflictsAnalyzerCliDownloadUrl, tempWorkingFolder);

        if (diagramAttachmentEnabled) {
            await downloadNuget(tempWorkingFolder);
            await downloadDgmlToPngCli(tempWorkingFolder);
        }

        await analyzeReferenceConflicts(
            tempWorkingFolder,
            taskDisplayName,
            treatVersionConflictsAs,
            treatResolvedVersionConflictsAs,
            treatOtherConflictsAs,
            treatUnusedAssembliesAs,
            treatMissedAssembliesAs,
            pathOfFileToAnalyze,
            ignoreSystemAssemblies,
            diagramAttachmentEnabled,
            diagramZoomLevel,
            pathOfConfigFile);
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, `${taskDisplayName} failed`);
        tl.error(err);

        console.log(err);
    }
}

run();
