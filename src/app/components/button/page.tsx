"use client";

import { Button } from "@/components/ui/button";
import {
  Loader2,
  Plus,
  Trash2,
  ArrowRight,
  Settings,
} from "lucide-react";

export default function ButtonPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Button</h1>
        <p className="text-muted-foreground">觸發操作或事件的基礎互動元件。</p>
      </div>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Variants</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Sizes</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Settings">
            <Settings />
          </Button>
        </div>
      </section>

      {/* Loading State */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Loading State</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Button disabled>
            <Loader2 className="animate-spin" />
            Loading...
          </Button>
          <Button variant="outline" disabled>
            <Loader2 className="animate-spin" />
            Saving...
          </Button>
        </div>
      </section>

      {/* With Icon */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">With Icon</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-wrap gap-3">
          <Button>
            <Plus />
            Add Item
          </Button>
          <Button variant="destructive">
            <Trash2 />
            Delete
          </Button>
          <Button variant="outline">
            Continue
            <ArrowRight />
          </Button>
        </div>
      </section>
    </div>
  );
}
