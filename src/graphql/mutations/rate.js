const graphql = require('graphql')
const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLBoolean } = graphql
const { to,TE } = require('../../../common/helper')
const { Rate } = require('../../models')
const { RateType } = require('../types')
module.exports = {
    addRate: {
        type: RateType,
        args: {
            name: { type: GraphQLString},
            rate: { type: GraphQLString}
        },
        resolve: async function(root, { name, rate }) {
            let err, rates 
            [ err, rates ] = await to(Rate.create({ name, rate }))
            if(err) TE(err.message)
            return rates
        }
    },
    updateRate: {
        type: RateType,
        args: {
            id:   { type: GraphQLID },
            name: { type: GraphQLString},
            rate: { type: GraphQLString}
        },
        resolve: async function(_, { id, rate }) {
            let err, game 
            [err, game] = await to(Rate.findByPk(id))
            if (err) TE(`${err.message}`)
            await game.update({ rate })
            return game
        }
    },
    removeRate: {
        type: GraphQLBoolean,
        args: {
            id:   { type: GraphQLID },
        },
        resolve: async function (_, { id }){
            let [err, game] = await to(Rate.findByPk(id))
            if(err) {
                TE(`${err.message}`)
                return false
            }
            await game.destroy()
            return true
        }
    }
}