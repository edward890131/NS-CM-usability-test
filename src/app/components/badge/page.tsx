"use client";

import { Badge } from "@/components/ui/badge";

export default function BadgePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Badge</h1>
        <p className="text-muted-foreground">用於標示狀態、分類或數量的小型標籤元件。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Variants</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>
    </div>
  );
}
