import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useState,
} from "react";
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
}
const Beat = ({ setTempo, beatIndex }: BeatProps) => {
  const { allBeats } = useContext(BeatsContext);
  const [selectedBeat, setSelectedBeat] = useState("none");

  const handleBeatSelect = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const beat = event.target.value;
    console.log(beat);
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
              <option value={formattedValue} key={index}>
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
