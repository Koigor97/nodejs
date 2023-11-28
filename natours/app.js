const fs = require('fs');
const express = require('express');
const app = express();

// including a middleware
app.use(express.json());

// getting the tours json data from the data folder
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/////////////////////////////////////////////////////
// function for getting all tours
const getAllTours = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
};

/////////////////////////////////////////////////////
// function getting one tour
const getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((el) => el.id === id);

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(200).json({ status: 'success', data: { tour } });
};

/////////////////////////////////////////////////////
// function for creating tour
const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) return;
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      });
    }
  );
};

/////////////////////////////////////////////////////
// function for updating a tour
const updateTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<UPDATED tour here...>' } });
};

/////////////////////////////////////////////////////
// function for deleting a tour
const deleteTour = (req, res) => {
  const id = +req.params.id;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(204).json({ status: 'success', data: null });
};

// Starting the server and listening for requests
const port = 3000;

// Get request http protocol
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

/////////////////////////////////////////////////////
// specifyin the route base the given protocol - GET & POST
app.route('/api/v1/tours').get(getAllTours).post(createTour);

/////////////////////////////////////////////////////
// specifyin the route base the given protocol -GET & PATCH & DELETE
app.route('/api/v1/tours').get(getTour).patch(updateTour).delete(deleteTour);

/////////////////////////////////////////////////////
// listen for request
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
