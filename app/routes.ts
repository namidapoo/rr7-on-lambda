import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("streaming", [
        route("await", "routes/streaming/await.tsx"),
        route("use", "routes/streaming/use.tsx"),
    ]),
] satisfies RouteConfig;
