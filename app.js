var express = require("express");
var app = express();

app.set("view engine","ejs");

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/camps", function(req,res){
    var camps = [
        {name: "Salmon Creek", image: "https://farm1.staticflickr.com/732/32796623146_24b830c64c.jpg"},
        {name: "Granite Hill", image: "https://farm4.staticflickr.com/3347/3445361564_d68d677d58.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8320/8034434969_1b942bdf2a.jpg"}
    ]
    res.render("camps",{camps:camps});
});


app.listen(process.env.PORT,process.env.IP, function(){
    console.log("baseCamp running");
});