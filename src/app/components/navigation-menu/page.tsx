"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";

const components = [
  { title: "Alert Dialog", href: "/components/alert-dialog", description: "確認對話框，中斷使用者流程取得同意。" },
  { title: "Hover Card", href: "/components/hover-card", description: "懸停時顯示連結相關資訊的預覽卡片。" },
  { title: "Progress", href: "/components/progress", description: "顯示任務完成進度的長條元件。" },
  { title: "Scroll Area", href: "/components/scroll-area", description: "自訂捲軸樣式的捲動容器。" },
];

export default function NavigationMenuPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Navigation Menu</h1>
        <p className="text-muted-foreground">水平導航選單，支援下拉展開內容，適合網站主選單。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">完整導航選單</h2>
        <div className="p-6 border rounded-xl bg-card overflow-visible min-h-80">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>開始使用</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink
                        href="/"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">Design System</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          基於 shadcn/ui 建立的完整元件庫，適合快速開發 side project。
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/components/button"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Button</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">各種樣式的按鈕元件。</p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/components/input"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">Input</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">文字輸入框元件。</p>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>元件</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {components.map((component) => (
                      <li key={component.title}>
                        <NavigationMenuLink
                          href={component.href}
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">{component.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {component.description}
                          </p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                  回首頁
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </section>
    </div>
  );
}
