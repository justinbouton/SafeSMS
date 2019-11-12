// console.log("\n messagingController.js started");

const Messaging = require('../../models/messagingSchema');

const getMessagings = async (req, res, next) => {
    try {

        let messages = await Messaging.find({});

        if (messages.length > 0) {
            console.log("Rendering messaging page")
            return res
                .status(200)
                .render("alerts", { messages })
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No messages found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getMessagingById = async (req, res, next) => {
    try {
        console.log("getMessagingById: ")

        let messaging = await Messaging.findById(req.params.id);
        if (messaging) {
            return res.status(200).json({
                'message': `messaging with id ${req.params.id} fetched successfully`,
                'data': messaging
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No messages found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createMessaging = async (req, res, next) => {
    try {

        console.log("createdMessaging: " + req.params.id.messageSender)
        const {
            created,
            userId,
            messageId,
            messageBody,
            messageStatus
        } = req.body;

        const temp = {
            created: created,
            userId: userId,
            messageId: messageId,
            messageBody: messageBody,
            messageStatus: messageStatus
        }
        

        let newMessaging = await Messaging.create(temp);

        if (newMessaging) {
            return res.status(201).json({
                'message': 'messaging created successfully',
                'data': newMessaging
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

const updateMessaging = async (req, res, next) => {
    try {


        const messagingId = req.params.id;

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


        let isMessagingExists = await Messaging.findById(messagingId);

        if (!isMessagingExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No messaging found in the system'
            });
        }

        const temp = {
            name: name,
            email: email
        }

        let updateMessaging = await Messaging.findByIdAndUpdate(messagingId, temp, {
            new: true
        });

        if (updateMessaging) {
            return res.status(200).json({
                'message': 'messaging updated successfully',
                'data': updateMessaging
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

const deleteMessaging = async (req, res, next) => {
    try {
        let messaging = await Messaging.findByIdAndRemove(req.params.id);
        if (messaging) {
            return res.status(204).json({
                'message': `messaging with id ${req.params.id} deleted successfully`
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No messages found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

module.exports = {
    getMessagings: getMessagings,
    getMessagingById: getMessagingById,
    createMessaging: createMessaging,
    updateMessaging: updateMessaging,
    deleteMessaging: deleteMessaging
}



    // console.log("Render Status page");
    // // Query: In our database, go to the messages collection, then "find" everything
    // User.find({}).sort('firstName').exec (function(err, messages) {
    //     // Log any errors if the server encounters one
    //     if (err) {
    //       console.log(err);
    //     }
    //     // Otherwise, send the result of this query to the browser
    //     else {
    //         console.log("Reading from messages DB")
    //     // Once the DB query completes
    //         res.render("status", {
    //             messages
    //         });
    //         //   res.json(messages);
    //     }
        
    // });