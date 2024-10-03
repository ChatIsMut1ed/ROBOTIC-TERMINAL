/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button, TextInput, Title, Box, Loader, Group } from "@mantine/core";
import FileSaver from "file-saver";
import { wrap } from "comlink";
import ThreeContext from "@/global/lib/replicad/ThreeContext";
import cadWorker from "@/global/lib/replicad/worker.js?worker";
import ReplicadMesh from "./ReplicadMesh";
import { CadWorkerApi } from "@/global/types/Replicad";

// Wrap the worker with type safety
const cad = wrap<CadWorkerApi>(new cadWorker());

const ReplicadExample = () => {
  const [size, setSize] = useState(5);
  const [mesh, setMesh] = useState<{ faces: any; edges: any } | null>(null);

  const downloadModel = async () => {
    const blob = await cad.createBlob(size);
    FileSaver.saveAs(blob, "model.stl");
  };

  useEffect(() => {
    cad.createMesh(size).then((m) => setMesh(m));
  }, [size]);

  return (
    <Box mt="lg">
      <Title order={2} mb={"md"}>
        Replicad Example
      </Title>
      <Group mb="md">
        <TextInput
          type="number"
          step="1"
          min="1"
          max="10"
          value={size}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (val > 0 && val <= 10) setSize(val);
          }}
          style={{ flexGrow: 1, marginRight: "10px" }}
        />
        <Button onClick={downloadModel}>Download STL</Button>
      </Group>
      <Box style={{ height: "300px" }}>
        {mesh ? (
          <ThreeContext>
            <ReplicadMesh edges={mesh.edges} faces={mesh.faces} />
          </ThreeContext>
        ) : (
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              fontSize: "1.5em",
            }}
          >
            <Loader />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ReplicadExample;
