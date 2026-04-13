"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const MAX_CHARS = 200;

export default function TextareaPage() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Textarea</h1>
        <p className="text-muted-foreground">接收使用者多行文字輸入的表單元件。</p>
      </div>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Default</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Textarea className="w-80" placeholder="請輸入內容..." />
        </div>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With Label</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-6">
          <div className="flex flex-col gap-1.5 w-80">
            <Label htmlFor="bio">個人簡介</Label>
            <Textarea id="bio" placeholder="介紹一下自己..." />
          </div>
          <div className="flex flex-col gap-1.5 w-80">
            <Label htmlFor="feedback">意見回饋</Label>
            <Textarea id="feedback" placeholder="告訴我們你的想法..." />
          </div>
        </div>
      </section>

      {/* With Character Count */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With Character Count</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <div className="flex flex-col gap-1.5 w-80">
            <Label htmlFor="limited">限制字數輸入</Label>
            <Textarea
              id="limited"
              className="resize-none"
              placeholder="最多 200 字..."
              maxLength={MAX_CHARS}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <p className={`text-xs text-right ${value.length >= MAX_CHARS ? "text-destructive" : "text-muted-foreground"}`}>
              {value.length} / {MAX_CHARS}
            </p>
          </div>
        </div>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Disabled</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Textarea
            className="w-80"
            placeholder="無法輸入"
            disabled
          />
          <Textarea
            className="w-80"
            defaultValue="此欄位已鎖定，無法編輯。"
            disabled
          />
        </div>
      </section>
    </div>
  );
}
