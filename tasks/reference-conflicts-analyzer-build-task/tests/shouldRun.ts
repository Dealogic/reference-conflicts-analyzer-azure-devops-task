import * as path from "path";
import { MockTestRunner } from "azure-pipelines-task-lib/mock-test";
import { assert } from "chai";

const mockRunnerDefinitions = "mockRunnerDefinitions";

export function executeTest(done: MochaDone): void {
    // tslint:disable-next-line:no-invalid-this
    this.timeout(60000);

    const testPath = path.join(__dirname, mockRunnerDefinitions, "shouldRun.js");
    const testRunner = new MockTestRunner(testPath);

    testRunner.run();

    assert.isNotTrue(testRunner.failed, testRunner.stdout);
    assert.equal(
        testRunner.warningIssues[0],
        // tslint:disable-next-line:max-line-length
        "Different versions of the assembly called 'LibraryA' are referenced by other assembiles. Version 2.0.0.0 is used by 'FirstUserOfLibraryA'. Version 1.2.0.0 is used by 'SecondUserOfLibraryA'.",
        testRunner.stdout);

    done();
}
