console.log("\n userController.js started");
const messagingController = require('../../controllers/api/messagingController');
const bcrypt = require('bcrypt');
const User = require('../../models/usersSchema');
const Messaging = require('../../models/messagingSchema');

const getUsers = async (req, res, next) => {
    console.log("get user")
    try {

        let users = await User.find({}).lean();
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

        let user = await User.findById(reqParamsId).lean();
        if (user) {
            // Get db.chat.":id" which include all correspondence
            console.log("retreiving chat messages");
            let messages = await Messaging.find({ userId: reqParamsId }).lean();
            let noMessages = false;
            if (messages.length === 0) {
                // usersMessaging appends "No user";
                console.log("No messages found")
                noMessages = true;
            }

            return res
                .status(200)
                .render("usersMessaging", { messages, noMessages })
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

const createAdmin = async (req, res, next) => {
    try {

        // Destructure req.body for firstName, lastName, email, password.
        const { 
            firstName, 
            lastName, 
            email, 
            password,
            phone
        } = req.body
        
        if (!firstName || !lastName || !email || !password || !phone) {
            res.json({ success: false, msg: 'Please fill out all fields.' }); 
        } else {

            // adminExists = await User.find({
            //     email: { email }
            // }).lean()
            // console.log(`adminExists: ${adminExists}`)

            const adminData = {
                'isAdmin': true,
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'password': password,
                'phone': phone
            };

            // save newAdmin
            let newAdmin = await User.create(adminData)

            if (newAdmin) {

                console.log("Admin created successfully:")
                console.log(newAdmin);

                newAdmin.save(function(err) {
                            if (err) {
                              return res.json({success: false, msg: 'Username already exists.'});
                            }
                        })

                return res.status(201).json({
                    'message': 'admin created successfully',
                    'data': newAdmin
                });
            }
        }
    } catch (error) {
        console.log("ERROR: " + error)
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again. ERROR: ' + error
        });
    }
}

const createUser = async (req, res, next) => {
    try {

// // Does not create user if enabled
//         if (!req.body.password) {
//             hash = "null";
//         }

        const {
            hash,
            firstName,
            lastName,
            email,
            phone
        } = req.body;
1

        let userExists = await User.find({ email: { $exists: true }}).lean();
        console.log("UserExist: ")
        console.log((isEmpty(userExists)))


        function isEmpty(value) {
            return (value == null || value.length === 0);
        }

        // if no email adress exist add new user as admin
        if (!isEmpty) {
            // return res.status(200);
            console.log("User exists. Could not create: " + firstName, lastName);
            // return res.status(409).json({
            //     'code': 'ENTITY_ALREAY_EXISTS',
            //     'description': 'email already exists',
            //     'field': 'email'
            // });
        } else {
            console.log("Create user: " + firstName, lastName);
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
                throw new Error('something went wrong');
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
        // }).lean();

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
console.log(`\n UserID to update: ${userId}`)
        const {
            firstName,
            lastName,
            email,
            phone
        } = req.body;

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


        let isUserExists = await User.findById(userId).lean();
console.log("\n Does user exist, if so old data: " + JSON.stringify(isUserExists))
        if (!isUserExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No user found in the system'
            });
        }

        const temp = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone
        }
        
console.log("\n New updated data: " + JSON.stringify(temp))
        let updateUser = await User.findByIdAndUpdate(userId,
            
// TODO     //  NEEDS CLEAN UP ISSUE WITH JSON PASSING THROUGH
            
            { firstName: temp.firstName, lastName: temp.lastName, email: temp.email, phone: temp.phone },
            { new: true }
          );

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
        let user = await User.findByIdAndRemove(req.params.id).lean();
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

const loginUser = async (req, res, next) => {
    console.log("userController loginUser")
    try {

        // Capture usename and password
        const { email, password } = req.body
        const user = email;
        console.log(`\nTEST email: ${email} \npassword: ${password}\n`)

        // Does user exist
        let isEmailExists = User.lean({
            email: email
        });

        if (!isEmailExists) {
            return res.status(409).json({
                'code': 'ENTITY_DOES_NOT_EXIST',
                'description': 'email does not exist',
                'field': 'email'
            });
        } else {
        
// TESTING 
const dbPassword = "$2b$10$MZom7tv.2pPcKsod.WSO4.gAjIl5CikNizqFVD6z/8yrkElXhTedC"
        if (user && bcrypt.compareSync(dbPassword, password)) {
            const { password, ...userWithoutHash } = user.toObject();
            const token = jwt.sign({ sub: user.id }, config.secret);
            return {
                ...userWithoutHash,
                token
            };
        }
        // res.render("users")
        return res.status(200).json({'description': 'Great success'})
    }
    } catch (error) {
        console.log("ERROR: " + error)
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        })
    }
}

module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    createAdmin: createAdmin,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    loginUser: loginUser
}