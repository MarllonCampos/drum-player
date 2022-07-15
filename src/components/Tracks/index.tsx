import React, { useEffect, useState } from "react";
import Beat from "../Beat";

// import { Container } from './styles';

const Tracks = () => {
  const [beats, setBeats] = useState<Array<string>>([]);
  const [tracks, setTracks] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const allBeats = await fetch(
        "https://cdnqa.mesalva.com/desafios-techs/drumplayer/files.json",
        { method: "GET" }
      );
      const { files } = await allBeats.json();
      setBeats(
        files.map((file: string) =>
          file.replace(/data\//g, "")
        )
      );
    })();
  }, []);
  return (
    <>
      {Array(tracks).map((track) => {
        <Beat />;
      })}
    </>
  );
};

export default Tracks;
