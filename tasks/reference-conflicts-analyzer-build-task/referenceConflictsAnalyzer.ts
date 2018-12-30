import * as child_process from "child_process";
import * as filenamify from "filenamify";

const generateAnalyzeReferenceConflictsResultFilename = (taskDisplayName: string) => {
    const fixedTaskDisplayName = taskDisplayName.replace(/\[/g, "(").replace(/\]/g, ")").trim();

    return filenamify(fixedTaskDisplayName).trim();
};

export const analyzeReferenceConflicts = async (taskDisplayName: string, fileToAnalyze: string, ignoreSystemAssemblies: boolean, configFile?: string) => {
    console.log("Running reference conflicts analyzer...");

    const resultFileName = generateAnalyzeReferenceConflictsResultFilename(taskDisplayName);

    let commandToExecute = `rca-cli.exe -file '${fileToAnalyze}'`;

    if (!configFile) {
        commandToExecute = `${commandToExecute} -config '${configFile}'`;
    }

    if (!ignoreSystemAssemblies) {
        commandToExecute = `${commandToExecute} -ignoreSystemAssemblies ${ignoreSystemAssemblies}`;
    }

    commandToExecute = `${commandToExecute} -output '${resultFileName}'`;

    return child_process.exec(commandToExecute, (error: Error, stdout: string) => {
        if (error) {
            throw error;
        }

        console.log(stdout);

        return resultFileName;
    });
};
