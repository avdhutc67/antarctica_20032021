const {promisify} = require("util");
const constant = appRequire('constant');
const http = require('http');
const fetch = require('node-fetch');
const convert = require('xml-js');
//const CurlRequest = require('curl-request');
var xml2js = require('xml2js');
var ltrim = require( 'ltrim' );
var rtrim = require( 'rtrim' );
var striptags = require('striptags');

exports.assignTempVars = function(tempVars) {
    var templateVars = {};
    for (const [key, temp_varsvalue] of Object.entries(tempVars)){
      templateVars[key] = temp_varsvalue;
    };

    return templateVars;
}

exports.capitalizeFLetter = function(inputText){
    if(typeof inputText !== 'undefined' && inputText !== null){
       let txtName = inputText[0].toUpperCase()+inputText.slice(1);
        return txtName; 
    }else{
        return inputText;
    }
}

exports.capitalizeEWLetter = function(inputText){
    let splitStr = inputText.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
   // Directly return the joined string
   return splitStr.join(' ').replace(/&Amp;/ , '&'); 
}

exports.htmlEntities = function(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}



exports.getPagination = function(total, pgNo, pgUrl, pgNoPerPage, limit){
    var totalPgCnt = Math.ceil(total / limit);
     var pagination = {};
     pagination['total'] = total;
     pagination['totalPgCnt'] = totalPgCnt;
     pagination['pageUrl'] = pgUrl;
     pagination['pageNo'] = pgNo;
    //console.log(pagination);
    var pages = Math.ceil(total / limit);
    var tot = parseInt(pgNo) + pgNoPerPage;
    var nxtpg = parseInt(pgNo) + 1;
    var prevpg = parseInt(pgNo) - 1;
   //console.log("pgNo",pgNo);
    //console.log("nxtpg",nxtpg);

     if((pgNo - 1) % pgNoPerPage == 0){
        //console.log("inside if");
         strt = pgNo;
         lst = tot;
     }
    else{
        var cal_no = (pgNoPerPage * Math.round(pgNo / pgNoPerPage));
         strt = cal_no - 1;
        lst = cal_no + 2;
        tot = lst;
        lst = cal_no + 2;
        tot = lst;
        //console.log("strt",tot);
     }
     pagination['previous'] = (pgNo == 1) ? '' : pgUrl.concat(prevpg);

    pagination['pages'] = [];
    for(let i = strt; i < lst; i++){
         if(i <= pages){
             pagination['pages'][i] = pgUrl.concat(i);
         }
     }
     pagination['next'] = (pgNo == pages) ? '': pgUrl.concat(nxtpg);
     return pagination;

}

