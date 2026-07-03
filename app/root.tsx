import { Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import "./app.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/client";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
