!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.DocumentOutliner=e():t.DocumentOutliner=e()}(window,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="bundle",n(n.s=1)}([function(t,e,n){"use strict";n.r(e);var i=function(){function t(t){this.node=null,this.implied=!1,this.heading=null,this.parent=null,this.sections=[],this.setNode(t)}return t.prototype.getNode=function(){return this.node},t.prototype.setNode=function(t){this.node=t},t.prototype.getImplied=function(){return this.implied},t.prototype.setImplied=function(t){this.implied=t},t.prototype.getHeading=function(){return this.heading},t.prototype.setHeading=function(t){this.heading=t},t.prototype.getParent=function(){return this.parent},t.prototype.setParent=function(t){this.parent=t},t.prototype.getSections=function(){return this.sections},t.prototype.addSection=function(t){t.parent=this,this.sections.push(t)},t}(),r=function(){function t(t,e){void 0===e&&(e=null),this.sections=[],this.parentSection=null,this.node=null,this.outline=this,this.setNode(t),e&&this.addSection(e)}return t.prototype.getOutline=function(){return this.outline},t.prototype.setOutline=function(t){this.outline=t},t.prototype.getSections=function(){return this.sections},t.prototype.setSections=function(t){this.sections=t},t.prototype.addSection=function(t){this.sections.push(t)},t.prototype.setParentSection=function(t){this.parentSection=t},t.prototype.getParentSection=function(){return this.parentSection},t.prototype.getLastSection=function(){return this.sections[this.sections.length-1]},t.prototype.setNode=function(t){this.node=t},t.prototype.getNode=function(){return this.node},t}(),o=function(t){return!(!t||!t.nodeName)},s=function(t,e){return null!==t&&(t instanceof HTMLElement&&(o(t)&&e.test(t.tagName.toLowerCase())))},u=function(t){return s(t,/^(blockquote|body|details|fieldset|figure|td)$/)},c=function(t){return s(t,/^(article|aside|nav|section)$/)},l=function(t){return s(t,/^(h1|h2|h3|h4|h5|h6)$/)},h=function(t){return null!==t&&(t instanceof HTMLElement&&(o(t)&&t.hasAttribute("hidden")))},a=function(t){return t instanceof HTMLElement&&l(t)?parseInt(t.tagName.toLowerCase().substr(1)):0},p=function(){function t(t,e){this.anchor=1,this.html="",this.outline=t,this.options=Object.assign({},{link:!0,listType:"ol",levelLimit:99,listClassName:"",itemClassName:"",anchorName:"header-$1"},e)}return t.prototype.getHtml=function(){if(!this.outline)throw new Error("No sectioning contents.");return this.build(this.outline.getOutline(),1),this.html},t.prototype.getListType=function(t){var e="ol";if("string"==typeof this.options.listType){if(/ol|ul/.test(this.options.listType))return this.options.listType}else if(Array.isArray(this.options.listType)){/ol|ul/.test(this.options.listType[0])&&(e=this.options.listType[0]);var n=this.options.listType[t];if(/ol|ul/.test(n))return n}return e},t.prototype.build=function(t,e){if(!(e>this.options.levelLimit)){var n=this.hasHeading(t.getSections());if(n){var i=this.options.listClassName?" "+this.options.linkClassName:"";this.html+="<"+this.getListType(e-1)+' class="level-'+e+i+'">'}this.buildSections(t.getSections(),n,e),n&&(this.html+="</"+this.getListType(e)+">")}},t.prototype.buildSections=function(t,e,n){var i=this;t.forEach(function(t){var r=t.getHeading();if(l(r)){var o=i.options.itemClassName?' class="'+i.options.itemClassName+'"':"";i.options.link?i.html+="<li"+o+">"+i.buildLink(r):i.html+="<li"+o+">"+r.innerText}else i.html+="<li>";if(t.getSections()){var s=e?n+1:n;i.build(t,s)}i.html+="</li>"})},t.prototype.buildLink=function(t){var e=this.options.linkClassName?' class="'+this.options.linkClassName+'"':"",n=this.options.anchorName.replace(/\$1/,this.anchor.toString());return t.id?n=t.id:t.id=n,this.anchor++,'<a href="#'+n+'"'+e+">"+t.innerText+"</a>"},t.prototype.hasHeading=function(t){var e=!1;return t.forEach(function(t){t.getHeading()&&(e=!0)}),e},t}(),f=function(){function t(e){this.currentOutlineTarget=null,this.currentSection=null,this.stack=[],this.rootNode="string"==typeof e?document.querySelector(e):e,t.walk(this.rootNode,this.enter.bind(this),this.exit.bind(this))}return t.prototype.getOutlineObject=function(){return!!this.currentOutlineTarget&&this.currentOutlineTarget.getOutline()},t.prototype.makeList=function(t,e){var n=this.getOutlineObject();if(!n)throw new Error("No sectioning contents.");if(!t)throw new TypeError("Invalid options: target empty.");var i=new p(n,e).getHtml();if("string"==typeof t)[].forEach.call(document.querySelectorAll(t),function(t){t.innerHTML=i});else if(t instanceof NodeList)[].forEach.call(t,function(t){t.innerHTML=i});else{t.innerHTML=i}},t.walk=function(t,e,n){var i=t;t:for(;i;)if(e(i),i.firstChild)i=i.firstChild;else for(;i;)if(n(i),i===t)i=null;else{if(i.nextSibling){i=i.nextSibling;continue t}i=i.parentNode}},t.prototype.enter=function(t){var e=this.getStackTopNode();if(!e||!l(e.getNode())&&!h(e.getNode()))if(h(t))this.stack.push(new r(t));else{if(c(t))return null!==this.currentOutlineTarget&&(this.currentSection&&!this.currentSection.getHeading()&&(this.currentSection.setHeading(new Text("No title.")),this.currentSection.setImplied(!0)),this.stack.push(this.currentOutlineTarget)),this.currentOutlineTarget=new r(t),this.currentSection=new i(t),void this.currentOutlineTarget.setOutline(new r(this.currentOutlineTarget.getNode(),this.currentSection));if(u(t)||t===this.rootNode)return null!==this.currentOutlineTarget&&this.stack.push(this.currentOutlineTarget),this.currentOutlineTarget=new r(t),this.currentOutlineTarget.setParentSection(this.currentSection),this.currentSection=new i(t),void this.currentOutlineTarget.setOutline(new r(this.currentOutlineTarget.getNode(),this.currentSection));if(l(t)){if(this.currentSection&&!this.currentSection.getHeading())this.currentSection.setHeading(t);else if(this.currentOutlineTarget&&(this.currentOutlineTarget.getOutline().getLastSection().getImplied()||a(t)<=a(this.currentOutlineTarget.getOutline().getLastSection().getHeading()))){var n=new i(t);this.currentOutlineTarget.getOutline().addSection(n),this.currentSection=n,this.currentSection.setHeading(t)}else{var o=!1,s=this.currentSection,p=0;do{if(a(t)>a(s.getHeading())){n=new i(t);s.addSection(n),this.currentSection=n,this.currentSection.setHeading(t),o=!0}s=s.getParent(),p++}while(!o&&p<99)}this.stack.push(new r(t))}else;}},t.prototype.exit=function(t){var e=this,n=this.getStackTopNode();if(n&&n.getNode()===t&&this.stack.pop(),!n||!l(n.getNode())&&!h(n.getNode())){if(c(t)&&this.stack.length>0){this.currentSection&&!this.currentSection.getHeading()&&(this.currentSection.setHeading(new Text("No title.")),this.currentSection.setImplied(!0));var i=this.currentOutlineTarget;return this.currentOutlineTarget=this.stack.pop(),this.currentSection=this.currentOutlineTarget.getOutline().getLastSection(),void i.getOutline().getSections().forEach(function(t){e.currentSection&&e.currentSection.addSection(t)})}if((u(t)||t===this.rootNode)&&this.stack.length>0)return this.currentSection&&!this.currentSection.getHeading()&&(this.currentSection.setHeading(new Text("No title.")),this.currentSection.setImplied(!0)),this.currentOutlineTarget&&(this.currentSection=this.currentOutlineTarget.getParentSection()),void(this.currentOutlineTarget=this.stack.pop());(u(t)||t===this.rootNode||c(t))&&this.currentSection&&!this.currentSection.getHeading()&&(this.currentSection.setHeading(new Text("No title.")),this.currentSection.setImplied(!0))}},t.prototype.getStackTopNode=function(){return this.stack[this.stack.length-1]},t}();e.default=f},function(t,e,n){"use strict";n.r(e);var i=n(0);jQuery.fn.documentOutliner=function(t,e){return new i.default(this.get(0)).makeList(t,e),this}}]).default});