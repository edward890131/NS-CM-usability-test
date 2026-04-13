"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Input</h1>
        <p className="text-muted-foreground">接收使用者單行文字輸入的表單元件。</p>
      </div>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Default</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Input className="w-64" />
        </div>
      </section>

      {/* With Placeholder */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With Placeholder</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Input className="w-64" placeholder="請輸入電子郵件" />
          <Input className="w-64" placeholder="搜尋..." />
        </div>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With Label</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">電子郵件</Label>
            <Input id="email" className="w-64" placeholder="name@example.com" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="username">使用者名稱</Label>
            <Input id="username" className="w-64" placeholder="@username" />
          </div>
        </div>
      </section>

      {/* With Error Message */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With Error Message</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email-error">電子郵件</Label>
            <Input
              id="email-error"
              className="w-64"
              placeholder="name@example.com"
              aria-invalid="true"
              defaultValue="invalid-email"
            />
            <p className="text-sm text-destructive">請輸入有效的電子郵件地址。</p>
          </div>
        </div>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Disabled</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Input className="w-64" placeholder="無法輸入" disabled />
          <Input className="w-64" defaultValue="唯讀內容" disabled />
        </div>
      </section>
    </div>
  );
}
