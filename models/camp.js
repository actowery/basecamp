var mongoose = require("mongoose");

//schema will have additional components in the future
var campSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    desc: String,
    location: String,
    lat: Number,
    lng: Number,
    createdAt: {type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ]
});

module.exports = mongoose.model("Camp", campSchema);

