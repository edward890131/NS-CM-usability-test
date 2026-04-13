"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SwitchPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Switch</h1>
        <p className="text-muted-foreground">開關切換元件，適合設定頁面的功能啟用/停用。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">基本用法</h2>
        <div className="p-6 border rounded-xl bg-card flex gap-6 flex-wrap">
          <div className="flex items-center space-x-2">
            <Switch id="basic-on" defaultChecked />
            <Label htmlFor="basic-on">已開啟</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="basic-off" />
            <Label htmlFor="basic-off">已關閉</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="disabled" disabled />
            <Label htmlFor="disabled" className="opacity-50">停用</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="disabled-checked" disabled defaultChecked />
            <Label htmlFor="disabled-checked" className="opacity-50">停用（已啟用）</Label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">設定面板範例</h2>
        <div className="p-6 border rounded-xl bg-card max-w-sm space-y-0 divide-y">
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium">推播通知</p>
              <p className="text-xs text-muted-foreground">接收最新消息與提醒</p>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium">深色模式</p>
              <p className="text-xs text-muted-foreground">切換介面主題</p>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
          <div className="flex items-center justify-between py-4">
            <div>
              <p className="text-sm font-medium">行銷郵件</p>
              <p className="text-xs text-muted-foreground">接收產品更新與優惠資訊</p>
            </div>
            <Switch checked={marketing} onCheckedChange={setMarketing} />
          </div>
        </div>
      </section>
    </div>
  );
}
