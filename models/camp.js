var mongoose = require("mongoose");

//schema will have additional components in the future
var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
});

module.exports = mongoose.model("Camp", campSchema);

