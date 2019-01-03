import * as child_process from "child_process";
import * as path from "path";

export const downloadDgmlToPngCli = async (workingFolder: string) => {
    return new Promise((resolve, reject) => {
        const commandToExecute = `"${path.resolve(workingFolder, "nuget.exe")}" install DgmlImage -Version 1.0.0 -OutputDirectory "${workingFolder}"`;
        console.log(`Executing command: ${commandToExecute}`);
        child_process.exec(commandToExecute, (error: Error, stdout: string) => {
            if (error) {
                reject(error);
            }

            console.log(stdout);

            resolve();
        });
    });
};
