import tl = require("azure-pipelines-task-lib/task");

async function run(): Promise<void> {
    let taskDisplayName = tl.getVariable("task.displayname");

    if (!taskDisplayName) {
        taskDisplayName = "reference-conflicts-analyzer";
    }

    console.log(taskDisplayName);

    try {
        console.log("Hello");
    } catch (err) {
        tl.setResult(tl.TaskResult.Failed, `${taskDisplayName} failed`);
        tl.error(err);

        console.log(err);
    }
}

run();
