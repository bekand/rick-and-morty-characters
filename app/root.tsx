import { Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./app.css";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/client";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
      </head>
      <body>
        <ApolloProvider client={client}>
          <Outlet />
        </ApolloProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
