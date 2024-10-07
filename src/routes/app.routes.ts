import React from "react";
import { Role } from "@/global/enums/Role";
import { UnderMaintenancePage } from "@/pages/UnderMaintenancePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import authRoutes from "./auth.routes";
import HomePage from "@/pages/HomePage";
import chatRoutes from "./chat.routes";

export interface RouteConfig {
  path: string;
  component: React.ComponentType<unknown>;
  name: string;
  roles: Role;
  layout: "guest" | "private";
}

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home Page",
    component: HomePage,
    layout: "guest",
    roles: Role.ALL,
  },
  {
    path: "/home-page",
    name: "Home Page",
    component: HomePage,
    layout: "guest",
    roles: Role.ALL,
  },
  ...authRoutes,
  ...chatRoutes,
  {
    path: "/under-maintenance",
    name: "under maintenance",
    component: UnderMaintenancePage,
    layout: "private",
    roles: Role.ALL,
  },
  {
    path: "*",
    name: "not found",
    component: NotFoundPage,
    layout: "guest",
    roles: Role.ALL,
  },
];

export default routes;
