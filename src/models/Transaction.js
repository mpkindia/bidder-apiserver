/**
 * Schema for User Credits .
 */

module.exports = (sequelize, DataTypes) =>{
  const Transaction = sequelize.define('transaction', {
    id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4 ,       
       primaryKey: true },
    trans_type: { type: DataTypes.STRING(245) , allowNull:false }, //debit or credit
    value: { type: DataTypes.STRING, defaultValue: 0 }, //if debit subtract it
    expense_type: { type: DataTypes.STRING(245) , allowNull:false } // bid or admin 
    //if bid then bid_id and nul
},{
    underscored: true
  })

  Transaction.associate = (models) => {
     Transaction.Bids = Transaction.belongsTo(models.Bid, { foreignKey: 'bid_id'})
  }

  return Transaction
}
