"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<{ from: Date; to?: Date } | undefined>();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Calendar</h1>
        <p className="text-muted-foreground">日曆元件，支援單日選取與日期區間選取。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">單日選取</h2>
        <div className="p-6 border rounded-xl bg-card flex flex-col gap-4 items-start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
          <p className="text-sm text-muted-foreground">
            選取日期：{date ? date.toLocaleDateString("zh-TW") : "尚未選取"}
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">預設今日、禁止過去日期</h2>
        <div className="p-6 border rounded-xl bg-card">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={{ before: new Date() }}
            className="rounded-lg border"
          />
        </div>
      </section>
    </div>
  );
}
