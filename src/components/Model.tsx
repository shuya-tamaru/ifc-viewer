import { useLoader, useThree } from "@react-three/fiber";
import { IFCLoader } from "web-ifc-three";
import { IFCModel } from "web-ifc-three/IFC/components/IFCModel";
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from "three-mesh-bvh";
import useLoadingState from "../stores/useLoadingState";
import { ParserProgress } from "web-ifc-three/IFC/components/IFCParser";
import useOverrayState from "../stores/useOverrayState";
import { gsap } from "gsap";

const Model = () => {
  const { gl, scene } = useThree();
  const canvas = gl.domElement;
  const loadingBar = document.getElementById("loadingBar");
  const loadingText = document.getElementById("loadingText");
  const barContainer = document.getElementById("barContainer");

  const { setLoader, setLoaded } = useLoadingState((state) => state);
  const { setRemoveOverray } = useOverrayState((state) => state);

  const handleLoading = () => {
    setLoaded(true);
    if (loadingText && barContainer) {
      loadingText.innerHTML = "Go to Model !!";
      loadingText.style.cursor = "pointer";
      loadingText.addEventListener("click", () => {
        barContainer.style.display = "none";
        canvas.style.background =
          "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)";
        const overrayMesh = scene.children.filter((mesh) => {
          if (mesh.name === "overray") {
            return mesh as THREE.Mesh;
          }
        });
        const mesh = overrayMesh[0] as unknown as THREE.Mesh;
        const material = mesh.material as unknown as THREE.ShaderMaterial;
        gsap.to(material.uniforms.uAlpha, { duration: 1, value: 0 });
        setTimeout(() => {
          setRemoveOverray(true);
        }, 500);
      });
    }
  };

  const model: IFCModel = useLoader(
    IFCLoader,
    "/sample-model.ifc",
    (loader) => {
      loader.ifcManager.setupThreeMeshBVH(
        computeBoundsTree,
        disposeBoundsTree,
        acceleratedRaycast
      );
      loader.ifcManager.setWasmPath("../../");

      loader.ifcManager.setOnProgress((event: ParserProgress) => {
        const ratio = event.loaded / event.total;
        loadingBar!.style.transform = `scaleX(${ratio})`;
        ratio === 1 && handleLoading();
      });

      setLoader(loader);
    }
  );

  model.name = "ifc";

  return <primitive object={model} />;
};

export default Model;
