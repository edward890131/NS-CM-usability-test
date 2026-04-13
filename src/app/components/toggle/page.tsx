"use client";

import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export default function TogglePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Toggle</h1>
        <p className="text-muted-foreground">切換按鈕元件，點擊在啟用/停用之間切換，常用於工具列。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">預設樣式</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Toggle aria-label="粗體">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="斜體" defaultPressed>
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="底線">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Outline 樣式</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Toggle variant="outline" aria-label="粗體">
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" aria-label="斜體" defaultPressed>
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle variant="outline" aria-label="底線">
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">帶文字標籤</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Toggle aria-label="靠左對齊">
            <AlignLeft className="h-4 w-4 mr-2" /> 靠左
          </Toggle>
          <Toggle aria-label="置中對齊" defaultPressed>
            <AlignCenter className="h-4 w-4 mr-2" /> 置中
          </Toggle>
          <Toggle aria-label="靠右對齊">
            <AlignRight className="h-4 w-4 mr-2" /> 靠右
          </Toggle>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">停用狀態</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Toggle aria-label="停用" disabled>
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle aria-label="停用啟用" disabled defaultPressed>
            <Italic className="h-4 w-4" />
          </Toggle>
        </div>
      </section>
    </div>
  );
}
