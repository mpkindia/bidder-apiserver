require('dotenv').config();
config = {};

config.port = process.env.PORT;
config.db = process.env.db;
config.username = process.env.user;
config.password = process.env.password;
config.p_db = process.env.p_db
config.p_username = process.env.p_user 
config.p_password = process.env.p_password
config.secret = process.env.secret || 'jwetsecret';

console.log(config);
module.exports = config;