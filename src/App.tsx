import { useEffect } from "react";
import Tracks from "./components/Tracks";
import { BeatsProvider } from "./contexts/beats.context";
import "./styles/index.scss";
function App() {
  return (
    <BeatsProvider>
      <div className="app-container">
        <h1>Drum Player</h1>
        <Tracks />
      </div>
    </BeatsProvider>
  );
}

export default App;
