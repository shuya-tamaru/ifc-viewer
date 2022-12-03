import { IFCLoader } from "web-ifc-three/IFCLoader";
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from "three-mesh-bvh";

const ifcLoader = new IFCLoader();
ifcLoader.ifcManager.setupThreeMeshBVH(
  computeBoundsTree,
  disposeBoundsTree,
  acceleratedRaycast
);
ifcLoader.ifcManager.setWasmPath("../../");

const useIfcLoader = () => {
  return ifcLoader;
};

export default useIfcLoader;
