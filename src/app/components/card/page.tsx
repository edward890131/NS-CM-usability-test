"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CardPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Card</h1>
        <p className="text-muted-foreground">用於將相關內容與操作組合在一起的容器元件。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">基本範例</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-6">
          {/* 範例一：帳號設定卡片 */}
          <Card className="w-72">
            <CardHeader>
              <CardTitle>帳號設定</CardTitle>
              <CardDescription>管理你的個人帳號資訊與偏好設定。</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                上次登入：2026/04/13 09:41
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">編輯資料</Button>
            </CardFooter>
          </Card>

          {/* 範例二：專案狀態卡片 */}
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Design System v2</CardTitle>
              <CardDescription>元件庫建構進度追蹤。</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">進行中</Badge>
                <span className="text-sm text-muted-foreground">10 / 24 元件完成</span>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">查看詳情</Button>
              <Button variant="outline" size="sm">分享</Button>
            </CardFooter>
          </Card>

          {/* 範例三：通知卡片 */}
          <Card className="w-72">
            <CardHeader>
              <CardTitle>新訊息通知</CardTitle>
              <CardDescription>你有 3 則未讀訊息。</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>阿豪：「設計稿更新了！」</li>
                <li>小美：「明天的會議幾點？」</li>
                <li>系統：「密碼即將於 7 天後到期。」</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">全部標為已讀</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
