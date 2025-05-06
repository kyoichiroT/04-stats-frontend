import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart2, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold mb-4">遊戯王データ分析ツール</h1>
        <p className="text-muted-foreground mb-6">
          遊戯王のマッチデータを分析し、様々な統計情報を提供します。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <BarChart2 className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-semibold">マッチデータ分析</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            マッチデータの勝率や様々な統計を確認できます。
          </p>
          <Link href="/match-data">
            <Button>マッチデータを見る</Button>
          </Link>
        </div>

        <div className="border rounded-lg p-6 shadow-sm">
          <div className="flex items-center mb-4">
            <Zap className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-semibold">強欲な壺分析</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            強欲な壺の使用回数と勝率の関係を分析します。
          </p>
          <Link href="/pot-of-greed">
            <Button>強欲な壺データを見る</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
