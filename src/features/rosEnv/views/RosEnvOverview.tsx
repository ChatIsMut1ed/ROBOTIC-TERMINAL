import { Grid, Paper } from "@mantine/core";
import CodeEditor from "../components/RosEnv/CodeEditor";
import Terminal from "../components/RosEnv/Terminal";
import ReplicadExample from "../components/replicad/ReplicadExample";

const RosEnvOverview = () => {
  return (
    <>
      <Paper p={"md"} radius={"xs"}>
        <Grid>
          <Grid.Col span={8}>
            <CodeEditor />
          </Grid.Col>
          <Grid.Col span={4}>
            <Terminal />
          </Grid.Col>
        </Grid>
        {/* Replicad Example*/}
        <ReplicadExample />
      </Paper>
    </>
  );
};

export default RosEnvOverview;
