"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function AlertDialogPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Alert Dialog</h1>
        <p className="text-muted-foreground">
          用於不可逆操作的強制確認視窗，要求使用者明確選擇繼續或取消。
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">確認刪除</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="destructive" />}>
              刪除帳號
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>確定要刪除帳號嗎？</AlertDialogTitle>
                <AlertDialogDescription>
                  此操作無法復原。您的帳號與所有相關資料將被永久刪除，且無法找回。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  確認刪除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">確認移除專案</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>
              移除專案
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>移除「設計系統 v2」？</AlertDialogTitle>
                <AlertDialogDescription>
                  移除後，此專案將從工作區消失。成員將失去存取權限，但已匯出的檔案不受影響。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction>確認移除</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </div>
  );
}
