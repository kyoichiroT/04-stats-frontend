"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BarChart2, ChevronRight, LayoutDashboard, Zap } from "lucide-react";

// サイドバーに表示するナビゲーションリンク
const navigationItems = [
  {
    name: "ホーム",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "マッチデータ",
    href: "/match-data",
    icon: BarChart2,
  },
  {
    name: "マッチデータ (静的)",
    href: "/match-data/static",
    icon: BarChart2,
  },
  {
    name: "強欲な壺",
    href: "/pot-of-greed",
    icon: Zap,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 h-screen border-r bg-background">
      <div className="flex-1 py-4 px-2">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isActive ? "bg-secondary" : "hover:bg-accent"
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t">
        <p className="text-xs text-muted-foreground">© 2025 遊戯王データ分析</p>
      </div>
    </div>
  );
}
