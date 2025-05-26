"use client";

import { useMatchData } from "@/swr/match-data";
import { MatchDataDataDetail } from "./match-data-details";
import { matchData } from "./match-data";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>
            データの取得に失敗しました。過去のデータを表示します
          </AlertDescription>
        </Alert>
        <MatchDataDataDetail matchData={matchData} />
      </>
    );
  }

  return (
    <>
      <MatchDataDataDetail matchData={data} />
    </>
  );
}

function matchDataSkelton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-48" />
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
