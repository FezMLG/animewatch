import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const GraphQLClient = (props: { children: React.ReactNode }) => (
  <ApolloProvider client={client}>{props.children}</ApolloProvider>
);

export default GraphQLClient;
