import { getPersonalAccessTokenHandler, WebApi } from "azure-devops-node-api";
import * as tl from "azure-pipelines-task-lib/task";

const getWebApi = () => {
    const token = tl.getVariable("System.AccessToken");
    const authHandler = getPersonalAccessTokenHandler(token);
    const colllectionUri = tl.getVariable("System.TeamFoundationCollectionUri");

    return new WebApi(colllectionUri, authHandler);
};

export const getAttachmentUrl = async (taskDisplayName: string) => {
    const webApi = getWebApi();
    const buildApi = await webApi.getBuildApi();

    const projectId = tl.getVariable("System.TeamProjectId");
    const buildId = tl.getVariable("Build.BuildId");

    let attachment = null;

    while (!attachment) {
        const attachments = await buildApi.getAttachments(projectId, Number(buildId), "rca-result");
        attachment = attachments.find((a) => a.name === taskDisplayName);
    }

    return attachment._links.self.href;
};
