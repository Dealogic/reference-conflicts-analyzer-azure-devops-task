import * as shouldRun from "./shouldRun";
import * as path from "path";
import * as rimraf from "rimraf";

describe("reference conflicts analyzer build task", () => {
    const shouldRunTempFolderPath = path.resolve(__dirname, "shouldRun/reference-conflicts-analyzer");

    after((done: MochaDone) => {
        rimraf.sync(shouldRunTempFolderPath);

        done();
    });

    it(
        "should run",
        shouldRun.executeTest);
});
