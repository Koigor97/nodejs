const Tour = require('../models/tourModel');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary';
  next();
};

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };

    // filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);

    // advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
  }
}
// handling request and response for all tours
exports.getAllTour = async (req, res) => {
  // const queryObj = { ...req.query };
  // // console.log(queryObj);

  // // 1.a) filtering
  // const excludedFields = ['page', 'sort', 'limit', 'fields'];
  // excludedFields.forEach((el) => delete queryObj[el]);
  // console.log(queryObj);

  // // 1.b) advanced filtering
  // let queryStr = JSON.stringify(queryObj);
  // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  // console.log(JSON.parse(queryStr));

  try {
    // let query = Tour.find(JSON.parse(queryStr));

    // // 2) Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort('-createdAt');
    // }

    // // 3) field limiting
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }

    // // 4) pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numOfTours = await Tour.countDocuments();
    //   if (skip >= numOfTours) throw new Error('This page does not exist');
    // }

    // execute query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    console.log(features);

    const allTours = await features.query;

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
