"use client";

import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

export default function SonnerPage() {
  return (
    <div className="space-y-10">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold mb-2">Sonner</h1>
        <p className="text-muted-foreground">Toast 通知訊息元件，提供多種類型與位置設定。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">各種 Toast 類型</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={() => toast("這是一則預設通知", { description: "這裡是補充說明文字。" })}
          >
            Default
          </Button>
          <Button
            variant="outline"
            className="text-green-600 border-green-200"
            onClick={() => toast.success("操作成功！", { description: "資料已成功儲存。" })}
          >
            Success
          </Button>
          <Button
            variant="outline"
            className="text-red-600 border-red-200"
            onClick={() => toast.error("發生錯誤", { description: "請稍後再試，或聯繫客服。" })}
          >
            Error
          </Button>
          <Button
            variant="outline"
            className="text-yellow-600 border-yellow-200"
            onClick={() => toast.warning("注意事項", { description: "此操作無法還原，請確認後繼續。" })}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("系統通知", { description: "系統將於今晚 12 點進行維護。" })}
          >
            Info
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">帶操作按鈕</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Button
            onClick={() =>
              toast("已刪除 1 個項目", {
                action: {
                  label: "復原",
                  onClick: () => toast.success("已成功復原！"),
                },
              })
            }
          >
            刪除項目（可復原）
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.promise(
                new Promise((resolve) => setTimeout(resolve, 2000)),
                {
                  loading: "正在載入...",
                  success: "載入完成！",
                  error: "載入失敗",
                }
              )
            }
          >
            Promise Toast
          </Button>
        </div>
      </section>
    </div>
  );
}
