import * as https from "https";
import * as http from "http";
import * as fs from "fs";

export const downloadReferenceConflictsAnalyzerCli = async (referenceConflictsAnalyzerCliDownloadUrl: string) => {
    const rcaCliExeFileName = "rca-cli.zip";
    const rcaCliExeFile = fs.createWriteStream(rcaCliExeFileName);

    console.log(`Downloading reference conflicts analyzer from '${referenceConflictsAnalyzerCliDownloadUrl}'`);
    https.get(referenceConflictsAnalyzerCliDownloadUrl, (rcaCliDownloadRespsone: http.IncomingMessage) => {
        https.get(rcaCliDownloadRespsone.headers["location"].toString(), (redirectionResponse: http.IncomingMessage) => {
            const stream = redirectionResponse.pipe(rcaCliExeFile);
            stream.on("close", () => {
                console.log(`Download is completed.`);

                return;
            });
        });
    });
};
