import HomePage from "@/pages/HomePage";
import { RouteConfig } from "./app.routes";
import { Role } from "@/global/enums/Role";

const chatRoutes: RouteConfig[] = [
  {
    path: "/c/:id",
    name: "new chat",
    component: HomePage,
    layout: "guest",
    roles: Role.ALL,
  },
];

export default chatRoutes;
