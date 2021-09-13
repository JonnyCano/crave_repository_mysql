const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
const Owner = require('../models/Owner');

function getOwner() {
  Owner.findOne({
    where: req.body.password === Owner.password
  })
    .then(owner => {
      console.log(res.json(owner));
    })
    .catch((err => console.log(err)));
}

// Homepage Route:
router.get('/', (req, res) => {
  getOwner();
  res.render('index');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/homepage', (req, res) => {
  // I just put this here but you can take it out:
  res.render('homepage', owner => owner);
});

module.exports = router;