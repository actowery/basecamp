var mongoose = require("mongoose");

//schema will have additional components in the future
var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ]
});

module.exports = mongoose.model("Camp", campSchema);

