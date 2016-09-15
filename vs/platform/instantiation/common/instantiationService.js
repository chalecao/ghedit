define(["require","exports","vs/base/common/winjs.base","vs/base/common/errors","vs/base/common/types","vs/base/common/assert","vs/base/common/graph","vs/platform/instantiation/common/descriptors","vs/platform/instantiation/common/instantiation","vs/platform/instantiation/common/serviceCollection"],function(e,t,n,r,i,c,o,s,a,v){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var u=function(){function t(e,t){void 0===e&&(e=new v.ServiceCollection),void 0===t&&(t=!1),this._services=e,this._strict=t,this._services.set(a.IInstantiationService,this)}return t.prototype.createChild=function(e){var n=this;return this._services.forEach(function(t,r){e.has(t)||(r instanceof s.SyncDescriptor&&(r=n._createAndCacheServiceInstance(t,r)),e.set(t,r))}),new t(e,this._strict)},t.prototype.invokeFunction=function(e){for(var t=this,n=[],i=1;i<arguments.length;i++)n[i-1]=arguments[i];var c;try{return c={get:function(e,n){var r=t._getOrCreateServiceInstance(e);if(!r&&n!==a.optional)throw new Error("[invokeFunction] unkown service '"+e+"'");return r}},e.apply(void 0,[c].concat(n))}finally{c.get=function(){throw r.illegalState("service accessor is only valid during the invocation of its target method")}}},t.prototype.createInstance=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return e instanceof s.AsyncDescriptor?this._createInstanceAsync(e,t):e instanceof s.SyncDescriptor?this._createInstance(e,t):this._createInstance(new s.SyncDescriptor(e),t)},t.prototype._createInstanceAsync=function(t,i){var c,o=this;return new n.TPromise(function(n,a,v){e([t.moduleName],function(e){if(c&&a(c),!e)return a(r.illegalArgument("module not found: "+t.moduleName));var v;if(v=t.ctorName?e[t.ctorName]:e,"function"!=typeof v)return a(r.illegalArgument("not a function: "+t.ctorName||t.moduleName));try{i.unshift.apply(i,t.staticArguments()),n(o._createInstance(new s.SyncDescriptor(v),i))}catch(u){return a(u)}},a)},function(){c=r.canceled()})},t.prototype._createInstance=function(e,t){var n=this,r=e.staticArguments().concat(t),c=a._util.getServiceDependencies(e.ctor).sort(function(e,t){return e.index-t.index}),o=c.map(function(t){var r=n._getOrCreateServiceInstance(t.id);if(!r&&n._strict&&!t.optional)throw new Error("[createInstance] "+e.ctor.name+" depends on UNKNOWN service "+t.id+".");return r}),s=c.length>0?c[0].index:r.length;if(r.length!==s){console.warn("[createInstance] First service dependency of "+e.ctor.name+" at position "+(s+1)+" conflicts with "+r.length+" static arguments");var v=s-r.length;r=v>0?r.concat(new Array(v)):r.slice(0,s)}var u=[e.ctor];u.push.apply(u,r),u.push.apply(u,o);var p=i.create.apply(null,u);return e._validate(p),p},t.prototype._getOrCreateServiceInstance=function(e){var t=this._services.get(e);return t instanceof s.SyncDescriptor?this._createAndCacheServiceInstance(e,t):t},t.prototype._createAndCacheServiceInstance=function(e,t){function n(){var e=new Error("[createInstance] cyclic dependency between services");throw e.message=r.toString(),e}c.ok(this._services.get(e)instanceof s.SyncDescriptor);for(var r=new o.Graph(function(e){return e.id.toString()}),i=0,v=[{id:e,desc:t}];v.length;){var u=v.pop();r.lookupOrInsertNode(u),i++>100&&n();for(var p=a._util.getServiceDependencies(u.desc.ctor),l=0,h=p;l<h.length;l++){var f=h[l],d=this._services.get(f.id);if(d||console.warn("[createInstance] "+e+" depends on "+f.id+" which is NOT registered."),d instanceof s.SyncDescriptor){var m={id:f.id,desc:d};r.insertEdge(u,m),v.push(m)}}}for(;;){var g=r.roots();if(0===g.length){0!==r.length&&n();break}for(var y=0,_=g;y<_.length;y++){var I=_[y],w=this._createInstance(I.data.desc,[]);this._services.set(I.data.id,w),r.removeNode(I.data)}}return this._services.get(e)},t}();t.InstantiationService=u});