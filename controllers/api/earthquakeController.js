const Earthquake = require('../../models/earthquakeSchema');

const getEarthquakes = async (req, res, next) => {
    try {
        let earthquakes = await Earthquake.find({});
        console.log("Retreive earthquakes from DB")
        // console.log(earthquakes)
        
        if (earthquakes.length > 0) {
            console.log("Render Alerts page")
            return res
                .status(200)
                .render("alerts", { earthquakes })
        } else if (earthquakes.length <= 0) {
            console.log("no earthquakes found")
            return res.send("No earthquakes found. Please setup your locaton in settings")
        };

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No earthquakes found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getEarthquakeById = async (req, res, next) => {
    try {
        let earthquake = await Earthquake.findById(req.params.id);
        if (earthquake) {
            return res.status(200).json({
                'message': `earthquake with id ${req.params.id} fetched successfully`,
                'data': earthquake
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No earthquakes found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createEarthquake = async (req, res, next) => {
    try {

        const {
            name,
            email
        } = req.body;


        const temp = {
            name: name,
            email: email
        }

        let newEarthquake = await Earthquake.create(temp);

        if (newEarthquake) {
            return res.status(201).json({
                'message': 'earthquake created successfully',
                'data': newEarthquake
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

const updateEarthquake = async (req, res, next) => {
    try {


        const earthquakeId = req.params.id;

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


        let isEarthquakeExists = await Earthquake.findById(earthquakeId);

        if (!isEarthquakeExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No earthquake found in the system'
            });
        }

        const temp = {
            name: name,
            email: email
        }

        let updateEarthquake = await Earthquake.findByIdAndUpdate(earthquakeId, temp, {
            new: true
        });

        if (updateEarthquake) {
            return res.status(200).json({
                'message': 'earthquake updated successfully',
                'data': updateEarthquake
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

const deleteEarthquake = async (req, res, next) => {
    try {
        let earthquake = await Earthquake.findByIdAndRemove(req.params.id);
        if (earthquake) {
            return res.status(204).json({
                'message': `earthquake with id ${req.params.id} deleted successfully`
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No earthquakes found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

module.exports = {
    getEarthquakes: getEarthquakes,
    getEarthquakeById: getEarthquakeById,
    createEarthquake: createEarthquake,
    updateEarthquake: updateEarthquake,
    deleteEarthquake: deleteEarthquake
}



    // console.log("Render Status page");
    // // Query: In our database, go to the earthquakes collection, then "find" everything
    // User.find({}).sort('firstName').exec (function(err, earthquakes) {
    //     // Log any errors if the server encounters one
    //     if (err) {
    //       console.log(err);
    //     }
    //     // Otherwise, send the result of this query to the browser
    //     else {
    //         console.log("Reading from earthquakes DB")
    //     // Once the DB query completes
    //         res.render("status", {
    //             earthquakes
    //         });
    //         //   res.json(earthquakes);
    //     }
        
    // });