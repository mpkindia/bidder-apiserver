/**
 * Initialize and export all model schemas
 */

const config = require('../../config');
const Sequelize = require('sequelize');
const util = require('../../common/util');
const fs = require('fs');
const path = require('path');
let basename = path.basename(__filename);
let host = 'localhost'
let sequelize
if(process.env.NODE_ENV==='production'){
  sequelize = new Sequelize(
    process.env.DATABASE_URL, {
    dialect: 'postgres'
  });  
}
else {
  sequelize = new Sequelize(config.db, config.username, config.password, {
    host :'localhost',
    dialect: 'postgres'
  });  

}

let models = {};
//Import definitions
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let model = sequelize['import'](path.join(__dirname, file));
        let modelName = util.capitalizeFirstLetter(model.name);
        models[modelName] = model; // cap this way you access the models with Cap but the database table names are lower case
});

sequelize.sync();
//{force:true }
Object.keys(models).forEach((model_name) => {
  let model = models[model_name];
  if (model.associate) {
    model.associate(models)
  }
});


models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;

