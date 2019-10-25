// Import the ORM to create functions that will interact with the database.
var orm = require('../config/orm.js');

var safeSms = {
    selectAll: function (cb) {
        orm.selectAll(function(res) {
            cb(res);
        });
    },
    insertOne: function (user, cb) {
        orm.insertOne(user, function(res) {
            cb(res);
        });
    },
    updateOne: function (user, cb) {
        orm.updateOne(user, function(res) {
            cb(res);
        });
    }
};

// Export the database for controller
module.exports = safeSms;