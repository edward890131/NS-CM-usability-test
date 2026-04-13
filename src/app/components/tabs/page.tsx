"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export default function TabsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tabs</h1>
        <p className="text-muted-foreground">
          用於在同一區塊內切換不同內容的頁籤元件。
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">基本用法（預設第二頁）</h2>
        <div className="p-6 border rounded-xl bg-card">
          <Tabs defaultValue="profile" className="w-full max-w-md">
            <TabsList>
              <TabsTrigger value="account">帳號</TabsTrigger>
              <TabsTrigger value="profile">個人資料</TabsTrigger>
              <TabsTrigger value="settings">設定</TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-4 space-y-2">
              <h3 className="font-medium">帳號資訊</h3>
              <p className="text-sm text-muted-foreground">
                在此管理您的帳號電子信箱與密碼。變更將在下次登入後生效。
              </p>
              <div className="rounded-md bg-muted px-4 py-3 text-sm">
                電子信箱：yuu@goons.design
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-4 space-y-2">
              <h3 className="font-medium">個人資料</h3>
              <p className="text-sm text-muted-foreground">
                更新您的公開顯示名稱、大頭貼與個人介紹。
              </p>
              <div className="rounded-md bg-muted px-4 py-3 text-sm">
                顯示名稱：楊鎮瑜 Yuu
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-4 space-y-2">
              <h3 className="font-medium">通知設定</h3>
              <p className="text-sm text-muted-foreground">
                選擇您希望收到哪些電子郵件通知與推播提醒。
              </p>
              <div className="rounded-md bg-muted px-4 py-3 text-sm">
                推播通知：已開啟
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
