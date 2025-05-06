"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Header() {
  const pathname = usePathname();

  // パンくずリストを生成する関数
  const generateBreadcrumbs = () => {
    const paths = (pathname ?? "").split("/").filter(Boolean);

    if (paths.length === 0) return null;

    return (
      <Breadcrumb className="md:ml-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">ホーム</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          {paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join("/")}`;
            const isLast = index === paths.length - 1;

            // パス名を読みやすく変換する（例：match-data → マッチデータ）
            let label = path;
            switch (path) {
              case "match-data":
                label = "マッチデータ";
                break;
              case "pot-of-greed":
                label = "強欲な壺";
                break;
              case "static":
                label = "静的データ";
                break;
              default:
                label = path;
            }

            return (
              <BreadcrumbItem key={href}>
                {isLast ? (
                  <span>{label}</span>
                ) : (
                  <>
                    <BreadcrumbLink asChild>
                      <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-lg mr-4">
              04-stats
            </Link>
            {generateBreadcrumbs()}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                <Avatar>
                  <AvatarFallback>ユ</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>プロフィール</DropdownMenuItem>
              <DropdownMenuItem>設定</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
