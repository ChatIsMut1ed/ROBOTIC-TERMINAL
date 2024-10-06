import { myColors } from "@/global/constants/Colors";
import {
  Breadcrumbs,
  Anchor,
  Box,
  Group,
  Button,
  ThemeIcon,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

// Define the type for the breadcrumb item
interface BreadcrumbItem {
  title: string;
  href: string;
}

// Define the props type for the ProjectBreadcrumbs component
interface ProjectBreadcrumbsProps {
  items: BreadcrumbItem[];
}

// Create the ProjectBreadcrumbs component
const ProjectBreadcrumbs: React.FC<ProjectBreadcrumbsProps> = ({ items }) => {
  return (
    <Box
      p="lg"
      style={{
        backgroundColor: myColors.secondary,
        borderTop: "1px solid",
        borderBottom: "1px solid",
      }}
    >
      <Group justify="space-between">
        <Breadcrumbs separator="">
          {items.map((item, index) => (
            <Group gap={"md"}>
              <Anchor
                href={item.href}
                key={index}
                c={"white"}
                fw={"bold"}
                size="xs"
              >
                {item.title}
              </Anchor>
              {index < items.length - 1 && (
                <ThemeIcon variant="transparent" size={"sm"}>
                  <IconChevronRight
                    color="white"
                    stroke={2}
                    style={{
                      height: "70%",
                      width: "70%",
                    }}
                  />
                </ThemeIcon>
              )}
            </Group>
          ))}
        </Breadcrumbs>
        <Button
          variant="subtle"
          size="xs"
          color="white"
          leftSection={
            <IconChevronLeft
              color="white"
              stroke={2}
              style={{
                height: "70%",
                width: "70%",
              }}
            />
          }
        >
          Back to all projects
        </Button>
      </Group>
    </Box>
  );
};

export default ProjectBreadcrumbs;
