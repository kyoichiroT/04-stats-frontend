"use client";

import { matchData } from "../match-data";
import MatchDataDiagram from "../match-data-diagrams";

/**
 * マッチデータを表示するコンポーネント
 * @returns
 */
export default function MatchDataPageStatic() {
  const data = matchData;

  return (
    <>
      <MatchDataDiagram matchData={data} />
    </>
  );
}
