const express = require('express');

const router = express.Router();

function getAllUsers(req, res) {
  res.status(505).json({
    status: 'error',
    result: 'This route is not yet defined',
  });
  return;
}

function getUser(req, res) {
  res.status(505).json({
    status: 'error',
    result: 'This route is not yet defined',
  });
  return;
}

function createUser(req, res) {
  res.status(505).json({
    status: 'error',
    result: 'This route is not yet defined',
  });
  return;
}

function updateUser(req, res) {
  res.status(505).json({
    status: 'error',
    result: 'This route is not yet defined',
  });
  return;
}

function deleteUser(req, res) {
  res.status(505).json({
    status: 'error',
    result: 'This route is not yet defined',
  });
  return;
}

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
