const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

/////////////////////////////////////////////////////
// function for getting all tours
exports.getAllTours = (req, res) => {
  // console.log(req.requestTime);
  // res.status(200).json({
  //   status: 'success',
  //   requestedAt: req.requestTime,
  //   result: tours.length,
  //   data: { tours },
  // });
};

/////////////////////////////////////////////////////
// function getting one tour
exports.getTour = (req, res) => {
  const id = +req.params.id;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour
  //   },
  // });
};

/////////////////////////////////////////////////////
// function for creating tour
exports.createTour = (req, res) => {
  //   console.log(req.body);
  res.status(201).json({
    status: 'success',
    // data: { tour: newTour },
  });
};

/////////////////////////////////////////////////////
// function for updating a tour
exports.updateTour = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<UPDATED tour here...>' } });
};

/////////////////////////////////////////////////////
// function for deleting a tour
exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
