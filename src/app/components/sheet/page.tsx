"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const directions = ["top", "right", "bottom", "left"] as const;

export default function SheetPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sheet</h1>
        <p className="text-muted-foreground">從畫面邊緣滑出的側邊面板，支援上下左右四個方向。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">四個方向</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          {directions.map((side) => (
            <Sheet key={side}>
              <SheetTrigger render={<Button variant="outline" />}>{side}</SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>從 {side} 滑出</SheetTitle>
                  <SheetDescription>
                    這是一個從 {side} 方向滑入的 Sheet 面板。
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${side}`}>名稱</Label>
                    <Input id={`name-${side}`} placeholder="輸入名稱" />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose render={<Button variant="outline" />}>關閉</SheetClose>
                  <Button>儲存</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </section>
    </div>
  );
}
