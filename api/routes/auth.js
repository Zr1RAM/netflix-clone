const { register, login } = require('../controllers/auth');

const router = require('express').Router();

// Register
router.post("/register" , register);
router.post("/login", login);



module.exports = router;