# reference conflicts analyzer build task

### A build task for [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/) pipelines made with ♥ by

[![dealogic logo](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/dealogic-logo.png)](http://www.dealogic.com)

### to analyze reference conflicts in your .NET applications.

## Special Thanks to
### Mykola Tarasyuk for creating the [Reference Conflicts Analyzer command line tool](https://github.com/marss19/reference-conflicts-analyzer/tree/master/ReferenceConflictAnalyser.VSExtension).
### Chris Lovett for creating the [DgmlImage command line tool](https://www.nuget.org/packages/DgmlImage/).

TODO: change it
![build status](https://dealogic.visualstudio.com/DefaultCollection/_apis/public/build/definitions/4cd19643-db3a-4dcc-b481-76a7800dd64d/7871/badge)

## Content

* [Installation](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#installation)
* [Source Code](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#source-code)
* [What The Build Step Does](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#what-the-build-step-does)
* [Usage](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#usage)
    * [Advanced Settings](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#advanced-settings)
    * [Multiple Build Steps](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#multiple-build-steps)
* [Summary of Task Settings](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#summary-of-task-settings)
* [Release Notes](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#release-notes)
* [License](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension#license)

## <a id="installation"></a>Installation

Installation can be done using [Azure DevOps MarketPlace](https://marketplace.visualstudio.com/items?itemName=Dealogic.reference-conflicts-analyzer-azure-devops-task).

## <a id="source-code"></a>Source Code

Source code can be found on [GitHub](https://github.com/Dealogic/reference-conflicts-analyzer-azure-devops-task).

## <a id="what-the-build-step-does"></a>What The Build Step Does

This build step is using Mykola Tarasyuk's [reference conflicts analyzer command line tool](https://github.com/marss19/reference-conflicts-analyzer/tree/master/ReferenceConflictAnalyser.VSExtension) to produce a `dgml` file that represents the dependency graph of a .NET application. With using the [DgmlImage command line tool by Chris Lovett](https://www.nuget.org/packages/DgmlImage/) to create an image that can be attached as a build summary section on to the build result page.

## <a id="usage"></a>Usage

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

* 1.0.0 (07/01/2019)
    * First stable version.
    * Analyze reference conflicts in .NET application.
    * Shows dependency graph on the build summary page.

## <a id="license"></a>License

[MIT](https://github.com/Dealogic/webpack-vsts-extension/blob/master/LICENSE)