import * as THREE from "three";
import useOverrayState from "../stores/useOverrayState";

const overlayGeometry = new THREE.PlaneGeometry(300, 300, 1, 1);
const overlayMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: {
    uAlpha: { value: 1.0 },
    uColor1: { value: new THREE.Color("#f0f8ff") },
    uColor2: { value: new THREE.Color("#ffffff") },
  },
  vertexShader: `
        varying vec2 vUv;
        void main()
        {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;                
          vUv = uv;
        }
    `,
  fragmentShader: `
        varying vec2 vUv;
        uniform float uAlpha;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        void main()
        {
            float strength = distance(vUv, vec2(0.5));
            vec3 color = mix(uColor1, uColor2, strength + 0.2 );
            gl_FragColor = vec4(color, uAlpha);
        }
    `,
});

const LoadingOverRay = () => {
  const { removeOverray } = useOverrayState((state) => state);

  return !removeOverray ? (
    <mesh
      geometry={overlayGeometry}
      material={overlayMaterial}
      position={[0, 0, 14]}
      rotation-y={Math.PI * 0.25}
      name="overray"
      dispose={null}
    />
  ) : null;
};

export default LoadingOverRay;
