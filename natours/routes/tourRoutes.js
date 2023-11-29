const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

// creating a param middleware
router.param('id', tourController.checkID);
/////////////////////////////////////////////////////
// specifyin the route base the given protocol - GET & POST
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

/////////////////////////////////////////////////////
// specifyin the route base the given protocol -GET & PATCH & DELETE
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;