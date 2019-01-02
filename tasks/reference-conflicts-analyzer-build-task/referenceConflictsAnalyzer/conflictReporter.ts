import * as fs from "fs";
import * as path from "path";
import { XmlDocument } from "xmldoc";
import * as tl from "azure-pipelines-task-lib/task";

export const reportConflicts = (workingFolder: string) => {
    const dgmlFileContent = fs.readFileSync(path.resolve(workingFolder, "rca.dgml"), {
        encoding: "utf-8"
    });

    const xmlDoc = new XmlDocument(dgmlFileContent);
    const nodes = xmlDoc.childNamed("Nodes");
    nodes.eachChild((child) => {
        if (child.attr.Category === "VersionsConflicted") {
            const commentNode = nodes.childWithAttribute("Id", `${child.attr.Id}..comment`);
            tl.warning(`Version conflict in ${child.attr.Label}. ${commentNode.attr.Label}`);
        } else if (child.attr.Category === "VersionsConflictResolved") {
            const commentNode = nodes.childWithAttribute("Id", `${child.attr.Id}..comment`);
            tl.warning(`Version conflict in ${child.attr.Label} resolved in configuration file. ${commentNode.attr.Label}`);
        } else if (child.attr.Category === "OtherConflict") {
            const commentNode = nodes.childWithAttribute("Id", `${child.attr.Id}..comment`);
            tl.warning(`Other conflict in ${child.attr.Label}. ${commentNode.attr.Label}`);
        }
    });
};
