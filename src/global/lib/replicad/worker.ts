/* eslint-disable @typescript-eslint/no-explicit-any */
import opencascade from "replicad-opencascadejs/src/replicad_single.js";
import opencascadeWasm from "replicad-opencascadejs/src/replicad_single.wasm?url";
import { setOC } from "replicad";
import { expose } from "comlink";
import { drawBox } from "./cad";
import createVase from "./vase";

// Import your model as a simple function

let loaded = false;
const init = async () => {
  if (loaded) return Promise.resolve(true);

  const OC = await opencascade({
    locateFile: () => opencascadeWasm,
  });

  loaded = true;
  setOC(OC);

  return true;
};
const started = init();

function createBlob(thickness: number) {
  return started.then(() => {
    return drawBox(thickness).blobSTL();
  });
}

function createMesh(thickness: number) {
  return started.then(() => {
    const box = drawBox(thickness);
    return {
      faces: box.mesh(),
      edges: box.meshEdges(),
    };
  });
}

function createVaseMesh(params: any) {
  // Adjust the parameter type as needed
  return started.then(() => {
    const vase = createVase(params);
    return {
      faces: vase.mesh(), // Assuming vase has mesh method
      edges: vase.meshEdges(), // Assuming vase has meshEdges method
    };
  });
}

expose({ createBlob, createMesh, createVaseMesh });
