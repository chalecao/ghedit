define(["require","exports","vs/nls","vs/base/common/objects","vs/base/common/platform","vs/base/common/types","vs/base/common/uuid","vs/base/common/parsers","vs/platform/markers/common/problemMatcher","vs/workbench/parts/tasks/common/taskSystem"],function(t,e,a,n,r,s,i,o,l,c){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function d(t,e){return new h(e).run(t)}var m=function(){function t(){}return t.clean="cleanMatcherMatchers",t}();e.ProblemHandling=m;var u;!function(t){t[t.Unknown=0]="Unknown",t[t.String=1]="String",t[t.ProblemMatcher=2]="ProblemMatcher",t[t.Array=3]="Array"}(u||(u={}));var h=function(){function t(t){this.logger=t,this.validationStatus=new o.ValidationStatus,this.namedProblemMatchers=Object.create(null)}return t.prototype.log=function(t){this.logger.log(t)},t.prototype.run=function(t){return{validationStatus:this.validationStatus,configuration:this.createTaskRunnerConfiguration(t),defaultBuildTaskIdentifier:this.defaultBuildTaskIdentifier,defaultTestTaskIdentifier:this.defaultTestTaskIdentifier}},t.prototype.createTaskRunnerConfiguration=function(t){var e=this.createGlobals(t),n=this.createBaseTaskRunnerConfiguration(t,{isMain:!0,globals:e});if(!this.validationStatus.isFatal()){var i=null,l={isMain:!1,globals:e};t.windows&&r.platform===r.Platform.Windows?i=this.createBaseTaskRunnerConfiguration(t.windows,l):t.osx&&r.platform===r.Platform.Mac?i=this.createBaseTaskRunnerConfiguration(t.osx,l):t.linux&&r.platform===r.Platform.Linux&&(i=this.createBaseTaskRunnerConfiguration(t.linux,l)),this.validationStatus.isFatal()||(i&&this.mergeTaskRunnerConigurations(n,i),s.isUndefined(n.options.cwd)&&(n.options.cwd="${workspaceRoot}"))}return n.command?n:(this.validationStatus.state=o.ValidationState.Fatal,this.log(a.localize("ConfigurationParser.noCommand","Error: no valid command name provided.")),null)},t.prototype.createGlobals=function(t){var e=this.parseGlobals(t),a=null;return t.windows&&r.platform===r.Platform.Windows?a=this.parseGlobals(t.windows):t.osx&&r.platform===r.Platform.Mac?a=this.parseGlobals(t.osx):t.linux&&r.platform===r.Platform.Linux&&(a=this.parseGlobals(t.linux)),a&&n.mixin(e,a,!0),s.isUndefined(e.isShellCommand)&&(e.isShellCommand=!1),s.isUndefined(e.showOutput)&&(e.showOutput=c.ShowOutput.Always),s.isUndefined(e.echoCommand)&&(e.echoCommand=!1),s.isUndefined(e.suppressTaskName)&&(e.suppressTaskName=!1),e},t.prototype.parseGlobals=function(t){var e={};return s.isString(t.command)&&(e.command=t.command),s.isBoolean(t.isShellCommand)&&(e.isShellCommand=t.isShellCommand),s.isString(t.showOutput)&&(e.showOutput=c.ShowOutput.fromString(t.showOutput)),s.isUndefined(t.echoCommand)||(e.echoCommand=!!t.echoCommand),s.isUndefined(t.suppressTaskName)||(e.suppressTaskName=!!t.suppressTaskName),s.isString(t.taskSelector)&&(e.taskSelector=t.taskSelector),e},t.prototype.mergeTaskRunnerConigurations=function(t,e){if(e.command&&(t.command=e.command),e.args&&(t.args=t.args?t.args.concat(e.args):e.args),s.isUndefined(e.isShellCommand)||(t.isShellCommand=e.isShellCommand),e.options&&(s.isString(e.options.cwd)&&(t.options.cwd=e.options.cwd),e.options.env)){var a=e.options.env,n=t.options.env;n?Object.keys(a).forEach(function(t){n[t]=a[t]}):t.options.env=a}if(e.tasks){var r=Object.create(null);Object.keys(t.tasks).forEach(function(e){var a=t.tasks[e];r[a.name]=a.id});var i=Object.create(null);Object.keys(e.tasks).forEach(function(t){var a=e.tasks[t];i[a.name]=a.id}),Object.keys(i).forEach(function(a){var n=r[a],s=i[a];n&&delete t.tasks[n],t.tasks[s]=e.tasks[s]})}},t.prototype.createBaseTaskRunnerConfiguration=function(t,e){var n=e.globals,r={isShellCommand:n.isShellCommand,args:[]};s.isString(t.command)&&(r.command=t.command),s.isUndefined(t.isShellCommand)||(r.isShellCommand=t.isShellCommand);var l=s.isUndefined(t.args);s.isStringArray(t.args)&&(l=!0,r.args=t.args.slice()),l||(this.validationStatus.state=o.ValidationState.Fatal,this.log(a.localize("ConfigurationParser.noargs","Error: command arguments must be an array of strings. Provided value is:\n{0}",t.args?JSON.stringify(t.args,null,4):"undefined"))),r.options=this.createCommandOptions(t.options),e.isMain&&(this.namedProblemMatchers=this.createNamedProblemMatchers(t));var c=!s.isUndefined(t.problemMatcher),d=s.isArray(t.tasks);if(d)r.tasks=this.createTasks(t.tasks,e),c&&(this.validationStatus.state=o.ValidationState.Warning,this.log(a.localize("ConfigurationParser.globalMatcher","Warning: global matchers and tasks can't be mixed. Ignoring global matchers.")));else if(e.isMain){var m=!1;s.isUndefined(t.isWatching)||(m=!!t.isWatching);var u=!0;u=s.isUndefined(t.promptOnClose)?!m:!!t.promptOnClose;var h={id:i.generateUuid(),name:n.command,showOutput:n.showOutput,suppressTaskName:!0,isWatching:m,promptOnClose:u,echoCommand:n.echoCommand};if(c){var p=this.createProblemMatchers(t.problemMatcher);h.problemMatchers=p}else h.problemMatchers=[];for(var f=0,g=h.problemMatchers;f<g.length;f++){var v=g[f];if(v.tscWatch){h.tscWatch=!0;break}}this.defaultBuildTaskIdentifier=h.id,r.tasks=Object.create(null),r.tasks[h.id]=h}return r},t.prototype.createCommandOptions=function(t){var e={};return t&&(s.isUndefined(t.cwd)||(s.isString(t.cwd)?e.cwd=t.cwd:(this.validationStatus.state=o.ValidationState.Warning,this.log(a.localize("ConfigurationParser.invalidCWD","Warning: options.cwd must be of type string. Ignoring value {0}\n",t.cwd)))),s.isUndefined(t.env)||(e.env=n.clone(t.env))),e},t.prototype.createNamedProblemMatchers=function(t){var e=this,a=Object.create(null);if(!s.isArray(t.declares))return a;var n=t.declares;return n.forEach(function(t){var n=e.createNamedProblemMatcher(t);n&&(a[n.name]=n)}),a},t.prototype.createNamedProblemMatcher=function(t){var e=new l.ProblemMatcherParser(l.registry,this.logger,this.validationStatus).parse(t);return l.isNamedProblemMatcher(e)?e:(this.validationStatus.state=o.ValidationState.Error,this.log(a.localize("ConfigurationParser.noName","Error: Problem Matcher in declare scope must have a name:\n{0}\n",JSON.stringify(t,null,4))),null)},t.prototype.createTasks=function(t,e){var n=this,r=Object.create(null);if(!t)return r;var l={id:null,exact:-1},d={id:null,exact:-1};return t.forEach(function(t){var m=t.taskName;if(!m)return n.validationStatus.state=o.ValidationState.Fatal,void n.log(a.localize("ConfigurationParser.noTaskName","Error: tasks must provide a taskName property. The task will be ignored.\n{0}\n",JSON.stringify(t,null,4)));var u=n.createProblemMatchers(t.problemMatcher),h={id:i.generateUuid(),name:m,showOutput:e.globals.showOutput};s.isStringArray(t.args)&&(h.args=t.args.slice()),h.isWatching=!1,s.isUndefined(t.isWatching)||(h.isWatching=!!t.isWatching),h.promptOnClose=!0,s.isUndefined(t.promptOnClose)?h.promptOnClose=!h.isWatching:h.promptOnClose=!!t.promptOnClose,s.isString(t.showOutput)&&(h.showOutput=c.ShowOutput.fromString(t.showOutput)),s.isUndefined(h.showOutput)&&(h.showOutput=e.globals.showOutput),h.echoCommand=e.globals.echoCommand,s.isUndefined(t.echoCommand)||(h.echoCommand=!!t.echoCommand),h.suppressTaskName=e.globals.suppressTaskName,s.isUndefined(t.suppressTaskName)||(h.suppressTaskName=!!t.suppressTaskName),u&&(h.problemMatchers=u);for(var p=0,f=h.problemMatchers;p<f.length;p++){var g=f[p];if(g.tscWatch){h.tscWatch=!0;break}}r[h.id]=h,!s.isUndefined(t.isBuildCommand)&&t.isBuildCommand&&l.exact<2?(l.id=h.id,l.exact=2):"build"===m&&l.exact<2&&(l.id=h.id,l.exact=1),!s.isUndefined(t.isTestCommand)&&t.isTestCommand&&d.exact<2?(d.id=h.id,d.exact=2):"test"===m&&d.exact<2&&(d.id=h.id,d.exact=1)}),l.exact>0&&(this.defaultBuildTaskIdentifier=l.id),d.exact>0&&(this.defaultTestTaskIdentifier=d.id),r},t.prototype.createProblemMatchers=function(t){var e=this,n=[];if(s.isUndefined(t))return n;var r=this.getProblemMatcherKind(t);if(r===u.Unknown)return this.validationStatus.state=o.ValidationState.Warning,this.log(a.localize("ConfigurationParser.unknownMatcherKind","Warning: the defined problem matcher is unknown. Supported types are string | ProblemMatcher | (string | ProblemMatcher)[].\n{0}\n",JSON.stringify(t,null,4))),n;if(r===u.String||r===u.ProblemMatcher){var i=this.resolveProblemMatcher(t);i&&n.push(i)}else if(r===u.Array){var l=t;l.forEach(function(t){var a=e.resolveProblemMatcher(t);a&&n.push(a)})}return n},t.prototype.getProblemMatcherKind=function(t){return s.isString(t)?u.String:s.isArray(t)?u.Array:s.isUndefined(t)?u.Unknown:u.ProblemMatcher},t.prototype.resolveProblemMatcher=function(t){if(s.isString(t)){var e=t;if(e.length>1&&"$"===e[0]){e=e.substring(1);var r=l.registry.get(e);if(r)return n.clone(r);var i=this.namedProblemMatchers[e];if(i)return i=n.clone(i),delete i.name,i}return this.validationStatus.state=o.ValidationState.Error,this.log(a.localize("ConfigurationParser.invalidVaraibleReference","Error: Invalid problemMatcher reference: {0}\n",t)),null}var c=t;return new l.ProblemMatcherParser(l.registry,this.logger,this.validationStatus).parse(c)},t}();e.parse=d});