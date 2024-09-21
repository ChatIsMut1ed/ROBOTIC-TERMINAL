import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { Tab } from "@/global/types/Tabs";

type CustomTabsProps = {
  tabs: Tab[];
  defaultValue?: string;
  variant?: "pills" | "unstyled" | "default";
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
  grow?: boolean;
  cssModule?: string;
};

const CustomTabs: React.FC<CustomTabsProps> = ({
  tabs,
  defaultValue,
  variant = "unstyled",
  radius = "md",
  grow = false,
  cssModule = "SearchHeroTabs",
}) => {
  const [classes, setClasses] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    import(`./css/${cssModule}.module.css`)
      .then((module) => setClasses(module.default))
      .catch((error) => {
        console.error("Error loading CSS module:", error);
      });
  }, [cssModule]);

  return (
    <Tabs
      defaultValue={defaultValue || tabs[0]?.value}
      variant={variant}
      radius={radius}
      classNames={classes}
    >
      <Tabs.List grow={grow}>
        {tabs.map((tab) => (
          <Tabs.Tab
            value={tab.value}
            disabled={tab.disabled}
            key={tab.value}
            leftSection={tab.icon}
          >
            {tab.title}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Panel value={tab.value} key={tab.value}>
          {tab.content}
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default CustomTabs;
