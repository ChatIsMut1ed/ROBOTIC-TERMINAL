import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  Badge,
} from "@mantine/core";
import { IconPlayerPlay } from "@tabler/icons-react";
import classes from "./css/GetStartedCard.module.css";
import { myColors } from "@/global/constants/Colors";
import logo from "@/assets/images/logo_simple_black_500x.png";

const GetStartedCard = () => {
  return (
    <Container size="xl" mt={"md"}>
      <div className={classes.inner}>
        <div className={classes.shadow}></div>

        {/* Badge added at the top left */}
        <Badge
          className={classes.badge}
          color={myColors.secondary}
          size="md"
          radius={"xs"}
        >
          New
        </Badge>

        <div className={classes.content}>
          <Image src={logo} alt="Logo" className={classes.logo} />
          <Title className={classes.title}>
            Software to revolutionize <br />
            <span className={classes.highlightText}>hardware</span>
          </Title>
          <Text c="dimmed" mt="md">
            Flexible and intuitive cloud solutions that close the gap between
            software and hardware. We help global teams do more with sensors,
            machines, and devices at scale.
          </Text>

          {/* Buttons moved to the bottom */}
          <Group className={classes.actions} mt={"md"}>
            <Button
              radius="xs"
              size="md"
              className={classes.control}
              variant="outline"
              color="dark"
            >
              Get started
            </Button>
            <Button
              variant="subtle"
              size="md"
              leftSection={<IconPlayerPlay size={16} stroke={1.5} />}
              color="dark"
              radius="xs"
            >
              Play Video
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
