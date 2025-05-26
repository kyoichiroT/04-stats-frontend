import { useState } from "react";
import { WinRatio } from "../match-data-types";
import { MatchDataCharts } from "./match-data-charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MatchDataDataDetail({
  matchData,
}: {
  matchData: WinRatio[] | undefined;
}) {
  const [displayCount, setDisplayCount] = useState(100);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>マッチデータ分析</CardTitle>
          <CardDescription>試合データの勝率推移を確認できます</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="text-sm font-medium mb-2 block">
              表示データ数
            </label>
            <Select
              value={displayCount.toString()}
              onValueChange={(value) => setDisplayCount(Number(value))}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={(matchData?.length || 0).toString()}>
                  全件
                </SelectItem>
                <SelectItem value="10">10件ごと</SelectItem>
                <SelectItem value="50">50件ごと</SelectItem>
                <SelectItem value="100">100件ごと</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <MatchDataCharts matchData={matchData} displayCount={displayCount} />
        </CardContent>
      </Card>
    </div>
  );
}
