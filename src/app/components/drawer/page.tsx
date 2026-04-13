"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DrawerPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Drawer</h1>
        <p className="text-muted-foreground">從底部滑出的抽屜元件，適合行動裝置操作選單或表單。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">基本 Drawer</h2>
        <div className="p-6 border rounded-xl bg-card">
          <Drawer>
            <DrawerTrigger className={buttonVariants()}>開啟 Drawer</DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>新增目標</DrawerTitle>
                  <DrawerDescription>設定你本週的工作目標。</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-title">目標標題</Label>
                    <Input id="goal-title" placeholder="例：完成設計稿 v2" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goal-desc">備註</Label>
                    <Input id="goal-desc" placeholder="補充說明（選填）" />
                  </div>
                </div>
                <DrawerFooter>
                  <Button>儲存目標</Button>
                  <DrawerClose className={buttonVariants({ variant: "outline" })}>取消</DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </section>
    </div>
  );
}
