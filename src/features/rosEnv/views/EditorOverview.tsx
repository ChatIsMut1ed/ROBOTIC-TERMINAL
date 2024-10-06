import { Grid, Paper } from "@mantine/core";
import CodeEditor from "../components/RosEnv/CodeEditor";
import Terminal from "../components/RosEnv/Terminal";

const EditorOverview = () => {
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
      </Paper>
    </>
  );
};

export default EditorOverview;
