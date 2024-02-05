const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./routes/RestaurantRoutes');

const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
const DB_HOST = ""
const DB_USER = ""
const DB_PASSWORD = ""
const DB_NAME = ""
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority` 
mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Success Mongodb connection');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});


app.use(restaurantRouter);

app.listen(8081, () => { console.log('Server is running...') });