"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DialogPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dialog</h1>
        <p className="text-muted-foreground">
          疊加在主頁面上的強制互動視窗，用於需要使用者確認或填寫的情境。
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">基本 Dialog</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>
              編輯個人資料
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>編輯個人資料</DialogTitle>
                <DialogDescription>
                  在此修改您的公開資訊。完成後點擊儲存。
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">名稱</Label>
                  <Input id="name" defaultValue="楊鎮瑜 Yuu" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">帳號</Label>
                  <Input id="username" defaultValue="@yuu_design" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>取消</DialogClose>
                <Button type="submit">儲存變更</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">純文字確認 Dialog</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger render={<Button />}>送出申請</DialogTrigger>
            <DialogContent className="sm:max-w-[380px]">
              <DialogHeader>
                <DialogTitle>確認送出？</DialogTitle>
                <DialogDescription>
                  送出後將無法修改內容，請確認所有資訊填寫正確。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>返回修改</DialogClose>
                <Button>確認送出</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
