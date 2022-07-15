import { ChangeEvent, useState } from "react";
import Beat from "../Beat";
import { AiOutlinePlusCircle } from "react-icons/ai";

const Tracks = () => {
  const [tracks, setTracks] = useState({});
  const [bpm, setBpm] = useState<number>(60);
  const setTempo = (tempo: boolean[], beatName: string) => {
    setTracks((prevState) => ({
      ...prevState,
      [beatName]: tempo,
    }));
  };
  const handleBpmChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    const numberValue = Number(inputValue);
    if (numberValue < 20) return setBpm(20);
    if (numberValue > 220) return setBpm(220);

    setBpm(numberValue);
  };
  const handleBpmClick = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    const numberValue = Number(inputValue);
    if (numberValue < 20) return setBpm(20);
    if (numberValue > 220) return setBpm(220);
    setBpm(numberValue);
  };
  return (
    <div className="tracks">
      <div className="tracks__controller">
        <button>Play</button>
        <button>Stop</button>
        <div className="tracks__bpm-container">
          <p className="tracks__bpm-value">{bpm}</p>
          <input
            type="range"
            className="tracks__bpm-input"
            min={20}
            max={220}
            defaultValue={60}
            step={10}
            onChange={handleBpmChange}
            onClick={handleBpmClick}
          />
        </div>
      </div>
      <div className="tracks__beat-container">
        {tracks.map((_track, index) => (
          <Beat
            setTempo={setTempo}
            beatIndex={index}
            key={index}
          />
        ))}
      </div>
      <button
        onClick={() =>
          setTracks((prevState) => [...prevState, []])
        }
        className="tracks__plus-tracks"
      >
        <AiOutlinePlusCircle size={36} />
      </button>
    </div>
  );
};

export default Tracks;
