import {
  Text,
  ActionIcon,
  Group,
  rem,
  Image,
  Box,
  TextInput,
  Button,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import classes from "@/components/layouts/css/AppFooter.module.css";
import logo from "@/assets/images/logo_full_black@500x.png";

const data = [
  {
    title: "Product",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Case studies", link: "#" },
      { label: "Reviews", link: "#" },
      { label: "Updates", link: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", link: "#" },
      { label: "Contact us", link: "#" },
      { label: "Careers", link: "#" },
      { label: "Culture", link: "#" },
      { label: "Blog", link: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Getting started", link: "#" },
      { label: "Help center", link: "#" },
      { label: "Server status", link: "#" },
      { label: "Report a bug", link: "#" },
      { label: "Chat support", link: "#" },
    ],
  },
  {
    title: "Use Cases",
    links: [
      { label: "Code Deployment", link: "#" },
      { label: "Data Analytics", link: "#" },
      { label: "Mobile Enablement", link: "#" },
      { label: "Predictive Maintenance", link: "#" },
      { label: "Accelerate ROS", link: "#" },
    ],
  },
  {
    title: "Downloads",
    links: [
      { label: "iOS", link: "#" },
      { label: "Android", link: "#" },
      { label: "Mac", link: "#" },
      { label: "Windows", link: "#" },
      { label: "Chrome", link: "#" },
    ],
  },
];

export function AppFooter() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <div
      style={{
        paddingTop: "0px",
        backgroundColor: "white",
      }}
    >
      <footer className={classes.footer}>
        <Box p={"lg"} className={classes.firstSection}>
          <Group justify="space-between">
            <Image src={logo} alt="logo" h={80} fit="contain" />
            <Text
              size="sm"
              c="dimmed"
              className={classes.description}
              lineClamp={3}
            >
              The AI-driven open-source cloud robotics framework. built around
              ROS, with a mission to shift the Robotics workflow and education
              paradigm!
            </Text>
          </Group>
        </Box>

        <Box mt={"md"} p={"md"}>
          <Group grow>
            {groups}
            <Box>
              <Text className={classes.newsletterTitle}>
                Subscribe to our newsletter
              </Text>
              <Text
                size="sm"
                c="dimmed"
                className={classes.newsletterDescription}
              >
                Stay updated with our latest news and offerings.
              </Text>
              <Group gap={5}>
                <TextInput placeholder="Your email address" radius={"xs"} />
                <Button className={classes.newsletterButton} radius={"xs"}>
                  Subscribe
                </Button>
              </Group>
            </Box>
          </Group>
        </Box>

        <Box className={classes.afterFooter} p={"md"}>
          <Text c="dimmed" size="sm">
            Copyright © 2024 OORB Studio | All Rights Reserved
          </Text>

          <Group
            gap={0}
            className={classes.social}
            justify="flex-end"
            wrap="nowrap"
          >
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandTwitter
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandYoutube
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Box>
      </footer>
    </div>
  );
}
