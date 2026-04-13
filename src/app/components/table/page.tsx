"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const users = [
  { name: "Alice Chen", email: "alice@example.com", role: "Admin", status: "Active" },
  { name: "Bob Lin", email: "bob@example.com", role: "Editor", status: "Active" },
  { name: "Carol Wu", email: "carol@example.com", role: "Viewer", status: "Inactive" },
  { name: "David Lee", email: "david@example.com", role: "Editor", status: "Active" },
  { name: "Eva Huang", email: "eva@example.com", role: "Viewer", status: "Pending" },
];

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  Active: "default",
  Inactive: "secondary",
  Pending: "outline",
};

export default function TablePage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Table</h1>
        <p className="text-muted-foreground">用於呈現結構化資料的表格元件，支援 Header、Body、Footer。</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">使用者列表</h2>
        <div className="p-6 border rounded-xl bg-card">
          <Table>
            <TableCaption>共 {users.length} 位使用者</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>姓名</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>角色</TableHead>
                <TableHead className="text-right">狀態</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>總計</TableCell>
                <TableCell className="text-right">{users.length} 筆</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </section>
    </div>
  );
}
