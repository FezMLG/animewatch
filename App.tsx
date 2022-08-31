import React from "react";
import GraphQLClient from "./src/graphql/GraphQLClient";
import Routes from "./src/routes/Routes";

const App = () => {
  return (
    <GraphQLClient>
      <Routes />
    </GraphQLClient>
  );
};

export default App;
