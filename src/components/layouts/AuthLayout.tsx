import { AppShell, rem } from "@mantine/core";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import { AppFooter } from "./AppFooter";
import { myColors } from "@/global/constants/Colors";

export default function AuthLayout() {
  return (
    <AppShell padding={0} header={{ height: rem(80) }}>
      <AppShell.Header>
        <AppHeader />
      </AppShell.Header>
      <AppShell.Main
        style={{
          backgroundColor: myColors.backgroundPrimary,
        }}
      >
        <Outlet />
        <AppFooter />
      </AppShell.Main>
    </AppShell>
  );
}
