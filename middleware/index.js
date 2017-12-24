var Camp = require("../models/camp")
var Comment = require("../models/comment")
//trying a different syntax
var middlewareObj = {};

middlewareObj.checkOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, foundCamp){
            if(err){
                res.redirect("back");
            } else {
                //check user ownership
                if(foundCamp.author.id.equals(req.user._id)){
                    next(); 
                } else {
                    res.redirect("back");
                }
            }
        });        
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                //check user ownership
                if(foundComment.author.id.equals(req.user._id)){
                    next(); 
                } else {
                    res.redirect("back");
                }
            }
        });        
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};


module.exports = middlewareObj;