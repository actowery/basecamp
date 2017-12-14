var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//temp array of cmapgrounds before db is set up
var camps = [
    {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2918/14003454933_966f43860f.jpg"},
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2454/32025488833_b93439d1ec.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7238/13984176234_ef0c9649d2.jpg"},
    {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2918/14003454933_966f43860f.jpg"},
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2454/32025488833_b93439d1ec.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7238/13984176234_ef0c9649d2.jpg"},
    {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2918/14003454933_966f43860f.jpg"},
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2454/32025488833_b93439d1ec.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7238/13984176234_ef0c9649d2.jpg"},
    {name: "Salmon Creek", image: "https://farm3.staticflickr.com/2918/14003454933_966f43860f.jpg"},
    {name: "Granite Hill", image: "https://farm3.staticflickr.com/2454/32025488833_b93439d1ec.jpg"},
    {name: "Mountain Goat's Rest", image: "https://farm8.staticflickr.com/7238/13984176234_ef0c9649d2.jpg"}
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