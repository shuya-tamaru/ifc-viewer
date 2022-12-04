import { OrbitControls } from "@react-three/drei";

import useIdPicker from "../hooks/useIdPicker";
import LoadingOverRay from "./LoadingOverRay";
import Model from "./Model";

const Experience = () => {
  useIdPicker();

  return (
    <>
      <LoadingOverRay />
      <Model />
      <ambientLight intensity={0.8} />
      <OrbitControls makeDefault />
    </>
  );
};

export default Experience;
