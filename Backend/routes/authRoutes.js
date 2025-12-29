const express = require('express');
const router = express.Router();

const { loginUser } = require('../controllers/authController');
const { loginValidationRules, validate } = require('../validators/authValidator');


router.post(
  '/login', 
  loginValidationRules,
  validate,             
  loginUser
);

module.exports = router;