const Owner = require('./Owner');
const Pet = require('./Pet');
const Appointment = require('./Appointment');


module.exports = { Owner, Pet };

// create associations 
Owner.hasMany(Pet, {
  foreignKey: 'owner_id'
});

Pet.belongsTo(Owner, {
  foreignKey: 'owner_id',
});



Owner.belongsToMany(Pet, {
  through: Appointment,
  as: 'Pet_Appointment',
  foreignKey: 'owner_id'
});

Pet.belongsToMany(Owner, {
  through: Appointment,
  as: 'Pet_Appointment',
  foreignKey: 'pet_id'
});

Appointment.belongsTo(Owner, {
  foreignKey: 'owner_id'
});

Appointment.belongsTo(Pet, {
  foreignKey: 'pet_id'
});

Owner.hasMany(Appointment, {
  foreignKey: 'owner_id'
});

Pet.hasMany(Appointment, {
  foreignKey: 'pet_id'
});




module.exports = { Owner, Pet, Appointment};