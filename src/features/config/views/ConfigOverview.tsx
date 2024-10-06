import {
  Card,
  Text,
  Grid,
  Skeleton,
  Stack,
  Tooltip,
  Group,
  ThemeIcon,
} from "@mantine/core";
import { useGetConfig } from "@/global/hooks/api/config.api";
import { bytesToGB } from "@/global/utils/helpers/conversions";
import {
  IconBrandUbuntu,
  IconCpu,
  IconInfoCircle,
  IconServer,
  IconSunElectricity,
} from "@tabler/icons-react";

const ConfigOverview = () => {
  const { data: configData, isLoading, isError } = useGetConfig();

  if (isLoading) {
    return (
      <Card shadow="sm" padding="lg">
        <Skeleton height={24} width="50%" mb="sm" />
        <Skeleton height={18} width="30%" mb="xs" />
        <Skeleton height={18} width="70%" mb="xs" />
        <Skeleton height={18} width="60%" mb="xs" />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card shadow="sm" padding="lg">
        <Text c="red">Failed to load system information</Text>
      </Card>
    );
  }

  return (
    <Card padding="lg" withBorder={true} radius={"xs"}>
      <Group gap={"xs"}>
        <ThemeIcon variant="transparent">
          <IconBrandUbuntu size={24} />
        </ThemeIcon>
        <Text size="lg" w={500}>
          System Information
        </Text>
      </Group>
      <Grid mt="md">
        {[
          { label: "Platform", value: configData?.systemInfo.platform },
          { label: "Version", value: configData?.systemInfo.version },
          { label: "Architecture", value: configData?.systemInfo.architecture },
          { label: "Hostname", value: configData?.systemInfo.hostname },
          {
            label: "Total Memory",
            value: bytesToGB(configData?.systemInfo.totalMemory),
            icon: <IconSunElectricity size={16} />,
          },
          {
            label: "Free Memory",
            value: bytesToGB(configData?.systemInfo.freeMemory),
            icon: <IconServer size={16} />,
          },
          {
            label: "Number of CPUs",
            value: configData?.systemInfo.numberOfCPUs,
            icon: <IconCpu size={16} />,
          },
          {
            label: "Distribution",
            value: configData?.distribution,
            icon: <IconServer size={16} />,
          },
        ].map((item, index) => (
          <Grid.Col span={6} key={index}>
            <Stack gap={"xs"}>
              <Text size="sm" w={700}>
                {item.label}:
              </Text>
              <Text size="sm" c="dimmed">
                {item.value}{" "}
                {item.icon && <Tooltip label={item.label}>{item.icon}</Tooltip>}
              </Text>
            </Stack>
          </Grid.Col>
        ))}
      </Grid>
      <Group mt={50} gap={"xs"}>
        <ThemeIcon variant="transparent">
          <IconInfoCircle size={24} />
        </ThemeIcon>
        <Text size="sm" c="dimmed">
          More configurations are coming soon! Stay tuned for updates as we
          expand the system capabilities and provide you with more detailed
          information about your setup.
        </Text>
      </Group>
    </Card>
  );
};

export default ConfigOverview;
