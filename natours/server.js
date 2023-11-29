const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// Starting the server and listening for requests
const port = process.env.PORT || 3000;
/////////////////////////////////////////////////////
// listen for request
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
