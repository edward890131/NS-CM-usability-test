"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function LabelPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Label</h1>
        <p className="text-muted-foreground">表單元素的標籤，提供可存取性支援，點擊可聚焦對應欄位。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">搭配 Input 使用</h2>
        <div className="p-6 border rounded-xl bg-card space-y-4 max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="email">電子郵件</Label>
            <Input id="email" type="email" placeholder="name@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="required-field">
              使用者名稱 <span className="text-destructive">*</span>
            </Label>
            <Input id="required-field" placeholder="必填欄位" />
            <p className="text-xs text-muted-foreground">只能使用英文、數字與底線。</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="disabled-field" className="opacity-50">停用欄位</Label>
            <Input id="disabled-field" placeholder="已停用" disabled />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">搭配 Checkbox 使用</h2>
        <div className="p-6 border rounded-xl bg-card space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="cursor-pointer">
              我同意服務條款與隱私政策
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label htmlFor="newsletter" className="cursor-pointer">
              訂閱電子報（選填）
            </Label>
          </div>
        </div>
      </section>
    </div>
  );
}
