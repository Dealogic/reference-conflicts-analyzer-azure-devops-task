import * as fs from "fs";
import * as shouldRun from "./shouldRun";
import * as path from "path";

describe("reference conflicts analyzer build task", () => {
    const shouldRunFolderPath = path.resolve(__dirname, "shouldRun");

    before((done: MochaDone) => {
        fs.exists(shouldRunFolderPath, (exists: boolean) => {
            if (!exists) {
                fs.mkdir(shouldRunFolderPath, done);
            }

            done();
        });
    });

    after((done: MochaDone) => {
        const filesToDelete = [
            path.resolve(shouldRunFolderPath, "rca-cli.zip")
        ];

        const foldersToDelete = [
            shouldRunFolderPath
        ];

        for (const fileToDelete of filesToDelete) {
            if (fs.existsSync(fileToDelete)) {
                fs.unlinkSync(fileToDelete);
            }
        }

        for (const folderToDelete of foldersToDelete) {
            if (fs.existsSync(folderToDelete)) {
                fs.rmdirSync(folderToDelete);
            }
        }

        done();
    });

    it(
        "should run",
        shouldRun.executeTest);
});
