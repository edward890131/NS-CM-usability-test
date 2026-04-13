"use client";

import { InputGroup, InputGroupText } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, DollarSign, AtSign } from "lucide-react";

export default function InputGroupPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Input Group</h1>
        <p className="text-muted-foreground">將輸入框與前後綴元素（文字、圖示、按鈕）組合的元件。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">帶前綴圖示</h2>
        <div className="p-6 border rounded-xl bg-card space-y-4 max-w-sm">
          <InputGroup>
            <InputGroupText>
              <Search className="h-4 w-4" />
            </InputGroupText>
            <Input placeholder="搜尋..." />
          </InputGroup>

          <InputGroup>
            <InputGroupText>
              <Mail className="h-4 w-4" />
            </InputGroupText>
            <Input placeholder="電子郵件" type="email" />
          </InputGroup>

          <InputGroup>
            <InputGroupText>
              <AtSign className="h-4 w-4" />
            </InputGroupText>
            <Input placeholder="使用者名稱" />
          </InputGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">帶前綴文字</h2>
        <div className="p-6 border rounded-xl bg-card space-y-4 max-w-sm">
          <InputGroup>
            <InputGroupText>
              <DollarSign className="h-4 w-4" />
            </InputGroupText>
            <Input placeholder="0.00" type="number" />
            <InputGroupText>TWD</InputGroupText>
          </InputGroup>

          <InputGroup>
            <InputGroupText>https://</InputGroupText>
            <Input placeholder="your-site.com" />
          </InputGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">搜尋框 + 按鈕</h2>
        <div className="p-6 border rounded-xl bg-card max-w-sm">
          <InputGroup>
            <Input placeholder="輸入關鍵字..." />
            <Button>搜尋</Button>
          </InputGroup>
        </div>
      </section>
    </div>
  );
}
