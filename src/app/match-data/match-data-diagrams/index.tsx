"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  // Line,
  // LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import { dot } from "node:test/reporters";
import { WinRatio } from "../match-data-types";

type winRatioData = {
  matchCount: number;
  firstPlayerWinCount: number;
  firstPlayerWinRate: number;
  secondPlayerWinCount: number;
  secondPlayerWinRate: number;
  drawCount: number;
  drawRate: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: any;
  label?: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
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
        <p className="label">{`Match Count: ${data.matchCount}`}</p>
        <p className="label">{`First Player Win Count: ${data.firstPlayerWinCount}`}</p>
        <p className="label">{`First Player Win Rate: ${(
          data.firstPlayerWinRate * 100
        ).toFixed(2)}%`}</p>
        <p className="label">{`Draw Count: ${data.drawCount}`}</p>
        <p className="label">{`Draw Rate: ${(data.drawRate * 100).toFixed(
          2
        )}%`}</p>
        <p className="label">{`Second Player Win Count: ${data.secondPlayerWinCount}`}</p>
        <p className="label">{`Second Player Win Rate: ${(
          data.secondPlayerWinRate * 100
        ).toFixed(2)}%`}</p>
      </div>
    );
  }
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

/**
 * マッチデータを表示するチャートコンポーネント
 * @returns
 */
export default function MatchDataDiagram({
  matchData,
}: {
  matchData: WinRatio[] | undefined;
}) {
  if (!matchData) {
    return <div>failed to load</div>;
  }
  const winRatioData: winRatioData[] = matchData.map((match) => {
    return {
      matchCount: match.match_count,
      firstPlayerWinCount: match.first_player_win,
      firstPlayerWinRate: match.first_player_win / match.match_count,
      secondPlayerWinCount: match.second_player_win,
      secondPlayerWinRate: match.second_player_win / match.match_count,
      drawCount: match.draw,
      drawRate: match.draw / match.match_count,
    };
  });

  return (
    <>
      <div style={{ width: "100%", height: 800 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={winRatioData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="firstPlayerWinRate"
              stackId="a"
              fill={COLORS[0]}
              isAnimationActive={false}
            />
            <Bar
              dataKey="drawRate"
              stackId="a"
              fill={COLORS[1]}
              isAnimationActive={false}
            />
            <Bar
              dataKey="secondPlayerWinRate"
              stackId="a"
              fill={COLORS[2]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
        {/* 
        <LineChart
          width={1900}
          height={800}
          data={winRatioData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="matchCount" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="firstPlayerWinCount"
            stroke={COLORS[0]}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="drawCount"
            stroke={COLORS[1]}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="secondPlayerWinCount"
            stroke={COLORS[2]}
            dot={false}
          />
        </LineChart> */}
      </div>
    </>
  );
}
