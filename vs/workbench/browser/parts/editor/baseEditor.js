var __extends=this&&this.__extends||function(t,o){function n(){this.constructor=t}for(var i in o)o.hasOwnProperty(i)&&(t[i]=o[i]);t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)};define(["require","exports","vs/base/common/winjs.base","vs/base/common/actions","vs/workbench/browser/actionBarRegistry","vs/base/common/types","vs/platform/platform","vs/workbench/browser/panel","vs/workbench/common/editor","vs/platform/editor/common/editor","vs/platform/instantiation/common/descriptors"],function(t,o,n,i,r,e,s,p,c,u,a){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var h=function(t){function o(o,n){t.call(this,o,n)}return __extends(o,t),Object.defineProperty(o.prototype,"input",{get:function(){return this._input},enumerable:!0,configurable:!0}),o.prototype.getInput=function(){return this._input||null},Object.defineProperty(o.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),o.prototype.getOptions=function(){return this._options||null},o.prototype.setInput=function(t,o){return this._input=t,this._options=o,n.TPromise.as(null)},o.prototype.clearInput=function(){this._input=null,this._options=null},o.prototype.create=function(o){var n=t.prototype.create.call(this,o);return this.createEditor(o),n},o.prototype.setVisible=function(o,n){void 0===n&&(n=null);var i=t.prototype.setVisible.call(this,o);return this.setEditorVisible(o,n),i},o.prototype.setEditorVisible=function(t,o){void 0===o&&(o=null),this._position=o},o.prototype.changePosition=function(t){this._position=t},Object.defineProperty(o.prototype,"position",{get:function(){return this._position},enumerable:!0,configurable:!0}),o.prototype.dispose=function(){this._input=null,this._options=null,t.prototype.dispose.call(this)},o}(p.Panel);o.BaseEditor=h;var d=function(t){function o(o,n,i,r){t.call(this,i,r),this.id=o,this.name=n}return __extends(o,t),o.prototype.getId=function(){return this.id},o.prototype.getName=function(){return this.name},o.prototype.describes=function(t){return t instanceof h&&t.getId()===this.id},o}(a.AsyncDescriptor);o.EditorDescriptor=d;var f="__$inputDescriptors",y=function(){function t(){this.editorInputFactoryConstructors=Object.create(null),this.editorInputFactoryInstances=Object.create(null),this.editors=[]}return t.prototype.setInstantiationService=function(t){this.instantiationService=t;for(var o in this.editorInputFactoryConstructors){var n=this.editorInputFactoryConstructors[o];this.createEditorInputFactory(o,n)}this.editorInputFactoryConstructors={}},t.prototype.createEditorInputFactory=function(t,o){var n=this.instantiationService.createInstance(o);this.editorInputFactoryInstances[t]=n},t.prototype.registerEditor=function(t,o){var n=[];e.isArray(o)?n=o:n.push(o),t[f]=n,this.editors.push(t)},t.prototype.getEditor=function(t){var o=this,n=function(t,i){for(var r=[],e=0;e<o.editors.length;e++)for(var s=o.editors[e],p=s[f],c=0;c<p.length;c++){var u=p[c].ctor;if(!i&&t.constructor===u){r.push(s);break}if(i&&t instanceof u){r.push(s);break}}return i||0!==r.length?i?r:r:n(t,!0)},i=n(t);if(i&&i.length>0){var r=t.getPreferredEditorId(i.map(function(t){return t.getId()}));return r?this.getEditorById(r):i[0]}return null},t.prototype.getEditorById=function(t){for(var o=0;o<this.editors.length;o++){var n=this.editors[o];if(n.getId()===t)return n}return null},t.prototype.getEditors=function(){return this.editors.slice(0)},t.prototype.setEditors=function(t){this.editors=t},t.prototype.getEditorInputs=function(){for(var t=[],o=0;o<this.editors.length;o++){var n=this.editors[o],i=n[f];t.push.apply(t,i.map(function(t){return t.ctor}))}return t},t.prototype.registerDefaultFileInput=function(t){this.defaultFileInputDescriptor=t},t.prototype.getDefaultFileInput=function(){return this.defaultFileInputDescriptor},t.prototype.registerEditorInputFactory=function(t,o){this.instantiationService?this.createEditorInputFactory(t,o):this.editorInputFactoryConstructors[t]=o},t.prototype.getEditorInputFactory=function(t){return this.editorInputFactoryInstances[t]},t}();s.Registry.add(c.Extensions.Editors,new y);var l=function(t){function o(){t.call(this),this.mapEditorInputActionContextToPrimaryActions=this.createPositionArray(),this.mapEditorInputActionContextToSecondaryActions=this.createPositionArray()}return __extends(o,t),o.prototype.createPositionArray=function(){for(var t=[],o=0;o<u.POSITIONS.length;o++)t[o]={};return t},o.prototype.toId=function(t){return t.editor.getId()+t.input.getTypeId()},o.prototype.clearInputsFromCache=function(t,o){o?this.doClearInputsFromCache(this.mapEditorInputActionContextToPrimaryActions[t]):this.doClearInputsFromCache(this.mapEditorInputActionContextToSecondaryActions[t])},o.prototype.doClearInputsFromCache=function(t){for(var o in t)if(t.hasOwnProperty(o)){var n=t[o];n.forEach(function(t){t.input=null,t.position=null})}},o.prototype.hasActions=function(t){return!!this.checkEditorContext(t)&&(!!this.mapEditorInputActionContextToPrimaryActions[t.position][this.toId(t)]||this.hasActionsForEditorInput(t))},o.prototype.getActions=function(t){if(!this.checkEditorContext(t))return[];this.clearInputsFromCache(t.position,!0);var o=t.input,n=t.position,i=this.mapEditorInputActionContextToPrimaryActions[t.position][this.toId(t)];if(i)return i.forEach(function(t){t.input=o,t.position=n}),i;var r=this.getActionsForEditorInput(t);return r.forEach(function(t){t.input=o,t.position=n}),this.mapEditorInputActionContextToPrimaryActions[t.position][this.toId(t)]=r,r},o.prototype.hasSecondaryActions=function(t){return!!this.checkEditorContext(t)&&(!!this.mapEditorInputActionContextToSecondaryActions[t.position][this.toId(t)]||this.hasSecondaryActionsForEditorInput(t))},o.prototype.getSecondaryActions=function(t){if(!this.checkEditorContext(t))return[];this.clearInputsFromCache(t.position,!1);var o=t.input,n=t.position,i=this.mapEditorInputActionContextToSecondaryActions[t.position][this.toId(t)];if(i)return i.forEach(function(t){t.input=o,t.position=n}),i;var r=this.getSecondaryActionsForEditorInput(t);return r.forEach(function(t){t.input=o,t.position=n}),this.mapEditorInputActionContextToSecondaryActions[t.position][this.toId(t)]=r,r},o.prototype.checkEditorContext=function(t){return t&&t.input instanceof c.EditorInput&&t.editor instanceof h&&!e.isUndefinedOrNull(t.position)},o.prototype.hasActionsForEditorInput=function(t){return!1},o.prototype.getActionsForEditorInput=function(t){return[]},o.prototype.hasSecondaryActionsForEditorInput=function(t){return!1},o.prototype.getSecondaryActionsForEditorInput=function(t){return[]},o}(r.ActionBarContributor);o.EditorInputActionContributor=l;var I=function(t){function o(){t.apply(this,arguments)}return __extends(o,t),Object.defineProperty(o.prototype,"input",{get:function(){return this._input},set:function(t){this._input=t,this.enabled=this.isEnabled()},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"position",{get:function(){return this._position},set:function(t){this._position=t},enumerable:!0,configurable:!0}),o.prototype.isEnabled=function(){return!!this._input},o}(i.Action);o.EditorInputAction=I});