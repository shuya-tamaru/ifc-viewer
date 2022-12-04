import { Canvas } from "@react-three/fiber";

import "./App.css";
import Experience from "./components/Experience";
import Interface from "./components/Interface";

function App() {
  return (
    <>
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          background: "#f0f8ff",
        }}
        camera={{
          fov: 75,
          near: 0.1,
          far: 200,
          position: [10, 4, 10],
        }}
      >
        <Experience />
      </Canvas>
      <Interface />
    </>
  );
}

export default App;
