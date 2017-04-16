// Created by LJF on 2017/03/24.

"use strict";

var fs = require('fs');
var path = require('path');
var request = require('request');
var cheerio = require('cheerio');
var mkdirp = require('mkdirp');

function getUrls(){
	var requrl = 'http://www.szu.edu.cn/';
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
	var image = $('img').toArray();
	var len = image.length;
	for(var i = 0; i < len; i++){
		var imgsrc = image[i].attribs.src;
		imgsrc = requrl + imgsrc;
		var filename = parseUrlForFileName(imgsrc);
		downloadImg(imgsrc, filename, function(){
			console.log(filename + ' done');
		});
	}
}

function parseUrlForFileName(address){
	var filename = path.basename(address);
	return filename;
}

function downloadImg(uri, filename, callback){
	request.head(uri, function(err, res, body){
		if(err){
			console.log('err: ' + err);
			return false;
		}
		request(uri).pipe(fs.createWriteStream('images/'+filename)).on('close', callback);		
	});
}