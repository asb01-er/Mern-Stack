const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose')

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

mongoose.connect(
    "mongodb+srv://ernesto17:er12345678@cluster0.xajmlwb.mongodb.net/GraphQL?appName=Cluster0"
)

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQlSchema ,
        rootValue: graphQlResolvers ,
        graphiql: true
    })
);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/graphql');
});
