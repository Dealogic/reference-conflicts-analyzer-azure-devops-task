import * as path from "path";
import { MockTestRunner } from "azure-pipelines-task-lib/mock-test";
import { assert } from "chai";
import * as fs from "fs";
import * as os from "os";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export function executeTest(done: MochaDone): void {
    // tslint:disable-next-line:no-invalid-this
    this.timeout(60000);

    const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldRun.js");
    const testRunner = new MockTestRunner(testPath);

    testRunner.run();
    console.log(testRunner.stdout);

    done();
}
