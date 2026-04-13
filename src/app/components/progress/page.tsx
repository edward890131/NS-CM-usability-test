"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function ProgressPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Progress</h1>
        <p className="text-muted-foreground">進度條元件，用於顯示任務、上傳或流程的完成百分比。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">靜態數值</h2>
        <div className="p-6 border rounded-xl bg-card space-y-5 max-w-lg">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm"><span>0%</span><span>0</span></div>
            <Progress value={0} />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm"><span>33%</span><span>33</span></div>
            <Progress value={33} />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm"><span>66%</span><span>66</span></div>
            <Progress value={66} />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm"><span>100%</span><span>100</span></div>
            <Progress value={100} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">動態載入動畫</h2>
        <div className="p-6 border rounded-xl bg-card space-y-3 max-w-lg">
          <div className="flex justify-between text-sm">
            <span>正在上傳...</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} />
          {progress === 100 && (
            <p className="text-sm text-green-600 font-medium">✓ 上傳完成！</p>
          )}
        </div>
      </section>
    </div>
  );
}
