const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const Tour = require('../../models/tourModel');

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

///////////////////////////////////////////////////////////////////////
// Starting the server
// const port = process.env.PORT || 8030;
// app.listen(port, () => {
//   console.log(`App running on port ${port}`);
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// import data into db
const importData = async () => {
  try {
    await Tour.create(tours);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// deleting all data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
