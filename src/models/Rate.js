/**
 * Schema for Game Rates.
 */


module.exports = (sequelize, DataTypes) =>{
  const Rates = sequelize.define('rate', {
    id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4 ,       
       primaryKey: true },
    name: { type: DataTypes.STRING , allowNull:false }, 
    rate: { type: DataTypes.STRING, allowNull: false },
},{
    underscored: true
  })

  return Rates
}


// open close time and name & 
