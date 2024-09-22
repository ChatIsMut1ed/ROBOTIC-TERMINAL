import { Group, Image, Text, Title } from "@mantine/core";
import classes from "./css/OorbStudioIntro.module.css";

const OorbStudioIntro = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.textContent}>
          <Title order={1} c={"white"}>
            What is OORB Studio?
          </Title>
          <Text c={"dimmed"} mt="md" size="lg">
            OORB Studio offers a CLI Natural language-to-ROS abstraction layer,
            and cloud-based tools for robotics development, including AI-driven
            code generation, CAD design, and real-time collaboration, addressing
            the lack of accessible, affordable, and comprehensive tools for
            robotics development, education, and deployment.
          </Text>
        </div>
        <Image
          src={
            "https://plus.unsplash.com/premium_vector-1726164379309-74fcffb9234e?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          className={classes.image}
        />
      </div>
      <Text mt={50} ta={"center"} c="white" size={"lg"} tt={"uppercase"}>
        Worked with some of the best out there
      </Text>
      <Group justify="space-around" mt={50}>
        {[1, 2, 3, 4, 5].map(() => (
          <Image
            src="https://chaarg.com/wp-content/uploads/2022/07/yahoo-logo.png"
            height={70}
            fit="contain"
          />
        ))}
      </Group>
    </div>
  );
};

export default OorbStudioIntro;
