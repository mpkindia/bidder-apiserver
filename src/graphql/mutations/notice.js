const graphql = require('graphql')
const { GraphQLString, GraphQLNonNull, GraphQLID } = graphql
const { to,TE } = require('../../../common/helper')
const { Notice } = require('../../models')
const { NoticeType } = require('../types')
module.exports = {
    addNotice: {
        type: NoticeType,
        args: {
            text: { type: GraphQLString }
        },
        resolve: async function(root, { text }) {
            let notice = await Notice.create({ text })
            console.log(notice)
            return notice
        }
    },
}
