"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 4200, users: 240 },
  { month: "Feb", revenue: 5800, users: 310 },
  { month: "Mar", revenue: 4900, users: 280 },
  { month: "Apr", revenue: 7200, users: 420 },
  { month: "May", revenue: 6500, users: 380 },
  { month: "Jun", revenue: 8100, users: 510 },
];

const chartConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
  users: { label: "Users", color: "var(--chart-2)" },
};

export default function ChartPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Chart</h1>
        <p className="text-muted-foreground">基於 Recharts 的資料圖表元件，支援多種圖表類型。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Area Chart（面積圖）</h2>
        <div className="p-6 border rounded-xl bg-card">
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--chart-1)"
                fill="var(--chart-1)"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Bar Chart（長條圖）</h2>
        <div className="p-6 border rounded-xl bg-card">
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="revenue" fill="var(--chart-1)" radius={4} />
              <Bar dataKey="users" fill="var(--chart-2)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </section>
    </div>
  );
}
