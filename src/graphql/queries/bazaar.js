const graphql = require('graphql')
const { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLFloat } = graphql
// const { to,TE } = require('../../../common/helper')
const { BazaarType } = require('../types')
const { resolver } = require('graphql-sequelize')
const { Bazaar } = require('../../models')

module.exports = {
    getAllBazaars: {
        type: new GraphQLList(BazaarType),
        resolve: resolver(Bazaar)
    },
}
// check if( data.query == null ) not succesful 