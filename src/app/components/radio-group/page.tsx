"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function RadioGroupPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Radio Group</h1>
        <p className="text-muted-foreground">從一組互斥選項中選取單一值的表單元件。</p>
      </div>

      {/* Vertical Layout */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">垂直佈局（Vertical）</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-6">
          <RadioGroup defaultValue="option-1">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-1" id="v-option-1" />
              <Label htmlFor="v-option-1">選項一</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-2" id="v-option-2" />
              <Label htmlFor="v-option-2">選項二</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="option-3" id="v-option-3" />
              <Label htmlFor="v-option-3">選項三</Label>
            </div>
          </RadioGroup>
        </div>
      </section>

      {/* Horizontal Layout */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">水平佈局（Horizontal）</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-6">
          <RadioGroup defaultValue="small" className="flex flex-row gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="small" id="h-small" />
              <Label htmlFor="h-small">小型</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="medium" id="h-medium" />
              <Label htmlFor="h-medium">中型</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="large" id="h-large" />
              <Label htmlFor="h-large">大型</Label>
            </div>
          </RadioGroup>
        </div>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Disabled</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-6">
          <RadioGroup defaultValue="active" className="flex flex-row gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="active" id="d-active" />
              <Label htmlFor="d-active">啟用</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="inactive" id="d-inactive" disabled />
              <Label htmlFor="d-inactive" className="opacity-50 cursor-not-allowed">
                停用（disabled）
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="pending" id="d-pending" disabled />
              <Label htmlFor="d-pending" className="opacity-50 cursor-not-allowed">
                待審中（disabled）
              </Label>
            </div>
          </RadioGroup>
        </div>
      </section>
    </div>
  );
}
