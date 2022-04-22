const User = require("../models/UserModel");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
var mongoose = require("mongoose");
// mongoose.set("useFindAndModify", false);

function UserData(data) {
    this.id = data._id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
}

/**
 * Get all users
 * @returns {Object}
 */
exports.get = [
    function(req, res) {
        try {
            User.find().then((users) => {
                return apiResponse.successResponse(res, "Get data success", users);
            });
        } catch (err) {
            return apiResponse.errorResponse(res, err);
        }
    }
]

/**
 * Add new user
 */
exports.add = [
    body("firstName", "First name must not be empty.").isLength({min: 1}).trim(),
    body("lastName", "Last name must not be empty.").isLength({min: 1}).trim(),
    sanitizeBody("*").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            var user = new User(
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName
                });
            if (!errors.isEmpty()) {
                return apiResponse.errorResponse(res, "Validation Error!!!!", errors.array().map(errData => {
                    const dataMapped = {};
                    dataMapped.param = errData.param;
                    dataMapped.value = errData.value;
                    dataMapped.msg = errData.msg;
                    return dataMapped;
                }));

            } else {
                //Save user
                user.save(function (err) {
                    if (err) {return apiResponse.errorResponse(res, err);}
                    let userData = new UserData(user);
                    return apiResponse.successResponse(res, "User add success", userData);
                });
            }
        } catch (err) {
            
        }
    }
]

/**
 * Update user
 */
exports.update = [
    body("firstName", "First name must not be empty.").isLength({min: 1}).trim(),
    body("lastName", "Last name must not be empty.").isLength({min: 1}).trim(),
    sanitizeBody("*").escape,
    (req, res) => {
        try {
            console.log("id:" + req.params.id);
            const errors = validationResult(req);
            var user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                _id: req.params.id
            })
            if (!errors.isEmpty()) {
                return apiResponse.errorResponse(res, msg, errors.array());
            } else {
                //Check user by _id
                if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                    return apiResponse.errorResponse(res, "Not found user id: " + req.params.id);
                } else {
                    User.findById(req.params.id, function(err, foundUser) {
                        if (foundUser === null) {
                            return apiResponse.errorResponse(res, "Not found user id: " + req.params.id);
                        } else {
                            User.findByIdAndUpdate(req.params.id, user, {}, function(err) {
                                if (err) {
                                    return apiResponse.errorResponse(res, msg, err);
                                } else {
                                    let userData = new UserData(user);
                                    return apiResponse.successResponse(res, "Update user data success", userData);
                                }
                            });
                        }
                    });
                }
            }
        } catch (err) {
            return apiResponse.errorResponse(res, "Something error", err);
        }
    }
];

/**
 * Delete user by id
 * 
 */
exports.delete = [
    (req, res) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return apiResponse.errorResponse(res, "Invalid id: " + req.params.id);
        }
        try {
            User.findByIdAndRemove(req.params.id, function(err) {
                if (err) {
                    return apiResponse.errorResponse(res, "Invalid id: " + req.params.id, err);
                }
                return apiResponse.successResponse(res, "Delete user succcess id: " + req.params.id);
            });
        } catch (err) {
            return apiResponse.errorResponse(res, "Something error", err);
        }
    }
]
