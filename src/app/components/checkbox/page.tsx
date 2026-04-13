"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Checkbox</h1>
        <p className="text-muted-foreground">讓使用者勾選一個或多個選項的表單元件。</p>
      </div>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">States</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-6">
          {/* Default (unchecked) */}
          <div className="flex items-center gap-2">
            <Checkbox id="default" />
            <Label htmlFor="default">Default</Label>
          </div>

          {/* Checked */}
          <div className="flex items-center gap-2">
            <Checkbox id="checked" defaultChecked />
            <Label htmlFor="checked">Checked</Label>
          </div>

          {/* Disabled unchecked */}
          <div className="flex items-center gap-2">
            <Checkbox id="disabled" disabled />
            <Label htmlFor="disabled" className="opacity-50 cursor-not-allowed">
              Disabled
            </Label>
          </div>

          {/* Disabled checked */}
          <div className="flex items-center gap-2">
            <Checkbox id="disabled-checked" defaultChecked disabled />
            <Label htmlFor="disabled-checked" className="opacity-50 cursor-not-allowed">
              Disabled Checked
            </Label>
          </div>
        </div>
      </section>

      {/* With Label — checklist example */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With Label</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">我同意服務條款與隱私政策。</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="newsletter" defaultChecked />
            <Label htmlFor="newsletter">訂閱電子報，接收最新消息。</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="marketing" />
            <Label htmlFor="marketing">接受個性化廣告推薦。</Label>
          </div>
        </div>
      </section>
    </div>
  );
}
