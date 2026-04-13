"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PopoverPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Popover</h1>
        <p className="text-muted-foreground">點擊觸發的浮動內容面板，適合表單、設定或詳細資訊展示。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">包含表單的 Popover</h2>
        <div className="p-6 border rounded-xl bg-card flex gap-4 flex-wrap">
          <Popover>
            <PopoverTrigger render={<Button variant="outline" />}>
              開啟設定
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium leading-none mb-1">尺寸設定</h4>
                  <p className="text-sm text-muted-foreground">調整元件的寬度與高度。</p>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="width">寬度</Label>
                    <Input id="width" defaultValue="100%" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="height">高度</Label>
                    <Input id="height" defaultValue="auto" />
                  </div>
                </div>
                <Button size="sm" className="w-full">套用</Button>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger render={<Button />}>新增標籤</PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="space-y-3">
                <h4 className="font-medium">新增標籤</h4>
                <Input placeholder="輸入標籤名稱..." />
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">新增</Button>
                  <Button size="sm" variant="outline" className="flex-1">取消</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>
    </div>
  );
}
