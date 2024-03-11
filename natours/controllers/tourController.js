const Tour = require('../models/tourModel');

// handling request and response for all tours
exports.getAllTour = async (req, res) => {
  try {
    const allTours = await Tour.find();

    res.status(200).json({
      status: 'success',
      data: allTours,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

// handling request and response for a tour
exports.getTour = (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    status: 'success',
    data: {},
  });
};

//handling post request to route
exports.createTour = async (req, res) => {
  try {
    //getting the data sent
    const dataRecieved = req.body;
    //create a new tour
    const newTour = await Tour.create(dataRecieved);
    // return a success response with the data
    res.status(201).json({ staus: 'success', data: newTour });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

// handling request and response for updating a tour
exports.updateTour = (req, res) => {
  const { id } = req.params;
  const updateRecieved = req.body;

  const newUpdatedTour = { ...updateRecieved };

  res.status(200).json({
    status: 'success',
    data: {},
  });
};

// handling request and response for deleting a tour
exports.deleteTour = (req, res) => {
  const { id } = req.params;

  // saving data to the tours-simple.json file

  res.status(200).json({
    status: 'success',
    data: {},
  });
};
