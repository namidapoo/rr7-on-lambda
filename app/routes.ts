import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("/streaming", "routes/streaming.tsx"),
] satisfies RouteConfig;
