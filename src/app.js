/*
    Express configuration
*/
if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = "development"
}
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { ApolloServer } = require('apollo-server-express');
const schema = require('./graphql');
const app = express();
const cors = require('cors');
const jwt = require('express-jwt');
const config = require('../config');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('tiny'));
app.use(cors());

const authMiddleware = jwt({
    secret: config.secret,
    credentialsRequired: false
});

app.use(authMiddleware);

const server = new ApolloServer({
    schema,
    playground: true,
    context: ({req}) => ({
        user: req.user
    })
});

server.applyMiddleware({ app });
// restRoutes(app);

app.use((req,res,next)=>{
    res.status(404).json({
        code: 404,
        message: 'Page not found'
    })
});

module.exports = app;