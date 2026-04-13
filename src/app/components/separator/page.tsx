"use client";

import { Separator } from "@/components/ui/separator";

export default function SeparatorPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Separator</h1>
        <p className="text-muted-foreground">視覺分隔線，用於區分內容群組，支援水平與垂直方向。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">水平分隔線</h2>
        <div className="p-6 border rounded-xl bg-card space-y-4">
          <div>
            <h3 className="font-semibold">Yuu&#39;s Design System</h3>
            <p className="text-sm text-muted-foreground">基於 shadcn/ui 的元件庫</p>
          </div>
          <Separator />
          <div className="flex gap-4 text-sm">
            <span>元件</span>
            <span>文件</span>
            <span>範例</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">垂直分隔線</h2>
        <div className="p-6 border rounded-xl bg-card">
          <div className="flex items-center gap-4 text-sm">
            <span className="font-medium">React</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="font-medium">Tailwind</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="font-medium">TypeScript</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="font-medium">shadcn/ui</span>
          </div>
        </div>
      </section>
    </div>
  );
}
