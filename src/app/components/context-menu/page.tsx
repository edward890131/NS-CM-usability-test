"use client";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { useState } from "react";

export default function ContextMenuPage() {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Context Menu</h1>
        <p className="text-muted-foreground">在指定區域按右鍵（或長按）觸發的快捷選單。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">右鍵觸發區域</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <ContextMenu>
            <ContextMenuTrigger className="flex h-40 w-full items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 text-sm text-muted-foreground select-none cursor-default">
              在此區域按右鍵開啟選單
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuLabel>檔案操作</ContextMenuLabel>
              <ContextMenuSeparator />

              <ContextMenuItem>
                開啟
                <ContextMenuShortcut>↩</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                在新視窗開啟
                <ContextMenuShortcut>⌘↩</ContextMenuShortcut>
              </ContextMenuItem>

              <ContextMenuSub>
                <ContextMenuSubTrigger>分享</ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem>複製連結</ContextMenuItem>
                  <ContextMenuItem>以 Email 傳送</ContextMenuItem>
                  <ContextMenuItem>傳送至 AirDrop</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>

              <ContextMenuSeparator />

              <ContextMenuCheckboxItem
                checked={bookmarked}
                onCheckedChange={setBookmarked}
              >
                加入書籤
              </ContextMenuCheckboxItem>

              <ContextMenuSeparator />

              <ContextMenuItem>
                重新命名
                <ContextMenuShortcut>↩</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                複製
                <ContextMenuShortcut>⌘D</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">
                刪除
                <ContextMenuShortcut>⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
        <p className="text-sm text-muted-foreground">書籤狀態：{bookmarked ? "已加入" : "未加入"}</p>
      </section>
    </div>
  );
}
