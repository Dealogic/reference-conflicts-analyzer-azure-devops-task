import * as child_process from "child_process";

export const downloadDgmlToPngCli = async (workingFolder: string) => {
    return new Promise((resolve) => {
        child_process.exec(`nuget install DgmlImage -Version 1.0.0 -OutputDirectory ${workingFolder}`, (error: Error, stdout: string) => {
            resolve();
        });
    });
};
