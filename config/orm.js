// Import mongoose connection
var connection = require('./connection');

var orm = {
    // SELECT ALL from users
    selectAll: function (cb) {
        console.log("seclectAll")
        var queryString = 'db.users.find()';
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        });
    },

    // INSERT INTO user;
    insertOne: function (user, cb) {
        console.log("orm: " + user);
        var queryString = `db.users.insertOne({ "firstName":"fnTestUser", "lastName":"lnTestUser" })`;
console.log("orm qStr" + queryString)
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            console.log(result);
        cb(result)
        });
    },

    // UPDATE burger table, set devoure true, where id = x;
    updateOne: function (burger_id, cb) {
        var queryString = 'UPDATE burger SET devoured=true WHERE id=' + burger_id

        console.log('ORM-QueryString: ' + queryString);

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result)
        });
    }
};

        module.exports = orm;