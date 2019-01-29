const { GraphQLObjectType,GraphQLString, GraphQLNonNull, GraphQLID, GraphQLFloat, GraphQLDate } = require('graphql')
const user = require('./user')
const bazaar = require('./bazaar')
const bid = require('./bid')
const rate = require('./rate')
const notice = require('./notice')
const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...user, 
        ...bazaar,
        ...bid,
        ...rate,
        ...notice
    }
})


module.exports = RootMutation

