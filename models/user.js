var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
const { options } = require('../routes/api/members');




var User =sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey:true,
        autoIncrement:true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type:Sequelize.STRING,
        unique: true,
        allowNull: false
    },  
    
});

User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password.salt); 
});

User.prototype.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

sequelize.Sync()
.then(() => console.log('user tables has been successfully created if one does not exist'))
.catch(error => console.log('error occurred',error));

module.exports = User;