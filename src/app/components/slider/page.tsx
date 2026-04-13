"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export default function SliderPage() {
  const [singleValue, setSingleValue] = useState(50);
  const [rangeValue, setRangeValue] = useState([20, 80]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Slider</h1>
        <p className="text-muted-foreground">拖曳數值滑桿，適合音量、亮度、價格區間等連續數值輸入。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">基本滑桿</h2>
        <div className="p-6 border rounded-xl bg-card space-y-4 max-w-sm">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>音量</span>
              <span className="font-medium">{singleValue}%</span>
            </div>
            <Slider
              value={singleValue}
              onValueChange={(v) => setSingleValue(typeof v === "number" ? v : v[0])}
              max={100}
              step={1}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">區間選取</h2>
        <div className="p-6 border rounded-xl bg-card space-y-4 max-w-sm">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>價格區間</span>
              <span className="font-medium">NT${rangeValue[0]} – NT${rangeValue[1]}</span>
            </div>
            <Slider
              value={rangeValue}
              onValueChange={(v) => {
                if (Array.isArray(v)) setRangeValue([...v] as number[]);
              }}
              max={100}
              step={5}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">停用狀態</h2>
        <div className="p-6 border rounded-xl bg-card max-w-sm">
          <Slider defaultValue={40} max={100} step={1} disabled />
        </div>
      </section>
    </div>
  );
}
