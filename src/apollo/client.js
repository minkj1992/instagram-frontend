import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import { isLoggedIn } from "./cache";

// https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-the-cache
const httpLink = new HttpLink({ uri: "http:localhost:4000" });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null,
    },
  });
  return forward(operation);
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedIn();
          },
        },
      },
    },
  },
});

export default new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache,
});
