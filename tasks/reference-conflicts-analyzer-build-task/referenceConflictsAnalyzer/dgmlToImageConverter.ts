import * as path from "path";
import * as child_process from "child_process";
import * as tl from "azure-pipelines-task-lib/task";
import * as fs from "fs";
import { getAttachmentUrl } from "./attachmentsHelper";

const executeDgmlToImageConverterCommand = async (workingFolder: string) => {
    const commandToExecute =
        `"${path.resolve(workingFolder, "DgmlImage.1.0.0", "tools", "DgmlImage.exe")}" "${path.resolve(workingFolder, "rca.dgml")}" /legend /out:"${workingFolder}"`;

    return new Promise((resolve, reject) => {
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

export const convertDgmlToImage = async (workingFolder: string, taskDisplayName: string) => {
    await executeDgmlToImageConverterCommand(workingFolder);

    tl.addAttachment("rca-result", taskDisplayName, path.resolve(workingFolder, "rca.png"));
    const attachmentUrl = await getAttachmentUrl(taskDisplayName);

    const imageTag = `<img alt="${taskDisplayName}" src="${attachmentUrl}" />`;
    fs.writeFileSync(path.resolve(workingFolder, "rca.md"), imageTag);

    tl.addAttachment("Distributedtask.Core.Summary", taskDisplayName, path.resolve(workingFolder, "rca.md"));
};
