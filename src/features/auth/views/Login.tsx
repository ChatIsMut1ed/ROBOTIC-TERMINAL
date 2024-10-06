import {
  Box,
  Button,
  Checkbox,
  Container,
  Group,
  Image,
  List,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import classes from "../css/Login.module.css";
import logo from "@/assets/images/logo_full_black@500x.png";
import { myColors } from "@/global/constants/Colors";
import useAuth from "@/global/hooks/useAuth";

const Login = () => {
  const { globalLogInDispatch } = useAuth();
  const [activeForm, setActiveForm] = useState("login");

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    globalLogInDispatch({
      id: "1",
      first_name: "Bassem",
      last_name: "Gouty",
      email: "Bassem.gouty@gmail.com",
      role: "ADMIN",
      profile: "ADMIN",
      phone_number: "12345678",
    });
  };

  return (
    <Box className={classes.container}>
      <Container size="xl" pt={"xl"} pb={"xl"}>
        <Image src={logo} alt="logo" w={100} />
        <Group justify="space-between">
          <div>
            <Title className={classes.title}>
              Create your{" "}
              <span className={classes.highlightText}>OORB Studio</span>{" "}
              account!
            </Title>
            <List>
              <List.Item>
                <Text c="dimmed" mt="md" size="md">
                  Add capabilities through a custom module in our registry
                </Text>
              </List.Item>
              <List.Item>
                <Text c="dimmed" mt="md" size="md">
                  Design and configure machines through the UI
                </Text>
              </List.Item>
              <List.Item>
                <Text c="dimmed" mt="md" size="md">
                  Add capabilities through a custom module in our registry
                </Text>
              </List.Item>
              <List.Item>
                <Text c="dimmed" mt="md" size="md">
                  Update and monitor machines from your browser
                </Text>
              </List.Item>
            </List>
          </div>

          <div className={classes.inner}>
            <div className={classes.shadow}></div>
            <div>
              <Group justify="center">
                <Image src={logo} alt="logo" w={100} />
              </Group>

              {/* Tab container */}
              <div className={classes.tabs}>
                <Button
                  radius={"xs"}
                  size="xs"
                  variant="transparent"
                  className={`${classes.tab} ${
                    activeForm === "login" ? classes.activeTab : ""
                  }`}
                  onClick={() => setActiveForm("login")}
                >
                  Sign in
                </Button>
                <Button
                  radius={"xs"}
                  size="xs"
                  variant="transparent"
                  className={`${classes.tab} ${
                    activeForm === "signup" ? classes.activeTab : ""
                  }`}
                  onClick={() => setActiveForm("signup")}
                >
                  Sign up
                </Button>
              </div>

              {/* Conditionally render forms based on activeForm state */}
              {activeForm === "signup" ? (
                <form>
                  <Stack mt={"md"}>
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Fullname"
                      placeholder="e.g oorb studio"
                    />
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Email"
                      placeholder="e.g oorb@mail.com"
                    />
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Phone Number"
                      placeholder="e.g +216 12345678"
                    />
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Password"
                      placeholder="e.g ********"
                      type="password"
                    />
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Confirm Password"
                      placeholder="e.g ********"
                      type="password"
                    />
                    <Checkbox
                      size="xs"
                      defaultChecked
                      label="I agree to the Terms of Services and Privacy and Policies"
                    />
                    <Button
                      variant="filled"
                      color={myColors.secondary}
                      type="submit"
                    >
                      Create an OORB Studio Account
                    </Button>
                  </Stack>
                </form>
              ) : (
                <form onSubmit={handleLoginSubmit}>
                  <Stack mt={"md"}>
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Email"
                      placeholder="e.g oorb@mail.com"
                    />
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Password"
                      placeholder="e.g ********"
                      type="password"
                    />
                    <Checkbox
                      size="xs"
                      defaultChecked
                      label="I agree to the Terms of Services and Privacy and Policies"
                    />
                    <Button
                      variant="filled"
                      color={myColors.secondary}
                      type="submit"
                    >
                      Sign in to OORB Studio Account
                    </Button>
                  </Stack>
                </form>
              )}
            </div>
          </div>
        </Group>
      </Container>
    </Box>
  );
};

export default Login;
