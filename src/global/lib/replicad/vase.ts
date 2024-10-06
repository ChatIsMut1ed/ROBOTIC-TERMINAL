/* eslint-disable @typescript-eslint/no-explicit-any */
// global/lib/replicad/vaseGeometry.ts
import { draw } from "replicad";

const defaultParams = {
  height: 100,
  baseWidth: 20,
  wallThickness: 5,
  lowerCircleRadius: 1.5,
  lowerCirclePosition: 0.25,
  higherCircleRadius: 0.75,
  higherCirclePosition: 0.75,
  topRadius: 0.9,
  topFillet: true,
  bottomHeavy: true,
};

const createVase = ({
  height = defaultParams.height,
  baseWidth = defaultParams.baseWidth,
  wallThickness = defaultParams.wallThickness,
  lowerCircleRadius = defaultParams.lowerCircleRadius,
  lowerCirclePosition = defaultParams.lowerCirclePosition,
  higherCircleRadius = defaultParams.higherCircleRadius,
  higherCirclePosition = defaultParams.higherCirclePosition,
  topRadius = defaultParams.topRadius,
  topFillet = defaultParams.topFillet,
  bottomHeavy = defaultParams.bottomHeavy,
}) => {
  const splinesConfig = [
    { position: lowerCirclePosition, radius: lowerCircleRadius },
    {
      position: higherCirclePosition,
      radius: higherCircleRadius,
      startFactor: bottomHeavy ? 3 : 1,
    },
    { position: 1, radius: topRadius, startFactor: bottomHeavy ? 3 : 1 },
  ];

  const sketchVaseProfile = draw().hLine(baseWidth);

  splinesConfig.forEach(({ position, radius, startFactor }) => {
    sketchVaseProfile.smoothSplineTo([baseWidth * radius, height * position], {
      endTangent: [0, 1],
      startFactor,
    });
  });

  let vase = sketchVaseProfile
    .lineTo([0, height])
    .close()
    .sketchOnPlane("XZ")
    .revolve();

  if (wallThickness) {
    vase = vase.shell(wallThickness, (f) => f.containsPoint([0, 0, height]));
  }

  if (topFillet) {
    vase = vase.fillet(wallThickness / 3, (e) => e.inPlane("XY", height));
  }

  return vase;
};

export default createVase;
