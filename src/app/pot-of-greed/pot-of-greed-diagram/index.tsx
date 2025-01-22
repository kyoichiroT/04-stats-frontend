"use client";

import { MatchDataWithWinRate } from "@/app/_types/match-data.types";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    payload: MatchDataWithWinRate;
  }[];
  // label?: string;
};
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  // label,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{`Match Count: ${data.match_count}`}</p>
        <p className="label">{`First Player Win Count: ${data.first_player_win}`}</p>
        <p className="label">{`First Player Win Rate: ${(
          (data.first_player_win / data.match_count) *
          100
        ).toFixed(2)}%`}</p>

        <p className="label">{`Second Player Win Count: ${data.second_player_win}`}</p>
        <p className="label">{`Second Player Win Rate: ${(
          (data.second_player_win / data.match_count) *
          100
        ).toFixed(2)}%`}</p>
      </div>
    );
  }
};

export default function PotOfGreedDiagram({
  matchData,
}: {
  matchData: MatchDataWithWinRate[];
}) {
  return (
    <>
      <div style={{ width: "100%", height: 800 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={matchData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={false} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="first_player_win_rate" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
