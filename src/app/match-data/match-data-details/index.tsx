import { useState } from "react";
import { WinRatio } from "../match-data-types";
import { MatchDataCharts } from "./match-data-charts";

export function MatchDataDataDetail({
  matchData,
}: {
  matchData: WinRatio[] | undefined;
}) {
  const [displayCount, setDisplayCount] = useState(100);
  return (
    <div>
      <select
        value={displayCount}
        onChange={(e) => setDisplayCount(Number(e.target.value))}
      >
        <option value={matchData?.length || 0}>全件</option>
        <option value={10}>10件ごと</option>
        <option value={50}>50件ごと</option>
        <option value={100}>100件ごと</option>
      </select>
      <MatchDataCharts matchData={matchData} displayCount={displayCount} />
    </div>
  );
}
