import * as fs from "fs";
import * as path from "path";
import { XmlDocument } from "xmldoc";
import * as tl from "azure-pipelines-task-lib/task";

export const reportConflicts = (workingFolder: string, treatConflictsAs: string) => {
    const dgmlFileContent = fs.readFileSync(path.resolve(workingFolder, "rca.dgml"), {
        encoding: "utf-8"
    });

    const xmlDoc = new XmlDocument(dgmlFileContent);
    const nodes = xmlDoc.childNamed("Nodes");
    nodes.eachChild((child) => {
        const messages = [];

        if (child.attr.Category === "VersionsConflicted") {
            const commentNode = nodes.childWithAttribute("Id", `${child.attr.Id}..comment`);
            messages.push(`Version conflict in ${child.attr.Label}. ${commentNode.attr.Label}`);
        } else if (child.attr.Category === "VersionsConflictResolved") {
            const commentNode = nodes.childWithAttribute("Id", `${child.attr.Id}..comment`);
            messages.push(`Version conflict in ${child.attr.Label} resolved in configuration file. ${commentNode.attr.Label}`);
        } else if (child.attr.Category === "OtherConflict") {
            const commentNode = nodes.childWithAttribute("Id", `${child.attr.Id}..comment`);
            messages.push(`Other conflict in ${child.attr.Label}. ${commentNode.attr.Label}`);
        }

        for (const message of messages) {
            if (treatConflictsAs === "info") {
                console.log(message);
            } else if (treatConflictsAs === "errors") {
                tl.error(message);
            } else {
                tl.warning(message);
            }
        }
    });
};
