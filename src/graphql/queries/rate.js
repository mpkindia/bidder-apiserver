const graphql = require('graphql')
const { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLFloat } = graphql
// const { to,TE } = require('../../../common/helper')
const { RateType } = require('../types')
const { resolver } = require('graphql-sequelize')
const { Rate } = require('../../models')

module.exports = {
    getAllRates: {
        type: new GraphQLList(RateType),
        resolve: resolver(Rate)
    },
}
// check if( data.query == null ) not succesful 