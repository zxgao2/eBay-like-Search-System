var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(process.env.PORT);
});

app.get('/index.htm', function (req, res) {
  res.sendFile( __dirname + "/" + "index.htm" );
});

app.get('/ebayproduct', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");


  // 输出 JSON 格式
  var url =  "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=zhuoxion-zxg-PRD-b16e557a4-cd8279a0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&paginationInput.entriesPerPage=50";
  var response = req.query;
  var key = Object.keys(response);
  for (var i=0; i<key.length; i++)
  {
    url+="&"+key[i]+"="+response[key[i]];
  }
  url+="&"+"outputSelector(0)=SellerInfo" +"&"+"outputSelector(1)=StoreInfo";
  var http=require('http');
  //get 请求外网
  http.get(url,function(req,res1){
    var html='';
    req.on('data',function(data){
      html+=data;
    });
    req.on('end',function(){
      // console.info(html);
      res.end(html);
    });
  });

  // console.log(url);
//    res.end(JSON.stringify(response));
})
app.get('/details', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

  var response = req.query;
  var key = Object.keys(response);
  // 输出 JSON 格式
  console.log(key);
  var url =  "http://open.api.ebay.com/shopping?callname=GetSingleItem&responseencoding=JSON&appid=zhuoxion-zxg-PRD-b16e557a4-cd8279a0&siteid=0&version=967&ItemID="+response[key[0]]+"&IncludeSelector=Description,Details,ItemSpecifics";

  var http=require('http');
  //get 请求外网
  http.get(url,function(req,res1){
    var html='';
    req.on('data',function(data){
      html+=data;
    });
    req.on('end',function(){
      // console.info(html);
      res.end(html);
    });
  });

  // console.log(url);
//    res.end(JSON.stringify(response));
})

app.get('/photo', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

  var response = req.query;
  var key = Object.keys(response);
  // 输出 JSON 格式
  console.log(key);
  var url =  "https://www.googleapis.com/customsearch/v1?q="+response[key[0]]+"&cx=007993456072540196479:7oadhcvytee"+
      "&imgSize=huge&num=8&searchType=image&key=AIzaSyCDfR1XQmFXuA7BmHWk57Se5erfd9kEi1Y";

  var http=require('https');
  //get 请求外网
  http.get(url,function(req,res1){
    var html='';
    req.on('data',function(data){
      html+=data;
    });
    req.on('end',function(){
      // console.info(html);
      res.end(html);
    });
  });

  // console.log(url);
//    res.end(JSON.stringify(response));
})

app.get('/similar', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

  var response = req.query;
  var key = Object.keys(response);
  // 输出 JSON 格式
  console.log(key);
  var url =  "http://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getSimilarItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=zhuoxion-zxg-PRD-b16e557a4-cd8279a0&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&itemId="+response[key[0]]+"&maxResults=20";
  var http=require('http');
  //get 请求外网
  http.get(url,function(req,res1){
    var html='';
    req.on('data',function(data){
      html+=data;
    });
    req.on('end',function(){
      // console.info(html);
      res.end(html);
    });
  });

  // console.log(url);
//    res.end(JSON.stringify(response));
})
var server = app.listen(process.env.PORT||8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

