/**
 * Schema for User Credits .
 */

const { to, TE } = require('../../common/helper')
const config = require('../../config')

module.exports = (sequelize, DataTypes) =>{
  const Bazaar = sequelize.define('bazaar', {
    id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4 ,       
       primaryKey: true },
    // serial: { type:DataTypes.INTEGER, defaultValue:0 },
    name: { type: DataTypes.STRING(245) , allowNull:false }, 
    open_time: { type: DataTypes.STRING, allowNull: false },
    close_time: { type: DataTypes.STRING, allowNull: false },
    result: { type: DataTypes.STRING, defaultValue: ''},
    open_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    close_active: { type: DataTypes.BOOLEAN, defaultValue: true }
},{
    underscored: true
  })

  Bazaar.associate = (models) => {
     Bazaar.Bids = Bazaar.hasMany(models.Bid, { foreignKey: 'bazaar_id'})
  }

  return Bazaar
}


// open close time and name & 
