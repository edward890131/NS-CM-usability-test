"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, ChevronLeft, Star } from "lucide-react";
import PremiumCalculatorModal from "./PremiumCalculatorModal";

// ── 設計 Token ──────────────────────────────────────────────
const T = {
  primary: "#006fbc",
  primaryDark: "#004f85",
  primaryLight: "#e8f2fa",
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
  tagProduct: "#004f85",
  tagProspect: "#00a069",
  positive: "#00a069",
  memberGold: "#b8892a",
};

// ── 頂部導覽 ────────────────────────────────────────────────
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

// ── 側邊選單 ────────────────────────────────────────────────
const sideMenuItems = [
  { label: "客戶管理摘要", group: 1 },
  { label: "客戶組成", group: 1 },
  { label: "所有客戶", group: 2, href: "/customers" },
  { label: "專案經營名單", group: 2 },
  { label: "我的自建組合", group: 2, href: "/portfolio" },
  { label: "近期接觸機會", group: 2 },
  { label: "所有保單", group: 3 },
  { label: "案件處理進度", group: 3 },
  { label: "保單重要事件", group: 3 },
  { label: "承接/指派保單", group: 3 },
  { label: "金融機構間資料共享", group: 4 },
];

// ── Mock 客戶資料 ───────────────────────────────────────────
const CUSTOMER = {
  name: "王南山",
  tagType: "產",
  id: "781234138",
  phone: "0912444052",
  agentCode: "7B-B1-C1",
  grade: "B",
  membership: "尊榮3星",
  currentPremium: 4900000,       // 試算用當前資格保費
  displayPremium: 4900000,       // 頁面顯示的累計資格保費
  acquisitionDate: "114/12/12",
  retirementMonth: "115/12",
  digitalServiceDone: 1,
};

// ── 各會員等級門檻（用於進度卡片文字） ─────────────────────
const NEXT_LEVEL_INFO = {
  name: "尊榮4星",
  threshold: 5000000,
};

// ═══════════════════════════════════════════════════════════
// AppHeader
// ═══════════════════════════════════════════════════════════
function AppHeader() {
  return (
    <header className="shrink-0 flex flex-col" style={{ backgroundColor: T.white, borderBottom: `1px solid ${T.borderLow}` }}>
      <div className="flex items-center h-[56px] pl-5 pr-1 py-2">
        <div className="flex items-center gap-2 shrink-0 mr-4">
          <Link href="/customers">
            <Image src="/logo.svg" alt="南山人壽" width={120} height={30} priority />
          </Link>
        </div>
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
        <button className="p-1 flex items-center justify-center" style={{ color: T.textMedium }}>
          <User size={24} />
        </button>
      </div>
      <div
        className="h-[4px] shrink-0"
        style={{ background: "linear-gradient(to right, #fabe00 2.64%, #6fba2c 31.25%, #0062b1 85.5%)" }}
      />
    </header>
  );
}

// ═══════════════════════════════════════════════════════════
// SideMenu
// ═══════════════════════════════════════════════════════════
function SideMenu() {
  const groups = Array.from(new Set(sideMenuItems.map((i) => i.group)));
  return (
    <aside
      className="w-[240px] shrink-0 flex flex-col h-full"
      style={{ backgroundColor: T.white, borderRight: `1px solid ${T.borderLow}` }}
    >
      <div className="flex-1 flex flex-col px-3 py-5 overflow-y-auto gap-0">
        {groups.map((group, gi) => (
          <div key={group}>
            {gi > 0 && <div className="my-2 mx-2" style={{ borderTop: `1px solid ${T.borderLow}` }} />}
            {sideMenuItems
              .filter((item) => item.group === group)
              .map((item) => {
                const inner = (
                  <span
                    className="flex items-center gap-2 w-full h-[48px] px-2 rounded text-[16px] font-semibold text-left"
                    style={{
                      backgroundColor: "transparent",
                      color: T.textDefault,
                      fontFamily: "'PingFang TC', sans-serif",
                    }}
                  >
                    <span className="truncate">{item.label}</span>
                  </span>
                );
                return item.href ? (
                  <Link key={item.label} href={item.href} style={{ display: "block" }}>{inner}</Link>
                ) : (
                  <button key={item.label} className="w-full">{inner}</button>
                );
              })}
          </div>
        ))}
      </div>
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

// ═══════════════════════════════════════════════════════════
// 頁面主體
// ═══════════════════════════════════════════════════════════
export default function CustomerDetailPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ fontFamily: "'PingFang TC', sans-serif" }}>
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <SideMenu />

        {/* 主內容 */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: T.bgLight }}>
          {/* 麵包屑 + 客戶標題列 */}
          <div
            className="shrink-0 px-5 pt-4 pb-0"
            style={{ backgroundColor: T.white, borderBottom: `1px solid ${T.borderLow}` }}
          >
            {/* 麵包屑 */}
            <div className="flex items-center gap-1 text-[13px] mb-3" style={{ color: T.textMedium }}>
              <Link href="/customers" className="hover:underline" style={{ color: T.primary }}>所有客戶</Link>
              <span>/</span>
              <span style={{ color: T.textDefault }}>{CUSTOMER.name}</span>
            </div>

            {/* 客戶基本資訊列 */}
            <div className="flex items-center gap-4 pb-3">
              {/* 名稱 + 標籤 */}
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center px-1.5 text-[12px] font-semibold"
                  style={{
                    backgroundColor: CUSTOMER.tagType === "產" ? T.tagProduct : T.tagProspect,
                    color: T.textWhite,
                    lineHeight: "20px",
                  }}
                >
                  {CUSTOMER.tagType}
                </span>
                <h1 className="text-[22px] font-bold" style={{ color: T.textDefault }}>
                  {CUSTOMER.name}
                </h1>
              </div>

              {/* 分隔 */}
              <div className="h-5" style={{ borderLeft: `1px solid ${T.borderDefault}` }} />

              {/* ID / 電話 / 業務代碼 */}
              {[
                { label: "客戶 ID", value: CUSTOMER.id },
                { label: "電話", value: CUSTOMER.phone },
                { label: "業務代碼", value: CUSTOMER.agentCode },
              ].map((info) => (
                <div key={info.label} className="flex items-center gap-1">
                  <span className="text-[13px]" style={{ color: T.textMedium }}>{info.label}</span>
                  <span className="text-[14px] font-semibold" style={{ color: T.textDefault }}>
                    {info.value}
                  </span>
                </div>
              ))}

              {/* 分隔 */}
              <div className="h-5" style={{ borderLeft: `1px solid ${T.borderDefault}` }} />

              {/* 會員資格 */}
              <div className="flex items-center gap-1">
                <Star size={14} fill={T.memberGold} style={{ color: T.memberGold }} />
                <span className="text-[14px] font-semibold" style={{ color: T.memberGold }}>
                  {CUSTOMER.membership}
                </span>
              </div>
            </div>

            {/* Tab 列 */}
            <div className="flex gap-0">
              {["累計進度", "服務權益", "歷史紀錄"].map((tab, i) => (
                <button
                  key={tab}
                  className="h-[40px] px-5 text-[15px] font-semibold"
                  style={{
                    color: i === 0 ? T.primary : T.textMedium,
                    borderBottom: i === 0 ? `3px solid ${T.primary}` : "3px solid transparent",
                    fontFamily: "'PingFang TC', sans-serif",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 可滾動內容區 */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-5">

            {/* ── 會員身份牌卡 + 累計進度 ── */}
            <div className="flex gap-5">

              {/* 左：會員牌卡 */}
              <div
                className="rounded-[8px] overflow-hidden flex flex-col"
                style={{
                  width: 280,
                  flexShrink: 0,
                  border: `1px solid ${T.borderLow}`,
                  backgroundColor: T.white,
                }}
              >
                {/* 牌卡深色區 */}
                <div
                  className="px-4 py-4 flex flex-col gap-2"
                  style={{
                    background: "linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 100%)",
                    minHeight: 100,
                  }}
                >
                  <div className="text-[13px] font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>
                    會員等級
                  </div>
                  <div className="text-[24px] font-bold" style={{ color: T.white }}>
                    {CUSTOMER.membership}
                  </div>
                </div>

                {/* 牌卡資訊區 */}
                <div className="px-4 py-4 flex flex-col gap-3 flex-1">
                  <InfoRow label="總資格保費" value={`TWD ${CUSTOMER.displayPremium.toLocaleString("zh-TW")}`} />
                  <InfoRow
                    label="數位服務指標"
                    value={`已完成 ${CUSTOMER.digitalServiceDone} 項`}
                    valueColor={T.positive}
                  />
                  <InfoRow label="會員資格取得日" value={CUSTOMER.acquisitionDate} />
                  <InfoRow label="預計脫退月" value={CUSTOMER.retirementMonth} />
                </div>

                {/* 查看服務權益 */}
                <button
                  className="mx-4 mb-4 h-[36px] rounded-[6px] text-[14px] font-semibold flex items-center justify-between px-3"
                  style={{ border: `1px solid ${T.borderDefault}`, color: T.textDefault }}
                >
                  查看服務權益剩餘次數
                  <ChevronLeft size={16} style={{ transform: "rotate(180deg)", color: T.textMedium }} />
                </button>
              </div>

              {/* 右：累計進度 */}
              <div className="flex-1 flex flex-col gap-4">

                {/* 升等進度牌卡 */}
                <div
                  className="rounded-[8px] px-5 py-4 flex flex-col gap-3"
                  style={{ border: `1px solid ${T.borderLow}`, backgroundColor: T.white }}
                >
                  {/* 標題 + 按鈕 */}
                  <div className="flex items-center justify-between">
                    <div className="text-[15px] font-semibold" style={{ color: T.textDefault }}>
                      升等進度{" "}
                      <span className="text-[13px] font-normal" style={{ color: T.textMedium }}>
                        (總資格保費)
                      </span>
                    </div>
                    <button
                      className="px-3 h-[34px] rounded-[6px] text-[14px] font-semibold"
                      style={{ backgroundColor: T.primary, color: T.white }}
                      onClick={() => setShowModal(true)}
                    >
                      資格保費試算
                    </button>
                  </div>

                  {/* 金額 */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-[13px]" style={{ color: T.textMedium }}>TWD</span>
                    <span className="text-[32px] font-bold" style={{ color: T.textDefault }}>
                      {CUSTOMER.displayPremium.toLocaleString("zh-TW")}
                    </span>
                    <button className="text-[14px] font-semibold" style={{ color: T.primary }}>
                      明細
                    </button>
                  </div>

                  {/* 缺口提示 */}
                  <div
                    className="px-4 py-2 rounded-[6px] flex items-center justify-between"
                    style={{ backgroundColor: T.primaryLight }}
                  >
                    <span className="text-[14px]" style={{ color: T.textDefault }}>
                      差{" "}
                      <strong style={{ color: T.primary }}>
                        ${(NEXT_LEVEL_INFO.threshold - CUSTOMER.displayPremium).toLocaleString("zh-TW")}
                      </strong>{" "}
                      升等 {NEXT_LEVEL_INFO.name}
                    </span>
                    <button className="text-[14px] font-semibold" style={{ color: T.primary }}>
                      會員權益 &gt;
                    </button>
                  </div>
                </div>

                {/* 感恩禮進度牌卡（簡化版） */}
                <div
                  className="rounded-[8px] px-5 py-4 flex flex-col gap-3"
                  style={{ border: `1px solid ${T.borderLow}`, backgroundColor: T.white }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[15px] font-semibold" style={{ color: T.textDefault }}>
                      感恩禮進度{" "}
                      <span className="text-[13px] font-normal" style={{ color: T.textMedium }}>
                        (感恩期新約資格保費)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[13px]" style={{ color: T.textMedium }}>TWD</span>
                    <span className="text-[32px] font-bold" style={{ color: T.textDefault }}>800,000</span>
                    <button className="text-[14px] font-semibold" style={{ color: T.primary }}>
                      明細
                    </button>
                  </div>
                  <div
                    className="px-4 py-2 rounded-[6px] flex items-center justify-between"
                    style={{ backgroundColor: "#e6f7f1" }}
                  >
                    <span className="text-[14px]" style={{ color: T.textDefault }}>
                      差{" "}
                      <strong style={{ color: T.positive }}>$750,000</strong>{" "}
                      達標級距 2，可獲得「嚴選好禮*1」
                    </span>
                    <button className="text-[14px] font-semibold" style={{ color: T.positive }}>
                      瞭解更多 &gt;
                    </button>
                  </div>
                  <div className="text-right text-[12px]" style={{ color: T.textMedium }}>
                    計算起始日：115/12/12 ｜ 截止日：下次升等/脫退時
                  </div>
                </div>

              </div>
            </div>

            {/* ── 服務項目 ── */}
            <SectionTable
              title="服務項目"
              columns={["服務項目", "狀態", "生效日", "截止日"]}
              rows={[
                ["貴賓服務專線", "新戶", "114/12/12", "115/12/31"],
                ["機場接送", "新戶上月", "114/12/12", "115/12/31"],
                ["機場貴賓室", "新戶上月", "114/12/12", "115/12/31"],
                ["核保綠色通關", "新戶上月", "114/12/12", "115/12/31"],
              ]}
            />

            {/* ── 歷史紀錄 ── */}
            <SectionTable
              title="歷史紀錄"
              subtitle="資格保費歷史紀錄"
              columns={["保單號碼", "商品名稱", "狀態", "年期", "資格保費", "累計資格保費", "生效日"]}
              rows={[
                ["12531011", "精選好利", "有效", "10年", "300,000", "4,900,000", "123/11/01"],
                ["12531021", "精選傑出", "有效", "10年", "300,000", "4,600,000", "123/5/02"],
                ["12531031", "精選好利", "有效", "6年", "210,000", "4,300,000", "122/8/02"],
                ["12531041", "精選傑出", "有效", "6年", "210,000", "4,090,000", "122/3/02"],
                ["12531051", "精選好利", "有效", "3年", "90,000", "3,880,000", "121/11/01"],
              ]}
            />

          </div>
        </div>
      </div>

      {/* 資格保費試算彈窗 */}
      {showModal && (
        <PremiumCalculatorModal
          onClose={() => setShowModal(false)}
          currentPremium={CUSTOMER.currentPremium}
        />
      )}
    </div>
  );
}

// ── 小型輔助元件 ────────────────────────────────────────────
function InfoRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px]" style={{ color: T.textMedium }}>{label}</span>
      <span className="text-[14px] font-semibold" style={{ color: valueColor ?? T.textDefault }}>
        {value}
      </span>
    </div>
  );
}

function SectionTable({
  title,
  subtitle,
  columns,
  rows,
}: {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <div
      className="rounded-[8px] overflow-hidden"
      style={{ border: `1px solid ${T.borderLow}`, backgroundColor: T.white }}
    >
      <div className="px-5 py-4 flex items-center gap-2">
        <span className="text-[16px] font-semibold" style={{ color: T.textDefault }}>{title}</span>
        {subtitle && (
          <span className="text-[13px]" style={{ color: T.textMedium }}>{subtitle}</span>
        )}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr style={{ backgroundColor: T.bgTableHeader }}>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left font-semibold whitespace-nowrap"
                  style={{ color: T.textDark, borderBottom: `1px solid ${T.borderLow}` }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                style={{
                  backgroundColor: ri % 2 === 0 ? T.white : T.bgLight,
                  borderBottom: `1px solid ${T.borderLow}`,
                }}
              >
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2 whitespace-nowrap" style={{ color: T.textDefault }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
