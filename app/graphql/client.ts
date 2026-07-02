import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { RetryLink } from "@apollo/client/link/retry";

const API_URL = "https://rickandmortyapi.com/graphql";
const httpLink = new HttpLink({ uri: API_URL });
const retryLink = new RetryLink({
  delay: {
    initial: 10000,
    max: 20000,
  },
  attempts: {
    max: 2,
    retryIf: (error) => !!error,
  },
});

export const client = new ApolloClient({
  link: retryLink.concat(httpLink),
  cache: new InMemoryCache(),
});