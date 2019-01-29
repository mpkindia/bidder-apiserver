const graphql = require('graphql')
const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLFloat, GraphQLBoolean } = graphql
const UserService = require('../../services/db/user')
const { User, Admin } = require('../../models')
const { UserAccount } = require('../types')
const { to, TE } = require('../../../common/helper')
module.exports = {
    createUser: {
        type: GraphQLString,
        args: {
            fullname: {type: new GraphQLNonNull(GraphQLString)},
            mobile: {type: new GraphQLNonNull(GraphQLString)},
            username: {type: new GraphQLNonNull(GraphQLString)},
            fullname: {type: new GraphQLNonNull(GraphQLString)},
            password: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async function(root, { fullname, mobile, username, password },req) {
            let user
            user = await UserService.create({ fullname, mobile, username, password })
            let token
            token = "Bearer " + user.tokenize()
            console.log(token)
            return token 
        }
    },
    login: {
        type: GraphQLString,
        args: {
            username: { type: new GraphQLNonNull(GraphQLString)},
            password: { type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: async function (root, { username, password }, context ){
            let token 
            token = await UserService.login(username, password)
            console.log(token)
            return token
        }
    },
    changePassword: {
        type: GraphQLString,
        args: {
            username: { type: new GraphQLNonNull(GraphQLString)},
            password: { type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: async function (root, { username, password }, context ){
            let token 
            token = await UserService.login(username, password)
            console.log(token)
            return token
        }
    },
    toggleUser: {
        type: UserAccount,
        args: {
            id: { type: GraphQLID }
        },
        resolve: async function (root, { id }) {
            let err, user
            [err ,user] = await to(User.findByPk(id))
            let status = user.active
            if(err) TE('user not found')
            await user.update({ active: !status }, {where: { id} })
            return user
        }
    },
    assignCredits: {
        type: UserAccount,
        args: {
            id: { type: GraphQLID },
            credits: { type: GraphQLFloat }
        },
        resolve: async function (_, { id, credits }) {
            let err, user
            [ err, user ] = await to(User.findByPk(id))
            if(err) TE('User not found')
            await user.update({ credits })
            return user
        }
    },
    adminLogin: {
        type: GraphQLString,
        args: {
            username: { type: GraphQLString },
            password: { type: GraphQLString }
        },
        resolve: async function (_, {username, password} ) {
            let token 
            token = await UserService.adminlogin(username, password)
            console.log(token)
            return token
        }
    },
    createAdminAccount: {
        type: GraphQLString,
        args: {
            username: {type: new GraphQLNonNull(GraphQLString)},
            password: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async function(root, { username, password },req) {
            let user
            user = await Admin.create({ username, password })
            let token
            token = "Bearer " + user.tokenize()
            console.log(token)
            return token 
        }
    }
}