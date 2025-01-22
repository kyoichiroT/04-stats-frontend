"use client";

import { useState } from "react";
import { getFileFromS3 } from "./_server/getFileFromS3";
import PotOfGreedDiagram from "./pot-of-greed-diagram";
import { aggregateWinRatios } from "../_utils/calc-win-rate";
import { MatchData } from "../_types/match-data.types";

const Home = () => {
  // const [fileContent, setFileContent] = useState<MatchData[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [firstPlayerGreed1, setFirstPlayerGreed1] = useState<MatchData[]>([]);
  const [firstPlayerGreed2, setFirstPlayerGreed2] = useState<MatchData[]>([]);
  const [firstPlayerGreed3, setFirstPlayerGreed3] = useState<MatchData[]>([]);
  const [firstPlayerGreed4, setFirstPlayerGreed4] = useState<MatchData[]>([]);
  const [firstPlayerGreed5, setFirstPlayerGreed5] = useState<MatchData[]>([]);
  const [secondPlayerGreed1, setSecondPlayerGreed1] = useState<MatchData[]>([]);
  const [secondPlayerGreed2, setSecondPlayerGreed2] = useState<MatchData[]>([]);
  const [secondPlayerGreed3, setSecondPlayerGreed3] = useState<MatchData[]>([]);
  const [secondPlayerGreed4, setSecondPlayerGreed4] = useState<MatchData[]>([]);
  const [secondPlayerGreed5, setSecondPlayerGreed5] = useState<MatchData[]>([]);

  const [firstPlayerAdvantage1, setFirstPlayerAdvantage1] = useState<
    MatchData[]
  >([]);
  const [firstPlayerAdvantage2, setFirstPlayerAdvantage2] = useState<
    MatchData[]
  >([]);
  const [firstPlayerAdvantage3, setFirstPlayerAdvantage3] = useState<
    MatchData[]
  >([]);

  const [secondPlayerAdvantage1, setSecondPlayerAdvantage1] = useState<
    MatchData[]
  >([]);
  const [secondPlayerAdvantage2, setSecondPlayerAdvantage2] = useState<
    MatchData[]
  >([]);
  const [secondPlayerAdvantage3, setSecondPlayerAdvantage3] = useState<
    MatchData[]
  >([]);

  // const [test, setTest] = useState<number>(0);
  // const [test2, setTest2] = useState<MatchData | null>(null);

  // let magicTest;
  // let data;

  const fetchFileContent = async () => {
    try {
      const contentRaw = await getFileFromS3();
      // console.log(content);
      const content = contentRaw.filter(
        (data) =>
          Number(data.firstPlayer_fiberJar) === 0 ||
          Number(data.firstPlayer_fiberJar) === 0
      );

      setFirstPlayerGreed1(
        content.filter((data) => Number(data.firstPlayer_PotOfGreed) === 1)
      );
      console.log(content.filter((data) => data.firstPlayer_PotOfGreed === 1));

      // setTest(Number(content[0].firstPlayer_PotOfGreed));
      // setTest2(content[0]);

      setFirstPlayerGreed2(
        content.filter((data) => Number(data.firstPlayer_PotOfGreed) === 2)
      );
      setFirstPlayerGreed3(
        content.filter((data) => Number(data.firstPlayer_PotOfGreed) === 3)
      );
      setFirstPlayerGreed4(
        content.filter((data) => Number(data.firstPlayer_PotOfGreed) === 4)
      );
      setFirstPlayerGreed5(
        content.filter((data) => Number(data.firstPlayer_PotOfGreed) === 5)
      );
      setSecondPlayerGreed1(
        content.filter((data) => Number(data.secondPlayer_PotOfGreed) === 1)
      );
      setSecondPlayerGreed2(
        content.filter((data) => Number(data.secondPlayer_PotOfGreed) === 2)
      );
      setSecondPlayerGreed3(
        content.filter((data) => Number(data.secondPlayer_PotOfGreed) === 3)
      );
      setSecondPlayerGreed4(
        content.filter((data) => Number(data.secondPlayer_PotOfGreed) === 4)
      );
      setSecondPlayerGreed5(
        content.filter((data) => Number(data.secondPlayer_PotOfGreed) === 5)
      );

      setFirstPlayerAdvantage1(
        content.filter(
          (data) =>
            Number(data.firstPlayer_PotOfGreed) -
              Number(data.secondPlayer_PotOfGreed) ===
            1
        )
      );

      setFirstPlayerAdvantage2(
        content.filter(
          (data) =>
            Number(data.firstPlayer_PotOfGreed) -
              Number(data.secondPlayer_PotOfGreed) ===
            2
        )
      );

      setFirstPlayerAdvantage3(
        content.filter(
          (data) =>
            Number(data.firstPlayer_PotOfGreed) -
              Number(data.secondPlayer_PotOfGreed) ===
            3
        )
      );

      setSecondPlayerAdvantage1(
        content.filter(
          (data) =>
            Number(data.secondPlayer_PotOfGreed) -
              Number(data.firstPlayer_PotOfGreed) ===
            1
        )
      );

      setSecondPlayerAdvantage2(
        content.filter(
          (data) =>
            Number(data.secondPlayer_PotOfGreed) -
              Number(data.firstPlayer_PotOfGreed) ===
            2
        )
      );

      setSecondPlayerAdvantage3(
        content.filter(
          (data) =>
            Number(data.secondPlayer_PotOfGreed) -
              Number(data.firstPlayer_PotOfGreed) ===
            3
        )
      );

      // const firstPlayerGreed2 = content.filter((data) => {
      //   data.firstPlayer_PotOfGreed === 2;
      // });
      // const firstPlayerGreed3 = content.filter((data) => {
      //   data.firstPlayer_PotOfGreed === 3;
      // });
      // const firstPlayerGreed4 = content.filter((data) => {
      //   data.firstPlayer_PotOfGreed === 4;
      // });
      // const firstPlayerGreed5 = content.filter((data) => {
      //   data.firstPlayer_PotOfGreed === 5;
      // });

      // const secondPlayerGreed1 = content.filter((data) => {
      //   data.secondPlayer_PotOfGreed === 1;
      // });
      // const secondPlayerGreed2 = content.filter((data) => {
      //   data.secondPlayer_PotOfGreed === 2;
      // });
      // const secondPlayerGreed3 = content.filter((data) => {
      //   data.secondPlayer_PotOfGreed === 3;
      // });
      // const secondPlayerGreed4 = content.filter((data) => {
      //   data.secondPlayer_PotOfGreed === 4;
      // });
      // const secondPlayerGreed5 = content.filter((data) => {
      //   data.secondPlayer_PotOfGreed === 5;
      // });

      // setFileContent(content);
    } catch (e) {
      setError("Error fetching file");
      console.error(e);
    }
  };

  return (
    <div>
      <h1>S3 File Content</h1>
      <button onClick={fetchFileContent}>Fetch File Content</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* {fileContent.map((data) => JSON.stringify(data))} */}
      {/* {fileContent && <pre>{fileContent}</pre>} */}
      {/* <div>data:{JSON.stringify(test2)}</div> */}
      <div>f1</div>
      <PotOfGreedDiagram matchData={aggregateWinRatios(firstPlayerGreed1)} />
      <div>f2</div>
      <PotOfGreedDiagram matchData={aggregateWinRatios(firstPlayerGreed2)} />
      <div>f3</div>
      <PotOfGreedDiagram matchData={aggregateWinRatios(firstPlayerGreed3)} />
      <div>f4</div>
      <PotOfGreedDiagram matchData={aggregateWinRatios(firstPlayerGreed4)} />
      <div>f5</div>
      <PotOfGreedDiagram matchData={aggregateWinRatios(firstPlayerGreed5)} />
      <div>s1</div>
      <PotOfGreedDiagram matchData={aggregateWinRatios(secondPlayerGreed1)} />
      <div>s2</div>
      <PotOfGreedDiagram matchData={aggregateWinRatios(secondPlayerGreed2)} />
      <div>s3</div>
      <PotOfGreedDiagram matchData={aggregateWinRatios(secondPlayerGreed3)} />
      <div>s4</div>
      <PotOfGreedDiagram matchData={aggregateWinRatios(secondPlayerGreed4)} />
      <div>s5</div>
      <PotOfGreedDiagram matchData={aggregateWinRatios(secondPlayerGreed5)} />
      <div>アド+1</div>
      <PotOfGreedDiagram
        matchData={aggregateWinRatios(firstPlayerAdvantage1)}
      />
      <div>アド+2</div>
      <PotOfGreedDiagram
        matchData={aggregateWinRatios(firstPlayerAdvantage2)}
      />
      <div>アド+3</div>
      <PotOfGreedDiagram
        matchData={aggregateWinRatios(firstPlayerAdvantage3)}
      />
      <div>アド-1</div>
      <PotOfGreedDiagram
        matchData={aggregateWinRatios(secondPlayerAdvantage1)}
      />
      <div>アド-2</div>
      <PotOfGreedDiagram
        matchData={aggregateWinRatios(secondPlayerAdvantage2)}
      />
      <div>アド-3</div>
      <PotOfGreedDiagram
        matchData={aggregateWinRatios(secondPlayerAdvantage3)}
      />
    </div>
  );
};

export default Home;
