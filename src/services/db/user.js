const { to, TE } = require('../../../common/helper');
const { User, Admin } = require('../../models');

/**
 * function to create a user
 * @param {Object} payload the payload contains all the user attributes 
 */
async function create(payload) {
    let err, user;
    [ err, user ] = await to (User.create({
        fullname: payload.fullname,
        username: payload.username,
        mobile: payload.mobile,
        password: payload.password
    }    
    ));
    return new Promise((resolve,reject)=>{
        if (!user) reject('User not Created');
        else resolve(user)
    })
}

async function login( username, password ) {
    console.log(username,password);
    if  (!username || !password ) {
        TE('fields not sent')
    }
    let err, user;
    [err, user] = await to(User.findOne({where: {username: username}}));
    let pass;
    pass = await user.checkPassword(password);
    let token;
    if ( pass ){
        token = "Bearer " + user.tokenize()    
    }

    console.log(user.active)
    if(!user.active) token = null 
    return new Promise ( (resolve,reject)=> {
        if(token)
        resolve (token);
        else reject('err')
    })
}

async function changePassword( id, curr_password, new_password ) {
    let err, user , new_password_hash
    [ err, user ] = await to(User.findByPk(id))
    let correctness = await user.checkPassword(curr_password)
    if( !correctness ) return TE('passwords does not match')
    new_password_hash = await user.changePassword(new_password)
    await user.update({ password: new_password_hash })
    return true
    // if( correctness ) user.update({ password: })

}

async function adminlogin( username, password ) {
    console.log(username,password);
    if  (!username || !password ) {
        TE('fields not sent')
    }
    let err, user;
    [err, user] = await to(Admin.findOne({where: {username: username}}));
    let pass;
    pass = await user.checkPassword(password);
    let token;
    if ( pass ){
        token = "Bearer " + user.tokenize()    
    }
    return new Promise ( (resolve,reject)=> {
        if(token)
        resolve (token);
        else reject('err')
    })
}


module.exports = {
    create,
    login ,
    adminlogin
};