const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


// create our User model
class Owner extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// define table columns and configuration 
Owner.init (
  {
    // TABLE COLUMN DEFINITIONS GO IN HERE
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      async beforeCreate(newOwnerData) {
        newOwnerData.password = await bcrypt.hash(newOwnerData.password, 10);
        return newOwnerData;
      },
      async beforeUpdate(updatedOwnerData) {
        updatedOwnerData.password = await bcrypt.hash(updatedOwnerData.password, 10);
        return updatedOwnerData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,

    modelName: 'owner'
  }
);



module.exports = Owner;
  
 