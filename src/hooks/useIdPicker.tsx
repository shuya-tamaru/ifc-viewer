import { useFrame, useThree } from "@react-three/fiber";
import { IFCModel } from "web-ifc-three/IFC/components/IFCModel";

import { useEffect, useRef, useState } from "react";
import { Object3D } from "three";

import useLoadingState from "../stores/useLoadingState";
import useFocusId from "../stores/useFocusId";

const useIdPicker = () => {
  const { scene, raycaster, gl } = useThree();
  const canvas = gl.domElement;

  const { loaded, loader } = useLoadingState((state) => state);
  const { setFocusId } = useFocusId((state) => state);

  const idRef = useRef<string>("");
  const [rayObjects, setRayObjects] = useState<Object3D[] | null>(null);

  useEffect(() => {
    if (loaded) {
      const model = scene.children.filter((mesh) => {
        const ifc = mesh.name === "ifc" && mesh;
        return ifc;
      });
      setRayObjects(model);
      canvas.addEventListener("dblclick", () => {
        setFocusId(idRef.current);
      });
    }
  }, [loaded]);

  useFrame(() => {
    if (rayObjects && rayObjects.length > 0) {
      raycaster.firstHitOnly = true;
      const obj = raycaster.intersectObjects(rayObjects);
      if (obj.length > 0 && loader && loaded) {
        const ifcObject = obj[0];
        const index = ifcObject.faceIndex;
        const ifcModel = ifcObject.object as IFCModel;
        const geometry = ifcModel.geometry;
        const ifc = loader.ifcManager;
        const id: string = index
          ? ifc.getExpressId(geometry, index).toString()
          : "";
        idRef.current = id;
      } else {
        idRef.current = "";
      }
    }
  });

  return;
};

export default useIdPicker;
