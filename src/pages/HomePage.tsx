import CustomTabs from "@/components/tabs/CustomTabs";
import { RosEnvOverviewPage } from "@/features/rosEnv/views";
import { Tab } from "@/global/types/Tabs";

const HomePage = () => {
  const tabs: Tab[] = [
    {
      title: "Overview",
      value: "Overview",
      content: <RosEnvOverviewPage />,
      icon: null,
    },
    {
      title: "About us",
      value: "About us",
      content: <></>,
      icon: null,
    },
    {
      title: "Features",
      value: "Features",
      content: <></>,
      icon: null,
    },
    {
      title: "Testimonials",
      value: "Testimonials",
      content: <></>,
      icon: null,
    },
    {
      title: "Contact",
      value: "Contact",
      content: <RosEnvOverviewPage />,
      icon: null,
    },
  ];
  return (
    <>
      <CustomTabs tabs={tabs} cssModule="AppHeaderTabs" grow />
    </>
  );
};

export default HomePage;