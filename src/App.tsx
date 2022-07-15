import { useEffect } from "react";
import Tracks from "./components/Tracks";
import "./index.scss";
function App() {
  useEffect(() => {
    document.title = "Drum Player";
  }, []);

  return (
    <div className="app-container">
      <h1>Drum Player</h1>
      <Tracks />
    </div>
  );
}

export default App;
