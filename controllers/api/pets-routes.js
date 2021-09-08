const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Pet, Owner, Appointment } = require('../../models');
const { aggregate } = require('../../models/Owner');

// GET /api/users
router.get('/', (req, res) => {
  console.log('======================');
  Pet.findAll({
    attributes: ['id', 'name', 'type', 'breed', 'age', 'owner_id', [sequelize.literal('(SELECT COUNT(*) FROM appointment WHERE pet.id = appoinment.pet_id)'), 'appointment_count']
   ],
    include: [
      {
        model: Owner,
        attributes: ['fname', 'lname']
      }
    ]
  })
  .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/pet/1
router.get('/:id', (req, res) => {
  Pet.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'type', 'breed', 'age', 'owner_id', [sequelize.literal('(SELECT COUNT(*) FROM appointment WHERE pet.id = appoinment.pet_id)'), 'appointment_count']
   ],
    include: [
      {
        model: Owner,
        attributes: ['fname', 'lname']
      }
    ]
  })
    .then(dbPetData => {
      if (!dbPetData) {
        res.status(404).json({ message: 'No pet found with this owner' });
        return;
      }
      res.json(dbPetData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post('/', (req, res) => {
  Post.create({
    name: req.body.name,
    type: req.body.type,
    breed: req.body.breed,
    age: req.body.age,
    owner_id: req.body.owner_id
  })
    .then(dbPetData => res.json(dbPetData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


// PUT /api/pet/appointment
router.put('/appointment', (req, res) => {
    Appointment.create({
      owner_id: req.body.owner_id,
      pet_id: req.body.pet_id
    }).then(() => {
    // then find the post we just voted on
    return Pet.findOne({
      where: {
        id: req.body.pet_id
      },
      attributes: [
        'id',
        'name',
        'type',
        'breed',
        'age',
        'owner_id'
        // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
        [
          sequelize.literal('(SELECT COUNT(*) FROM appointment WHERE pet.id = appointment.pet_id)'),
          'appointment_count'
        ]
      ]
    })
    .then(dbPetData => res.json(dbPetData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  });
});  
// PUT /api/users/1
router.put('/:id', (req, res) => {

});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {

});

module.exports = router;