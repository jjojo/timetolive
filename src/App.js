import "./App.css";
import { Model3D } from "./components/Model3D/Model3D";

function App() {
  return (
    <div
      id="canvas-container"
      style={{
        width: window.innerWidth,
        height: window.innerHeight,
        background: "black",
      }}
    >
      <Model3D />
    </div>
  );
}

export default App;
