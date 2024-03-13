const Tour = require('../models/tourModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary';
  next();
};

// handling request and response for all tours
exports.getAllTour = async (req, res) => {
  const queryObj = { ...req.query };
  // console.log(queryObj);

  // 1.a) filtering
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);
  console.log(queryObj);

  // 1.b) advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  console.log(JSON.parse(queryStr));

  try {
    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    // execute query
    const allTours = await query;

    res.status(200).json({
      status: 'success',
      results: allTours.length,
      data: allTours,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

// handling request and response for a tour
exports.getTour = async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
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
exports.updateTour = async (req, res) => {
  const { id } = req.params;
  const dataRecieved = req.body;

  try {
    const tour = await Tour.findByIdAndUpdate(id, dataRecieved, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

// handling request and response for deleting a tour
exports.deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    const tour = await Tour.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

// stats aggregation pipeline
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: '$difficulty',
          numOfTours: { $sum: 1 },
          numOfRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
    ]);
    res.status(200).json({
      status: 'success',
      stats,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// monthly plan aggregation pipeline
exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1;

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numOfTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
    ]);

    res.status(200).json({
      status: 'success',
      plan,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
