import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const API_URL = "https://rickandmortyapi.com/graphql";

export const client = new ApolloClient({
  link: new HttpLink({ uri: API_URL }),
  cache: new InMemoryCache(),
});