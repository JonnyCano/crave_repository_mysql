const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
// Homepage Route:
router.get('/', (req, res) => {
  res.render('index');
});


module.exports = router;