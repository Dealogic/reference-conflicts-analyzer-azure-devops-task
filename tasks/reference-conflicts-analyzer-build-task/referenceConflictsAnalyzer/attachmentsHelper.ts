import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";
import * as tl from "azure-pipelines-task-lib/task";

const getWebApi = () => {
    const token = tl.getVariable("System.AccessToken");
    const authHandler = getPersonalAccessTokenHandler(token);
    const collectionUri = tl.getVariable("System.TeamFoundationCollectionUri");

    console.log(`Connecting to Web API '${collectionUri}'.`);
    return new WebApi(collectionUri, authHandler);
};

const getAttachmentForType = async (taskDisplayName: string, attachmentName: string) => {
    try {
        const webApi = getWebApi();
        const buildApi = await webApi.getBuildApi();

        const projectId = tl.getVariable("System.TeamProjectId");
        const buildId = tl.getVariable("Build.BuildId");

        let attachment = null;

        while (!attachment) {
                console.log(`Trying to get attachments from for project id: '${projectId}' and build id: '${buildId}'.`);
                const attachments = await buildApi.getAttachments(projectId, Number(buildId), taskDisplayName);

                attachment = attachments.find((a) => a.name === attachmentName);

                if (!attachment) {
                    delay(500);
                }
        }

        return attachment._links.self.href;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const delay = async (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getDgmlFileAttachmentUrl = async (taskDisplayName: string) => {
    return await getAttachmentForType(taskDisplayName, "rca-dgml-result");
};

export const getImageAttachmentUrl = async (taskDisplayName: string) => {
    return await getAttachmentForType(taskDisplayName, "rca-image-result");
};
