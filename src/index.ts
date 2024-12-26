import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  constraintDirectiveTypeDefs,
  constraintDirective,
} from "graphql-constraint-directive";
import { makeExecutableSchema } from "@graphql-tools/schema";

import resolvers from "./resolvers.js";
import typeDefs from "./typeDefs.js";

let schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, typeDefs],
  resolvers,
});

schema = constraintDirective()(schema);

async function startServer() {
  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

startServer();
