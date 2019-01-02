import runTestTask from "./shared/testTaskRunner";
import * as path from "path";

runTestTask({
    workingFolder: path.resolve(__dirname, "..", "shouldRun"),
    pathOfFileToAnalyze: path.resolve(__dirname, "..", "shouldRun/ConsumerOfLibraries.exe"),
    pathOfConfigFile: path.resolve(__dirname, "..", "shouldRun/ConsumerOfLibraries.exe.config")
});
