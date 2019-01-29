const graphql = require('graphql')
const { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLFloat } = graphql
const { to,TE } = require('../../../common/helper')
const { UserAccount } = require('../types')
const { resolver } = require('graphql-sequelize')
const { User } = require('../../models')

module.exports = {
    getCurrentUser: {
        type: UserAccount,
        resolve: async function (root, args , context){
            if (!context.user) {
                return 
            }
            return User.findByPk(context.user.id)
        }
    },
    getAllUsers: {
        type: new GraphQLList(UserAccount),
        resolve: resolver(User)
    },
}
