"use client";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

export default function AvatarPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Avatar</h1>
        <p className="text-muted-foreground">顯示使用者頭像，支援圖片或文字 fallback。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With Image</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/1?v=4" alt="user" />
            <AvatarFallback>GH</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Fallback Text（圖片載入失敗時）</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-4 items-center">
          <Avatar>
            <AvatarImage src="/broken-image.png" alt="broken" />
            <AvatarFallback>YU</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/broken-image.png" alt="broken" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="/broken-image.png" alt="broken" />
            <AvatarFallback>卡</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Different Sizes（sm / default / lg）</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-4 items-center">
          {/* size prop 直接傳入 */}
          <Avatar size="sm">
            <AvatarImage src="https://github.com/shadcn.png" alt="small" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarImage src="https://github.com/shadcn.png" alt="default" />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarImage src="https://github.com/shadcn.png" alt="large" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
        </div>
      </section>
    </div>
  );
}
