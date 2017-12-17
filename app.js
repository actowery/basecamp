var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/basecamp");   
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");


//schemas
var campSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Camp = mongoose.model("Camp", campSchema);

// Camp.create(
//     {name: "Granite Hill", image: "https://farm3.staticflickr.com/2454/32025488833_b93439d1ec.jpg"},
//     function(err,camp){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("NEW CAMP: ");
//             console.log(camp);
//         }
//     });




app.get("/", function(req,res){
    res.render("landing");
});

app.get("/camps", function(req,res){
    //get all camps from db
    Camp.find({},function(err, allCamps){
        if(err){
            console.log(err)
        } else{
            res.render("camps",{camps:allCamps});
        }
    });
//    res.render("camps",{camps:camps});
});
//REST convention
app.post("/camps", function(req,res){
    //get data and add to array
    var newCamp = req.body.camp;
    //create new camp and save to db
    Camp.create(newCamp,function(err, camp){
        if(err){
            console.log(err);
        } else{
            res.redirect("/camps");
        }
    });

});

app.get("/camps/new", function(req, res) {
   res.render("new"); 
});
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("baseCamp running");
});