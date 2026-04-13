"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SelectPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Select</h1>
        <p className="text-muted-foreground">從下拉選單中選取單一選項的表單元件。</p>
      </div>

      {/* Default */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Default</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Select>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="選擇一個水果" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>熱帶水果</SelectLabel>
                <SelectItem value="mango">芒果</SelectItem>
                <SelectItem value="pineapple">鳳梨</SelectItem>
                <SelectItem value="papaya">木瓜</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>溫帶水果</SelectLabel>
                <SelectItem value="apple">蘋果</SelectItem>
                <SelectItem value="pear">西洋梨</SelectItem>
                <SelectItem value="grape">葡萄</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With Label</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="role-select">角色</Label>
            <Select>
              <SelectTrigger id="role-select" className="w-52">
                <SelectValue placeholder="選擇角色" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">管理員</SelectItem>
                <SelectItem value="editor">編輯者</SelectItem>
                <SelectItem value="viewer">檢視者</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="size-select">尺寸</Label>
            <Select>
              <SelectTrigger id="size-select" className="w-52">
                <SelectValue placeholder="選擇尺寸" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">XS</SelectItem>
                <SelectItem value="s">S</SelectItem>
                <SelectItem value="m">M</SelectItem>
                <SelectItem value="l">L</SelectItem>
                <SelectItem value="xl">XL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Disabled</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Select disabled>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="無法選取" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">選項 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>
    </div>
  );
}
