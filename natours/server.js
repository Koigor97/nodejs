const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// using async function to connect to mongodb
async function makeConnection(dbString) {
  const connection = await mongoose.connect(dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log('connect to DB successful');
  return connection;
}

// getting the database string
const db = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
//connect to database
const client = makeConnection(db);

// creating a test Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ['true', 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 5,
  },
  price: {
    type: Number,
    required: ['true', 'A tour must have a price'],
  },
});

// creating a model
const Tour = mongoose.model('Tour', tourSchema);
const testTour = new Tour({
  name: 'Sugar Loaf Lagbaja',
  price: 350,
});

//saving test document
// testTour
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => {
//     console.log(`ERROR...:`, err);
//   });

///////////////////////////////////////////////////////////////////////
// Starting the server
const port = process.env.PORT || 8030;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
