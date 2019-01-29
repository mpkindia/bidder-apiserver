/**
 * Schema for Notice Board .
 */

module.exports = (sequelize, DataTypes) =>{
    const Notice = sequelize.define('notice', {
      id: {
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4 ,       
         primaryKey: true },
      text: { type: DataTypes.STRING(2048), allowNull: false}, 
    },{
      underscored: true
    })
  
    return Notice
  }
  
  