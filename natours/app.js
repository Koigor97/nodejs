const fs = require('fs');
const express = require('express');
const app = express();

// including a middleware
app.use(express.json());

// getting the tours json data from the data folder
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Starting the server and listening for requests
const port = 3000;

app.get('/api/v1/tours', (req, res) => {
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
