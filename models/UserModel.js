var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
}, {timestamps: true});

//Virtual user for view
UserSchema.virtual("fullname")
.get(function () {
    return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("User", UserSchema);
