const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

// creating a param middleware
// router.param('id', tourController.checkID);
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
/////////////////////////////////////////////////////
// specifyin the route base the given protocol - GET & POST
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

/////////////////////////////////////////////////////
// specifyin the route base the given protocol -GET & PATCH & DELETE
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
