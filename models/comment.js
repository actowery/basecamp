var mongoose = require("mongoose");
//saving id and username together, thanks noSQL!
var commentSchema = mongoose.Schema({
    text:String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});


module.exports = mongoose.model("Comment", commentSchema);