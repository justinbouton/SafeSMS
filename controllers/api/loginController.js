// TESTING with bcrypt
const config = require('../../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../../config/connection');
// TESTING with bcrypt

// Load User and Login schemas to access DB
const User = require('../../models/usersSchema');
const Login = require('../../models/loginSchema');

// TESTING with bcrypt


const authenticate = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username }).lean();
        if (user && bcrypt.compareSync(password, user.hash)) {
            const { hash, ...userWithoutHash } = user.toObject();
            const token = jwt.sign({ sub: user.id }, config.secret);
            return {
                ...userWithoutHash,
                token
            };
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

module.exports = {
    authenticate: authenticate
    // getUsers: getUsers,
    // getUserById: getUserById,
    // createUser: createUser,
    // updateUser: updateUser,
    // deleteUser: deleteUser
}
// TESTING with bcrypt


// const getUsers = async (req, res, next) => {
//     try {

//         let users = await User.find({}).lean();
// console.log("Retreive users from DB")
//         if (users.length > 0) {
//             console.log("Render Users page")
//             return res
//                 .status(200)
//                 .render("users", { users })
//         } else if (users.length <= 0) {
//             console.log("No users found")
//             return res.render("users")
//         }

//         return res.status(404).json({
//             'code': 'BAD_REQUEST_ERROR',
//             'description': 'No users found in the system'
//         });
//     } catch (error) {
//         return res.status(500).json({
//             'code': 'SERVER_ERROR',
//             'description': 'something went wrong, Please try again'
//         });
//     }
// }

// const getUserById = async (req, res, next) => {
//     try {
//         let reqParamsId = req.params.id
//         console.log("\ngetUserById: " + reqParamsId)
//         // let user = await User.findById(reqParamsId).lean();5dca0d82c65e1348c1961097
//         let user = await User.findById(reqParamsId).lean();
//         if (user) {

//             // Need to setup db.chat with Id as the array for messaging
//             // Get static db.chat.:id which include all correspondence
//             console.log("retreiving chat messages");
//             // let messages = await Login.findById(reqParamsId).lean();
//             let messages = await Login.find({ userId: reqParamsId }).lean(); // WORKING
//             let noMessages = false;
//             if (messages.length === 0) {
//                 // usersLogin appends "No user";
//                 console.log("No messages found")
//                 noMessages = "true";
//             }

//             return res
//                 .status(200)
//                 .render("usersLogin", { messages, noMessages })
//                 // 'messages': `user with id ${reqParamsId} fetched successfully`,
//                 // 'data': user
//         }

//         return res.status(404).json({
//             'code': 'BAD_REQUEST_ERROR',
//             'description': 'No users found in the system'
//         });

//     } catch (error) {

//         return res.status(500).json({
//             'code': 'SERVER_ERROR',
//             'description': 'something went wrong, Please try again'
//         });
//     }
// }

// const createUser = async (req, res, next) => {

//     try {        
//         const {
//             created,
//             modified,
//             firstName,
//             lastName,
//             email,
//             phone
//         } = req.body;

//         const name = firstName && lastName;

//         if (name === undefined || name === '') {
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'name is required',
//                 'field': 'name'
//             });
//         }

//         if (email === undefined || email === '') {
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'email is required',
//                 'field': 'email'
//             });
//         }


//         let isEmailExists = await User.findOne({
//             "email": email
//         }).lean();

//         if (isEmailExists) {
//             return res.status(409).json({
//                 'code': 'ENTITY_ALREAY_EXISTS',
//                 'description': 'email already exists',
//                 'field': 'email'
//             });
//         }

//         const temp = {
//             created: created,
//             modified: modified,
//             firstName: firstName,
//             lastName: lastName,
//             email: email,
//             phone: phone
//         }

//         let newUser = await User.create(temp);

//         if (newUser) {
//             console.log("User created successfully:")
//             console.log(temp);
//             console.log("Refreshing page") // See newUser.js

//             return res.status(201).json({
//                 'message': 'user created successfully',
//                 'data': newUser
//             });
//         } else {
//             throw new Error('something went worng');
//         }
//     } catch (error) {
//         return res.status(500).json({
//             'code': 'SERVER_ERROR',
//             'description': 'something went wrong, Please try again. ERROR: ' + error
//         });
//     }
// }

// const updateUser = async (req, res, next) => {
//     try {


//         const userId = req.params.id;

//         const {
//             name,
//             email
//         } = req.body;

//         if (name === undefined || name === '') {
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'name is required',
//                 'field': 'name'
//             });
//         }

//         if (email === undefined || email === '') {
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'email is required',
//                 'field': 'email'
//             });
//         }


//         let isUserExists = await User.findById(userId).lean();

//         if (!isUserExists) {
//             return res.status(404).json({
//                 'code': 'BAD_REQUEST_ERROR',
//                 'description': 'No user found in the system'
//             });
//         }

//         const temp = {
//             name: name,
//             email: email
//         }

//         let updateUser = await User.findByIdAndUpdate(userId, temp, {
//             new: true
//         }).lean();

//         if (updateUser) {
//             return res.status(200).json({
//                 'message': 'user updated successfully',
//                 'data': updateUser
//             });
//         } else {
//             throw new Error('something went worng');
//         }
//     } catch (error) {

//         return res.status(500).json({
//             'code': 'SERVER_ERROR',
//             'description': 'something went wrong, Please try again'
//         });
//     }
// }

// const deleteUser = async (req, res, next) => {
//     try {
//         let user = await User.findByIdAndRemove(req.params.id).lean();
//         if (user) {
//             return res.status(204).json({
//                 'message': `user with id ${req.params.id} deleted successfully`
//             });
//         }

//         return res.status(404).json({
//             'code': 'BAD_REQUEST_ERROR',
//             'description': 'No users found in the system'
//         });

//     } catch (error) {

//         return res.status(500).json({
//             'code': 'SERVER_ERROR',
//             'description': 'something went wrong, Please try again'
//         });
//     }
// }

// module.exports = {
//     getUsers: getUsers,
//     getUserById: getUserById,
//     createUser: createUser,
//     updateUser: updateUser,
//     deleteUser: deleteUser
// }