"use client";

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { InfoIcon, TriangleAlertIcon } from "lucide-react";

export default function AlertPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Alert</h1>
        <p className="text-muted-foreground">用於顯示重要訊息或警告通知的提示元件。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Default</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-col gap-4">
          <Alert>
            <InfoIcon />
            <AlertTitle>一般提示</AlertTitle>
            <AlertDescription>
              你的設定已成功儲存，變更將於下次登入後生效。
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Destructive</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-col gap-4">
          <Alert variant="destructive">
            <TriangleAlertIcon />
            <AlertTitle>操作失敗</AlertTitle>
            <AlertDescription>
              無法連接至伺服器，請檢查網路連線後再試一次。
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </div>
  );
}
