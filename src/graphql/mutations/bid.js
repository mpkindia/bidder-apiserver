const graphql = require('graphql')
const { GraphQLString, GraphQLNonNull, GraphQLID } = graphql
const { to,TE } = require('../../../common/helper')
const { Bid, User, Bazaar } = require('../../models')
const { BidType } = require('../types')
module.exports = {
    addBid: {
        type: BidType,
        args: {
            // user_id: { type: new GraphQLNonNull(GraphQLID)}, get from context user id
            bazaar_id: {type: GraphQLID},
            bazaar_type: {type: GraphQLString}, //either open or close
            bid_type: {type: GraphQLString}, //singlejodi
            bid_number: {type: GraphQLString},
            bid_value: { type: GraphQLString} //reduce bid_value from credits
        },
        resolve: async function(root, args , context) {
            let user_id = context.user.id 
            console.log(user_id)
            let user = await User.findByPk(user_id)
            if(user.credits<args.bid_value) return TE('not enough credits')
            let bazaar = await Bazaar.findByPk(args.bazaar_id)
            if(args.bazaar_type === 'open' && bazaar.open_active === false) 
                TE('bazaar is closed')
            if(args.bazaar_type === 'close' && bazaar.close_active === false)  
                TE('bazaar is closed')  
            let leftcredits = user.credits - args.bid_value
            await user.update({ credits: leftcredits })
            let err, bid
            [err, bid] = await to(Bid.create({user_id,...args}))
            if (err) return TE('bid not created')
            else return bid
        }
    },
}