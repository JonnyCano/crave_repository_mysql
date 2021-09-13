const sequelize = require('../config/connection');
const { Owner } = require('../models');
const router = require('express').Router();
// Homepage Route:
router.get('/', (req, res) => {
  Owner.findOne({
    where: {
      id: req.query.id
    }
  })
  .then(owner => {
    res.render('homepage', {
      fname: owner.fname.toString()
    })
  })
  });

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;