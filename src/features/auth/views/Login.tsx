/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { LoginForm, RegisterForm } from "@/global/types/Auth";
import { useLoginForm, useRegister } from "@/global/hooks/api/auth.api";

const Login = () => {
  const { globalLogInDispatch } = useAuth();
  const loginMutation = useLoginForm();
  const registerMutation = useRegister();
  const [loginFormData, setLoginFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [registerFormData, setRegisterFormData] = useState<RegisterForm>({
    email: "",
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [formRegisterErrors, setFormRegisterErrors] = useState<string | null>(
    null
  );
  const [activeForm, setActiveForm] = useState("login");
  const handleChange = <T extends string | null>(name: string, value: T) => {
    setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleRegisterChange = <T extends string | null>(
    name: string,
    value: T
  ) => {
    setRegisterFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await loginMutation.mutateAsync(loginFormData);
      globalLogInDispatch({
        id: res?.data?.user?.id,
        email: res?.data?.user?.email,
        username: res?.data?.user?.username,
        organization_id: res?.data?.user?.organization_id,
        token: res?.data?.token,
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorsObject = error.response.data;
        setFormErrors(errorsObject);
      } else {
        console.error("Error occurred without response data:", error);
      }
    }
  };
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await registerMutation.mutateAsync(registerFormData);
      globalLogInDispatch({
        id: res?.data?.user?.id,
        email: res?.data?.user?.email,
        username: res?.data?.user?.username,
        organization_id: res?.data?.user?.organization_id,
        token: "",
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorsObject = error.response.data;
        setFormRegisterErrors(errorsObject);
      } else {
        console.error("Error occurred without response data:", error);
      }
    }
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
                <form onSubmit={handleRegisterSubmit}>
                  {formErrors && (
                    <Text mb="md" c={"red"} size="sm" fw={"bold"} ta={"center"}>
                      {formErrors}
                    </Text>
                  )}
                  <Stack mt={"md"}>
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Username"
                      placeholder="e.g oorb studio"
                      value={registerFormData?.username || ""}
                      onChange={(event) =>
                        handleRegisterChange(
                          "username",
                          event.currentTarget.value
                        )
                      }
                      error={formRegisterErrors ? " " : null}
                    />
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Email"
                      placeholder="e.g oorb@mail.com"
                      type="email"
                      value={registerFormData?.email || ""}
                      onChange={(event) =>
                        handleRegisterChange("email", event.currentTarget.value)
                      }
                      error={formRegisterErrors ? " " : null}
                    />
                    {/* <TextInput
                      variant="filled"
                      size="xs"
                      label="Phone Number"
                      placeholder="e.g +216 12345678"
                    /> */}
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Password"
                      placeholder="e.g ********"
                      type="password"
                      value={registerFormData?.password || ""}
                      onChange={(event) =>
                        handleRegisterChange(
                          "password",
                          event.currentTarget.value
                        )
                      }
                      error={formRegisterErrors ? " " : null}
                    />
                    {/* <TextInput
                      variant="filled"
                      size="xs"
                      label="Confirm Password"
                      placeholder="e.g ********"
                      type="password"
                    /> */}
                    <Checkbox
                      size="xs"
                      defaultChecked
                      label="I agree to the Terms of Services and Privacy and Policies"
                    />
                    <Button
                      loading={registerMutation?.isPending}
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
                  {formErrors && (
                    <Text mt="md" c={"red"} size="sm" fw={"bold"} ta={"center"}>
                      {formErrors}
                    </Text>
                  )}
                  <Stack mt={"md"}>
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Username"
                      placeholder="e.g oorb"
                      value={loginFormData?.username || ""}
                      onChange={(event) =>
                        handleChange("username", event.currentTarget.value)
                      }
                      error={formErrors ? " " : null}
                    />
                    <TextInput
                      variant="filled"
                      size="xs"
                      label="Password"
                      placeholder="e.g ********"
                      type="password"
                      value={loginFormData?.password || ""}
                      onChange={(event) =>
                        handleChange("password", event.currentTarget.value)
                      }
                      error={formErrors ? " " : null}
                    />
                    <Checkbox
                      size="xs"
                      defaultChecked
                      label="I agree to the Terms of Services and Privacy and Policies"
                    />
                    <Button
                      variant="filled"
                      color={myColors.secondary}
                      loading={loginMutation?.isPending}
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
