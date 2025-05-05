<<<<<<< Updated upstream
import Image from "next/image";
=======
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BarChart2, Zap } from "lucide-react";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
=======

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
>>>>>>> Stashed changes
    </div>
  );
}
