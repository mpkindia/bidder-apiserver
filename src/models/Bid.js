/**
 * Schema for User Bids .
 */

// const { to, TE } = require('../../common/helper')
// const config = require('../../config')

module.exports = (sequelize, DataTypes) =>{
  const Bid = sequelize.define('bid', {
    id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4 ,       
       primaryKey: true },
    bazaar_type: { type: DataTypes.STRING, allowNull: false}, //open_close
    bid_type: { type: DataTypes.STRING , allowNull:false },  // single jodi
    bid_number: { type: DataTypes.STRING, allowNull:false},  // number
    bid_value: { type: DataTypes.INTEGER, allowNull:false},  // amount 
},{
    underscored: true
  })

  return Bid
}

