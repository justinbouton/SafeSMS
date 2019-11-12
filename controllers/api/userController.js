// console.log("\n userController.js started");
const messagingController = require('../../controllers/api/messagingController');

const User = require('../../models/usersSchema');
const Messaging = require('../../models/messagingSchema');

const getUsers = async (req, res, next) => {
    try {

        let users = await User.find({});
console.log("Retreive users from DB")
        if (users.length > 0) {
            console.log("Render Users page")
            return res
                .status(200)
                .render("users", { users })
        } else if (users.length <= 0) {
            console.log("No users found")
            return res.render("users")
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No users found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getUserById = async (req, res, next) => {
    try {
        let reqParamsId = req.params.id
        console.log("getUserById: " + reqParamsId)
        // let user = await User.findById(reqParamsId);5dca0d82c65e1348c1961097
        let user = await User.findById(reqParamsId);
        if (user) {

            // Need to setup db.chat with Id as the array for messaging
            // Get static db.chat.:id which include all correspondence
            console.log("retreiving userMessages + sendMessages");
            // let userMessage = await Messaging.findById(reqParamsId);
            let userMessage = await Messaging.find({userId: reqParamsId}); // TEST
            let senderMessage = await Messaging.find({userId: "Sender"}); // TEST

console.log(userMessage)
console.log(senderMessage)

            return res
                .status(200)
                .render("usersMessaging", { userMessage, senderMessage })
                // 'userMessage': `user with id ${reqParamsId} fetched successfully`,
                // 'data': user
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No users found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createUser = async (req, res, next) => {

    try {        
        const {
            created,
            modified,
            firstName,
            lastName,
            email,
            phone
        } = req.body;

        const name = firstName && lastName;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (email === undefined || email === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'email is required',
                'field': 'email'
            });
        }


        let isEmailExists = await User.findOne({
            "email": email
        });

        if (isEmailExists) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'email already exists',
                'field': 'email'
            });
        }

        const temp = {
            created: created,
            modified: modified,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        }

        let newUser = await User.create(temp);

        if (newUser) {
            console.log("User created successfully:")
            console.log(temp)
            return res
                .status(201).json({
                'message': 'user created successfully',
                'data': newUser
                })
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again. ERROR: ' + error
        });
    }
}

const updateUser = async (req, res, next) => {
    try {


        const userId = req.params.id;

        const {
            name,
            email
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (email === undefined || email === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'email is required',
                'field': 'email'
            });
        }


        let isUserExists = await User.findById(userId);

        if (!isUserExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No user found in the system'
            });
        }

        const temp = {
            name: name,
            email: email
        }

        let updateUser = await User.findByIdAndUpdate(userId, temp, {
            new: true
        });

        if (updateUser) {
            return res.status(200).json({
                'message': 'user updated successfully',
                'data': updateUser
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let user = await User.findByIdAndRemove(req.params.id);
        if (user) {
            return res.status(204).json({
                'message': `user with id ${req.params.id} deleted successfully`
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No users found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}



    // console.log("Render Status page");
    // // Query: In our database, go to the users collection, then "find" everything
    // User.find({}).sort('firstName').exec (function(err, users) {
    //     // Log any errors if the server encounters one
    //     if (err) {
    //       console.log(err);
    //     }
    //     // Otherwise, send the result of this query to the browser
    //     else {
    //         console.log("Reading from users DB")
    //     // Once the DB query completes
    //         res.render("status", {
    //             users
    //         });
    //         //   res.json(users);
    //     }
        
    // });