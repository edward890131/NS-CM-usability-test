"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

export default function ToggleGroupPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Toggle Group</h1>
        <p className="text-muted-foreground">切換按鈕群組，支援單選與多選模式。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Single（單選）— 文字對齊</h2>
        <div className="p-6 border rounded-xl bg-card">
          <ToggleGroup defaultValue={["center"]}>
            <ToggleGroupItem value="left" aria-label="靠左">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="置中">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="靠右">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="justify" aria-label="兩端對齊">
              <AlignJustify className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Multiple（多選）— 文字格式</h2>
        <div className="p-6 border rounded-xl bg-card">
          <ToggleGroup defaultValue={["bold"]}>
            <ToggleGroupItem value="bold" aria-label="粗體">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="斜體">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="底線">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">尺寸選擇</h2>
        <div className="p-6 border rounded-xl bg-card">
          <ToggleGroup defaultValue={["md"]}>
            <ToggleGroupItem value="sm">S</ToggleGroupItem>
            <ToggleGroupItem value="md">M</ToggleGroupItem>
            <ToggleGroupItem value="lg">L</ToggleGroupItem>
            <ToggleGroupItem value="xl">XL</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </section>
    </div>
  );
}
