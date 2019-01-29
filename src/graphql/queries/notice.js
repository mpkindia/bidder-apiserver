const graphql = require('graphql')
const { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLList, GraphQLID, GraphQLFloat } = graphql
const { to,TE } = require('../../../common/helper')
const { resolver } = require('graphql-sequelize')
const { Notice } = require('../../models')
const { NoticeType } = require('../types')

module.exports = {
    getLatestNotice: {
        type: NoticeType,
        resolve: async function (_){
            let list = await Notice.findAll({
                order: [
                ['created_at', 'DESC'], 
          ]})
            console.log(list.length)
            return list[0]
        }
    }
}

