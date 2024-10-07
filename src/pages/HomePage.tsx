import CustomTabs from "@/components/tabs/CustomTabs";
import { EditorOverviewPage } from "@/features/rosEnv/views";
import { Tab } from "@/global/types/Tabs";
import { ReplicadViewerPage } from "@/features/3dViewer/views";
import { ConfigOverviewPage } from "@/features/config/views";
import ConfigTab from "@/components/config/ConfigTab";
import ProjectBreadcrumbs from "@/components/breadcrumbs/ProjectBreadcrumbs";
import { ChatOverviewPage } from "@/features/chat/views";
import History from "@/features/history/views/History";
import Overview from "./Overview";
import AboutUs from "./AboutUs";
import useAuth from "@/global/hooks/useAuth";

const HomePage = () => {
  const { authState } = useAuth();
  const guestTabs: Tab[] = [
    {
      title: "Overview",
      value: "Overview",
      content: <Overview />,
      icon: null,
    },
    {
      title: "About us",
      value: "About us",
      content: <AboutUs />,
      icon: null,
    },
    {
      title: "Features",
      value: "Features",
      content: <></>,
      icon: null,
      disabled: true,
    },
    {
      title: "Testimonials",
      value: "Testimonials",
      content: <></>,
      icon: null,
      disabled: true,
    },
    {
      title: "Contact",
      value: "Contact",
      content: <></>,
      icon: null,
      disabled: true,
    },
  ];
  const privateTabs: Tab[] = [
    {
      title: "Editor",
      value: "editor",
      content: <EditorOverviewPage />,
      icon: null,
    },
    {
      title: "3D viewer",
      value: "3d-viewer",
      content: <ReplicadViewerPage />,
      icon: null,
    },
    {
      title: "History",
      value: "history",
      content: <History />,
      icon: null,
    },
    {
      title: "Chat",
      value: "chat",
      content: <ChatOverviewPage />,
      icon: null,
      disabled: false,
    },
    {
      title: "Config",
      value: "config",
      content: <ConfigOverviewPage />,
      icon: null,
    },
    {
      title: "Logs",
      value: "logs",
      content: <></>,
      icon: null,
    },
  ];
  const breadcrumbs = [
    { title: "MyProjects", href: "#" },
    { title: "Project Name", href: "#" },
    { title: "Main Project", href: "#" },
  ];

  return (
    <>
      {authState?.isLoggedIn ? (
        <>
          <ProjectBreadcrumbs items={breadcrumbs} />
          <ConfigTab />
          <CustomTabs tabs={privateTabs} cssModule="AppHeaderTabs" grow />
        </>
      ) : (
        <CustomTabs tabs={guestTabs} cssModule="AppHeaderTabs" grow />
      )}
    </>
  );
};

export default HomePage;
