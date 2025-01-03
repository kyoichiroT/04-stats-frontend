"use client";

import { useMatchData } from "@/swr/match-data";
import { MatchDataDataDetail } from "./match-data-details";
import { matchData } from "./match-data";

/**
 * マッチデータを表示するコンポーネント
 * @returns
 */
export default function MatchDataPage() {
  const { data, isLoading, error } = useMatchData();

  if (isLoading) {
    return matchDataSkelton();
  }

  if (error) {
    return (
      <>
        <div>データの取得に失敗しました。過去のデータを表示します</div>
        <MatchDataDataDetail matchData={matchData} />
      </>
    );
  }

  // const data = matchData;

  return (
    <>
      <MatchDataDataDetail matchData={data} />
    </>
  );
}

function matchDataSkelton() {
  return (
    <div>
      <p>loading...</p>
    </div>
  );
}
