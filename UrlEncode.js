// Created by LJF on 2017/03/24.

"use strict";

String.prototype.UrlEncodeGB2312 = function () { 
var str = this; 
str = str.replace(/./g, function (sHex) { 
window.EnCodeStr = ""; 
window.sHex = sHex; 
window.execScript('window.EnCodeStr=Hex(Asc(window.sHex))', "vbscript"); 
return window.EnCodeStr.replace(/../g, "%{blogcontent}amp;"); 
}); 
return str; 
} 
String.prototype.UrlEncode = function () { 
var s = escape(this); 
var sa = s.split("%"); 
var retV = "", retE = ""; 
if (sa[0] != "") { 
retV = sa[0]; 
} 
for (var i = 1; i < sa.length; i++) { 
if (sa[i].substring(0, 1) == "u") { 
retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5))); 
if (sa[i].length > 4) 
retV += sa[i].substring(5); 
} 
else retV += "%" + sa[i]; 
} 
return retV; 
} 
function Str2Hex(s) { 
var c = ""; 
var n; 
var ss = "0123456789ABCDEF"; 
var digS = ""; 
for (var i = 0; i < s.length; i++) { 
c = s.charAt(i); 
n = ss.indexOf(c); 
digS += Dec2Dig(eval(n)); 
} 
return digS; 
} 
function Dec2Dig(n1) { 
var s = ""; 
var n2 = 0; 
for (var i = 0; i < 4; i++) { 
n2 = Math.pow(2, 3 – i); 
if (n1 >= n2) { 
s += '1'; 
n1 = n1 – n2; 
} 
else 
s += '0'; 
} 
return s; 
} 
function Dig2Dec(s) { 
var retV = 0; 
if (s.length == 4) { 
for (var i = 0; i < 4; i++) { 
retV += eval(s.charAt(i)) * Math.pow(2, 3 – i); 
} 
return retV; 
} 
return -1; 
} 
function Hex2Utf8(s) { 
var retS = ""; 
var tempS = ""; 
var ss = ""; 
if (s.length == 16) { 
tempS = "1110" + s.substring(0, 4); 
tempS += "10" + s.substring(4, 10); 
tempS += "10" + s.substring(10, 16); 
var sss = "0123456789ABCDEF"; 
for (var i = 0; i < 3; i++) { 
retS += "%"; 
ss = tempS.substring(i * 8, (eval(i) + 1) * 8); 
retS += sss.charAt(Dig2Dec(ss.substring(0, 4))); 
retS += sss.charAt(Dig2Dec(ss.substring(4, 8))); 
} 
return retS; 
} 
return ""; 
} 