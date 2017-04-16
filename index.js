// Created by LJF on 2017/03/24.

"use strict";

var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var mkdirp = require('mkdirp');
var express = require('express');
var app = express();

function getUrls(){
	var requrl = 'http://www.szu.edu.cn/board/';
	var dir = './images';
	mkdirp(dir, function(err){
		if(err){
			console.log(err);
		}else{
			console.log(dir + ' folder was created successfully');
		}
	});
	return requrl;
}

var requrl = getUrls();

// Crawl the content of webpage
request(requrl, function (error, response, body) {
    if(!error && response.statusCode == 200){
      acquireData(body);
    }
});

function acquireData(data){
	var $ = cheerio.load(data);
	var contents = $('tr').children('td');
	var text = contents.text();
	var match = text.match(/\d{4}-((\d{2})|(\d{1}))-((\d{2})|(\d{1}))/g);
	
	var find = new Array();
	var len = match.length / 4;
	for(var i = 0; i < len; i++){
		if(match[i] == ''){

		}else{
			find.push(match[i]);
		}
	}
	console.log(text);
	app.get('/', function(req, res) {
		    res.send(JSON.stringify(text));
		}).listen('8800', '127.0.0.1');
	console.log('listening at 8800');
}

// function parseUrlForFileName(address){
// 	var filename = path.basename(address);
// 	return filename;
// }

// var downloadImg = function(uri, filename, callback){
// 	request.head(uri, function(err, res, body){
// 		if(!body){
			
// 		}
// 		if(err){
// 			console.log('err: ' + err);
// 			return false;
// 		}
// 		request(uri).pipe(fs.createWriteStream('images/'+filename)).on('close', callback);		
// 	});
// }

