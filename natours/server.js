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
makeConnection(db);

///////////////////////////////////////////////////////////////////////
// Starting the server
const port = process.env.PORT || 8030;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
