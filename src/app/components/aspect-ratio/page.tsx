"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Aspect Ratio</h1>
        <p className="text-muted-foreground">維持固定寬高比的容器，適合圖片、影片等媒體內容。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">16:9（寬螢幕）</h2>
        <div className="p-6 border rounded-xl bg-card max-w-lg">
          <AspectRatio ratio={16 / 9}>
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
              16 / 9
            </div>
          </AspectRatio>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">4:3（標準）</h2>
        <div className="p-6 border rounded-xl bg-card max-w-lg">
          <AspectRatio ratio={4 / 3}>
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
              4 / 3
            </div>
          </AspectRatio>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">1:1（正方形）</h2>
        <div className="p-6 border rounded-xl bg-card max-w-xs">
          <AspectRatio ratio={1}>
            <div className="w-full h-full bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
              1 / 1
            </div>
          </AspectRatio>
        </div>
      </section>
    </div>
  );
}
