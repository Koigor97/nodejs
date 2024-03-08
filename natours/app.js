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
  // creating temporary id
  const newId = tours[tours.length - 1].id + 1;
  //getting the data sent
  const dataRecieved = req.body[0];
  console.log(newId, dataRecieved);

  // creating a new data
  const newPost = { id: newId, ...dataRecieved };
  tours.push(newPost);

  // saving data to the tours-simple.json file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res
        .status(201)
        .json({ message: 'post was successfully created', postSent: newPost });
    }
  );
});

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
