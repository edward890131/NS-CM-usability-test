"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

export default function HoverCardPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Hover Card</h1>
        <p className="text-muted-foreground">滑鼠懸停時顯示的預覽卡片，常用於使用者資訊或連結預覽。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">使用者資訊卡片</h2>
        <div className="p-6 border rounded-xl bg-card flex gap-6">
          <HoverCard>
            <HoverCardTrigger render={<Button variant="link" className="px-0" />}>
              @shadcn
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@shadcn</h4>
                  <p className="text-sm text-muted-foreground">
                    shadcn/ui 的建立者，致力於打造美觀且可存取的 React 元件庫。
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-muted-foreground">加入於 2023 年 1 月</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger render={<Button variant="link" className="px-0" />}>
              @yuu
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarFallback>YU</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@yuu</h4>
                  <p className="text-sm text-muted-foreground">
                    果思設計中階產品設計師，熱愛 UX 與 AI 技術應用。
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-muted-foreground">加入於 2024 年 3 月</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </section>
    </div>
  );
}
