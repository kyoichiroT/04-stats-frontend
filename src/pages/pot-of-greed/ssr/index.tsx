"use client";

import { useState } from "react";
import PotOfGreedDiagram from "../../../app/pot-of-greed/pot-of-greed-diagram";
import { aggregateWinRatios } from "../../../app/_utils/calc-win-rate";
import { MatchData } from "../../../app/_types/match-data.types";
import { getFileFromS3 } from "../../../app/pot-of-greed/_server/getFileFromS3";

export async function getServerSideProps() {
  try {
    const contentRaw = await getFileFromS3();
    // ファイバーポッド無しのデータだけ取得
    const content = contentRaw.filter(
      (data) =>
        Number(data.firstPlayer_fiberJar) === 0 ||
        Number(data.firstPlayer_fiberJar) === 0
    );

    return {
      props: {
        initialFileContent: content,
      },
    };
  } catch (error) {
    console.error("Error fetching file:", error);
    return {
      props: {
        initialFileContent: [],
        error: "Error fetching file",
      },
    };
  }
}

const Page = ({
  initialFileContent,
  error,
}: {
  initialFileContent: MatchData[];
  error?: string;
}) => {
  const [fileContent] = useState<MatchData[]>(initialFileContent);
  const [advantage, setAdvantage] = useState<number>(0);
  const matchDataFilter = (ad: number) => {
    const filtered = fileContent.filter(
      (data) =>
        Number(data.firstPlayer_PotOfGreed) -
          Number(data.secondPlayer_PotOfGreed) ===
        ad
    );
    return filtered;
  };
  const [filterdMatchData, setFilterdMatchData] = useState<MatchData[]>(
    matchDataFilter(0)
  );

  const handleAdvantageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ad = Number(e.target.value);
    setAdvantage(ad);
    const filtered = matchDataFilter(ad);
    setFilterdMatchData(filtered);
  };

  // const matchDataFilter = (ad: number) => {
  //   const filtered = fileContent.filter(
  //     (data) =>
  //       Number(data.firstPlayer_PotOfGreed) -
  //         Number(data.secondPlayer_PotOfGreed) ===
  //       ad
  //   );
  //   return filtered;
  // };

  return (
    <div>
      <h1>
        ファイバーポッドを使用していないマッチでの強欲な壺の使用回数による勝率の変化
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label htmlFor="numberSelect">
          強欲な壺の使用回数の差:{advantage}回
        </label>
      </div>
      <div>
        <select
          id="numberSelect"
          name="numberSelect"
          onChange={(e) => {
            handleAdvantageChange(e);
          }}
        >
          {[3, 2, 1, 0, -1, -2, -3].map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
      </div>
      <PotOfGreedDiagram matchData={aggregateWinRatios(filterdMatchData)} />
    </div>
  );
};

export default Page;
