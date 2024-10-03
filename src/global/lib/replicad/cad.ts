import { drawRoundedRectangle, FaceFinder, Solid } from "replicad";

// Define the type for the thickness parameter
type Thickness = number;

// The replicad code
export function drawBox(thickness: Thickness) {
  const solid: Solid = drawRoundedRectangle(30, 50)
    .sketchOnPlane()
    .extrude(20) as Solid; // Explicitly casting to Solid

  return solid.shell(thickness, (f: FaceFinder) => f.inPlane("XY", 20));
}
