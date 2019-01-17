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

    assert.include(testRunner.stdout, "Adding attachment reference-conflicts-analyzer - rca-image-result.png.", testRunner.stdout);
    assert.include(testRunner.stdout, "Adding attachment reference-conflicts-analyzer - rca-dgml-result.dgml.", testRunner.stdout);
    assert.include(testRunner.stdout, "Uploading file...", testRunner.stdout);

    assert.equal(testRunner.warningIssues.length, 3, testRunner.stdout);
    assert.equal(
        testRunner.warningIssues[0],
        // tslint:disable-next-line:max-line-length
        "Different versions of the assembly called 'LibraryA' are referenced by other assemblies, but resolved by configuration file. Version 1.0.0.0 is used by 'SubprojectA'. Version 2.0.0.0 is used by 'SubprojectB'.",
        testRunner.stdout);

    assert.equal(
        testRunner.warningIssues[1],
        "The assembly 'LibraryC' is missed.",
        testRunner.stdout);

    assert.equal(
        testRunner.warningIssues[2],
        "The assembly 'LibraryD' is unused.",
        testRunner.stdout);

    done();
}
