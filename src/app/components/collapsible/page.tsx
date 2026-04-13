"use client";

import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

export default function CollapsiblePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Collapsible</h1>
        <p className="text-muted-foreground">可折疊區塊，比 Accordion 更輕量，適合單一展開/收合場景。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">基本用法</h2>
        <div className="p-6 border rounded-xl bg-card">
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-80 space-y-2">
            <div className="flex items-center justify-between space-x-4">
              <h3 className="text-sm font-semibold">已安裝的套件</h3>
              <CollapsibleTrigger
                render={
                  <Button variant="ghost" size="icon" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                }
              />
            </div>
            <div className="rounded-md border px-4 py-3 font-mono text-sm">
              @radix-ui/react-collapsible
            </div>
            <CollapsibleContent className="space-y-2">
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/react-accordion
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/react-dialog
              </div>
              <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/react-tooltip
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">帶說明文字的折疊</h2>
        <div className="p-6 border rounded-xl bg-card">
          <Collapsible open={isOpen2} onOpenChange={setIsOpen2} className="w-96">
            <CollapsibleTrigger
              render={
                <Button variant="outline" className="w-full justify-between">
                  查看進階設定
                  <ChevronsUpDown className="h-4 w-4 opacity-50" />
                </Button>
              }
            />
            <CollapsibleContent className="mt-3 space-y-3">
              <div className="rounded-lg border p-4 space-y-1">
                <p className="text-sm font-medium">API 端點</p>
                <p className="text-sm text-muted-foreground">https://api.example.com/v1</p>
              </div>
              <div className="rounded-lg border p-4 space-y-1">
                <p className="text-sm font-medium">Webhook URL</p>
                <p className="text-sm text-muted-foreground">https://hooks.example.com/notify</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>
    </div>
  );
}
