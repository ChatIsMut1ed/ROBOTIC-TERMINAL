import { myColors } from "@/global/constants/Colors";
import { Container, Grid, Group, Image, Text, Title } from "@mantine/core";
import classes from "./css/RoadMapCard.module.css";

const RoadMapCard = () => {
  return (
    <div className={classes.background}>
      <Container size={"xl"}>
        <Title order={2} c={myColors.secondary} fz={40}>
          Don’t build all this stuff yourself
        </Title>
        <Group gap={5}>
          <Text fw={"bold"} size="xl" fz={30}>
            OORB Studio
          </Text>
          <Text size="xl" fz={30}>
            gets infrastructure work off your roadmap
          </Text>
        </Group>

        <div className={classes.roadmapCard}>
          <Image
            src="https://via.placeholder.com/300x150" // Replace with your roadmap image URL
            alt="Roadmap"
            className={classes.roadmapImage}
          />
          <div className={classes.dottedBorder}></div>
          <Text className={classes.loremText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </div>

        {/* New Grid of Small Cards */}
        <Grid mt="xl">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid.Col span={4} key={item}>
              <div className={classes.smallCard}>
                <img
                  src="https://via.placeholder.com/100" // Replace with your image URL
                  alt={`Image ${item}`}
                  className={classes.smallCardImage}
                />
                <div className={classes.smallCardContent}>
                  <Title order={3} size="h4">
                    Title {item}
                  </Title>
                  <Text>
                    This is a description for card {item}. Lorem ipsum dolor sit
                    amet.
                  </Text>
                </div>
              </div>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default RoadMapCard;
