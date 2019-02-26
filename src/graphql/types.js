/**
 *  All the Graphql Node Types
 */

const graphql = require('graphql')
const { GraphQLObjectType, GraphQLInt, GraphQLDate,
        GraphQLString, GraphQLList, GraphQLID,
        GraphQLFloat, GraphQLBoolean
    } = graphql 
const { Bid, Bazaar, User } = require('../models')

const UserAccount = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id                 : { type: GraphQLID },
        fullname           : { type: GraphQLString },
        username           : { type: GraphQLString },
        mobile             : { type: GraphQLString },
        password           : { type: GraphQLString },
        active             : { type: GraphQLBoolean },
        credits            : { type: GraphQLFloat }
    }) 
})


const BazaarType = new GraphQLObjectType({
    name: 'Bazaar',
    fields: () => ({
        id                  : { type: GraphQLID },
        name                : { type: GraphQLString },
        open_time           : { type: GraphQLString },
        close_time          : { type: GraphQLString },
        result              : { type: GraphQLString },
        open_active         : { type: GraphQLBoolean },
        close_active        : { type: GraphQLBoolean },
        // serial              : { type: GraphQLFloat },
    })
})

const BidType = new GraphQLObjectType({
    name: 'Bid',
    fields: () => ({
        id                  : { type: GraphQLID },
        user_id             : { type: GraphQLID },
        user_name           : {
            type            : GraphQLString,
            resolve         : async function(root){
                return (await User.findByPk(root.user_id)).fullname
            } 
        },
        bazaar_id           : { type: GraphQLID },
        bazaar_name         : { 
            type            : GraphQLString,
            resolve         : async function(root){
                return (await Bazaar.findByPk(root.bazaar_id)).name
            } 
        },
        bazaar_type         : { type: GraphQLString },
        bid_type            : { type: GraphQLString },
        bid_number          : { type: GraphQLString },
        bid_value           : { type: GraphQLString },
        created_at          : { type: GraphQLString },
        date                : { type: GraphQLString }
    })
})

const RateType = new GraphQLObjectType({
    name: 'Rate',
    fields: () => ({
        id                  : { type: GraphQLID },
        name                : { type: GraphQLString },
        rate                : { type: GraphQLString },
    })
})

const NoticeType = new GraphQLObjectType({
    name: 'notice',
    fields: () => ({
        id                  : { type: GraphQLID },
        text                : { type: GraphQLString }    
    })
})

module.exports = {
    UserAccount,
    BidType,
    RateType,
    BazaarType,
    NoticeType
}
