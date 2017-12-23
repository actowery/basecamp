var mongoose = require("mongoose");
var Camp = require("./models/camp");
var Comment = require("./models/comment");
var data = [
    {
        name: "Cloud's Rest", image: "https://farm3.staticflickr.com/2795/4474826039_0954dbf8a1.jpg",
        desc: "Nice down slope make you feel like yo uare resting on a cloud"
    },    
    {
        name: "Devil's Drop", image: "https://farm1.staticflickr.com/50/112986492_9842132019.jpg",
        desc: "Don't look down"
    },    
    {
        name: "Hillertops Resort", image: "https://farm6.staticflickr.com/5139/5510055191_52e477c1a7.jpg",
        desc: "Family friendly adventures await"
    },
]


function seedDB(){
    //remove all camps
    Camp.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed");
        //add some camps
        data.forEach(function(seed){
            Camp.create(seed, function(err,data){
                if(err){
                    console.log(err);
                } else {
                    console.log("added");
                    Comment.create(
                        {
                            text:"This place is great!",
                            author: "Homer"
                        }, function(err, comment) {
                            if(err){
                                console.log(err);
                            } else {
                            data.comments.push(comment);
                            data.save();
                            console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });   

}

module.exports = seedDB;
