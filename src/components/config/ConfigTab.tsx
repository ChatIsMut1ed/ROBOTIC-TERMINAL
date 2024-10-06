import { useGetConfig } from "@/global/hooks/api/config.api";
import { ActionIcon, Box, Button, Group, Stack, Text } from "@mantine/core";
import { IconPencilCog, IconRefresh } from "@tabler/icons-react";
import classes from "./css/ConfigTab.module.css";

const ConfigTab = () => {
  const { data: configData } = useGetConfig();
  return (
    <Box p={"lg"} className={classes.configContainer} pb={"xl"}>
      <Group justify="space-between">
        <Group gap={"xl"}>
          <Stack gap={"xs"}>
            <Text size="xs" fw={"bold"} tt={"uppercase"}>
              Project Name
            </Text>
            <Group gap={"xs"}>
              <Text size="sm">RoboDog Main Computer-vision</Text>
              <ActionIcon size={"xs"} variant="transparent" color="dark">
                <IconPencilCog
                  style={{
                    width: "70%",
                    height: "70%",
                  }}
                  stroke={2}
                />
              </ActionIcon>
            </Group>
          </Stack>
          <Stack gap={"xs"}>
            <Text size="xs" fw={"bolder"} tt={"uppercase"}>
              Latest Changes
            </Text>
            <Text size="sm">15 Minutes ago</Text>
          </Stack>
          <Stack gap={"xs"}>
            <Text size="xs" fw={"bolder"} tt={"uppercase"}>
              Version
            </Text>
            <Text size="sm">v0.14.12</Text>
          </Stack>
          <Stack gap={"xs"}>
            <Text size="xs" fw={"bolder"} tt={"uppercase"}>
              Host
            </Text>
            <Text size="sm">{configData?.systemInfo.hostname}</Text>
          </Stack>
          <Stack gap={"xs"}>
            <Text size="xs" fw={"bolder"} tt={"uppercase"}>
              Ip's
            </Text>
            <Text size="sm">['192.168.1.1']</Text>
          </Stack>
          <Stack gap={"xs"}>
            <Text size="xs" fw={"bolder"} tt={"uppercase"}>
              Os
            </Text>
            <Text size="sm">{configData?.distribution}</Text>
          </Stack>
        </Group>
        <Button
          size="xs"
          leftSection={<IconRefresh />}
          variant="white"
          radius={"xs"}
          color="dark"
          classNames={classes}
        >
          Reset Project
        </Button>
      </Group>
    </Box>
  );
};

export default ConfigTab;
