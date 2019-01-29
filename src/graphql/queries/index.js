const graphql = require('graphql')
const { GraphQLObjectType } = graphql
const user = require('./user')
const bazaar = require('./bazaar')
const bid = require('./bid')
const rate = require('./rate')
const notice = require('./notice')
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        ...user, ...bazaar, ...bid, ...rate, ...notice
    } 
})

module.exports = RootQuery
