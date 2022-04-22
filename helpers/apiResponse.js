// exports.successResponse = function(res, msg) {
//     var data = {
//         status: 1,
//         message: msg
//     };
//     return res.status(200).json(data);
// };

exports.successResponse = function(res, msg, data) {
    var responseData = {
        status: 1,
        message: msg,
        data: data
    };
    return res.status(200).json(responseData);
};

exports.errorResponse = function(res, msg, data) {
    var responseData = {
        status: 0,
        message: msg,
        data: data
    };
    return res.status(500).json(responseData);
};

exports.notFoundResponse = function(res, msg, data) {
    var responseData = {
        status: 0,
        message: msg,
        data: data
    };
    return res.status(404).json(responseData);
};