import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UIRouter, pushStateLocationPlugin } from "@uirouter/react";
import { routes, config } from "./routes";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql ',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <UIRouter plugins={[pushStateLocationPlugin]} states={routes} config={config}>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </UIRouter>,
  document.getElementById("root")
);
