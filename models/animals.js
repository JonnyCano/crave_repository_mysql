const { DataTypes } = require('sequelize/types');
const sequelize = require('../config/connection');

// Making an animal
Animal.init(
  {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    animal:{
      type:DataTypes.STRING,
      allowNull: false
    },
    breed:{
      type:DataTypes.STRING,
      allowNull: false
    },
    age:{
      type:DataTypes.INTEGER,
      allowNull: false
    },
    desc:{
      type: DataTypes.STRING,
      allowNull: false
    },
    adoptable:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  })