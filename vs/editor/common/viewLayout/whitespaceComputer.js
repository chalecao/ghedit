define(["require","exports"],function(e,t){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var i=function(){function e(){this.heights=[],this.ids=[],this.afterLineNumbers=[],this.ordinals=[],this.prefixSum=[],this.prefixSumValidIndex=-1,this.whitespaceId2Index={},this.lastWhitespaceId=0}return e.findInsertionIndex=function(e,t,i,s){for(var r,h=0,n=e.length;h<n;)r=Math.floor((h+n)/2),t===e[r]?s<i[r]?n=r:h=r+1:t<e[r]?n=r:h=r+1;return h},e.prototype.insertWhitespace=function(t,i,s){t=0|t,i=0|i,s=0|s;var r=++this.lastWhitespaceId,h=e.findInsertionIndex(this.afterLineNumbers,t,this.ordinals,i);return this.insertWhitespaceAtIndex(r,h,t,i,s),r},e.prototype.insertWhitespaceAtIndex=function(e,t,i,s,r){e=0|e,t=0|t,i=0|i,s=0|s,r=0|r,this.heights.splice(t,0,r),this.ids.splice(t,0,e),this.afterLineNumbers.splice(t,0,i),this.ordinals.splice(t,0,s),this.prefixSum.splice(t,0,0);for(var h=Object.keys(this.whitespaceId2Index),n=0,a=h.length;n<a;n++){var p=h[n],o=this.whitespaceId2Index[p];o>=t&&(this.whitespaceId2Index[p]=o+1)}this.whitespaceId2Index[e.toString()]=t,this.prefixSumValidIndex=Math.min(this.prefixSumValidIndex,t-1)},e.prototype.changeWhitespace=function(e,t,i){e=0|e,t=0|t,i=0|i;var s=!1;return s=this.changeWhitespaceHeight(e,i)||s,s=this.changeWhitespaceAfterLineNumber(e,t)||s},e.prototype.changeWhitespaceHeight=function(e,t){e=0|e,t=0|t;var i=e.toString();if(this.whitespaceId2Index.hasOwnProperty(i)){var s=this.whitespaceId2Index[i];if(this.heights[s]!==t)return this.heights[s]=t,this.prefixSumValidIndex=Math.min(this.prefixSumValidIndex,s-1),!0}return!1},e.prototype.changeWhitespaceAfterLineNumber=function(t,i){t=0|t,i=0|i;var s=t.toString();if(this.whitespaceId2Index.hasOwnProperty(s)){var r=this.whitespaceId2Index[s];if(this.afterLineNumbers[r]!==i){var h=this.ordinals[r],n=this.heights[r];this.removeWhitespace(t);var a=e.findInsertionIndex(this.afterLineNumbers,i,this.ordinals,h);return this.insertWhitespaceAtIndex(t,a,i,h,n),!0}}return!1},e.prototype.removeWhitespace=function(e){e=0|e;var t=e.toString();if(this.whitespaceId2Index.hasOwnProperty(t)){var i=this.whitespaceId2Index[t];return delete this.whitespaceId2Index[t],this.removeWhitespaceAtIndex(i),!0}return!1},e.prototype.removeWhitespaceAtIndex=function(e){e=0|e,this.heights.splice(e,1),this.ids.splice(e,1),this.afterLineNumbers.splice(e,1),this.ordinals.splice(e,1),this.prefixSum.splice(e,1),this.prefixSumValidIndex=Math.min(this.prefixSumValidIndex,e-1);for(var t=Object.keys(this.whitespaceId2Index),i=0,s=t.length;i<s;i++){var r=t[i],h=this.whitespaceId2Index[r];h>=e&&(this.whitespaceId2Index[r]=h-1)}},e.prototype.onModelLinesDeleted=function(e,t){e=0|e,t=0|t;var i,s,r;for(s=0,r=this.afterLineNumbers.length;s<r;s++)i=this.afterLineNumbers[s],e<=i&&i<=t?this.afterLineNumbers[s]=e-1:i>t&&(this.afterLineNumbers[s]-=t-e+1)},e.prototype.onModelLinesInserted=function(e,t){e=0|e,t=0|t;var i,s,r;for(s=0,r=this.afterLineNumbers.length;s<r;s++)i=this.afterLineNumbers[s],e<=i&&(this.afterLineNumbers[s]+=t-e+1)},e.prototype.getTotalHeight=function(){return 0===this.heights.length?0:this.getAccumulatedHeight(this.heights.length-1)},e.prototype.getAccumulatedHeight=function(e){e=0|e;var t=Math.max(0,this.prefixSumValidIndex+1);0===t&&(this.prefixSum[0]=this.heights[0],t++);for(var i=t;i<=e;i++)this.prefixSum[i]=this.prefixSum[i-1]+this.heights[i];return this.prefixSumValidIndex=Math.max(this.prefixSumValidIndex,e),this.prefixSum[e]},e.prototype.getAccumulatedHeightBeforeLineNumber=function(e){e=0|e;var t=this.findLastWhitespaceBeforeLineNumber(e);return t===-1?0:this.getAccumulatedHeight(t)},e.prototype.findLastWhitespaceBeforeLineNumber=function(e){e=0|e;for(var t=this.afterLineNumbers,i=0,s=t.length-1;i<=s;){var r=s-i|0,h=r/2|0,n=i+h|0;if(t[n]<e){if(n+1>=t.length||t[n+1]>=e)return n;i=n+1|0}else s=n-1|0}return-1},e.prototype.findFirstWhitespaceAfterLineNumber=function(e){e=0|e;var t=this.findLastWhitespaceBeforeLineNumber(e),i=t+1;return i<this.heights.length?i:-1},e.prototype.getFirstWhitespaceIndexAfterLineNumber=function(e){return e=0|e,this.findFirstWhitespaceAfterLineNumber(e)},e.prototype.getCount=function(){return this.heights.length},e.prototype.getAfterLineNumberForWhitespaceIndex=function(e){return e=0|e,this.afterLineNumbers[e]},e.prototype.getIdForWhitespaceIndex=function(e){return e=0|e,this.ids[e]},e.prototype.getHeightForWhitespaceIndex=function(e){return e=0|e,this.heights[e]},e.prototype.getWhitespaces=function(e){e=0|e;for(var t=[],i=0;i<this.heights.length;i++)t.push({id:this.ids[i],afterLineNumber:this.afterLineNumbers[i],heightInLines:this.heights[i]/e});return t},e}();t.WhitespaceComputer=i});