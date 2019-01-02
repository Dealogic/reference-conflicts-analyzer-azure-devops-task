import * as tl from "azure-pipelines-task-lib/task";
import * as fs from "fs";
import * as path from "path";
import { downloadReferenceConflictsAnalyzerCli } from "./referenceConflictsAnalyzerCliDownloader";
import { analyzeReferenceConflicts } from "./referenceConflictsAnalyzer";
import * as rimraf from "rimraf";
import { downloadDgmlToPngCli } from "./dgmlToPngCliDownloader";
import * as filenamify from "filenamify";

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
        const referenceConflictsAnalyzerCliDownloadUrl = tl.getInput("referenceConflictsAnalyzerCliDownloadUrl", true);
        const workingFolder = tl.getPathInput("workingFolder", false);

        console.log(`pathOfFileToAnalyze: ${pathOfFileToAnalyze}`);
        console.log(`pathOfConfigFile: ${pathOfConfigFile}`);
        console.log(`ignoreSystemAssemblies: ${ignoreSystemAssemblies}`);
        console.log(`referenceConflictsAnalyzerCliDownloadUrl: ${referenceConflictsAnalyzerCliDownloadUrl}`);
        console.log(`workingFolder: ${workingFolder}`);

        tl.cd(workingFolder);
        process.chdir(workingFolder);

        const tempWorkingFolder = path.resolve(workingFolder, filenamify(taskDisplayName));

        if (fs.existsSync(tempWorkingFolder)) {
            rimraf.sync(tempWorkingFolder);
        }

        fs.mkdirSync(tempWorkingFolder);

        await downloadReferenceConflictsAnalyzerCli(referenceConflictsAnalyzerCliDownloadUrl, tempWorkingFolder);
        await downloadDgmlToPngCli(tempWorkingFolder);
        await analyzeReferenceConflicts(tempWorkingFolder, pathOfFileToAnalyze, ignoreSystemAssemblies, pathOfConfigFile);
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, `${taskDisplayName} failed`);
        tl.error(err);

        console.log(err);
    }
}

run();
