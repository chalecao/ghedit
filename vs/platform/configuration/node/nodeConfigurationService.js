var __decorate=this&&this.__decorate||function(t,e,n,o){var r,i=arguments.length,a=i<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,o);else for(var s=t.length-1;s>=0;s--)(r=t[s])&&(a=(i<3?r(a):i>3?r(e,n,a):r(e,n))||a);return i>3&&a&&Object.defineProperty(e,n,a),a},__param=this&&this.__param||function(t,e){return function(n,o){e(n,o,t)}};define(["require","exports","vs/base/node/pfs","fs","path","vs/base/common/winjs.base","vs/base/common/async","vs/base/common/json","vs/base/common/jsonFormatter","vs/base/common/jsonEdit","vs/base/common/lifecycle","vs/base/common/event","vs/platform/environment/common/environment"],function(t,e,n,o,r,i,a,s,c,f,u,p,h){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var l=function(){function t(t){var e=this;this._onDidUpdateConfiguration=new p.Emitter,this.cache={},this.disposables=[],this.delayer=new a.Delayer(300),this.configurationPath=r.join(t.userDataPath,"User","settings.json"),this.load(),this.watcher=o.watch(r.dirname(this.configurationPath)),this.disposables.push(u.toDisposable(function(){e.watcher.removeAllListeners(),e.watcher.close()})),this.watcher.on("change",function(){return e.delayer.trigger(function(){return e.load()})})}return Object.defineProperty(t.prototype,"onDidUpdateConfiguration",{get:function(){return this._onDidUpdateConfiguration.event},enumerable:!0,configurable:!0}),t.prototype.getConfiguration=function(t){return this._getConfiguration(t)},t.prototype.setUserConfiguration=function(t,e){var o=this;return n.readFile(this.configurationPath,"utf8").then(function(r){var i=o.getConfiguration("editor"),a="number"==typeof i.tabSize?i.tabSize:4,s="boolean"==typeof i.insertSpaces&&i.insertSpaces,u="string"==typeof t?t.split("."):t,p=f.setProperty(r,u,e,{insertSpaces:s,tabSize:a,eol:"\n"});return r=c.applyEdits(r,p),n.writeFile(o.configurationPath,r,"utf8")})},t.prototype.loadConfiguration=function(t){return i.TPromise.wrapError(new Error("not implemented"))},t.prototype._getConfiguration=function(t){void 0===t&&(t="");for(var e=this.cache,n=t.split(".").filter(function(t){return!!t});n.length&&e;){var o=n.shift();e=e[o]}return e},t.prototype.load=function(){var t="{}";try{t=o.readFileSync(this.configurationPath,"utf8")}catch(e){t="{}"}try{this.cache=s.parse(t)||{}}catch(e){}},t.prototype.hasWorkspaceConfiguration=function(){return!1},t.prototype.dispose=function(){this.disposables=u.dispose(this.disposables)},t=__decorate([__param(0,h.IEnvironmentService)],t)}();e.NodeConfigurationService=l});