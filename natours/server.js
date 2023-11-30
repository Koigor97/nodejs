const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// connecting mongoose to the database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection started....'));

// Starting the server and listening for requests
const port = process.env.PORT || 3000;
/////////////////////////////////////////////////////
// listen for request
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
