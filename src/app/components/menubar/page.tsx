"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from "@/components/ui/menubar";

export default function MenubarPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Menubar</h1>
        <p className="text-muted-foreground">應用程式頂部的水平選單列，適合桌面應用程式操作介面。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">應用程式選單列</h2>
        <div className="p-6 border rounded-xl bg-card">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>檔案</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>新增分頁 <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
                <MenubarItem>新增視窗 <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>分享</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>列印 <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>編輯</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>復原 <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
                <MenubarItem>重做 <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>剪下 <MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
                <MenubarItem>複製 <MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
                <MenubarItem>貼上 <MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>全選 <MenubarShortcut>⌘A</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>檢視</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem checked>顯示工具列</MenubarCheckboxItem>
                <MenubarCheckboxItem>顯示書籤列</MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarRadioGroup value="light">
                  <MenubarRadioItem value="light">淺色模式</MenubarRadioItem>
                  <MenubarRadioItem value="dark">深色模式</MenubarRadioItem>
                  <MenubarRadioItem value="system">跟隨系統</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger>縮放</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>放大 <MenubarShortcut>⌘+</MenubarShortcut></MenubarItem>
                    <MenubarItem>縮小 <MenubarShortcut>⌘-</MenubarShortcut></MenubarItem>
                    <MenubarItem>重設 <MenubarShortcut>⌘0</MenubarShortcut></MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </section>
    </div>
  );
}
