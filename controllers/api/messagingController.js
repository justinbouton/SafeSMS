// console.log("\n messagingController.js started");

const Message = require('../../models/messagingSchema');

const getMessages = async (req, res, next) => {
    try {

        let messages = await Message.find({});

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

const getMessageById = async (req, res, next) => {
    try {
        console.log("getMessageById: ")

        let message = await Message.findById(req.params.id);
        if (message) {
            return res.status(200).json({
                'message': `message with id ${req.params.id} fetched successfully`,
                'data': message
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

const createMessage = async (req, res, next) => {
    try {

        const {
            created,
            userId,
            messageBody,
            messageAdmin
        } = req.body;

        const temp = {
            created: created,
            userId: userId,
            messageBody: messageBody,
            messageAdmin: messageAdmin
        }
        

        let newMessage = await Message.create(temp);

        if (newMessage) {
            return res.status(201).json({
                'message': 'message created successfully',
                'data': newMessage
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

const updateMessage = async (req, res, next) => {
    try {


        const messageId = req.params.id;

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


        let isMessageExists = await Message.findById(messageId);

        if (!isMessageExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No message found in the system'
            });
        }

        const temp = {
            name: name,
            email: email
        }

        let updateMessage = await Message.findByIdAndUpdate(messageId, temp, {
            new: true
        });

        if (updateMessage) {
            return res.status(200).json({
                'message': 'message updated successfully',
                'data': updateMessage
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

const deleteMessage = async (req, res, next) => {
    try {
        let message = await Message.findByIdAndRemove(req.params.id);
        if (message) {
            return res.status(204).json({
                'message': `message with id ${req.params.id} deleted successfully`
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
    getMessages: getMessages,
    getMessageById: getMessageById,
    createMessage: createMessage,
    updateMessage: updateMessage,
    deleteMessage: deleteMessage
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