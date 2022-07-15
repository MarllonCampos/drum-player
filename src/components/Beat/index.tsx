import React, {
  ChangeEvent,
  useContext,
  useState,
} from "react";
import { BeatsContext } from "../../contexts/beats.context";

interface BeatProps {
  setTempo: (index: number, tempo: []) => void;
  beatIndex: number;
}
const Beat = ({ setTempo, beatIndex }: BeatProps) => {
  const { allBeats } = useContext(BeatsContext);
  const [selectedBeat, setSelectedBeat] = useState("");
  const [beatTempo, setBeatTempo] = useState([
    ...Array(16),
  ]);

  const handleBeatSelect = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    const beat = event.target.value;
    setSelectedBeat(beat);
  };

  const handleInputChange = (index: number) => {
    setBeatTempo((prevState) => {
      const tempo: boolean[] = prevState.map(
        (beat = false, tempoIndex) => {
          if (index === tempoIndex) return true;
          else return beat;
        }
      );

      setTempo(
        tempo as boolean[],
        `${selectedBeat}-${beatIndex}`
      );
      return tempo;
    });
  };
  return (
    <div className="beat">
      <div className="beat__select">
        <select onChange={handleBeatSelect}>
          {allBeats.map((beat, index) => (
            <option
              value={beat.replace(/\.wav/g, "")}
              key={index}
            >
              {beat}
            </option>
          ))}
        </select>
      </div>
      <div className="beat__tempo">
        {beatTempo.map((_value, index) => (
          <React.Fragment key={index}>
            <input
              type="checkbox"
              id={`${beatIndex}-${index}`}
              name={`${index}`}
              value={index}
              onChange={() => handleInputChange(index)}
            />
            <label htmlFor={`${beatIndex}-${index}`} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default Beat;
