"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BarChart2,
  ChevronRight,
  LayoutDashboard,
  Menu,
  Zap,
} from "lucide-react";
import { useState } from "react";

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

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">メニューを開く</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="flex-1 py-4 px-2">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
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
            <p className="text-xs text-muted-foreground">
              © 2025 遊戯王データ分析
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
