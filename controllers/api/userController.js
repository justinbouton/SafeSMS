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
        console.log("\ngetUserById: " + reqParamsId)
        let user = await User.findById(reqParamsId);
        if (user) {

            // Get db.chat.":id" which include all correspondence
            console.log("retreiving chat messages");
            let messages = await Messaging.find({ userId: reqParamsId });
            let noMessages = false;
            if (messages.length === 0) {
                // usersMessaging appends "No user";
                console.log("No messages found")
                noMessages = "true";
            }

            return res
                .status(200)
                .render("usersMessaging", { messages, noMessages })
                // 'messages': `user with id ${reqParamsId} fetched successfully`,
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

        const hash = "null";  
        const {
            firstName,
            lastName,
            email,
            phone
        } = req.body;


        let UserExists = await User.find({
            email: { $exists: true }
        });
console.log("UserExist: ")
console.log((isEmpty(UserExists)))


function isEmpty(value){
    return (value == null || value.length === 0);
  }
  
// if no email adress exist add new user as admin
if (!isEmpty) {
    // return res.status(200);
    console.log("Admin exists. Could not create: " + firstName, lastName);
    // return res.status(409).json({
    //     'code': 'ENTITY_ALREAY_EXISTS',
    //     'description': 'email already exists',
    //     'field': 'email'
    // });
} else {
    console.log("Create admin: " + firstName, lastName);
    const temp = {
        isAdmin: false,
        hash: hash,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone
    }
    // console.log(temp)

    let newUser = await User.create(temp);

    if (newUser) {
    // if (true) {
        console.log("User created successfully:")
        console.log(temp);
        console.log("Refreshing page") // See newUser.js

        return res.status(201).json({
            'message': 'user created successfully',
            'data': newUser
            // 'data': temp 
        });
    } else {
        throw new Error('something went worng');
    }
}


        // if (name === undefined || name === '') {
        //     return res.status(422).json({
        //         'code': 'REQUIRED_FIELD_MISSING',
        //         'description': 'name is required',
        //         'field': 'name'
        //     });
        // }

        // if (email === undefined || email === '') {
        //     return res.status(422).json({
        //         'code': 'REQUIRED_FIELD_MISSING',
        //         'description': 'email is required',
        //         'field': 'email'
        //     });
        // }


        // let isEmailExists = await User.findOne({
        //     "email": email
        // });

        // if (isEmailExists) {
        //     return res.status(409).json({
        //         'code': 'ENTITY_ALREAY_EXISTS',
        //         'description': 'email already exists',
        //         'field': 'email'
        //     });
        // }

        // const temp = {
        //     isAdmin: false,
        //     hash: hash,
        //     firstName: firstName,
        //     lastName: lastName,
        //     email: email,
        //     phone: phone
        // }
        // // console.log(temp)

        // let newUser = await User.create(temp);

        // if (newUser) {
        // // if (true) {
        //     console.log("User created successfully:")
        //     console.log(temp);
        //     console.log("Refreshing page") // See newUser.js

        //     return res.status(201).json({
        //         'message': 'user created successfully',
        //         'data': newUser
        //         // 'data': temp 
        //     });
        // } else {
        //     throw new Error('something went worng');
        // }
    } catch (error) {
        console.log("ERROR: " + error)
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