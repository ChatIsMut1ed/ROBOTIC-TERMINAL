import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import classes from "./css/GetStartedCard.module.css";

const GetStartedCard = () => {
  return (
    <Container size="xl" mt={"md"}>
      <div className={classes.inner}>
        <div className={classes.shadow}></div>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>modern</span> React <br />{" "}
            components library
          </Title>
          <Text c="dimmed" mt="md">
            Build fully functional accessible web applications faster than ever
            – Mantine includes more than 120 customizable components and hooks
            to cover you in any situation
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>TypeScript based</b> – build type safe applications, all
              components and hooks export types
            </List.Item>
            <List.Item>
              <b>Free and open source</b> – all packages have MIT license, you
              can use Mantine in any project
            </List.Item>
            <List.Item>
              <b>No annoying focus ring</b> – focus ring will appear only when
              user navigates with keyboard
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control}>
              Get started
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              className={classes.control}
            >
              Source code
            </Button>
          </Group>
        </div>
        <Image
          src={
            "https://plus.unsplash.com/premium_vector-1726164379309-74fcffb9234e?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className={classes.image}
        />
      </div>
    </Container>
  );
};

export default GetStartedCard;
