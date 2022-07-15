import { ChangeEvent, useEffect, useState } from "react";
import Beat from "../Beat";
import { AiOutlinePlusCircle } from "react-icons/ai";

export interface SetTempoInterface {
  index: number;
  state: boolean;
  beatIndex: number;
  beatName: string;
}

interface trackInterface {
  tempo: boolean[];
  beatName: string;
}
const Tracks = () => {
  const [tracks, setTracks] = useState<
    Array<trackInterface>
  >([{ beatName: "", tempo: [false] }]);
  const [bpm, setBpm] = useState<number>(60);

  useEffect(() => {
    console.log(tracks);
  }, [tracks]);
  const setTempo = ({
    beatIndex,
    index,
    state,
    beatName,
  }: SetTempoInterface) => {
    setTracks(
      tracks.map((track, tracksIndex) => {
        if (beatIndex === tracksIndex) {
          const array =
            track.tempo.length < 16
              ? Array(16).fill(false)
              : track.tempo;
          console.log(index, array);
          array[index] =
            array[index] !== state ? state : array[index];
          return { beatName, tempo: array };
        } else {
          return track;
        }
      })
    );
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
          setTracks((prevState) => [
            ...prevState,
            { beatName: "", tempo: [] },
          ])
        }
        className="tracks__plus-tracks"
      >
        <AiOutlinePlusCircle size={36} />
      </button>
    </div>
  );
};

export default Tracks;
