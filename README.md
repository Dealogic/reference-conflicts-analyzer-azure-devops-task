# reference conflicts analyzer build task

### A build task for [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/) pipelines made with ♥ by

[![dealogic logo](https://raw.githubusercontent.com/Dealogic/webpack-vsts-extension/master/dealogic-logo.png)](http://www.dealogic.com)

### to analyze reference conflicts in your .NET applications.

![build status](https://dealogic.visualstudio.com/DefaultCollection/_apis/public/build/definitions/4cd19643-db3a-4dcc-b481-76a7800dd64d/7871/badge)

## Content

* [Installation](#installation)
* [Source Code](#source-code)
* [What The Build Step Does](#what-the-build-step-does)
* [Usage](#usage)
    * [Advanced Settings](#advanced-settings)
    * [Multiple Build Steps](#multiple-build-steps)
* [Summary of Task Settings](#summary-of-task-settings)
* [Release Notes](#release-notes)
* [License](#license)

## <a id="installation"></a>Installation

Installation can be done using [Visual Studio MarketPlace](https://marketplace.visualstudio.com/items?itemName=Dealogic.webpack-vsts-extension).

## <a id="source-code"></a>Source Code

Source code can be found on [GitHub](https://github.com/Dealogic/webpack-vsts-extension).

## <a id="what-the-build-step-does"></a>What The Build Step Does

This build step is using the webpack's command line tool to compile a 'web' application into a bundle. The result, warnings and errors are reported onto the build summary section.

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
referenceConflictsAnalyzerCliDownloadUrl | true | https://github.com/marss19/reference-conflicts-analyzer/releases/download/v.1.0.7/ReferenceConflictAnalyzer.CommandLine.1.0.7.zip | The URL of the Reference Conflicts Analyzer command line tool.

## <a id="release-notes"></a>Release Notes

* 1.0.0 (07/01/2019)
    * First stable version.
    * Analyze reference conflicts in .NET application.
    * Shows dependency graph on the build summary page.

## <a id="license"></a>License

[MIT](https://github.com/Dealogic/webpack-vsts-extension/blob/master/LICENSE)