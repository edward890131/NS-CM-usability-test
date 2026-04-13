"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "使用者管理", active: false },
  { icon: BarChart3, label: "數據分析", active: false },
  { icon: FileText, label: "報告", active: false },
  { icon: Bell, label: "通知", badge: "3", active: false },
];

const bottomItems = [
  { icon: Settings, label: "設定" },
  { icon: HelpCircle, label: "說明" },
];

export default function SidebarPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sidebar</h1>
        <p className="text-muted-foreground">側邊導航元件，支援收合展開，適合後台管理介面。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">互動式側邊欄展示</h2>
        <div className="border rounded-xl overflow-hidden bg-card h-[480px] flex">
          {/* Sidebar */}
          <div className={cn(
            "flex flex-col border-r bg-sidebar transition-all duration-200",
            collapsed ? "w-16" : "w-56"
          )}>
            {/* Logo */}
            <div className="flex items-center justify-between p-4 h-14 border-b">
              {!collapsed && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">Y</span>
                  </div>
                  <span className="font-semibold text-sm">Design System</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 ml-auto"
                onClick={() => setCollapsed(!collapsed)}
              >
                <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
              </Button>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={cn(
                      "flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm transition-colors",
                      item.active
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span className="rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </nav>

            <Separator />
            <div className="p-2 space-y-1">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
              <button className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="h-4 w-4 shrink-0" />
                {!collapsed && <span>登出</span>}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <h3 className="font-semibold mb-2">主要內容區</h3>
            <p className="text-sm text-muted-foreground">
              點擊左側 ‹ 按鈕可收合側邊欄。這是使用 Sidebar 元件概念手動實作的互動範例。
            </p>
            <div className="mt-4">
              <Link href="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
                ← 返回元件庫
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
