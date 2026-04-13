"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info, Plus, Trash2, Edit } from "lucide-react";

export default function TooltipPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tooltip</h1>
        <p className="text-muted-foreground">滑鼠懸停時顯示的提示文字，提供額外說明或快捷鍵資訊。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">四個方向</h2>
        <div className="p-10 border rounded-xl bg-card flex flex-wrap gap-6 justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>上方提示</TooltipTrigger>
              <TooltipContent side="top"><p>這是上方的提示文字</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>下方提示</TooltipTrigger>
              <TooltipContent side="bottom"><p>這是下方的提示文字</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>左方提示</TooltipTrigger>
              <TooltipContent side="left"><p>這是左方的提示文字</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>右方提示</TooltipTrigger>
              <TooltipContent side="right"><p>這是右方的提示文字</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">圖示按鈕工具列</h2>
        <div className="p-6 border rounded-xl bg-card">
          <TooltipProvider>
            <div className="flex gap-1">
              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost" size="icon"><Plus className="h-4 w-4" /></Button>} />
                <TooltipContent><p>新增項目 ⌘N</p></TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>} />
                <TooltipContent><p>編輯 ⌘E</p></TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>} />
                <TooltipContent><p>刪除 ⌫</p></TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost" size="icon"><Info className="h-4 w-4" /></Button>} />
                <TooltipContent className="max-w-xs"><p>顯示詳細資訊，包括建立時間與最後修改紀錄。</p></TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </section>
    </div>
  );
}
