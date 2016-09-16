/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function o(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)};define(["require","exports","vs/nls","vs/base/common/winjs.base","vs/base/common/eventEmitter","vs/base/browser/builder","vs/css!./noworkspaceView"],function(e,t,o,n,r,s){"use strict";var i=s.$,p=function(e){function t(){e.apply(this,arguments),this.ID="noworkspace"}return __extends(t,e),Object.defineProperty(t.prototype,"element",{get:function(){return this._element||this.render(),this._element},enumerable:!0,configurable:!0}),t.prototype.render=function(){this._element=i(['<div class="noworkspace-view">',"<p>",o.localize("noWorkspace","There is no currently opened folder."),"</p>","<p>",o.localize("pleaseRestart","Open a folder with a Git repository in order to access Git features."),"</p>","</div>"].join("")).getHTMLElement()},t.prototype.focus=function(){},t.prototype.layout=function(e){},t.prototype.setVisible=function(e){return n.TPromise.as(null)},t.prototype.getControl=function(){return null},t.prototype.getActions=function(){return[]},t.prototype.getSecondaryActions=function(){return[]},t}(r.EventEmitter);t.NoWorkspaceView=p});