import { WinRatio } from "../../match-data-types";
import MatchDataDiagram from "./match-data-diagrams";

export function MatchDataCharts({
  matchData,
  displayCount,
}: {
  matchData: WinRatio[] | undefined;
  displayCount: number;
}) {
  return (
    <>
      <MatchDataDiagram matchData={matchData} displayCount={displayCount} />
    </>
  );
}
