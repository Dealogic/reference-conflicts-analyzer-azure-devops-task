import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import * as unzipper from "unzipper";

export const downloadReferenceConflictsAnalyzerCli = async (referenceConflictsAnalyzerCliDownloadUrl: string, workingFolder: string) => {
    const rcaCliExeFileName = path.resolve(workingFolder, "rca-cli.zip");
    const rcaCliExeFile = fs.createWriteStream(rcaCliExeFileName);

    console.log(`Downloading reference conflicts analyzer from '${referenceConflictsAnalyzerCliDownloadUrl}'`);

    return new Promise((resolve) => {
        https.get(referenceConflictsAnalyzerCliDownloadUrl, (rcaCliDownloadRespsone: http.IncomingMessage) => {
            https.get(rcaCliDownloadRespsone.headers["location"].toString(), (redirectionResponse: http.IncomingMessage) => {
                const stream = redirectionResponse.pipe(rcaCliExeFile);
                stream.on("close", () => {
                    const zipFile = path.resolve(workingFolder, rcaCliExeFileName);
                    const zipFileReadStream = fs.createReadStream(zipFile).pipe(unzipper.Extract({ path: workingFolder }));

                    zipFileReadStream.on("close", () => {
                        console.log(`Download is completed.`);
                        resolve();
                    });
                });
            });
        });
    });
};
