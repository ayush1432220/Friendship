const { body, validationResult } = require('express-validator');

const loginValidationRules = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username zaruri hai')
    .isLength({ min: 3 }).withMessage('Username kam se kam 3 characters ka hona chahiye')
    .escape(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password minimum 6 characters ka hona chahiye')
];


const validate = (req, res, next) => {
  const errors = validationResult(req);
  

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => err.msg) 
    });
  }
  
  next();
};

module.exports = {
  loginValidationRules,
  validate
};