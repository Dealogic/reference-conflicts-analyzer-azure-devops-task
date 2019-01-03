import * as https from "https";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";

export const downloadNuget = async (workingFolder: string) => {
    console.log("Downloading nuget.exe...");

    return new Promise((resolve, reject) => {
        const nugetExeFile = fs.createWriteStream(path.resolve(workingFolder, "nuget.exe"));
        https.get("https://dist.nuget.org/win-x86-commandline/latest/nuget.exe", (response: http.IncomingMessage) => {
            if (response.statusCode !== 200) {
                reject("Could not download nuget.exe.");
            }

            const stream = response.pipe(nugetExeFile);
            stream.on("close", () => {
                console.log(`Download is completed.`);

                resolve();
            });
        });
    });
};
