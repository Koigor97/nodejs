const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// handling request and response for the home route
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      numOfTours: tours.length,
      tours,
    },
  });
});

//handling post request to route
app.post('/api/v1/tours', (req, res) => {
  res.status(201).json({ message: 'post was successfully created' });
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
