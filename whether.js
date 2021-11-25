const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');

const app=express();
app.use(bodyparser.urlencoded({extended : true}));

app.get("/",function(req,res){
   res.sendFile(__dirname + "/search.html");
});

app.post("/",function(req,res){
  const city = (req.body.cityname)
  const apikey = "3646a1dc2aacbebeb406434df6041f7c";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit;
  https.get(url,function(response) {

       console.log(response.statusCode);

       response.on("data",function(data){
        const whetherData = JSON.parse(data)
      //  console.log(whetherData);
        const temp = whetherData.main.temp;
        const description = whetherData.weather[0].description;
        const image = whetherData.weather[0].icon;
        res.write("<h1>Temprature of "+city+" is "+temp);
        res.write("<h3>Whether Description for "+city+" is "+description);
        res.write("<img src = https://openweathermap.org/img/wn/"+image+"@2x.png>");
        res.send();
});

});
});

app.listen(3000,function(){
  console.log("Server is started on 3000 port");
});
