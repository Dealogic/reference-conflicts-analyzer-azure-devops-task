import * as fs from "fs";
import * as path from "path";
import { getImageAttachmentUrl, getDgmlFileAttachmentUrl } from "./attachmentsHelper";
import * as tl from "azure-pipelines-task-lib/task";
import * as os from "os";

export const generateBuildSummary = async (taskDisplayName: string, workingFolder: string) => {
    const imageAttachmentUrl = await getImageAttachmentUrl(taskDisplayName);
    const dgmlFileAttachmentUrl = await getDgmlFileAttachmentUrl(taskDisplayName);

    let summary = "[The generated `dgml` file can be downloaded from ";
    summary += `here](${dgmlFileAttachmentUrl})`;
    summary += os.EOL;
    summary += `<img alt="${taskDisplayName}" src="${imageAttachmentUrl}" />`;
    fs.writeFileSync(path.resolve(workingFolder, "rca.md"), summary);

    tl.addAttachment("Distributedtask.Core.Summary", taskDisplayName, path.resolve(workingFolder, "rca.md"));
};
