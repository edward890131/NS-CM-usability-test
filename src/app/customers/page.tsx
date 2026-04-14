"use client";

import { useState } from "react";
import {
  Pin,
  PinOff,
  Search,
  ChevronDown,
  ChevronsUpDown,
  SlidersHorizontal,
  X,
  User,
  MoreVertical,
  ChevronLeft,
} from "lucide-react";

// ─────────────────────────────────────────────
// 設計 Token（來自南山元件庫）
// ─────────────────────────────────────────────
const T = {
  primary: "#006fbc",
  primaryDark: "#004f85",
  white: "#ffffff",
  bgLight: "#f6f6f6",
  bgTableHeader: "#f2f6f9",
  textDefault: "#3c3c3c",
  textMedium: "#696969",
  textDark: "#555555",
  textWhite: "#ffffff",
  textDisabled: "#cacaca",
  borderLow: "#eeeeee",
  borderDefault: "#cacaca",
  tagProduct: "#004f85",  // 產（深藍）
  tagProspect: "#00a069", // 準（綠）
  positive: "#00a069",
};

// ─────────────────────────────────────────────
// 側邊欄選單資料
// ─────────────────────────────────────────────
const sideMenuItems = [
  { label: "客戶管理摘要", group: 1 },
  { label: "客戶組成", group: 1 },
  { label: "所有客戶", group: 2, active: true },
  { label: "專案經營名單", group: 2 },
  { label: "我的自建組合", group: 2 },
  { label: "近期接觸機會", group: 2 },
  { label: "所有保單", group: 3 },
  { label: "案件處理進度", group: 3 },
  { label: "保單重要事件", group: 3 },
  { label: "承接/指派保單", group: 3 },
  { label: "金融機構間資料共享", group: 4 },
];

// ─────────────────────────────────────────────
// 表格資料
// ─────────────────────────────────────────────
const customers = [
  {
    id: 1,
    pinned: true,
    tagType: "產",
    name: "陳東門",
    subtitle: "滿期金・繳費期滿・好易保一般・實支實付",
    grade: "A",
    gender: "男性",
    birthDate: "110/11/11",
    age: 40,
    membership: ["尊榮1星", "黃金 VIP"],
  },
  {
    id: 2,
    pinned: false,
    tagType: "準",
    name: "王韻如",
    subtitle: "",
    grade: "D",
    gender: "女性",
    birthDate: "110/11/11",
    age: 40,
    membership: ["-"],
  },
  {
    id: 3,
    pinned: false,
    tagType: "產",
    name: "王南山",
    subtitle: "滿期金・繳費期滿・好易保一般・實支實付",
    grade: "B",
    gender: "男性",
    birthDate: "110/11/11",
    age: 40,
    membership: ["尊榮2星"],
  },
  {
    id: 4,
    pinned: false,
    tagType: "準",
    name: "黃峰旗",
    subtitle: "",
    grade: "C",
    gender: "男性",
    birthDate: "110/11/11",
    age: 40,
    membership: ["黃金 VIP"],
  },
];

// ─────────────────────────────────────────────
// 頂部導覽列
// ─────────────────────────────────────────────
const navLinks = [
  { label: "首頁", active: false },
  { label: "行銷管理", active: false },
  { label: "客戶管理", active: true },
  { label: "業務管理", active: false },
  { label: "知識管理", active: false },
  { label: "排程管理", active: false },
  { label: "通知中心", active: false },
  { label: "其他功能", active: false },
];

function AppHeader() {
  return (
    <header
      className="shrink-0 flex flex-col"
      style={{
        backgroundColor: T.white,
        borderBottom: `1px solid ${T.borderLow}`,
      }}
    >
      {/* 主列 */}
      <div className="flex items-center h-[56px] pl-5 pr-1 py-2">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0 mr-4">
          {/* 以文字替代圖片 Logo（Figma 圖片資產有效期 7 天） */}
          <div
            className="flex items-center justify-center rounded text-xs font-bold text-white px-2 py-1"
            style={{ backgroundColor: T.primary }}
          >
            南山
          </div>
          <span
            className="text-sm font-semibold"
            style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
          >
            人壽地
          </span>
        </div>

        {/* 導覽連結 */}
        <nav className="flex flex-1 items-center justify-center gap-1 h-full">
          {navLinks.map((link) => (
            <button
              key={link.label}
              className="flex items-center justify-center h-full w-[87px] text-[16px] font-semibold shrink-0 relative"
              style={{
                color: link.active ? T.primary : T.textDefault,
                fontFamily: "'PingFang TC', sans-serif",
                borderBottom: link.active ? `4px solid ${T.primary}` : "4px solid transparent",
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* 使用者圖示 */}
        <button
          className="p-1 flex items-center justify-center"
          style={{ color: T.textMedium }}
        >
          <User size={24} />
        </button>
      </div>

      {/* 彩虹漸層底線 */}
      <div
        className="h-[4px] shrink-0"
        style={{
          background:
            "linear-gradient(to right, #fabe00 2.64%, #6fba2c 31.25%, #0062b1 85.5%)",
        }}
      />
    </header>
  );
}

// ─────────────────────────────────────────────
// 側邊選單
// ─────────────────────────────────────────────
function SideMenu() {
  const groups = Array.from(new Set(sideMenuItems.map((i) => i.group)));

  return (
    <aside
      className="w-[240px] shrink-0 flex flex-col h-full"
      style={{
        backgroundColor: T.white,
        borderRight: `1px solid ${T.borderLow}`,
      }}
    >
      <div className="flex-1 flex flex-col px-3 py-5 overflow-y-auto gap-0">
        {groups.map((group, gi) => (
          <div key={group}>
            {/* 分隔線（第一組前不加） */}
            {gi > 0 && (
              <div
                className="my-2 mx-2"
                style={{ borderTop: `1px solid ${T.borderLow}` }}
              />
            )}
            {sideMenuItems
              .filter((item) => item.group === group)
              .map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-2 w-full h-[48px] px-2 rounded text-[16px] font-semibold text-left"
                  style={{
                    backgroundColor: item.active ? T.primary : "transparent",
                    color: item.active ? T.textWhite : T.textDefault,
                    fontFamily: "'PingFang TC', sans-serif",
                  }}
                >
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
          </div>
        ))}
      </div>

      {/* 收合按鈕 */}
      <div className="px-3 pb-5 pt-3 flex justify-end">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-[6px]"
          style={{ backgroundColor: T.bgLight, color: T.textMedium }}
        >
          <ChevronLeft size={16} />
        </button>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────
// 搜尋 & 篩選區
// ─────────────────────────────────────────────
function SearchFilterHeader() {
  return (
    <div
      className="shrink-0 flex flex-col"
      style={{ backgroundColor: T.bgLight }}
    >
      {/* 頁面標題列 */}
      <div
        className="flex items-center gap-4 px-4 pt-4 pb-4"
        style={{
          backgroundColor: T.white,
          borderBottom: `3px solid ${T.borderLow}`,
        }}
      >
        <h1
          className="flex-1 text-[20px] font-semibold"
          style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
        >
          所有客戶
        </h1>

        {/* CTA 按鈕群 */}
        <div className="flex gap-4 items-center">
          {/* Primary Button */}
          <button
            className="flex items-center justify-center px-3 h-[40px] rounded-[6px] text-[16px] font-semibold whitespace-nowrap"
            style={{
              backgroundColor: T.primary,
              color: T.textWhite,
              fontFamily: "'PingFang TC', sans-serif",
            }}
          >
            新增準客戶
          </button>

          {/* Secondary Button */}
          <button
            className="flex items-center justify-center px-3 h-[40px] rounded-[6px] text-[16px] font-semibold whitespace-nowrap"
            style={{
              backgroundColor: T.white,
              color: T.primary,
              border: `1px solid ${T.primary}`,
              fontFamily: "'PingFang TC', sans-serif",
            }}
          >
            輸出地址清單(僅客戶)
          </button>

          {/* Secondary Button */}
          <button
            className="flex items-center justify-center px-3 h-[40px] rounded-[6px] text-[16px] font-semibold whitespace-nowrap"
            style={{
              backgroundColor: T.white,
              color: T.primary,
              border: `1px solid ${T.primary}`,
              fontFamily: "'PingFang TC', sans-serif",
            }}
          >
            準客戶校正
          </button>
        </div>
      </div>

      {/* 搜尋 & 篩選 */}
      <div className="px-4 pt-4 pb-2 flex flex-col gap-4">
        {/* 關鍵字搜尋 */}
        <div className="flex flex-col gap-1">
          <label
            className="text-[16px] font-semibold"
            style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
          >
            關鍵字搜尋
          </label>
          <div
            className="flex items-center justify-between px-3 h-[40px] rounded-[8px]"
            style={{
              backgroundColor: T.white,
              border: `1px solid ${T.borderLow}`,
            }}
          >
            <input
              type="text"
              placeholder="搜尋客戶"
              className="flex-1 text-[16px] bg-transparent outline-none"
              style={{
                color: T.textMedium,
                fontFamily: "'PingFang TC', sans-serif",
              }}
            />
            <Search size={20} style={{ color: T.textMedium }} />
          </div>
        </div>

        {/* 篩選條件列 */}
        <div className="flex items-end gap-4 flex-wrap pb-2">
          {/* 下拉選單 × 3 */}
          {[
            { label: "保單重要訊息", value: "全部" },
            { label: "個人分級 (複選)", value: "全部" },
            { label: "生日月份(複選)", value: "全部" },
          ].map((sel) => (
            <div key={sel.label} className="flex flex-col gap-1 w-[200px]">
              <label
                className="text-[16px] font-semibold"
                style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
              >
                {sel.label}
              </label>
              <div
                className="flex items-center gap-2 px-3 h-[40px] rounded-[8px] cursor-pointer"
                style={{
                  backgroundColor: T.white,
                  border: `1px solid ${T.borderDefault}`,
                }}
              >
                <span
                  className="flex-1 text-[16px]"
                  style={{ color: T.textMedium, fontFamily: "'PingFang TC', sans-serif" }}
                >
                  {sel.value}
                </span>
                <ChevronDown size={20} style={{ color: T.textMedium }} />
              </div>
            </div>
          ))}

          {/* 所有篩選 Text Button */}
          <button
            className="flex items-center gap-1 px-2 py-1 rounded-[6px] h-[36px] text-[16px] font-semibold"
            style={{ color: T.primary, fontFamily: "'PingFang TC', sans-serif" }}
          >
            <SlidersHorizontal size={20} />
            所有篩選
          </button>

          {/* 重設 Text Button（disabled 樣態） */}
          <button
            className="flex items-center gap-1 px-2 py-1 rounded-[6px] h-[36px] text-[16px] font-semibold"
            style={{ color: T.textDisabled, fontFamily: "'PingFang TC', sans-serif" }}
            disabled
          >
            <X size={20} />
            重設
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Tag 元件（產 / 準）
// ─────────────────────────────────────────────
function CustomerTag({ type }: { type: string }) {
  const color = type === "產" ? T.tagProduct : T.tagProspect;
  return (
    <span
      className="inline-flex items-center justify-center px-1 text-[12px] font-semibold shrink-0"
      style={{
        backgroundColor: color,
        color: T.textWhite,
        fontFamily: "'PingFang TC', sans-serif",
        lineHeight: "18px",
      }}
    >
      {type}
    </span>
  );
}

// ─────────────────────────────────────────────
// 客戶表格
// ─────────────────────────────────────────────
function CustomerTable() {
  const [pinnedIds, setPinnedIds] = useState<number[]>([1]);

  const togglePin = (id: number) => {
    setPinnedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const thStyle: React.CSSProperties = {
    backgroundColor: T.bgTableHeader,
    borderBottom: `1px solid ${T.borderLow}`,
    padding: "8px 12px",
    fontFamily: "'PingFang TC', sans-serif",
    fontSize: "16px",
    fontWeight: 600,
    color: T.textDark,
    whiteSpace: "nowrap",
    textAlign: "left",
  };

  const tdStyle: React.CSSProperties = {
    padding: "8px 12px",
    height: "64px",
    fontFamily: "'PingFang TC', sans-serif",
    fontSize: "16px",
    color: T.textDefault,
    verticalAlign: "middle",
    borderBottom: `1px solid ${T.borderLow}`,
  };

  return (
    <div
      className="rounded-[8px] overflow-hidden"
      style={{
        border: `1px solid ${T.borderLow}`,
        backgroundColor: T.white,
      }}
    >
      {/* 卡片標題列 */}
      <div className="flex items-center gap-2 px-4 py-4">
        <span
          className="flex-1 text-[18px] font-semibold"
          style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
        >
          保單列表
        </span>
        <span
          className="text-[14px]"
          style={{ color: T.textMedium, fontFamily: "'PingFang TC', sans-serif" }}
        >
          共 {customers.length} 筆，包含您服務有效或停效保單的要/被保險人。
        </span>
      </div>

      {/* 表格（橫向捲動） */}
      <div
        className="overflow-x-auto"
        style={{ border: `1px solid ${T.borderLow}`, borderRadius: "8px" }}
      >
        <table className="w-full border-collapse" style={{ minWidth: "800px" }}>
          <thead>
            <tr>
              {/* 固定欄：Pin */}
              <th style={{ ...thStyle, width: "40px", textAlign: "center" }} />

              {/* 姓名 */}
              <th style={{ ...thStyle, width: "180px" }}>姓名</th>

              {/* 個人分級 */}
              <th style={{ ...thStyle, width: "112px" }}>
                <div className="flex items-center gap-1">
                  個人分級
                  <ChevronsUpDown size={16} style={{ color: T.textMedium }} />
                </div>
              </th>

              {/* 性別 */}
              <th style={{ ...thStyle, width: "90px" }}>性別</th>

              {/* 出生日期 */}
              <th style={{ ...thStyle, width: "112px" }}>
                <div className="flex items-center gap-1">
                  出生日期
                  <ChevronsUpDown size={16} style={{ color: T.textMedium }} />
                </div>
              </th>

              {/* 保險年齡 */}
              <th style={{ ...thStyle, width: "112px" }}>
                <div className="flex items-center gap-1">
                  保險年齡
                  <ChevronsUpDown size={16} style={{ color: T.textMedium }} />
                </div>
              </th>

              {/* 會員資格 */}
              <th style={{ ...thStyle }}>會員資格</th>

              {/* 操作 */}
              <th style={{ ...thStyle, width: "88px" }} />
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => {
              const isPinned = pinnedIds.includes(customer.id);
              const rowBg = idx % 2 === 0 ? T.white : T.bgLight;

              return (
                <tr key={customer.id} style={{ backgroundColor: rowBg }}>
                  {/* Pin 欄 */}
                  <td style={{ ...tdStyle, textAlign: "center", backgroundColor: rowBg }}>
                    <button
                      onClick={() => togglePin(customer.id)}
                      style={{ color: isPinned ? T.primary : T.textMedium }}
                    >
                      {isPinned ? <Pin size={16} fill={T.primary} /> : <PinOff size={16} />}
                    </button>
                  </td>

                  {/* 姓名 */}
                  <td style={{ ...tdStyle, backgroundColor: rowBg }}>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <CustomerTag type={customer.tagType} />
                        <span
                          className="font-medium whitespace-nowrap"
                          style={{ fontFamily: "'PingFang TC', sans-serif" }}
                        >
                          {customer.name}
                        </span>
                      </div>
                      {customer.subtitle && (
                        <span
                          className="text-[14px] truncate max-w-[160px]"
                          style={{ color: T.textMedium }}
                        >
                          {customer.subtitle}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* 個人分級 */}
                  <td style={{ ...tdStyle, backgroundColor: rowBg }}>
                    {customer.grade}
                  </td>

                  {/* 性別 */}
                  <td style={{ ...tdStyle, backgroundColor: rowBg }}>
                    {customer.gender}
                  </td>

                  {/* 出生日期 */}
                  <td style={{ ...tdStyle, backgroundColor: rowBg }}>
                    {customer.birthDate}
                  </td>

                  {/* 保險年齡 */}
                  <td style={{ ...tdStyle, backgroundColor: rowBg }}>
                    {customer.age}
                  </td>

                  {/* 會員資格 */}
                  <td style={{ ...tdStyle, backgroundColor: rowBg }}>
                    <div className="flex flex-col">
                      {customer.membership.map((m, i) => (
                        <span key={i}>{m}</span>
                      ))}
                    </div>
                  </td>

                  {/* 操作按鈕 */}
                  <td style={{ ...tdStyle, backgroundColor: rowBg, textAlign: "right" }}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="text-[16px] font-semibold"
                        style={{ color: T.primary, fontFamily: "'PingFang TC', sans-serif" }}
                      >
                        更多
                      </button>
                      <button style={{ color: T.primary }}>
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 頁面主體
// ─────────────────────────────────────────────
export default function CustomersPage() {
  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ fontFamily: "'PingFang TC', sans-serif" }}
    >
      {/* 頂部 Header */}
      <AppHeader />

      {/* 主體：側邊欄 + 主內容 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左側選單 */}
        <SideMenu />

        {/* 右側主內容 */}
        <div className="flex flex-col flex-1 overflow-hidden" style={{ backgroundColor: T.bgLight }}>
          {/* 搜尋 & 篩選 Header（固定） */}
          <SearchFilterHeader />

          {/* 可滾動內容區 */}
          <div className="flex-1 overflow-y-auto p-3">
            <CustomerTable />
          </div>
        </div>
      </div>
    </div>
  );
}
