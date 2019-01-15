# reference conflicts analyzer build task

### A build task for [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/) pipelines made with ♥ by

[![dealogic logo](https://raw.githubusercontent.com/Dealogic/reference-conflicts-analyzer-azure-devops-task/master/dealogic-logo.png)](http://www.dealogic.com)

### to analyze reference conflicts in your .NET applications.

## Special Thanks to
### Mykola Tarasyuk for creating the [Reference Conflicts Analyzer command line tool](https://github.com/marss19/reference-conflicts-analyzer/tree/master/ReferenceConflictAnalyser.VSExtension).
### Chris Lovett for creating the [DgmlImage command line tool](https://www.nuget.org/packages/DgmlImage/).

![build status](https://dealogic.visualstudio.com/Dealogic/_apis/build/status/reference-conflicts-analyzer-azure-devops-task)

## Content

* [Installation](https://marketplace.visualstudio.com/items?itemName=Dealogic.reference-conflicts-analyzer-azure-devops-task#installation)
* [Source Code](https://marketplace.visualstudio.com/items?itemName=Dealogic.reference-conflicts-analyzer-azure-devops-task#source-code)
* [What The Build Step Does](https://marketplace.visualstudio.com/items?itemName=Dealogic.reference-conflicts-analyzer-azure-devops-task#what-the-build-step-does)
* [Usage](https://marketplace.visualstudio.com/items?itemName=Dealogic.reference-conflicts-analyzer-azure-devops-task#usage)
* [Summary of Task Settings](https://marketplace.visualstudio.com/items?itemName=reference-conflicts-analyzer-azure-devops-task#summary-of-task-settings)
* [Release Notes](https://marketplace.visualstudio.com/items?itemName=Dealogic.reference-conflicts-analyzer-azure-devops-task#release-notes)
* [License](https://marketplace.visualstudio.com/items?itemName=Dealogic.reference-conflicts-analyzer-azure-devops-task#license)

## <a id="installation"></a>Installation

Installation can be done using [Azure DevOps MarketPlace](https://marketplace.visualstudio.com/items?itemName=Dealogic.reference-conflicts-analyzer-azure-devops-task).

## <a id="source-code"></a>Source Code

Source code can be found on [GitHub](https://github.com/Dealogic/reference-conflicts-analyzer-azure-devops-task).

## <a id="what-the-build-step-does"></a>What The Build Step Does

This build step is using Mykola Tarasyuk's [reference conflicts analyzer command line tool](https://github.com/marss19/reference-conflicts-analyzer/tree/master/ReferenceConflictAnalyser.VSExtension) to produce a `dgml` file that represents the dependency graph of a .NET application. With using the [DgmlImage command line tool by Chris Lovett](https://www.nuget.org/packages/DgmlImage/) to create an image that can be attached as a build summary section on to the build result page.

## <a id="usage"></a>Usage

Add the following step into your `yaml` build definition:

```
- task: Dealogic.reference-conflicts-analyzer-azure-devops-task.reference-conflicts-analyzer.reference-conflicts-analyzer@1
  displayName: "Reference Conflicts Analyzer"
  inputs:
    pathOfFileToAnalyze: '{The entry point of the .NET application to analyze.}'
```

Reference conflicts are reported as issues (warnings/errors):
![Reported Issues](https://github.com/Dealogic/reference-conflicts-analyzer-azure-devops-task/raw/master/screenshots/IssuesAreReported.png)

Dependency graph is published as a diagram onto the build summary page:
![Dependency Graph](https://github.com/Dealogic/reference-conflicts-analyzer-azure-devops-task/raw/master/screenshots/DiagramOnBuildResult.png)

See the next section for additional settings.

## <a id="summary-of-task-settings"></a>Summary of Task Settings

Name | Required | Default Value | Description
--- | :---: | --- | ---
pathOfFileToAnalyze | true | | The entry point of the .NET application to analyze.
pathOfConfigFile | false | | The location of the configuration file that can contain assembly binding redirections.
ignoreSystemAssemblies | true | true | Ignore the system assemblies from the analysis. By default those won't be included.
treatVersionConflictsAs | true | warnings | How the version conflicts are reported. By default every version conflicts are reported as warnings.
treatResolvedVersionConflictsAs | true | warnings | How the resolved version conflicts are reported. By default every version conflicts that are resolved in a configuration file are reported as warnings.
treatOtherConflictsAs | true | warnings | How the other conflicts are reported. By default every other conflicts are reported as warnings.
workingFolder | false | | Working folder where the reference conflicts analysis will run. If you leave it blank it is the root of the repository.
referenceConflictsAnalyzerCliDownloadUrl | true | [Link to download CLI](https://github.com/marss19/reference-conflicts-analyzer/releases/download/v.1.0.7/ReferenceConflictAnalyzer.CommandLine.1.0.7.zip) | The URL of the Reference Conflicts Analyzer command line tool.

## <a id="release-notes"></a>Release Notes

* 1.0.3 (15/01/2019)
    * Azure DevOps API authentication issues are fixed.
* 1.0.1 (14/01/2019)
    * Using custom nuget.config to download DgmlImage library from nuget.org.
    * Links are fixed in documentation.
    * Task input labels are fixed.
* 1.0.0 (07/01/2019)
    * First stable version.
    * Analyze reference conflicts in .NET application.
    * Shows dependency graph on the build summary page.

## <a id="license"></a>License

[MIT](https://github.com/Dealogic/reference-conflicts-analyzer-azure-devops-task/blob/master/LICENSE)