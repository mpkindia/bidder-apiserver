/**
 * Schema for User Account .
 */

const bcrypt = require('bcrypt-nodejs') 
const { to, TE } = require('../../common/helper')
const jwt = require('jsonwebtoken')
const config = require('../../config')
// const mailer = require('../services/nodemailer')
module.exports = (sequelize, DataTypes) =>{
  const User = sequelize.define('user', {
    id: {
       type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4 ,       
       primaryKey: true },
    mobile: { type: DataTypes.STRING(245), allowNull: false }, //add unique mobile and username constraint
    username: { type: DataTypes.STRING(245), allowNull:false, unique:true }, //alias for email
    fullname: { type: DataTypes.STRING(245), allowNull: false }, // full name
    password: { type: DataTypes.STRING(1024), allowNull: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: false },
    credits: { type: DataTypes.INTEGER, defaultValue:0 }
  },{
    underscored: true
  })

  User.associate = (models) => {
    // User.Bookings = User.hasMany(models.Booking, { foreignKey: 'customer_id'}),
    User.Bids = User.hasMany(models.Bid, { foreignKey: 'user_id'})
  }

// Sequelize hooks 
  User.beforeCreate( async (user, options) => {
    let err
    if(user.username.split('@').length<2) TE('email not provided')
    let salt, hash
    salt = bcrypt.genSaltSync(10)
    let errr
    hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
  }) 

// Sequelize Instance methods (have access to user model via this object)
  User.prototype.checkPassword = async function (pwd) {
    let err, pass 
     pass = bcrypt.compareSync(pwd, this.password)
    console.log('pass:',pass)
    if(!pass) return pass
    return this 
    }
  User.prototype.newPassword = async function (new_pwd) {
      let err, salt, hash; 
      salt = bcrypt.genSaltSync(10)
      hash = bcrypt.hashSync(new_pwd,salt)
      console.log(hash)
      return hash
  }

  User.prototype.tokenize = function (){
    return jwt.sign({id: this.id}, config.secret)
  }

  return User
}

