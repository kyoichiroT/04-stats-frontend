"use client";

import { useState } from "react";
import { getFileFromS3 } from "./_server/getFileFromS3";
import PotOfGreedDiagram from "./pot-of-greed-diagram";
import { aggregateWinRatios } from "../_utils/calc-win-rate";
import { MatchData } from "../_types/match-data.types";

const Home = () => {
  const [fileContent, setFileContent] = useState<MatchData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [advantage, setAdvantage] = useState<number>(0);
  const [filterdMatchData, setFilterdMatchData] = useState<MatchData[]>([]);

  const handleAdvantageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const ad = Number(e.target.value);
    setAdvantage(ad);
    const filtered = fileContent.filter(
      (data) =>
        Number(data.firstPlayer_PotOfGreed) -
          Number(data.secondPlayer_PotOfGreed) ===
        ad
    );
    setFilterdMatchData(filtered);
  };

  const fetchFileContent = async () => {
    try {
      const contentRaw = await getFileFromS3();
      // ファイバーポッド無しのデータだけ取得
      const content = contentRaw.filter(
        (data) =>
          Number(data.firstPlayer_fiberJar) === 0 ||
          Number(data.firstPlayer_fiberJar) === 0
      );

      setFileContent(content);
    } catch (e) {
      setError("Error fetching file");
      console.error(e);
    }
  };

  return (
    <div>
      <h1>
        ファイバーポッドを使用していないマッチでの強欲な壺の使用回数による勝率の変化
      </h1>
      <button onClick={fetchFileContent}>Fetch File Content</button>
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

export default Home;
