const fs = require('fs');
const express = require('express');

const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// handling request and response for all tours
function getAllTour(req, res) {
  res.status(200).json({
    status: 'success',
    data: {
      numOfTours: tours.length,
      tours,
    },
  });
}

// handling request and response for a tour
function getTour(req, res) {
  const { id } = req.params;

  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      result: 'The id is invalid',
    });
    return;
  }

  const tour = tours.find((theTour) => theTour.id === +id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}

//handling post request to route
function createTour(req, res) {
  // creating temporary id
  const newId = tours[tours.length - 1].id + 1;
  //getting the data sent
  const dataRecieved = req.body[0];

  // creating a new data
  const newPost = { id: newId, ...dataRecieved };
  tours.push(newPost);

  // saving data to the tours-simple.json file
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res
        .status(201)
        .json({ message: 'post was successfully created', postSent: newPost });
    }
  );
}

// handling request and response for updating a tour
function updateTour(req, res) {
  const { id } = req.params;
  const updateRecieved = req.body;

  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      result: 'The id is invalid',
    });
    return;
  }

  const tourIndex = tours.findIndex((theTour) => theTour.id === +id);
  const tour = tours.find((theTour) => theTour.id === +id);

  const newUpdatedTour = { ...tour, ...updateRecieved };

  tours.splice(tourIndex, 1, newUpdatedTour);

  // saving data to the tours-simple.json file
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour,
          newUpdatedTour,
        },
      });
    }
  );
}

// handling request and response for deleting a tour
function deleteTour(req, res) {
  const { id } = req.params;

  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      result: 'The id is invalid',
    });
    return;
  }

  const deletedTour = tours.find((theTour) => theTour.id === +id);
  const newTourList = tours.filter((tour) => tour.id !== +id);

  // saving data to the tours-simple.json file
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(newTourList),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          deletedTour,
        },
      });
    }
  );
}

router.route('/').get(getAllTour).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;