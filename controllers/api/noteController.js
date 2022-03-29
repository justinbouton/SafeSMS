const Note = require('../../models/noteSchema');

const getNotes = async (req, res, next) => {
    try {
        let notes = await Note.find({}).lean();
        console.log("Retreive notes from DB")
        console.log(notes)
        console.log("TEST " + notes)
        if (notes.length > 0) {
            console.log("Render Alerts page")
            return res
                .status(200)
                .render("alertsNotes", { notes })
        } else if (notes.length <= 0) {
            console.log("no notes found")
            return res.send("No notes found.")
        };

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No notes found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getNoteById = async (req, res, next) => {
    try {
        let reqParamsNotes = req.params.id
        console.log("\ngetNoteNotesById: " + reqParamsNotes)

        let notes = await Note.find({ earthquakeId: reqParamsNotes }).lean();

        if (notes) {
            // Get db.notes.":id" of notes
            console.log("retreiving notes")
            console.log(notes)

            let noNotes = false;

            if (notes.length === 0) {
                console.log("No notes found")
                noNotes = true;
            }
            return res
                .status(200)
                .render("alertsNotes", { notes, noNotes })
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No notes found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createNote = async (req, res, next) => {
    try {

        const {
            earthquakeId,
            noteBody
        } = req.body;


        const temp = {
            earthquakeId: earthquakeId,
            noteBody: noteBody
        }

        let newNote = await Note.create(temp);

        if (newNote) {
            return res.status(201).json({
                'message': 'note created successfully',
                'data': newNote
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

const updateNote = async (req, res, next) => {
//     try {


//         const earthquakeId = req.params.id;

//         const {
//             earthquakeId,
//             noteBody
//         } = req.body;

//         if (earthquakeId === undefined || earthquakeId === '') {
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'earthquakeId is required',
//                 'field': 'earthquakeId'
//             });
//         }

//         if (noteBody === undefined || noteBody === '') {
//             return res.status(422).json({
//                 'code': 'REQUIRED_FIELD_MISSING',
//                 'description': 'noteBody is required',
//                 'field': 'noteBody'
//             });
//         }


//         let isNoteExists = await Note.findById(earthquakeId);

//         if (!isNoteExists) {
//             return res.status(404).json({
//                 'code': 'BAD_REQUEST_ERROR',
//                 'description': 'No earthquake found in the system'
//             });
//         }

//         const temp = {
//             earthquakeId: earthquakeId,
//             noteBody: noteBody
//         }

//         let updateNote = await Note.findByIdAndUpdate(earthquakeId, temp, {
//             new: true
//         });

//         if (updateNote) {
//             return res.status(200).json({
//                 'message': 'earthquake updated successfully',
//                 'data': updateNote
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
}

const deleteNote = async (req, res, next) => {
    try {
        let earthquake = await Note.findByIdAndRemove(req.params.id);
        if (earthquake) {
            return res.status(204).json({
                'message': `earthquake with id ${req.params.id} deleted successfully`
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No notes found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

module.exports = {
    getNotes: getNotes,
    getNoteById: getNoteById,
    createNote: createNote,
    updateNote: updateNote,
    deleteNote: deleteNote
}



    // console.log("Render Status page");
    // // Query: In our database, go to the notes collection, then "find" everything
    // User.find({}).lean().sort('firstName').exec (function(err, notes) {
    //     // Log any errors if the server encounters one
    //     if (err) {
    //       console.log(err);
    //     }
    //     // Otherwise, send the result of this query to the browser
    //     else {
    //         console.log("Reading from notes DB")
    //     // Once the DB query completes
    //         res.render("status", {
    //             notes
    //         });
    //         //   res.json(notes);
    //     }
        
    // });