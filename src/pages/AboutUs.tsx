import { Container, Group, Image, Text, Title } from "@mantine/core";
import classes from "./css/AboutUs.module.css";
import { myColors } from "@/global/constants/Colors";
import logo from "@/assets/images/logo_full_black@500x.png";

const AboutUs = () => {
  return (
    <>
      <Container size={"xl"} mt="xl">
        <Group gap={5}>
          <Title c={myColors.secondary}>OORB Studio </Title>
          <Title>is Powered by</Title>
        </Group>
      </Container>
      <Container size={"xl"} mt="xl" className={classes.container}>
        {/* First Card */}
        <div
          className={classes.card}
          style={{
            padding: 15,
            zIndex: 99,
            backgroundColor: "white",
          }}
        >
          <Image
            src={logo} // Replace with your logo image URL
            alt="App Logo"
            className={classes.logo}
          />
          <div className={classes.dottedBorder}></div>
          <Text mt="md">
            Long text goes here. This is a description of the company and what
            it does. It can be several lines long, explaining the mission and
            vision.
          </Text>
        </div>

        {/* Second Card */}
        <div className={`${classes.card} ${classes.secondCard}`}>
          <Image
            src="https://plus.unsplash.com/premium_photo-1677087121017-b779a16ff921?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image URL
            alt="Card Image"
            className={classes.cardImage}
          />
        </div>

        {/* Third Card */}
        <div className={`${classes.card} ${classes.thirdCard}`}>
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image URL
            alt="Card Image"
            className={classes.cardImage}
          />
        </div>
      </Container>
    </>
  );
};

export default AboutUs;
