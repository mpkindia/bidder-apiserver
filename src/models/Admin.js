/**
 * Schema for Admin Account .
 */

const bcrypt = require('bcrypt') 
const { to, TE } = require('../../common/helper')
const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = (sequelize, DataTypes) =>{
  const Admin = sequelize.define('admin', {
    id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4 ,       
       primaryKey: true },
   username: { type: DataTypes.STRING(245), allowNull:false}, //alias for email
   password: { type: DataTypes.STRING(1024), allowNull: false },
},{
    underscored: true
  })

  Admin.beforeSave( async (user, options) => {
    let err
    let salt, hash
    [err, salt] = await to(bcrypt.genSalt(10))
    if(err) TE(err.message)
    let errr
    [errr, hash] = await to(bcrypt.hash(user.password, salt))
    if(err) TE(err.message)
    user.password = hash
  }) 

  Admin.prototype.checkPassword = async function (pwd) {
    let err, pass 
    [err, pass] = await to(bcrypt.compare(pwd, this.password))
    if (err) TE(err)
    console.log('pass:',pass)
    if(!pass) return pass
    return this 
    }

  Admin.prototype.tokenize = function (){
    return jwt.sign({id: this.id}, config.secret)
  }

  return Admin
}

