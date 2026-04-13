"use client";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

export default function ResizablePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Resizable</h1>
        <p className="text-muted-foreground">
          可拖曳調整大小的面板容器，支援水平與垂直方向分割。
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">水平兩欄面板</h2>
        <div className="p-6 border rounded-xl bg-card">
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-48 w-full rounded-lg border"
          >
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="text-sm font-medium text-muted-foreground">
                  左側面板
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="text-sm font-medium text-muted-foreground">
                  右側面板
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">垂直三格面板</h2>
        <div className="p-6 border rounded-xl bg-card">
          <ResizablePanelGroup
            orientation="vertical"
            className="h-80 w-full rounded-lg border"
          >
            <ResizablePanel defaultSize={33}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="text-sm font-medium text-muted-foreground">
                  上方面板
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={33}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="text-sm font-medium text-muted-foreground">
                  中間面板
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={34}>
              <div className="flex h-full items-center justify-center p-4">
                <span className="text-sm font-medium text-muted-foreground">
                  下方面板
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">巢狀混合分割</h2>
        <div className="p-6 border rounded-xl bg-card">
          <ResizablePanelGroup
            orientation="horizontal"
            className="h-64 w-full rounded-lg border"
          >
            <ResizablePanel defaultSize={30}>
              <div className="flex h-full items-center justify-center p-4 bg-muted/30">
                <span className="text-sm font-medium text-muted-foreground">
                  側邊欄
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={70}>
              <ResizablePanelGroup orientation="vertical">
                <ResizablePanel defaultSize={60}>
                  <div className="flex h-full items-center justify-center p-4">
                    <span className="text-sm font-medium text-muted-foreground">
                      主要內容
                    </span>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40}>
                  <div className="flex h-full items-center justify-center p-4 bg-muted/20">
                    <span className="text-sm font-medium text-muted-foreground">
                      底部詳細資訊
                    </span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </section>
    </div>
  );
}
