"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  LayoutGrid,
  Type,
  MousePointerClick,
  Bell,
  Layers,
  Navigation,
  Database,
  Wrench,
  Search,
  Moon,
  Sun,
  ChevronRight,
} from "lucide-react";

const componentGroups = [
  {
    id: "layout",
    label: "Layout",
    icon: LayoutGrid,
    components: [
      { name: "Aspect Ratio", slug: "aspect-ratio", desc: "固定寬高比的容器" },
      { name: "Resizable", slug: "resizable", desc: "可拖曳調整大小的面板" },
      { name: "Scroll Area", slug: "scroll-area", desc: "自訂樣式的捲動區域" },
      { name: "Separator", slug: "separator", desc: "視覺分隔線" },
    ],
  },
  {
    id: "display",
    label: "Display",
    icon: Type,
    components: [
      { name: "Badge", slug: "badge", desc: "狀態標籤與分類標記" },
      { name: "Label", slug: "label", desc: "表單欄位標籤" },
      { name: "Avatar", slug: "avatar", desc: "使用者頭像" },
      { name: "Card", slug: "card", desc: "內容卡片容器" },
      { name: "Skeleton", slug: "skeleton", desc: "載入佔位動畫" },
    ],
  },
  {
    id: "inputs",
    label: "Inputs",
    icon: MousePointerClick,
    components: [
      { name: "Button", slug: "button", desc: "各種樣式的按鈕" },
      { name: "Input", slug: "input", desc: "單行文字輸入框" },
      { name: "Textarea", slug: "textarea", desc: "多行文字輸入框" },
      { name: "Select", slug: "select", desc: "下拉選單" },
      { name: "Checkbox", slug: "checkbox", desc: "多選核取方塊" },
      { name: "Radio Group", slug: "radio-group", desc: "單選按鈕群組" },
      { name: "Switch", slug: "switch", desc: "開關切換" },
      { name: "Slider", slug: "slider", desc: "拖曳數值滑桿" },
      { name: "Toggle", slug: "toggle", desc: "切換按鈕" },
      { name: "Toggle Group", slug: "toggle-group", desc: "切換按鈕群組" },
      { name: "Input OTP", slug: "input-otp", desc: "OTP 驗證碼輸入" },
      { name: "Input Group", slug: "input-group", desc: "輸入框群組" },
      { name: "Calendar", slug: "calendar", desc: "日曆日期選擇器" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: Bell,
    components: [
      { name: "Alert", slug: "alert", desc: "提示訊息框" },
      { name: "Progress", slug: "progress", desc: "進度條" },
      { name: "Sonner", slug: "sonner", desc: "Toast 通知訊息" },
    ],
  },
  {
    id: "overlays",
    label: "Overlays",
    icon: Layers,
    components: [
      { name: "Dialog", slug: "dialog", desc: "對話框 Modal" },
      { name: "Alert Dialog", slug: "alert-dialog", desc: "確認對話框" },
      { name: "Sheet", slug: "sheet", desc: "側邊抽屜面板" },
      { name: "Drawer", slug: "drawer", desc: "底部抽屜" },
      { name: "Popover", slug: "popover", desc: "浮動內容面板" },
      { name: "Hover Card", slug: "hover-card", desc: "懸停預覽卡片" },
      { name: "Tooltip", slug: "tooltip", desc: "提示文字" },
      { name: "Context Menu", slug: "context-menu", desc: "右鍵選單" },
      { name: "Dropdown Menu", slug: "dropdown-menu", desc: "下拉操作選單" },
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    icon: Navigation,
    components: [
      { name: "Breadcrumb", slug: "breadcrumb", desc: "麵包屑導航" },
      { name: "Navigation Menu", slug: "navigation-menu", desc: "主導航選單" },
      { name: "Menubar", slug: "menubar", desc: "應用程式選單列" },
      { name: "Pagination", slug: "pagination", desc: "分頁導航" },
      { name: "Tabs", slug: "tabs", desc: "分頁標籤切換" },
      { name: "Sidebar", slug: "sidebar", desc: "側邊導航欄" },
    ],
  },
  {
    id: "data",
    label: "Data Display",
    icon: Database,
    components: [
      { name: "Table", slug: "table", desc: "資料表格" },
      { name: "Carousel", slug: "carousel", desc: "輪播圖" },
      { name: "Chart", slug: "chart", desc: "資料圖表" },
      { name: "Accordion", slug: "accordion", desc: "折疊展開面板" },
      { name: "Collapsible", slug: "collapsible", desc: "可折疊區塊" },
    ],
  },
  {
    id: "utility",
    label: "Utility",
    icon: Wrench,
    components: [
      { name: "Command", slug: "command", desc: "命令搜尋面板" },
      { name: "Navigation Menu", slug: "navigation-menu", desc: "可搜尋下拉選單" },
    ],
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(false);

  const uniqueComponents = new Set(
    componentGroups.flatMap((g) => g.components.map((c) => c.slug))
  );

  const filtered = search
    ? componentGroups
        .map((g) => ({
          ...g,
          components: g.components.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((g) => g.components.length > 0)
    : componentGroups;

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">Y</span>
              </div>
              <span className="font-semibold text-sm">Design System</span>
              <Badge variant="secondary" className="text-xs">v1.0</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-56">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="搜尋元件..."
                  className="pl-8 h-8 text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-3">
              Component Library
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              基於 shadcn/ui 建立的 design system，共{" "}
              <span className="text-foreground font-medium">{uniqueComponents.size}</span>{" "}
              個元件，支援 Dark Mode。
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge>React 19</Badge>
              <Badge>Next.js 16</Badge>
              <Badge>Tailwind CSS v4</Badge>
              <Badge>Radix UI</Badge>
              <Badge>TypeScript</Badge>
            </div>
          </div>

          <Separator className="mb-12" />

          {/* Component Groups */}
          <div className="space-y-14">
            {filtered.map((group) => {
              const Icon = group.icon;
              return (
                <section key={group.id}>
                  <div className="flex items-center gap-2.5 mb-6">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-semibold">{group.label}</h2>
                    <Badge variant="outline" className="text-xs">
                      {group.components.length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {group.components.map((component) => (
                      <Link
                        key={`${group.id}-${component.slug}`}
                        href={`/components/${component.slug}`}
                        className="group relative flex flex-col gap-1.5 p-4 rounded-xl border bg-card hover:bg-accent hover:border-primary/30 transition-all duration-150"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium group-hover:text-primary transition-colors">
                            {component.name}
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {component.desc}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">找不到「{search}」相關元件</p>
              <p className="text-sm mt-1">試試其他關鍵字</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="border-t mt-20">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-muted-foreground">
            <span>Yuu&#39;s Design System — Built with shadcn/ui</span>
            <span>React 19 + Tailwind CSS v4</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
