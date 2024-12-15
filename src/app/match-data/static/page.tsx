"use client";

import { matchData } from "../match-data";
import { MatchDataDataDetail } from "../match-data-details";

/**
 * マッチデータを表示するコンポーネント
 * @returns
 */
export default function MatchDataPageStatic() {
  const data = matchData;

  return (
    <>
      <MatchDataDataDetail matchData={data} />
    </>
  );
}
