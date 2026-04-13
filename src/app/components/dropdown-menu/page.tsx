"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function DropdownMenuPage() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [position, setPosition] = useState("bottom");

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dropdown Menu</h1>
        <p className="text-muted-foreground">點擊觸發的下拉選單，支援 separator、submenu、checkbox、radio group。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">完整範例</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline" />}>
              開啟選單
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>我的帳號</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  個人設定
                  <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  帳單資訊
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Submenu */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>邀請成員</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>以 Email 邀請</DropdownMenuItem>
                  <DropdownMenuItem>複製邀請連結</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>更多選項...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              {/* Checkbox items */}
              <DropdownMenuLabel>外觀設定</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                顯示狀態列
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                顯示側邊欄
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator />

              {/* Radio group */}
              <DropdownMenuLabel>停靠位置</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                <DropdownMenuRadioItem value="top">上方</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">下方</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">右側</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive">
                登出
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-sm text-muted-foreground">
          目前選中：狀態列 {showStatusBar ? "顯示" : "隱藏"}、側邊欄 {showPanel ? "顯示" : "隱藏"}、停靠位置：{position}
        </p>
      </section>
    </div>
  );
}
