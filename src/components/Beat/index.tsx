import React, {
  ChangeEvent,
  useContext,
  useState,
} from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { BeatsContext } from "../../contexts/beats.context";
import { SetTempoInterface } from "../Tracks";

interface BeatProps {
  setTempo: ({
    beatIndex,
    index,
    state,
    beatName,
  }: SetTempoInterface) => void;
  beatIndex: number;
  removeTrack: (index: number) => void;
  setBeatName: (
    beatName: string,
    beatIndex: number
  ) => void;
}
const Beat = ({
  setTempo,
  beatIndex,
  removeTrack,
  setBeatName,
}: BeatProps) => {
  const { allBeats } = useContext(BeatsContext);
  const [selectedBeat, setSelectedBeat] = useState("none");

  const handleBeatSelect = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const beat = event.target.value;
    setBeatName(beat, beatIndex);
    setSelectedBeat(beat);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { checked } = event.target;
    const beatObject = {
      index,
      state: checked,
      beatIndex,
      beatName: selectedBeat,
    };
    setTempo(beatObject);
  };
  return (
    <div className="beat">
      <button
        onClick={() => removeTrack(beatIndex)}
        className="tracks__minus-tracks"
      >
        <AiOutlineMinusCircle
          size={24}
          className="tracks__minus-tracks__icon"
        />
      </button>
      <div className="beat__select">
        <select
          onChange={handleBeatSelect}
          value={selectedBeat}
        >
          <option value="none" disabled hidden>
            Selecione um Beat
          </option>
          {allBeats.map((beat, index) => {
            const formattedValue = beat.replace(
              /\.wav/g,
              ""
            );
            return (
              <option value={beat} key={index}>
                {formattedValue}
              </option>
            );
          })}
        </select>
      </div>
      <div className="beat__tempo">
        {[...Array(16)].map((_value, index) => (
          <React.Fragment key={index}>
            <input
              type="checkbox"
              id={`${beatIndex}-${index}`}
              name={`${index}`}
              value={index}
              onChange={(ev) =>
                handleInputChange(ev, index)
              }
              disabled={selectedBeat === "none"}
            />
            <label
              htmlFor={`${beatIndex}-${index}`}
              onClick={() =>
                selectedBeat === "none" &&
                alert("Selecione um beat")
              }
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default Beat;
