import { ChangeEvent, useRef, useState } from "react";
import Beat from "../Beat";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { arrayLessThanFillWith } from "../../helper/createEmptyArrays";

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
  const [playState, setPlayState] = useState(false);
  const timerMusic = useRef(0);

  const setTempo = ({
    beatIndex,
    index,
    state,
    beatName,
  }: SetTempoInterface) => {
    setTracks(
      tracks.map((track, tracksIndex) => {
        if (beatIndex === tracksIndex) {
          const array = arrayLessThanFillWith(
            track.tempo,
            16,
            false
          );
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
  const setBeatName = (
    beatName: string,
    beatIndex: number
  ) => {
    const newTracks = tracks.map((track, index) => {
      const tempo: any = track.tempo;
      const trackName = track.beatName;
      if (index === beatIndex) return { beatName, tempo };
      else return { beatName: trackName, tempo };
    });

    setTracks(newTracks);
  };
  const handlePlayMusic = () => {
    setPlayState((prevState) => !prevState);
    clearInterval(timerMusic.current);

    if (playState) return;
    tracks.map(({ tempo, beatName }) => {
      timerMusic.current = setInterval(() => {
        const audio = new Audio(
          `https://cdnqa.mesalva.com/desafios-techs/drumplayer/${beatName}`
        );
        audio.play();
      }, 60000 / bpm);
    });
    console.log("here");
  };

  const handleRemoveTrack = (beatIndex: number) => {
    const newTrack = tracks.filter(
      (_track, index) => index !== beatIndex
    );

    setTracks(newTrack);
  };

  return (
    <div className="tracks">
      <div className="tracks__controller">
        <button
          disabled={tracks[0].tempo.length < 16}
          onClick={handlePlayMusic}
        >
          {!playState ? "Play" : "Stop"}
        </button>
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
            removeTrack={handleRemoveTrack}
            setBeatName={setBeatName}
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
