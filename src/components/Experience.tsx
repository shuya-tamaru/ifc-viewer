import { OrbitControls } from "@react-three/drei";

import useModelLoad from "../hooks/useModelLoad";
import useIdPicker from "../hooks/useIdPicker";

const Experience = () => {
  useModelLoad();
  useIdPicker();

  return (
    <>
      <ambientLight intensity={0.5} />
      <OrbitControls makeDefault />;
    </>
  );
};

export default Experience;
