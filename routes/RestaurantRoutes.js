const express = require('express');
const router = express.Router();
const RestaurantModel = require('../model/Restaurant');

//Route to get all restaurants
//http://localhost:3000/restaurants
router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find({});
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Route to get restaurants by cuisine
//http://localhost:3000/restaurants/cuisine/Japanese
//http://localhost:3000/restaurants/cuisine/Bakery
//http://localhost:3000/restaurants/cuisine/Italian
router.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  const { cuisine } = req.params;
  try {
    const restaurants = await RestaurantModel.find({ cuisines: cuisine });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Route to get restaurants with sorting
//http://localhost:3000/restaurants?sortBy=ASC
router.get('/restaurants', async (req, res) => {
  const { sortBy } = req.query;
  try {
    // Validate sortBy value to ensure it's either 'ASC' or 'DESC'
    const sortOrder = sortBy === 'DESC' ? -1 : 1;

    // Use the sort method to sort by restaurant_id
    const restaurants = await RestaurantModel.find({}).sort({ restaurant_id: sortOrder });

    res.json(restaurants);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Route to get specific restaurants
//http://localhost:3000/restaurants/Delicatessen
router.get('/restaurants/:cuisine', async (req, res) => {
  const { cuisine } = req.params;
  try {
    const restaurants = await RestaurantModel.find({ cuisines: cuisine, city: { $ne: 'Brooklyn' } })
      .select('-_id cuisines name city')
      .sort({ name: 1 });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Post request to add a new restaurant
//http://localhost:3000/restaurants
router.post('/restaurants', async (req, res) => {
  try {
      const newRestaurant = await RestaurantModel.create(req.body);
      res.status(201).json({
          status: 'success',
          data: {
              restaurant: newRestaurant
          }
      });
  } catch (err) {
      res.status(400).json({
          status: 'fail',
          message: err
      });
  }
});

module.exports = router;