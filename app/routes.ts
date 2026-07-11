import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("home", "routes/home.tsx"),
  route("profile/:id", "routes/profile.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
