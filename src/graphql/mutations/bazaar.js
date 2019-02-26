const graphql = require('graphql')
const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLFloat } = graphql
const { to,TE } = require('../../../common/helper')
const { Bazaar } = require('../../models')
const { BazaarType } = require('../types')
module.exports = {
    toggleOpenBazaar: {
        type: BazaarType,
        args: {
            id: { type: GraphQLID }
        },
        resolve: async function (root, { id }) {
            let err, bazaar
            [err ,bazaar] = await to(Bazaar.findByPk(id))
            let status = bazaar.open_active
            if(err) TE('user not found')
            await bazaar.update({ open_active: !status }, {where: { id} })
            return bazaar
        }
    },
    toggleCloseBazaar: {
        type: BazaarType,
        args: {
            id: { type: GraphQLID }
        },
        resolve: async function (root, { id }) {
            let err, bazaar
            [err ,bazaar] = await to(Bazaar.findByPk(id))
            let status = bazaar.close_active
            if(err) TE('user not found')
            await bazaar.update({ close_active: !status }, {where: { id} })
            return bazaar
        }
    },
    addBazaar: {
        type: BazaarType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString)},
            open_time: {type: new GraphQLNonNull(GraphQLString)},
            close_time: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async function(root, { name, open_time, close_time }, req) {
            let err, bazaar
            [err, bazaar] = await to(Bazaar.create({
                name, open_time, close_time
            }))
            if (err) return TE('bazaar not created')
            else return bazaar
        }
    },
    // serialBazaar: {
    //     type: BazaarType,
    //     args: {
    //         id: { type: GraphQLID },
    //         serial: { type: GraphQLFloat }
    //     },
    //     resolve: async function ( _, { id, serial }) {
    //         let err, bazaar
    //         [ err , bazaar] = await to(Bazaar.findByPk(id))
    //         await bazaar.update({ serial })
    //         return bazaar
    //     }
    // },
    editBazaar: {
        type: BazaarType,
        args: {
            id: { type: GraphQLID },
            name: { type: GraphQLString },
            open_time: { type: GraphQLString },
            close_time: { type: GraphQLString }
        },
        resolve: async function (_, { id, name, open_time, close_time }) {
            let err, bazaar 
            [ err, bazaar ] = await to(Bazaar.findByPk(id))
            if(err) TE('bazaar not found')

        }
    },
    removeBazaar: {
        type: GraphQLString,
        args: {
            id: { type: GraphQLID },
        },
        resolve: async function (root, { id } ){
            let err, bazaar 
            [ err, bazaar ] = await to(Bazaar.findByPk(id))
            if(err) TE('bazaar not found')
            await bazaar.destroy()
        } 
    },
    bazaarResult: {
        type: BazaarType,
        args: {
            id: { type: GraphQLID },
            result: { type: GraphQLString }
        },
        resolve: async function (_, { id, result }) {
            let err, bazaar
            [ err, bazaar ] = await to(Bazaar.findByPk(id))
            if(err) return TE('result not updated')
            await bazaar.update({ result })
            return bazaar
        }
    }
}