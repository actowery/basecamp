var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//temp array of cmapgrounds before db is set up
var camps = [
    {name: "Salmon Creek", image: "https://farm1.staticflickr.com/732/32796623146_24b830c64c.jpg"},
    {name: "Granite Hill", image: "https://farm4.staticflickr.com/3347/3445361564_d68d677d58.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8320/8034434969_1b942bdf2a.jpg"}
]

app.set("view engine","ejs");

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/camps", function(req,res){

    res.render("camps",{camps:camps});
});
//REST convention
app.post("/camps", function(req,res){
    //get data and add to array
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name: name, image: image}
    camps.push(newCamp);
    //redirect back to landing
    res.redirect("/camps");
});

app.get("/camps/new", function(req, res) {
   res.render("new"); 
});
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("baseCamp running");
});