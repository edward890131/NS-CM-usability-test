"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionShowcase() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Accordion</h1>
        <p className="text-muted-foreground">可折疊展開的內容面板，適合 FAQ、設定選項等場景。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">單選模式（一次只能展開一項）</h2>
        <div className="p-6 border rounded-xl bg-card">
          <Accordion className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>這個 design system 是用什麼建立的？</AccordionTrigger>
              <AccordionContent>
                基於 shadcn/ui，搭配 React 19、Next.js 16、Tailwind CSS v4 與 TypeScript 建立。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>可以客製化元件樣式嗎？</AccordionTrigger>
              <AccordionContent>
                完全可以。shadcn/ui 的元件都直接複製到你的專案中，你可以自由修改每個元件的原始碼。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>支援 Dark Mode 嗎？</AccordionTrigger>
              <AccordionContent>
                支援。透過 CSS 變數和 .dark class 切換，所有元件都已針對 dark mode 設計好配色。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">多選模式（可同時展開多項）</h2>
        <div className="p-6 border rounded-xl bg-card">
          <Accordion multiple className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>功能一</AccordionTrigger>
              <AccordionContent>
                這個功能讓你可以同時展開多個區塊，適合需要對比內容的場景。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>功能二</AccordionTrigger>
              <AccordionContent>
                展開功能二的內容，此時功能一也可以保持展開狀態。
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>功能三</AccordionTrigger>
              <AccordionContent>
                三個區塊可以同時展開，提供更靈活的資訊架構。
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
