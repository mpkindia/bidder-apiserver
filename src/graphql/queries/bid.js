const graphql = require('graphql')
const { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLFloat } = graphql
const { to,TE } = require('../../../common/helper')
const sequelize = require('sequelize')
const { BidType } = require('../types')
const { resolver } = require('graphql-sequelize')
const { Bid } = require('../../models')

module.exports = {
    // all bids
    getAllBids: {
        type: new GraphQLList(BidType),
        resolve: resolver(Bid)
    },
    // all bids of a particular user
    getAllUserBids: {
        type: new GraphQLList(BidType),
        resolve: async function(_,_, context ) {
            console.log(context.user.id)
            let err, response 
            [err , response] = await to(Bid.findAll({ where: { user_id: context.user.id }}))
            if(err) TE('user bids not found')
            return response
        } 
    }
    
}

