"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User, ChevronLeft, Plus, MoreHorizontal, Info,
  LayoutDashboard, Bookmark, Users, UserCheck, Briefcase,
  Clock, FileText, Wrench, Bell, Settings, Building2, ChevronDown,
  type LucideIcon,
} from "lucide-react";
import PremiumCalculatorModal from "./PremiumCalculatorModal";

// ── 設計 Token ──────────────────────────────────────────────
const T = {
  primary: "#006fbc",
  primaryDark: "#004f85",
  primaryLight: "rgba(0,111,188,0.1)",
  white: "#ffffff",
  bgLight: "#f6f6f6",
  bgPaleGrey: "#fafafa",
  bgTableHeader: "#f2f6f9",
  textDefault: "#3c3c3c",
  textMedium: "#696969",
  textLow: "#8d8d8d",
  textDark: "#555555",
  textWhite: "#ffffff",
  borderLow: "#eeeeee",
  borderDefault: "#cacaca",
  positive: "#00a069",
  positiveDark: "#148056",
  positiveLight: "rgba(0,160,105,0.1)",
  highlight: "#0099e0",
};

// ── Side Menu icon map ─────────────────────────────────────
const SIDE_ICONS: Record<string, LucideIcon> = {
  "客戶管理摘要": LayoutDashboard,
  "客戶組成":     Bookmark,
  "所有客戶":     Users,
  "專案經營名單": UserCheck,
  "我的自建組合": Briefcase,
  "近期接觸機會": Clock,
  "所有保單":     FileText,
  "案件處理進度": Wrench,
  "保單重要事件": Bell,
  "承接/指派保單": Settings,
  "金融機構間資料共享": Building2,
};

// 在客戶詳細頁，「所有客戶」為 active
const SIDE_ACTIVE = "所有客戶";

// ── Drawer Bar 圖片資源（Figma assets，7 天後需更換為本地 SVG） ──
const DRAWER_ASSETS = {
  zhaoHui:      "https://www.figma.com/api/mcp/asset/02f35120-8bde-40db-80de-51ae06e2b3e9",
  zhaoHuiInner: "https://www.figma.com/api/mcp/asset/6ee40c8e-2262-4747-9cb8-75a8ba335497",
  bell:         "https://www.figma.com/api/mcp/asset/87a8ac1d-dc1a-4cda-9923-7e43985535bc",
  calendar:     "https://www.figma.com/api/mcp/asset/2ea7e90b-88d1-4ed9-a3c5-b73d5068f355",
  sales:        "https://www.figma.com/api/mcp/asset/55f3a89e-7ee0-4a43-8b3f-b866d4aeeb0d",
  detail:       "https://www.figma.com/api/mcp/asset/2d971fa7-6daa-4a7c-921b-b49c86ccf36a",
  toSign:       "https://www.figma.com/api/mcp/asset/86051ad2-83fd-4e60-bab5-ef7d064a2f00",
  question:     "https://www.figma.com/api/mcp/asset/fc7412e5-62df-4227-86ce-691de1625a01",
  schedule:     "https://www.figma.com/api/mcp/asset/2ea7e90b-88d1-4ed9-a3c5-b73d5068f355",
  apps:         "https://www.figma.com/api/mcp/asset/892cb249-39bd-4ac4-a27f-1d355528dc6a",
  move:         "https://www.figma.com/api/mcp/asset/81e0753b-3cfa-4acd-bb01-e172776074c8",
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
  name: "陳雅雲",
  tags: [
    { label: "安", color: "#00a069" },
    { label: "加費", color: "#696969" },
  ],
  subtitle: "女性・保險年齡 34 歲",
  grade: "A級",
  familyMembers: "2人",
  birthday: "81/05/28",
  wealthLevel: "R1、C1",
  phone: "0934567890",
  vipQualification: "尊榮3星",
  vipQualification2: "白金VIP",
  membership: "尊榮3星",
  totalPremium: 4990000,
  digitalServiceDone: 1,
  acquisitionDate: "114/12/12",
  retirementMonth: "115/12",
  upgradePremium: 4990000,
  gratitudePremium: 800000,
};

// ── 頁籤 ────────────────────────────────────────────────────
const TABS = [
  "客戶全景",
  "個人及家庭資訊",
  "會員資格",
  "保單及保障",
  "互動及服務紀錄",
  "借還款",
  "外溢服務和資源",
];

// ── 升等進度設定（4星門檻 500 萬） ─────────────────────────
const UPGRADE_MAX = 5000000;
const UPGRADE_MILESTONES = [
  { label: "1星(50萬)", value: 500000 },
  { label: "2星(150萬)", value: 1500000 },
  { label: "3星(300萬)", value: 3000000 },
  { label: "4星(500萬)", value: 5000000 }, // 最右端
];

// ── 感恩禮進度設定（級距5 375 萬） ─────────────────────────
const GRATITUDE_MAX = 3750000;
const GRATITUDE_MILESTONES = [
  { label: "級距1(75萬)", value: 750000 },
  { label: "級距2(150萬)", value: 1500000 },
  { label: "級距3(225萬)", value: 2250000 },
  { label: "級距4(300萬)", value: 3000000 },
  { label: "級距5(375萬)", value: 3750000 }, // 最右端
];

// ── 取得最後已達成的里程碑 ─────────────────────────────────
function getActiveMilestoneValue(
  current: number,
  milestones: { label: string; value: number }[]
) {
  const passed = milestones.filter((ms) => ms.value <= current);
  return passed.length > 0 ? passed[passed.length - 1].value : null;
}

// ═══════════════════════════════════════════════════════════
// AppHeader
// ═══════════════════════════════════════════════════════════
function AppHeader() {
  return (
    <header
      className="shrink-0 flex flex-col"
      style={{ backgroundColor: T.white, borderBottom: `1px solid ${T.borderLow}` }}
    >
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
              className="flex items-center justify-center h-full w-[87px] text-[16px] font-semibold shrink-0"
              style={{
                color: link.active ? T.primary : T.textDefault,
                fontFamily: "'PingFang TC', sans-serif",
                borderBottom: link.active
                  ? `4px solid ${T.primary}`
                  : "4px solid transparent",
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <button
          className="p-1 flex items-center justify-center"
          style={{ color: T.textMedium }}
        >
          <User size={24} />
        </button>
      </div>
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

// ═══════════════════════════════════════════════════════════
// SideMenu（含 icon、active 狀態）
// ═══════════════════════════════════════════════════════════
function SideMenu() {
  const groups = Array.from(new Set(sideMenuItems.map((i) => i.group)));
  return (
    <aside
      className="w-[240px] shrink-0 flex flex-col h-full"
      style={{ backgroundColor: T.white, borderRight: `1px solid ${T.borderLow}` }}
    >
      <div className="flex-1 flex flex-col px-3 py-5 overflow-y-auto">
        {groups.map((group, gi) => (
          <div key={group}>
            {gi > 0 && (
              <div
                className="my-2 mx-2"
                style={{ borderTop: `1px solid ${T.borderLow}` }}
              />
            )}
            {sideMenuItems
              .filter((item) => item.group === group)
              .map((item) => {
                const isActive = item.label === SIDE_ACTIVE;
                const IconComp = SIDE_ICONS[item.label];
                const hasArrow = item.label === "承接/指派保單";

                const inner = (
                  <span
                    className="flex items-center gap-2 w-full h-[48px] px-2 rounded-[4px] text-[16px] font-semibold"
                    style={{
                      backgroundColor: isActive ? T.primary : "transparent",
                      color: isActive ? T.white : T.textDefault,
                      fontFamily: "'PingFang TC', sans-serif",
                    }}
                  >
                    {/* Icon */}
                    {IconComp && (
                      <IconComp
                        size={20}
                        style={{ color: isActive ? T.white : T.textDefault, flexShrink: 0 }}
                      />
                    )}
                    {/* 文字 */}
                    <span className="flex-1 truncate text-left">{item.label}</span>
                    {/* 展開箭頭（僅承接/指派保單） */}
                    {hasArrow && (
                      <ChevronDown
                        size={16}
                        style={{ color: isActive ? T.white : T.textMedium, flexShrink: 0 }}
                      />
                    )}
                  </span>
                );

                return item.href ? (
                  <Link key={item.label} href={item.href} style={{ display: "block" }}>
                    {inner}
                  </Link>
                ) : (
                  <button key={item.label} className="w-full">
                    {inner}
                  </button>
                );
              })}
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

// ═══════════════════════════════════════════════════════════
// DrawerBar（右側固定操作欄）
// ═══════════════════════════════════════════════════════════
function DrawerBar() {
  const icons = [
    { src: DRAWER_ASSETS.bell,     alt: "通知" },
    { src: DRAWER_ASSETS.calendar, alt: "日曆" },
    { src: DRAWER_ASSETS.sales,    alt: "人員" },
    { src: DRAWER_ASSETS.detail,   alt: "文件" },
    { src: DRAWER_ASSETS.toSign,   alt: "簽署" },
    { src: DRAWER_ASSETS.question, alt: "問題" },
    { src: DRAWER_ASSETS.schedule, alt: "排程" },
    { src: DRAWER_ASSETS.apps,     alt: "應用" },
  ];

  return (
    <aside
      className="shrink-0 flex flex-col h-full"
      style={{ width: 56, backgroundColor: T.white, borderLeft: `1px solid ${T.borderLow}`, paddingTop: 20 }}
    >
      {/* 照會（含紅色角標） */}
      <button
        className="flex items-center justify-center shrink-0"
        style={{ height: 48, width: 56 }}
      >
        <div style={{ position: "relative", width: 22, height: 22 }}>
          {/* 底層圖示 */}
          <img
            src={DRAWER_ASSETS.zhaoHui}
            alt="照會"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
          {/* 內層圖示 */}
          <div style={{ position: "absolute", inset: "12.5% 11.88% 11.59% 10.42%" }}>
            <img src={DRAWER_ASSETS.zhaoHuiInner} alt="" style={{ width: "100%", height: "100%" }} />
          </div>
          {/* 紅色角標 */}
          <div
            style={{
              position: "absolute", top: -2, right: -2,
              width: 7, height: 7, borderRadius: "50%",
              backgroundColor: "#e53e3e",
              border: `1.5px solid ${T.white}`,
            }}
          />
        </div>
      </button>

      {/* 其他 icon 按鈕 */}
      {icons.map(({ src, alt }) => (
        <button
          key={alt}
          className="flex items-center justify-center shrink-0"
          style={{ height: 48, width: 56 }}
        >
          <img src={src} alt={alt} style={{ width: 24, height: 24 }} />
        </button>
      ))}

      {/* spacer */}
      <div className="flex-1" />

      {/* 底部移動圖示 */}
      <button
        className="flex items-center justify-center shrink-0"
        style={{ height: 56, width: 56 }}
      >
        <img src={DRAWER_ASSETS.move} alt="移動" style={{ width: 21, height: 21 }} />
      </button>
    </aside>
  );
}

// ═══════════════════════════════════════════════════════════
// 區塊一：客戶個人摘要（含背景圖與 Tab）
// ═══════════════════════════════════════════════════════════
function CustomerSummaryHeader({
  activeTab,
  onTabChange,
  scrolled,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  scrolled: boolean;
}) {
  return (
    <div
      className="shrink-0"
      style={{ backgroundColor: T.white, borderBottom: `1px solid ${T.borderLow}` }}
    >
      {/* 背景圖區域：overflow hidden 控制高度收合 */}
      <div
        className="relative"
        style={{
          overflowX: "hidden",
          // 背景圖隨捲動淡出
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.83) 85%, #fff 100%), url('/Customer_L.png')",
          backgroundPosition: "0 0, center top",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "100% 100%, auto 280px",
          opacity: scrolled ? 0.999 : 1, // 觸發 GPU layer，讓子元素的 opacity 獨立運作
        }}
      >
        {/* 背景圖淡出蓋層 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: T.white,
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* 可互動內容 */}
        <div className="relative px-4 pt-3 flex flex-col gap-2" style={{ zIndex: 2 }}>
          {/* Row 1：返回 + 姓名 + (收合時顯示 tags) + CTA */}
          <div className="flex items-center gap-3" style={{ paddingBottom: scrolled ? 12 : 0, transition: "padding-bottom 0.3s ease" }}>
            <Link href="/customers" className="shrink-0">
              <ChevronLeft size={24} style={{ color: T.textDefault }} />
            </Link>
            <h1
              className="text-[20px] font-semibold"
              style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
            >
              {CUSTOMER.name}
            </h1>

            {/* 收合時：tags 從姓名右側滑入 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                overflow: "hidden",
                maxWidth: scrolled ? 200 : 0,
                opacity: scrolled ? 1 : 0,
                transition: "max-width 0.35s ease, opacity 0.3s ease",
                flexShrink: 0,
              }}
            >
              {CUSTOMER.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="px-2 text-[14px] font-bold shrink-0"
                  style={{
                    backgroundColor: tag.color,
                    color: T.white,
                    lineHeight: "20px",
                    fontFamily: "'Noto Sans TC', sans-serif",
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* spacer */}
            <div className="flex-1" />

            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-1 h-[36px] px-3 rounded-[4px] text-[16px] font-semibold shrink-0"
                style={{
                  backgroundColor: T.primary,
                  color: T.white,
                  fontFamily: "'PingFang TC', sans-serif",
                }}
              >
                <Plus size={16} />
                建議書
              </button>
              <button
                className="flex items-center gap-1 h-[36px] px-3 rounded-[4px] text-[16px] font-semibold shrink-0"
                style={{
                  border: `1px solid ${T.primary}`,
                  color: T.primary,
                  backgroundColor: T.white,
                  fontFamily: "'PingFang TC', sans-serif",
                }}
              >
                <Plus size={16} />
                聯繫提醒
              </button>
              <button
                className="flex items-center gap-1 h-[36px] px-3 rounded-[4px] text-[16px] font-semibold shrink-0"
                style={{
                  border: `1px solid ${T.primary}`,
                  color: T.primary,
                  backgroundColor: T.white,
                  fontFamily: "'PingFang TC', sans-serif",
                }}
              >
                更多
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* 可收合區域：Row 2 (tags+副標) + Row 3 (資訊卡) */}
          <div
            style={{
              overflow: "hidden",
              maxHeight: scrolled ? 0 : 400,
              opacity: scrolled ? 0 : 1,
              transition: "max-height 0.35s ease, opacity 0.25s ease",
            }}
          >
            {/* Row 2：標籤 + 副標 */}
            <div className="flex items-center flex-wrap gap-2 px-3">
              {CUSTOMER.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="px-2 text-[14px] font-bold shrink-0"
                  style={{
                    backgroundColor: tag.color,
                    color: T.white,
                    lineHeight: "20px",
                    fontFamily: "'Noto Sans TC', sans-serif",
                  }}
                >
                  {tag.label}
                </span>
              ))}
              <span
                className="text-[16px]"
                style={{
                  color: T.textDefault,
                  opacity: 0.8,
                  fontFamily: "'PingFang TC', sans-serif",
                }}
              >
                {CUSTOMER.subtitle}
              </span>
            </div>

            {/* Row 3：資訊卡 */}
            <div
              className="mx-3 rounded-[4px] px-3 py-4 mt-2 mb-4"
              style={{
                backgroundColor: T.white,
                border: `1px solid ${T.borderLow}`,
                boxShadow: "0px 2px 4px 0px rgba(59,66,70,0.08)",
              }}
            >
              <div className="flex">
                {/* Col 1 */}
                <div className="flex flex-col gap-4 flex-1 px-3">
                  <DataRow label="個人分級" value={CUSTOMER.grade} />
                  <DataRow
                    label="家庭成員"
                    value={CUSTOMER.familyMembers}
                    valueColor={T.primary}
                  />
                </div>
                {/* 分隔線 */}
                <div
                  className="self-stretch"
                  style={{ width: 1, backgroundColor: T.borderLow }}
                />
                {/* Col 2 */}
                <div className="flex flex-col gap-4 flex-1 px-3">
                  <DataRow label="生日" value={CUSTOMER.birthday} />
                  <DataRow label="財富活躍等級" value={CUSTOMER.wealthLevel} />
                </div>
                {/* 分隔線 */}
                <div
                  className="self-stretch"
                  style={{ width: 1, backgroundColor: T.borderLow }}
                />
                {/* Col 3 */}
                <div className="flex flex-col gap-4 flex-1 px-3">
                  <DataRow label="聯絡電話" value={CUSTOMER.phone} />
                  {/* VIP 資格：尊榮3星（藍）、白金VIP（黑） */}
                  <div className="flex items-start gap-2">
                    <span
                      className="text-[16px] shrink-0"
                      style={{
                        color: T.textDefault,
                        opacity: 0.8,
                        fontFamily: "'PingFang TC', sans-serif",
                        minWidth: 100,
                      }}
                    >
                      VIP 資格
                    </span>
                    <span
                      className="text-[16px] font-semibold"
                      style={{ fontFamily: "'PingFang TC', sans-serif" }}
                    >
                      <span style={{ color: T.primary }}>{CUSTOMER.vipQualification}</span>
                      <span style={{ color: T.textDefault }}>、</span>
                      <span style={{ color: T.textDefault }}>{CUSTOMER.vipQualification2}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab 列 */}
      <div
        className="flex overflow-x-auto"
        style={{ borderTop: `1px solid ${T.borderLow}` }}
      >
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className="h-[40px] px-5 text-[16px] font-semibold whitespace-nowrap shrink-0"
              style={{
                color: isActive ? T.primary : T.textMedium,
                borderBottom: isActive
                  ? `3px solid ${T.primary}`
                  : "3px solid transparent",
                fontFamily: "'PingFang TC', sans-serif",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 區塊二：會員等級牌卡
// ═══════════════════════════════════════════════════════════
function LevelMedalCard() {
  return (
    <div
      className="rounded-[8px] overflow-hidden"
      style={{
        backgroundColor: T.white,
        boxShadow: "0px 2px 4px 0px rgba(59,66,70,0.08)",
      }}
    >
      {/* 外層 px-4，整體 py-4，子元素 gap-4 */}
      <div className="px-4 py-4 flex flex-col gap-4">

        {/* 左右排列：牌卡圖 + 垂直分隔 + 資料欄 */}
        <div className="flex items-center px-6 py-5">
          {/* LevelCard.png：陰影直接加在圖片容器 */}
          <div
            className="rounded-[8px] overflow-hidden shrink-0"
            style={{
              width: 180,
              height: 100,
              boxShadow:
                "0px 7px 9px -2px rgba(0,0,0,0.1), 0px 3px 4px -2px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="/LevelCard.png"
              alt="會員等級牌卡"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* 垂直分隔線（兩側各 40px 留白） */}
          <div
            className="self-stretch mx-10 shrink-0"
            style={{ width: 1, backgroundColor: T.borderLow }}
          />

          {/* 右側資料 */}
          <div className="flex-1 flex flex-col gap-4">
            <DataRow
              label="總資格保費"
              value={`TWD ${CUSTOMER.totalPremium.toLocaleString("zh-TW")}`}
              valueColor={T.primary}
            />
            <DataRow
              label="數位服務指標"
              value={`已完成 ${CUSTOMER.digitalServiceDone} 項`}
            />
            <div
              className="text-[16px]"
              style={{
                color: T.textMedium,
                fontFamily: "'PingFang TC', sans-serif",
                opacity: 0.6,
              }}
            >
              會員資格取得日{" "}
              <span style={{ color: T.textDefault, opacity: 1 }}>
                {CUSTOMER.acquisitionDate}
              </span>
              ·預計脫退月{" "}
              <span style={{ color: T.textDefault, opacity: 1 }}>
                {CUSTOMER.retirementMonth}
              </span>
            </div>
          </div>
        </div>

        {/* 查看服務權益剩餘次數（在牌卡與資料兩者下方） */}
        <div
          className="flex items-center justify-between px-3 py-2 rounded-[6px]"
          style={{ backgroundColor: T.bgLight }}
        >
          <span
            className="text-[14px] font-semibold"
            style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
          >
            查看服務權益剩餘次數
          </span>
          <ChevronLeft
            size={16}
            style={{ color: T.textMedium, transform: "rotate(180deg)" }}
          />
        </div>

      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 進度條元件（含里程碑標記 + 載入動畫）
// ═══════════════════════════════════════════════════════════
function ProgressBarWithMilestones({
  current,
  max,
  milestones,
  color,
}: {
  current: number;
  max: number;
  milestones: { label: string; value: number }[];
  color: string;
}) {
  const [animWidth, setAnimWidth] = useState(0);
  const targetPct = Math.min((current / max) * 100, 100);
  const activeMilestoneValue = getActiveMilestoneValue(current, milestones);

  // 載入後由 0 跑到當前數值
  useEffect(() => {
    const t = setTimeout(() => setAnimWidth(targetPct), 150);
    return () => clearTimeout(t);
  }, [targetPct]);

  return (
    <div className="relative" style={{ height: 48 }}>
      {/* 進度條底座 */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden"
        style={{ height: 12, borderRadius: 100, backgroundColor: T.borderLow }}
      >
        {/* 填充動畫 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${animWidth}%`,
            backgroundColor: color,
            borderRadius: 100,
            transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      {/* 里程碑標記（文字 + 刻度線） */}
      {milestones.map((ms, idx) => {
        const isLast = idx === milestones.length - 1;
        const pct = (ms.value / max) * 100;
        const isActive = ms.value === activeMilestoneValue;

        return (
          <div
            key={ms.label}
            className="absolute flex flex-col"
            style={{
              bottom: 12, // 緊貼進度條上方
              ...(isLast
                ? { right: 0, alignItems: "flex-end" }
                : {
                    left: `${pct}%`,
                    transform: "translateX(-50%)",
                    alignItems: "center",
                  }),
            }}
          >
            {/* 標籤文字 */}
            <span
              style={{
                fontSize: 13,
                lineHeight: "20px",
                color: T.textDefault,
                fontWeight: isActive ? 600 : 400,
                opacity: isLast ? 0.6 : 0.8,
                whiteSpace: "nowrap",
                fontFamily: "'PingFang TC', sans-serif",
              }}
            >
              {ms.label}
            </span>
            {/* 刻度線 */}
            <div
              style={{
                width: 1,
                height: 12,
                backgroundColor: isActive ? T.textDefault : T.borderDefault,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 區塊三：累計進度牌卡
// ═══════════════════════════════════════════════════════════
function ProgressCard({ onCalculate }: { onCalculate: () => void }) {
  const upgradeGap = UPGRADE_MAX - CUSTOMER.upgradePremium;

  return (
    <div
      className="rounded-[8px]"
      style={{
        backgroundColor: T.white,
        boxShadow: "0px 2px 4px 0px rgba(59,66,70,0.08)",
      }}
    >
      {/* 標題列 */}
      <div className="px-4 pt-4 flex items-center gap-2">
        <div
          className="flex items-center justify-center rounded-[4px] shrink-0"
          style={{ width: 28, height: 28, backgroundColor: "rgba(84,159,210,0.16)" }}
        >
          <span
            className="text-[14px] font-semibold"
            style={{ color: T.primary, fontFamily: "'PingFang TC', sans-serif" }}
          >
            $
          </span>
        </div>
        <span
          className="text-[18px] font-semibold"
          style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
        >
          累計進度
        </span>
      </div>
      <div className="mx-4 mt-4" style={{ height: 1, backgroundColor: T.borderLow }} />

      <div className="px-4 py-4 flex flex-col gap-0">
        {/* ── 升等進度 ── */}
        <div className="flex flex-col gap-4 relative">
          {/* 資格保費試算按鈕（右上角） */}
          <button
            className="absolute right-0 top-0 h-[32px] px-3 rounded-[6px] text-[14px] font-semibold"
            style={{
              backgroundColor: T.primary,
              color: T.white,
              fontFamily: "'PingFang TC', sans-serif",
            }}
            onClick={onCalculate}
          >
            資格保費試算
          </button>

          {/* 標題 */}
          <div className="flex items-center gap-2">
            <span
              className="text-[16px] font-semibold"
              style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
            >
              升等進度
            </span>
            <span
              className="text-[14px]"
              style={{ color: T.textLow, fontFamily: "'PingFang TC', sans-serif" }}
            >
              (總資格保費)
            </span>
          </div>

          {/* 金額 */}
          <div className="flex items-baseline gap-2">
            <span
              className="text-[18px] font-semibold"
              style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
            >
              TWD
            </span>
            <span
              className="text-[32px] font-semibold"
              style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
            >
              {CUSTOMER.upgradePremium.toLocaleString("zh-TW")}
            </span>
            <button
              className="text-[14px] font-semibold px-2 py-1 rounded-[6px]"
              style={{ color: T.primary, fontFamily: "'PingFang TC', sans-serif" }}
            >
              明細
            </button>
          </div>

          {/* 進度條 */}
          <ProgressBarWithMilestones
            current={CUSTOMER.upgradePremium}
            max={UPGRADE_MAX}
            milestones={UPGRADE_MILESTONES}
            color={T.highlight}
          />

          {/* 缺口提示 */}
          <div
            className="flex items-center justify-between px-4 py-2 rounded-[8px]"
            style={{ backgroundColor: T.primaryLight }}
          >
            <span
              className="text-[14px] font-semibold"
              style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
            >
              差{" "}
              <span style={{ color: T.primary }}>
                ${upgradeGap.toLocaleString("zh-TW")}
              </span>{" "}
              升等4星
            </span>
            <button
              className="flex items-center gap-1 text-[14px] font-semibold px-2 py-1 rounded-[6px]"
              style={{ color: T.primary, fontFamily: "'PingFang TC', sans-serif" }}
            >
              會員權益
              <ChevronLeft size={14} style={{ transform: "rotate(180deg)" }} />
            </button>
          </div>
        </div>

        {/* 分隔線 */}
        <div className="my-4" style={{ height: 1, backgroundColor: T.borderLow }} />

        {/* ── 感恩禮進度 ── */}
        <div className="flex flex-col gap-4">
          {/* 標題 */}
          <div className="flex items-center gap-2">
            <span
              className="text-[16px] font-semibold"
              style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
            >
              感恩禮進度
            </span>
            <span
              className="text-[14px]"
              style={{ color: T.textLow, fontFamily: "'PingFang TC', sans-serif" }}
            >
              (感恩期新約資格保費)
            </span>
          </div>

          {/* 金額 */}
          <div className="flex items-baseline gap-2">
            <span
              className="text-[18px] font-semibold"
              style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
            >
              TWD
            </span>
            <span
              className="text-[32px] font-semibold"
              style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
            >
              {CUSTOMER.gratitudePremium.toLocaleString("zh-TW")}
            </span>
            <button
              className="text-[14px] font-semibold px-2 py-1 rounded-[6px]"
              style={{ color: T.primary, fontFamily: "'PingFang TC', sans-serif" }}
            >
              明細
            </button>
          </div>

          {/* 進度條 */}
          <ProgressBarWithMilestones
            current={CUSTOMER.gratitudePremium}
            max={GRATITUDE_MAX}
            milestones={GRATITUDE_MILESTONES}
            color={T.positive}
          />

          {/* 缺口提示 */}
          <div
            className="flex items-center justify-between px-4 py-2 rounded-[8px]"
            style={{ backgroundColor: T.positiveLight }}
          >
            <span
              className="text-[14px] font-semibold"
              style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
            >
              差{" "}
              <span style={{ color: T.positiveDark }}>$750,000</span>{" "}
              達標級距2，可獲得「嚴選好禮*1」
            </span>
            <button
              className="flex items-center gap-1 text-[14px] font-semibold px-2 py-1 rounded-[6px]"
              style={{ color: T.positiveDark, fontFamily: "'PingFang TC', sans-serif" }}
            >
              瞭解更多
              <ChevronLeft size={14} style={{ transform: "rotate(180deg)" }} />
            </button>
          </div>

          {/* 日期備註 */}
          <div
            className="text-right text-[14px] font-semibold"
            style={{
              color: T.textMedium,
              opacity: 0.6,
              fontFamily: "'PingFang TC', sans-serif",
            }}
          >
            計算起始日：115/12/12 ｜ 截止日：下次升等/脫退時
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 頁面主體
// ═══════════════════════════════════════════════════════════
export default function CustomerDetailPage() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("會員資格");
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 監聽滾動，超過 40px 時觸發 header 收合
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => setScrolled(el.scrollTop > 40);
    el.addEventListener("scroll", handler, { passive: true });
    return () => el.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{ fontFamily: "'PingFang TC', sans-serif" }}
    >
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <SideMenu />

        <div
          className="flex-1 flex flex-col overflow-hidden"
          style={{ backgroundColor: T.bgLight }}
        >

          <CustomerSummaryHeader activeTab={activeTab} onTabChange={setActiveTab} scrolled={scrolled} />

          {/* 可滾動內容區 */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-4">
            <LevelMedalCard />
            <ProgressCard onCalculate={() => setShowModal(true)} />

            <ServiceBenefitsSection />

            <HistorySection />
          </div>
        </div>

        <DrawerBar />
      </div>

      {/* 資格保費試算彈窗 */}
      {showModal && (
        <PremiumCalculatorModal
          onClose={() => setShowModal(false)}
          currentPremium={CUSTOMER.upgradePremium}
        />
      )}
    </div>
  );
}

// ── 輔助元件 ─────────────────────────────────────────────────

// DataRow：標籤 + 值 橫排
function DataRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-[16px] shrink-0"
        style={{
          color: T.textDefault,
          opacity: 0.8,
          fontFamily: "'PingFang TC', sans-serif",
          minWidth: 100,
        }}
      >
        {label}
      </span>
      <span
        className="text-[16px] font-semibold"
        style={{
          color: valueColor ?? T.textDefault,
          fontFamily: "'PingFang TC', sans-serif",
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ── 服務權益資料 ─────────────────────────────────────────────
const SERVICE_BENEFITS = [
  { service: "會員禮",     status: "剩 1 次", expiry: "116/12/31" },
  { service: "嚴選好禮",   status: "剩 2 次", expiry: "116/12/31" },
  { service: "機場接送",   status: "剩 2 次", expiry: "116/12/31" },
  { service: "機場貴賓室", status: "剩 2 次", expiry: "116/12/31" },
  { service: "機場頂級通關", status: "剩 2 次", expiry: "116/12/31" },
];

// ── 歷史紀錄資料 ─────────────────────────────────────────────
const HISTORY_RECORDS = [
  { date: "115/01/01", item: "尊榮服務-首年禮", product: "嚴選好禮", count: "1", period: "116/12/31", redeemed: "115/03/02" },
  { date: "115/01/01", item: "尊榮服務-首年禮", product: "機場接送", count: "1", period: "116/12/31", redeemed: "尚未兌換" },
  { date: "114/12/01", item: "尊榮服務-首年禮", product: "機場接送", count: "1", period: "115/12/31", redeemed: "尚未兌換" },
  { date: "114/10/01", item: "尊榮服務-首年禮", product: "機場接送", count: "1", period: "115/12/31", redeemed: "尚未兌換" },
  { date: "113/10/01", item: "尊榮服務-首年禮", product: "機場接送", count: "1", period: "114/12/31", redeemed: "已過期" },
];

// ── 區塊標題列（Icon + 標題 + 右側 CTA） ─────────────────────
function SectionTitleBar({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <>
      <div className="flex items-center gap-2 px-4 py-3">
        <div
          className="flex items-center justify-center rounded-[4px] shrink-0"
          style={{ width: 28, height: 28, backgroundColor: "rgba(84,159,210,0.16)" }}
        >
          <User size={16} style={{ color: T.primary }} />
        </div>
        <span
          className="flex-1 text-[18px] font-semibold"
          style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
        >
          {title}
        </span>
        {action}
      </div>
      <div style={{ borderTop: `1px solid ${T.borderLow}` }} />
    </>
  );
}

// ── 區塊四：服務權益 ─────────────────────────────────────────
function ServiceBenefitsSection() {
  const cols = ["服務項目", "狀態", "到期日"];
  return (
    <div
      className="rounded-[8px] overflow-hidden"
      style={{ border: `1px solid ${T.borderLow}`, backgroundColor: T.white }}
    >
      <SectionTitleBar
        title="服務權益"
        action={
          <button
            className="h-[32px] px-3 rounded-[6px] text-[14px] font-semibold shrink-0"
            style={{ border: `1px solid ${T.primary}`, color: T.primary, backgroundColor: T.white }}
          >
            分享兌換連結
          </button>
        }
      />
      {/* 備註 + 表格，四周保留 px-4 pb-4 padding */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        <div className="flex items-center gap-1 pt-3">
          <Info size={16} style={{ color: T.textLow, flexShrink: 0 }} />
          <span className="text-[14px]" style={{ color: T.textMedium }}>
            以下項目包含已發放的感恩禮
          </span>
        </div>
        {/* 表格容器（圓角 + 邊框） */}
        <div
          className="rounded-[8px] overflow-hidden"
          style={{ border: `1px solid ${T.borderLow}` }}
        >
          <div style={{ overflowX: "auto" }}>
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr style={{ backgroundColor: T.bgTableHeader }}>
                  {cols.map((col, ci) => (
                    <th
                      key={col}
                      className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                      style={{
                        color: T.textDark,
                        borderBottom: `1px solid ${T.borderLow}`,
                        borderLeft: ci > 0 ? `1px solid ${T.borderDefault}` : undefined,
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SERVICE_BENEFITS.map((row, ri) => (
                  <tr
                    key={ri}
                    style={{
                      backgroundColor: ri % 2 === 0 ? T.white : T.bgLight,
                      borderBottom: `1px solid ${T.borderLow}`,
                    }}
                  >
                    <td className="px-4 py-2 whitespace-nowrap" style={{ color: T.textDefault }}>{row.service}</td>
                    <td className="px-4 py-2 whitespace-nowrap" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>{row.status}</td>
                    <td className="px-4 py-2 whitespace-nowrap" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>{row.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 區塊五：歷史紀錄 ─────────────────────────────────────────
function HistorySection() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["服務取得/使用紀錄", "感恩禮資格歷程"];
  const cols = ["服務取得日", "項目", "品項", "次數", "服務期限", "兌換日期"];

  return (
    <div
      className="rounded-[8px] overflow-hidden"
      style={{ border: `1px solid ${T.borderLow}`, backgroundColor: T.white }}
    >
      <SectionTitleBar title="歷史紀錄" />
      {/* Tab、備註、表格，四周保留 px-4 pb-4 padding */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        {/* Tab 切換器 */}
        <div className="flex items-center pt-3">
          <div
            className="flex items-center p-[2px] rounded-[6px]"
            style={{ border: `1px solid ${T.borderDefault}` }}
          >
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className="h-[32px] px-5 rounded-[6px] text-[14px] font-semibold whitespace-nowrap"
                style={{
                  backgroundColor: activeTab === i ? T.primary : "transparent",
                  color: activeTab === i ? T.white : T.textMedium,
                  fontFamily: "'PingFang TC', sans-serif",
                  transition: "background-color 0.15s ease",
                }}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        {/* 備註（灰底） */}
        <div
          className="flex items-center gap-1 px-3 py-2 rounded-[6px]"
          style={{ backgroundColor: T.bgPaleGrey }}
        >
          <Info size={16} style={{ color: T.textLow, flexShrink: 0 }} />
          <span className="text-[14px]" style={{ color: T.textMedium }}>
            最近更新時間：YYY/MM/DD
          </span>
        </div>
        {/* 表格容器（圓角 + 邊框） */}
        <div
          className="rounded-[8px] overflow-hidden"
          style={{ border: `1px solid ${T.borderLow}` }}
        >
        <div style={{ overflowX: "auto" }}>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr style={{ backgroundColor: T.bgTableHeader }}>
              {cols.map((col, ci) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                  style={{
                    color: T.textDark,
                    borderBottom: `1px solid ${T.borderLow}`,
                    borderLeft: ci > 0 ? `1px solid ${T.borderDefault}` : undefined,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HISTORY_RECORDS.map((row, ri) => (
              <tr
                key={ri}
                style={{
                  backgroundColor: ri % 2 === 0 ? T.white : T.bgLight,
                  borderBottom: `1px solid ${T.borderLow}`,
                }}
              >
                <td className="px-4 py-2 whitespace-nowrap" style={{ color: T.textDefault }}>{row.date}</td>
                <td className="px-4 py-2 whitespace-nowrap" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>{row.item}</td>
                <td className="px-4 py-2 whitespace-nowrap" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>{row.product}</td>
                <td className="px-4 py-2 whitespace-nowrap" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>{row.count}</td>
                <td className="px-4 py-2 whitespace-nowrap" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>{row.period}</td>
                <td className="px-4 py-2 whitespace-nowrap" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>{row.redeemed}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </div>
      </div>
    </div>
  );
}
