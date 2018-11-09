const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for graphql'
}]

let idCount = links.length
const resolvers = {
    Query,
    Mutation,
    AuthPayload
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://us1.prisma.sh/sergey-nam/database/dev',
            secret: 'mysecret123',
            debug: true,
        })
    })
})

server.start(() => console.log(`Server is running on http://localhost:4000!`))