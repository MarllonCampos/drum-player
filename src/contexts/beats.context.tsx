import {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

type BeatsContext = {
  allBeats: Array<string>;
};
export const BeatsContext = createContext(
  {} as BeatsContext
);

type BeatsProvider = {
  children: ReactNode;
};

export function BeatsProvider(props: any) {
  const [allBeats, setAllBeats] = useState<Array<string>>(
    []
  );

  useEffect(() => {
    (async () => {
      const beats = await fetch(
        "https://cdnqa.mesalva.com/desafios-techs/drumplayer/files.json",
        { method: "GET" }
      );
      const { files } = await beats.json();
      setAllBeats(
        files.map((file: string) =>
          file.replace(/data\//g, "")
        )
      );
    })();
  }, []);

  return (
    <BeatsContext.Provider value={{ allBeats }}>
      {props.children}
    </BeatsContext.Provider>
  );
}
