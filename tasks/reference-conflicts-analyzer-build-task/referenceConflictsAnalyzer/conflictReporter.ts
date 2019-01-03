import * as fs from "fs";
import * as path from "path";
import { XmlDocument, XmlElement } from "xmldoc";
import * as tl from "azure-pipelines-task-lib/task";

export const reportConflicts = (
    workingFolder: string,
    treatVersionConflictsAs: string,
    treatResolvedVersionConflictsAs: string,
    treatOtherConflictsAs: string) => {

    const dgmlFileContent = fs.readFileSync(path.resolve(workingFolder, "rca.dgml"), {
        encoding: "utf-8"
    });

    const xmlDoc = new XmlDocument(dgmlFileContent);
    const nodes = xmlDoc.childNamed("Nodes");
    const visitedNodes: string[] = [];
    const links = xmlDoc.childNamed("Links");

    nodes.eachChild((node) => {
        if (node && node.attr && visitedNodes.indexOf(node.attr.Id) === -1) {
            visitedNodes.push(node.attr.Id);

            let message = "";
            let treatAs = "";

            const dependentLinks: XmlElement[] = [];
            links.eachChild((link) => {
                if (link.attr.Target === node.attr.Id) {
                    dependentLinks.push(link);
                }
            });

            if (node.attr.Category === "VersionsConflicted") {
                message = `Different versions of the assembly called '${node.attr.Label}' are referenced by other assembiles.`;
                treatAs = treatVersionConflictsAs;
            } else if (node.attr.Category === "VersionsConflictResolved") {
                message = `Different versions of the assembly called '${node.attr.Label}' are referenced by other assemblies, but resolved by configuration file.`;
                treatAs = treatResolvedVersionConflictsAs;
            } else if (node.attr.Category === "OtherConflict") {
                message = `Other conflicts because of '${node.attr.Label}' See attached diagram and dgml file in the logs for more details.`;
                treatAs = treatOtherConflictsAs;
            }

            if (node.attr.Category === "VersionsConflicted" || node.attr.Category === "VersionsConflictResolved") {
                for (const dependentLink of dependentLinks) {
                    const dependent = nodes.childWithAttribute("Id", dependentLink.attr.Source);
                    message += ` Version ${dependentLink.attr.Label} is used by '${dependent.attr.Label}'.`;
                }
            }

            if (message) {
                if (treatAs === "errors") {
                    tl.error(message);
                } else if (treatAs === "warnings") {
                    tl.warning(message);
                } else {
                    console.log(message);
                }
            }
        }
    });
};
