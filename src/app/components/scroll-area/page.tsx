"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const items = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `項目 ${i + 1}`,
  description: `這是第 ${i + 1} 個清單項目的說明文字`,
}));

const tags = [
  "React", "TypeScript", "Next.js", "Tailwind CSS", "Radix UI",
  "Zustand", "React Query", "Zod", "Prisma", "PostgreSQL",
  "Vercel", "Figma", "Storybook", "Vitest", "Playwright",
];

export default function ScrollAreaPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Scroll Area</h1>
        <p className="text-muted-foreground">
          自訂樣式的捲動容器，超出範圍時顯示捲軸。
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">垂直捲動 — 固定高度列表</h2>
        <div className="p-6 border rounded-xl bg-card">
          <ScrollArea className="h-72 w-80 rounded-lg border">
            <div className="p-4 space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-md p-2 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {item.id}
                  </div>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">水平捲動 — 標籤列</h2>
        <div className="p-6 border rounded-xl bg-card">
          <ScrollArea className="w-96 rounded-lg border p-3">
            <div className="flex gap-2 pb-3">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="shrink-0 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {tag}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <p className="mt-2 text-xs text-muted-foreground">
            向右拖曳捲軸可瀏覽更多標籤
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">雙向捲動 — 大型內容</h2>
        <div className="p-6 border rounded-xl bg-card">
          <ScrollArea className="h-48 w-96 rounded-lg border">
            <div className="p-4" style={{ width: "600px" }}>
              {Array.from({ length: 10 }, (_, row) => (
                <div key={row} className="flex gap-4 mb-2">
                  {Array.from({ length: 8 }, (_, col) => (
                    <div
                      key={col}
                      className="shrink-0 h-8 w-20 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground"
                    >
                      {row + 1},{col + 1}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>
    </div>
  );
}
