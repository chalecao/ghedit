define(["require","exports","vs/editor/common/core/position","vs/editor/common/core/range","vs/editor/common/editorCommon","vs/editor/common/viewModel/filteredLineTokens","vs/editor/common/viewModel/prefixSumComputer"],function(t,e,i,n,o,s,r){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";function u(t,e,i,n,o,s,r){var u=t.createLineMapping(e,i,n,o,s);return null===u?new a(r):new l(u,r)}var p=function(){function t(t,e){this.outputLineIndex=t,this.outputOffset=e}return t}();e.OutputPosition=p;var a=function(){function t(t){this._isVisible=t}return t.prototype.isVisible=function(){return this._isVisible},t.prototype.setVisible=function(t){this._isVisible=t},t.prototype.getOutputLineCount=function(){return this._isVisible?1:0},t.prototype.getOutputLineContent=function(t,e,i){if(!this._isVisible)throw new Error("Not supported");return t.getLineContent(e)},t.prototype.getOutputLineMinColumn=function(t,e,i){if(!this._isVisible)throw new Error("Not supported");return t.getLineMinColumn(e)},t.prototype.getOutputLineMaxColumn=function(t,e,i){if(!this._isVisible)throw new Error("Not supported");return t.getLineMaxColumn(e)},t.prototype.getOutputLineTokens=function(t,e,i){if(!this._isVisible)throw new Error("Not supported");return s.IdentityFilteredLineTokens.create(t.getLineTokens(e,!0),t.getLineMaxColumn(e)-1)},t.prototype.getInputColumnOfOutputPosition=function(t,e){if(!this._isVisible)throw new Error("Not supported");return e},t.prototype.getOutputPositionOfInputPosition=function(t,e){if(!this._isVisible)throw new Error("Not supported");return new i.Position(t,e)},t}(),l=function(){function t(t,e){this.positionMapper=t,this.wrappedIndent=this.positionMapper.getWrappedLinesIndent(),this.wrappedIndentLength=this.wrappedIndent.length,this.outputLineCount=this.positionMapper.getOutputLineCount(),this._isVisible=e}return t.prototype.isVisible=function(){return this._isVisible},t.prototype.setVisible=function(t){this._isVisible=t},t.prototype.getOutputLineCount=function(){return this._isVisible?this.outputLineCount:0},t.prototype.getInputStartOffsetOfOutputLineIndex=function(t){return this.positionMapper.getInputOffsetOfOutputPosition(t,0)},t.prototype.getInputEndOffsetOfOutputLineIndex=function(t,e,i){return i+1===this.outputLineCount?t.getLineMaxColumn(e)-1:this.positionMapper.getInputOffsetOfOutputPosition(i+1,0)},t.prototype.getOutputLineContent=function(t,e,i){if(!this._isVisible)throw new Error("Not supported");var n=this.getInputStartOffsetOfOutputLineIndex(i),o=this.getInputEndOffsetOfOutputLineIndex(t,e,i),s=t.getLineContent(e).substring(n,o);return i>0&&(s=this.wrappedIndent+s),s},t.prototype.getOutputLineMinColumn=function(t,e,i){if(!this._isVisible)throw new Error("Not supported");return i>0?this.wrappedIndentLength+1:1},t.prototype.getOutputLineMaxColumn=function(t,e,i){if(!this._isVisible)throw new Error("Not supported");return this.getOutputLineContent(t,e,i).length+1},t.prototype.getOutputLineTokens=function(t,e,i){if(!this._isVisible)throw new Error("Not supported");var n=this.getInputStartOffsetOfOutputLineIndex(i),o=this.getInputEndOffsetOfOutputLineIndex(t,e,i),r=0;return i>0&&(r=this.wrappedIndentLength),s.FilteredLineTokens.create(t.getLineTokens(e,!0),n,o,r)},t.prototype.getInputColumnOfOutputPosition=function(t,e){if(!this._isVisible)throw new Error("Not supported");var i=e-1;return t>0&&(i<this.wrappedIndentLength?i=0:i-=this.wrappedIndentLength),this.positionMapper.getInputOffsetOfOutputPosition(t,i)+1},t.prototype.getOutputPositionOfInputPosition=function(t,e){if(!this._isVisible)throw new Error("Not supported");var n=this.positionMapper.getOutputPositionOfInputOffset(e-1),o=n.outputLineIndex,s=n.outputOffset+1;return o>0&&(s+=this.wrappedIndentLength),new i.Position(t+o,s)},t}();e.SplitLine=l;var h=function(){function t(t,e,i,n,o,s){this.model=t,this._validModelVersionId=-1,this.tabSize=i,this.wrappingColumn=n,this.columnsForFullWidthChar=o,this.wrappingIndent=s,this.linePositionMapperFactory=e,this._constructLines(!0)}return t.prototype.dispose=function(){this.hiddenAreasIds=this.model.deltaDecorations(this.hiddenAreasIds,[])},t.prototype._ensureValidState=function(){var t=this.model.getVersionId();if(t!==this._validModelVersionId)throw new Error("SplitLinesCollection: attempt to access a 'newer' model")},t.prototype._constructLines=function(t){var e=this;this.lines=[],t&&(this.hiddenAreasIds=[]);for(var i=[],o=this.model.getLinesContent(),s=o.length,p=this.hiddenAreasIds.map(function(t){return e.model.getDecorationRange(t)}).sort(n.Range.compareRangesUsingStarts),a=1,l=0,h=-1,d=h+1<p.length?l+1:s+2,m=0;m<s;m++){var f=m+1;f===d&&(h++,a=p[h].startLineNumber,l=p[h].endLineNumber,d=h+1<p.length?l+1:s+2);var g=f>=a&&f<=l,c=u(this.linePositionMapperFactory,o[m],this.tabSize,this.wrappingColumn,this.columnsForFullWidthChar,this.wrappingIndent,!g);i[m]=c.getOutputLineCount(),this.lines[m]=c}this._validModelVersionId=this.model.getVersionId(),this.prefixSumComputer=new r.PrefixSumComputer(i)},t.prototype.getHiddenAreas=function(){var t=this;return this.hiddenAreasIds.map(function(e){return t.model.getDecorationRange(e)}).sort(n.Range.compareRangesUsingStarts)},t.prototype._reduceRanges=function(t){var e=this;if(0===t.length)return[];for(var i=t.map(function(t){return e.model.validateRange(t)}).sort(n.Range.compareRangesUsingStarts),o=[],s=i[0].startLineNumber,r=i[0].endLineNumber,u=1,p=i.length;u<p;u++){var a=i[u];a.startLineNumber>r+1?(o.push(new n.Range(s,1,r,1)),s=a.startLineNumber,r=a.endLineNumber):a.endLineNumber>r&&(r=a.endLineNumber)}return o.push(new n.Range(s,1,r,1)),o},t.prototype.setHiddenAreas=function(t,e){var i=this,s=this._reduceRanges(t),r=this.hiddenAreasIds.map(function(t){return i.model.getDecorationRange(t)}).sort(n.Range.compareRangesUsingStarts);if(s.length===r.length){for(var u=!1,p=0;p<s.length;p++)if(!s[p].equalsRange(r[p])){u=!0;break}if(!u)return!1}for(var a=[],p=0;p<s.length;p++)a.push({range:s[p],options:{}});this.hiddenAreasIds=this.model.deltaDecorations(this.hiddenAreasIds,a);for(var l=s,h=1,d=0,m=-1,f=m+1<l.length?d+1:this.lines.length+2,p=0;p<this.lines.length;p++){var g=p+1;g===f&&(m++,h=l[m].startLineNumber,d=l[m].endLineNumber,f=m+1<l.length?d+1:this.lines.length+2);var c=!1;if(g>=h&&g<=d?this.lines[p].isVisible()&&(this.lines[p].setVisible(!1),c=!0):this.lines[p].isVisible()||(this.lines[p].setVisible(!0),c=!0),c){var L=this.lines[p].getOutputLineCount();this.prefixSumComputer.changeValue(p,L)}}return e(o.ViewEventNames.ModelFlushedEvent,null),!0},t.prototype.inputPositionIsVisible=function(t,e){return!(t<1||t>this.lines.length)&&this.lines[t-1].isVisible()},t.prototype.setTabSize=function(t,e){return this.tabSize!==t&&(this.tabSize=t,this._constructLines(!1),e(o.ViewEventNames.ModelFlushedEvent,null),!0)},t.prototype.setWrappingIndent=function(t,e){return this.wrappingIndent!==t&&(this.wrappingIndent=t,this._constructLines(!1),e(o.ViewEventNames.ModelFlushedEvent,null),!0)},t.prototype.setWrappingColumn=function(t,e,i){return(this.wrappingColumn!==t||this.columnsForFullWidthChar!==e)&&(this.wrappingColumn=t,this.columnsForFullWidthChar=e,this._constructLines(!1),i(o.ViewEventNames.ModelFlushedEvent,null),!0)},t.prototype.onModelFlushed=function(t,e){this._constructLines(!0),e(o.ViewEventNames.ModelFlushedEvent,null)},t.prototype.onModelLinesDeleted=function(t,e,i,n){if(!(t<=this._validModelVersionId)){this._validModelVersionId=t;var s=1===e?1:this.prefixSumComputer.getAccumulatedValue(e-2)+1,r=this.prefixSumComputer.getAccumulatedValue(i-1);this.lines.splice(e-1,i-e+1),this.prefixSumComputer.removeValues(e-1,i-e+1);var u={fromLineNumber:s,toLineNumber:r};n(o.ViewEventNames.LinesDeletedEvent,u)}},t.prototype.onModelLinesInserted=function(t,e,n,s,r){if(!(t<=this._validModelVersionId)){this._validModelVersionId=t;for(var p=this.getHiddenAreas(),a=!1,l=new i.Position(e,1),h=0;h<p.length;h++)if(p[h].containsPosition(l)){a=!0;break}for(var d=1===e?1:this.prefixSumComputer.getAccumulatedValue(e-2)+1,m=0,f=[],g=[],h=0,c=s.length;h<c;h++){var L=u(this.linePositionMapperFactory,s[h],this.tabSize,this.wrappingColumn,this.columnsForFullWidthChar,this.wrappingIndent,!a);f.push(L);var O=L.getOutputLineCount();m+=O,g.push(O)}this.lines=this.lines.slice(0,e-1).concat(f).concat(this.lines.slice(e-1)),this.prefixSumComputer.insertValues(e-1,g);var v={fromLineNumber:d,toLineNumber:d+m-1};r(o.ViewEventNames.LinesInsertedEvent,v)}},t.prototype.onModelLineChanged=function(t,e,i,n){if(!(t<=this._validModelVersionId)){this._validModelVersionId=t;var s=e-1,r=this.lines[s].getOutputLineCount(),p=this.lines[s].isVisible(),a=u(this.linePositionMapperFactory,i,this.tabSize,this.wrappingColumn,this.columnsForFullWidthChar,this.wrappingIndent,p);this.lines[s]=a;var l=this.lines[s].getOutputLineCount(),h=!1,d=0,m=-1,f=0,g=-1,c=0,L=-1;r>l?(d=1===e?1:this.prefixSumComputer.getAccumulatedValue(e-2)+1,m=d+l-1,c=m+1,L=c+(r-l)-1,h=!0):r<l?(d=1===e?1:this.prefixSumComputer.getAccumulatedValue(e-2)+1,m=d+r-1,f=m+1,g=f+(l-r)-1,h=!0):(d=1===e?1:this.prefixSumComputer.getAccumulatedValue(e-2)+1,m=d+l-1),this.prefixSumComputer.changeValue(s,l);var O,v,V;if(d<=m)for(var C=d;C<=m;C++)O={lineNumber:C},n(o.ViewEventNames.LineChangedEvent,O);return f<=g&&(v={fromLineNumber:f,toLineNumber:g},n(o.ViewEventNames.LinesInsertedEvent,v)),c<=L&&(V={fromLineNumber:c,toLineNumber:L},n(o.ViewEventNames.LinesDeletedEvent,V)),h}},t.prototype.getOutputLineCount=function(){return this._ensureValidState(),this.prefixSumComputer.getTotalValue()},t.prototype._toValidOutputLineNumber=function(t){if(t<1)return 1;var e=this.getOutputLineCount();return t>e?e:t},t.prototype.getOutputLineContent=function(t){this._ensureValidState(),t=this._toValidOutputLineNumber(t);var e=this.prefixSumComputer.getIndexOf(t-1),i=e.index,n=e.remainder;return this.lines[i].getOutputLineContent(this.model,i+1,n)},t.prototype.getOutputIndentGuide=function(t){this._ensureValidState(),t=this._toValidOutputLineNumber(t);var e=this.prefixSumComputer.getIndexOf(t-1);return this.model.getLineIndentGuide(e.index+1)},t.prototype.getOutputLineMinColumn=function(t){this._ensureValidState(),t=this._toValidOutputLineNumber(t);var e=this.prefixSumComputer.getIndexOf(t-1),i=e.index,n=e.remainder;return this.lines[i].getOutputLineMinColumn(this.model,i+1,n)},t.prototype.getOutputLineMaxColumn=function(t){this._ensureValidState(),t=this._toValidOutputLineNumber(t);var e=this.prefixSumComputer.getIndexOf(t-1),i=e.index,n=e.remainder;return this.lines[i].getOutputLineMaxColumn(this.model,i+1,n)},t.prototype.getOutputLineTokens=function(t){this._ensureValidState(),t=this._toValidOutputLineNumber(t);var e=this.prefixSumComputer.getIndexOf(t-1),i=e.index,n=e.remainder;return this.lines[i].getOutputLineTokens(this.model,i+1,n)},t.prototype.convertOutputPositionToInputPosition=function(t,e){this._ensureValidState(),t=this._toValidOutputLineNumber(t);var n=this.prefixSumComputer.getIndexOf(t-1),o=n.index,s=n.remainder,r=this.lines[o].getInputColumnOfOutputPosition(s,e);return this.model.validatePosition(new i.Position(o+1,r))},t.prototype.convertInputPositionToOutputPosition=function(t,e){this._ensureValidState();for(var n=this.model.validatePosition(new i.Position(t,e)),o=n.lineNumber,s=n.column,r=o-1,u=!1;r>0&&!this.lines[r].isVisible();)r--,u=!0;if(0===r&&!this.lines[r].isVisible())return new i.Position(1,1);var p,a=1+(0===r?0:this.prefixSumComputer.getAccumulatedValue(r-1));return p=u?this.lines[r].getOutputPositionOfInputPosition(a,this.model.getLineMaxColumn(r+1)):this.lines[o-1].getOutputPositionOfInputPosition(a,s)},t}();e.SplitLinesCollection=h});