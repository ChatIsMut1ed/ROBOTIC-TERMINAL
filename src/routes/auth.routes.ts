import { LoginPage } from "@/features/auth/views";
import { RouteConfig } from "./app.routes";
import { Role } from "@/global/enums/Role";

const authRoutes: RouteConfig[] = [
  {
    path: "/login",
    name: "Login page",
    component: LoginPage,
    layout: "guest",
    roles: Role.ALL,
  },
];

export default authRoutes;
