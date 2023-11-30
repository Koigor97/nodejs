const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// connecting mongoose to the database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

main().catch((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DB connected successfully...');
  }
});

async function main() {
  await mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
}

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log());

// Starting the server and listening for requests
const port = process.env.PORT || 3000;
/////////////////////////////////////////////////////
// listen for request
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
