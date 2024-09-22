import { AppShell, rem } from "@mantine/core";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import { AppFooter } from "./AppFooter";

export default function AuthLayout() {
  return (
    <AppShell padding={0} header={{ height: rem(80) }}>
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main>
        <div>
          <Outlet />
        </div>
        <AppFooter />
      </AppShell.Main>
    </AppShell>
  );
}
