import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import useIfcLoader from "./useIFCLoader";

const useModelLoad = () => {
  const { scene } = useThree();
  const ifcLoader = useIfcLoader();

  useEffect(() => {
    ifcLoader.load("/sample-model.ifc", (ifcModel) => {
      scene.add(ifcModel);
    });
  }, []);
};

export default useModelLoad;
