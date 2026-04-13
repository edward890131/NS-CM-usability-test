"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Skeleton</h1>
        <p className="text-muted-foreground">載入佔位動畫，在內容載入前維持版面結構，減少視覺跳動。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">文字 Skeleton</h2>
        <div className="p-6 border rounded-xl bg-card space-y-3 max-w-sm">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">卡片 Skeleton</h2>
        <div className="p-6 border rounded-xl bg-card flex gap-4 flex-wrap">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 w-48">
              <Skeleton className="h-32 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">使用者資訊 Skeleton</h2>
        <div className="p-6 border rounded-xl bg-card space-y-4 max-w-sm">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
