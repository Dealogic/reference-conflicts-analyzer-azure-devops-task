import * as https from "https";
import * as http from "http";
import * as fs from "fs";

export const downloadNuget = async () => {
    console.log("Downloading nuget.exe...");

    const nugetExeFile = fs.createWriteStream("nuget.exe");
    https.get("https://dist.nuget.org/win-x86-commandline/latest/nuget.exe", (response: http.IncomingMessage) => {
        if (response.statusCode !== 200) {
            throw new Error("Could not download nuget.exe.");
        }

        const stream = response.pipe(nugetExeFile);
        stream.on("close", () => {
            console.log(`Download is completed.`);

            return;
        });
    });
};
