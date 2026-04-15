"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus, ArrowLeft, Search, Pin, ChevronDown, ChevronUp,
  Users, CheckCircle, X, MoreHorizontal, Pencil, Eye,
  FolderOpen,
} from "lucide-react";

/* ─── 設計色票 ──────────────────────────────────────────── */
const T = {
  primary: "#006fbc",
  primaryDark: "#004f85",
  white: "#ffffff",
  bgLight: "#f6f6f6",
  bgTableHeader: "#f2f6f9",
  textDefault: "#3c3c3c",
  textMedium: "#696969",
  textDark: "#555555",
  textDisabled: "#cacaca",
  borderLow: "#eeeeee",
  borderDefault: "#cacaca",
  tagProduct: "#004f85",   // 產險 深藍
  tagProspect: "#00a069",  // 準客戶 綠
  positive: "#00a069",
  warning: "#ec684a",
};

/* ─── 型別定義 ─────────────────────────────────────────── */
type TagType = "產" | "準";
type Grade = "A" | "B" | "C" | "D";
type Gender = "男性" | "女性";
type Membership = "尊榮1星" | "尊榮2星" | "黃金 VIP" | "-";
type ContactStatus = "聯繫提醒" | "待聯繫" | "待聯繫-逾期" | "已聯繫";

interface Customer {
  id: number;
  pinned: boolean;
  tagType: TagType;
  name: string;
  subtitle: string;
  grade: Grade;
  gender: Gender;
  birthDate: string; // ROC 格式
  age: number;
  membership: Membership;
  contactStatus: ContactStatus;
  contactDate: string;
}

interface Portfolio {
  id: string;
  name: string;
  createdDate: string;
  customerIds: number[];
}

type View = "list" | "name-dialog" | "filter-dialog" | "success" | "detail";

interface FilterState {
  tagType: string[];   // 客戶 / 準客戶
  gender: string[];
  grade: string[];
  ageMin: string;
  ageMax: string;
  birthMonth: string;
  income: string[];
  agingDays: string[];
}

/* ─── 50 筆假資料 ──────────────────────────────────────── */
const NAMES = [
  "陳東門","王韻如","王南山","黃峰旗","林佳穎","吳建宏","張麗芬","李俊賢",
  "蔡雅婷","劉明哲","陳婉婷","黃志偉","鄭淑珍","許哲維","賴雅雯","蘇冠霖",
  "謝美玲","洪偉傑","郭雅惠","周建志","邱淑芬","楊浩然","江麗君","蕭志強",
  "朱淑慧","胡忠義","余雅萍","何建興","施淑娟","曾志遠","廖雅慧","韓威廉",
  "田雅倩","白明宏","莊佳慧","程建文","潘雅雯","馬浩民","葉淑芳","傅建明",
  "柯雅芳","盧偉民","魏淑慧","方浩中","孫雅琪","鄒建宏","溫麗雯","甘浩天",
  "游淑芳","詹建豪"
];

const SUBTITLES = [
  "滿期金・繳費期滿・好易保一般・實支實付",
  "壽險主約・住院日額・意外傷害",
  "終身壽險・癌症附約・失能扶助",
  "儲蓄型保單・醫療實支",
  "定期壽險・意外死殘",
  "投資型・外幣・年金",
  "",
];

const MEMBERSHIPS: Membership[] = ["尊榮1星","尊榮2星","黃金 VIP","-","-","-"];
const CONTACT_STATUSES: ContactStatus[] = ["聯繫提醒","待聯繫","待聯繫-逾期","已聯繫"];
const CONTACT_DATES = ["115/03/24","115/04/01","115/02/15","115/03/10","115/04/05"];

function generateCustomers(): Customer[] {
  const grades: Grade[] = ["A","B","C","D"];
  const genders: Gender[] = ["男性","女性"];
  const birthDates = ["108/05/12","110/11/11","097/03/22","101/08/18","085/12/30","092/07/14","075/09/05"];
  const ages = [35,40,45,50,55,60,65,38,42,48,52,58];

  return NAMES.map((name, i) => ({
    id: i + 1,
    pinned: i < 3,
    tagType: i % 3 === 1 ? "準" : "產",
    name,
    subtitle: SUBTITLES[i % SUBTITLES.length],
    grade: grades[i % 4],
    gender: genders[i % 2],
    birthDate: birthDates[i % birthDates.length],
    age: ages[i % ages.length],
    membership: MEMBERSHIPS[i % MEMBERSHIPS.length],
    contactStatus: CONTACT_STATUSES[i % 4],
    contactDate: i % 4 === 0 ? "" : CONTACT_DATES[i % CONTACT_DATES.length],
  }));
}

const MOCK_CUSTOMERS = generateCustomers();

/* ─── 共用子元件 ────────────────────────────────────────── */

/** 頂部導覽列 */
function AppHeader() {
  const navItems = ["首頁","行銷管理","客戶管理","業務管理","知識管理","排程管理","通知中心","其他功能"];
  return (
    <header style={{ background: T.white, borderBottom: `1px solid ${T.borderLow}`, flexShrink: 0 }}>
      <div style={{ display: "flex", height: 56, alignItems: "center", paddingLeft: 20, paddingRight: 4 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 16 }}>
          <Image src="/logo.svg" alt="南山人園地" width={120} height={30} priority />
        </div>
        {/* Nav */}
        <nav style={{ display: "flex", flex: 1, justifyContent: "center", gap: 0 }}>
          {navItems.map((item) => (
            <div key={item} style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: 56, padding: "0 8px", minWidth: 87,
              borderBottom: item === "客戶管理" ? `4px solid ${T.primary}` : "4px solid transparent",
              color: item === "客戶管理" ? T.primary : T.textDefault,
              fontWeight: 600, fontSize: 16, cursor: "pointer", whiteSpace: "nowrap",
            }}>{item}</div>
          ))}
        </nav>
        {/* Avatar */}
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#eee", display:"flex", alignItems:"center", justifyContent:"center", marginRight: 4 }}>
          <Users size={20} color={T.textMedium} />
        </div>
      </div>
      {/* 彩色 gradient bar */}
      <div style={{ height: 4, background: "linear-gradient(to right, #fabe00 2.6%, #6fba2c 31.25%, #0062b1 85.5%)" }} />
    </header>
  );
}

/** 左側選單 */
function SideMenu() {
  const items = [
    { label: "客戶管理摘要" },
    { label: "客戶組成" },
    null, // 分隔線
    { label: "所有客戶", href: "/customers" },
    { label: "專案經營名單" },
    { label: "我的自建組合", active: true, href: "/portfolio" },
    { label: "近期接觸機會" },
    null,
    { label: "所有保單" },
    { label: "案件處理進度" },
    { label: "保單重要事件" },
    { label: "承接/指派保單" },
    null,
    { label: "金融機構間資料共享" },
  ];
  return (
    <aside style={{
      width: 240, background: T.white, borderRight: `1px solid ${T.borderLow}`,
      display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto",
    }}>
      <div style={{ flex: 1, padding: "20px 12px" }}>
        {items.map((item, i) =>
          item === null ? (
            <div key={i} style={{ height: 16, borderBottom: `1px solid ${T.borderLow}`, margin: "4px 0 8px" }} />
          ) : item.href ? (
            <Link key={item.label} href={item.href} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                height: 48, padding: "0 8px", borderRadius: 4,
                background: item.active ? T.primary : "transparent",
                color: item.active ? T.white : T.textDefault,
                fontWeight: 600, fontSize: 16, cursor: "pointer",
              }}>
                {item.label}
              </div>
            </Link>
          ) : (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", gap: 8,
              height: 48, padding: "0 8px", borderRadius: 4,
              background: "transparent",
              color: T.textDefault,
              fontWeight: 600, fontSize: 16, cursor: "pointer",
            }}>
              {item.label}
            </div>
          )
        )}
      </div>
      {/* 收合按鈕 */}
      <div style={{ padding: "12px 12px 20px", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ background: "#eee", borderRadius: 6, padding: "6px 8px", cursor: "pointer" }}>
          <ChevronDown size={16} color={T.textMedium} />
        </div>
      </div>
    </aside>
  );
}

/** 聯繫狀態標籤 */
function ContactBadge({ status }: { status: ContactStatus }) {
  const config = {
    "聯繫提醒": { label: "聯繫提醒", bg: T.primary, color: T.white, border: T.primary },
    "待聯繫": { label: "待聯繫", bg: T.white, color: T.primary, border: T.primary },
    "待聯繫-逾期": { label: "待聯繫", bg: T.white, color: T.warning, border: T.warning },
    "已聯繫": { label: "已聯繫", bg: T.white, color: T.positive, border: T.positive },
  }[status];
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      height: 28, padding: "0 8px", borderRadius: 4,
      background: config.bg, color: config.color,
      border: `1px solid ${config.border}`,
      fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", flex: 1,
    }}>{config.label}</div>
  );
}

/** 客戶標籤 (產/準) */
function CustomerTag({ type }: { type: TagType }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: type === "產" ? T.tagProduct : T.tagProspect,
      color: T.white, fontSize: 12, fontWeight: 600,
      padding: "2px 4px", borderRadius: 2, flexShrink: 0,
    }}>{type}</span>
  );
}

/** 切換 chip 按鈕 */
function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      padding: "4px 12px", borderRadius: 20, fontSize: 14, fontWeight: 600,
      border: `1px solid ${selected ? T.primary : T.borderDefault}`,
      background: selected ? "#e8f3fb" : T.white,
      color: selected ? T.primary : T.textDefault,
      cursor: "pointer", whiteSpace: "nowrap",
    }}>{label}</button>
  );
}

/* ─── 篩選條件 Dialog ────────────────────────────────── */
interface FilterDialogProps {
  filter: FilterState;
  setFilter: (f: FilterState) => void;
  matchCount: number;
  onConfirm: () => void;
  onClose: () => void;
  portfolioName: string;
}

function FilterDialog({ filter, setFilter, matchCount, onConfirm, onClose, portfolioName }: FilterDialogProps) {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));

  const toggle = (idx: number) => {
    const next = new Set(openSections);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    setOpenSections(next);
  };

  const toggleChip = (key: keyof FilterState, val: string) => {
    const arr = filter[key] as string[];
    const next = arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val];
    setFilter({ ...filter, [key]: next });
  };

  const sections = [
    {
      title: "基本資訊",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* 客戶類型 */}
          <div>
            <div style={{ fontSize: 14, color: T.textMedium, marginBottom: 8 }}>客戶 / 準客戶</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["客戶","準客戶"].map(v => (
                <Chip key={v} label={v} selected={(filter.tagType as string[]).includes(v)}
                  onClick={() => toggleChip("tagType", v)} />
              ))}
            </div>
          </div>
          {/* 性別 */}
          <div>
            <div style={{ fontSize: 14, color: T.textMedium, marginBottom: 8 }}>性別</div>
            <div style={{ display: "flex", gap: 8 }}>
              {["男性","女性"].map(v => (
                <Chip key={v} label={v} selected={(filter.gender as string[]).includes(v)}
                  onClick={() => toggleChip("gender", v)} />
              ))}
            </div>
          </div>
          {/* 生日月份 */}
          <div>
            <div style={{ fontSize: 14, color: T.textMedium, marginBottom: 8 }}>生日月份</div>
            <select value={filter.birthMonth} onChange={e => setFilter({ ...filter, birthMonth: e.target.value })}
              style={{ width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.borderDefault}`, fontSize: 14, background: T.white }}>
              <option value="">不限</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i+1} value={String(i+1)}>{i+1} 月</option>
              ))}
            </select>
          </div>
          {/* 保險年齡 */}
          <div>
            <div style={{ fontSize: 14, color: T.textMedium, marginBottom: 8 }}>保險年齡</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="number" placeholder="最小" value={filter.ageMin}
                onChange={e => setFilter({ ...filter, ageMin: e.target.value })}
                style={{ flex: 1, height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.borderDefault}`, fontSize: 14 }} />
              <span style={{ color: T.textMedium }}>～</span>
              <input type="number" placeholder="最大" value={filter.ageMax}
                onChange={e => setFilter({ ...filter, ageMax: e.target.value })}
                style={{ flex: 1, height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.borderDefault}`, fontSize: 14 }} />
            </div>
          </div>
          {/* 增齡時間 */}
          <div>
            <div style={{ fontSize: 14, color: T.textMedium, marginBottom: 8 }}>增齡時間</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["7日內","30日內","60日內","90日內"].map(v => (
                <Chip key={v} label={v} selected={(filter.agingDays as string[]).includes(v)}
                  onClick={() => toggleChip("agingDays", v)} />
              ))}
            </div>
          </div>
          {/* 年收入 */}
          <div>
            <div style={{ fontSize: 14, color: T.textMedium, marginBottom: 8 }}>年收入</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["50萬以下","50-100萬","100-200萬","200萬以上"].map(v => (
                <Chip key={v} label={v} selected={(filter.income as string[]).includes(v)}
                  onClick={() => toggleChip("income", v)} />
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "客戶經營分級與關係",
      content: (
        <div>
          <div style={{ fontSize: 14, color: T.textMedium, marginBottom: 8 }}>個人分級</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["A","B","C","D"].map(v => (
              <Chip key={v} label={v} selected={(filter.grade as string[]).includes(v)}
                onClick={() => toggleChip("grade", v)} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "保障範圍",
      content: (
        <select style={{ width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.borderDefault}`, fontSize: 14, background: T.white }}>
          <option value="">請選擇保障範圍</option>
          <option>壽險</option>
          <option>醫療險</option>
          <option>意外險</option>
          <option>癌症險</option>
          <option>失能扶助</option>
        </select>
      ),
    },
    {
      title: "保單屬性和服務",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <select style={{ width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.borderDefault}`, fontSize: 14, background: T.white }}>
            <option value="">繳費方式</option>
            <option>年繳</option>
            <option>月繳</option>
            <option>半年繳</option>
          </select>
          <select style={{ width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.borderDefault}`, fontSize: 14, background: T.white }}>
            <option value="">保單狀態</option>
            <option>有效</option>
            <option>停效</option>
            <option>終止</option>
          </select>
        </div>
      ),
    },
    {
      title: "其他服務和行銷註記",
      content: (
        <select style={{ width: "100%", height: 40, padding: "0 12px", borderRadius: 8, border: `1px solid ${T.borderDefault}`, fontSize: 14, background: T.white }}>
          <option value="">請選擇服務類型</option>
          <option>VIP 服務</option>
          <option>數位服務</option>
          <option>電話聯繫</option>
        </select>
      ),
    },
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      display: "flex", justifyContent: "flex-end",
      background: "rgba(19,26,52,0.6)",
    }}>
      <div style={{
        width: 560, height: "100%", background: T.white,
        display: "flex", flexDirection: "column",
        boxShadow: "-4px 0 16px rgba(0,0,0,0.15)",
      }}>
        {/* 標題列 */}
        <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${T.borderLow}`, flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: T.textDefault, margin: 0 }}>
              將符合條件的客戶加到新組合
            </h2>
            <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <X size={20} color={T.textMedium} />
            </button>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 14, color: T.textMedium }}>
            組合名稱：<strong style={{ color: T.textDefault }}>{portfolioName}</strong>
          </p>
        </div>

        {/* 符合人數提示 */}
        <div style={{ padding: "12px 24px", background: "#e8f3fb", borderBottom: `1px solid ${T.borderLow}`, flexShrink: 0 }}>
          <span style={{ fontSize: 15, color: T.primary, fontWeight: 600 }}>
            目前符合條件：{matchCount} 位客戶
          </span>
        </div>

        {/* 篩選區 (可滾動) */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 0 16px" }}>
          {sections.map((sec, idx) => (
            <div key={idx} style={{ borderBottom: `1px solid ${T.borderLow}` }}>
              {/* Section 標題 */}
              <button onClick={() => toggle(idx)} style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 24px", background: "none", border: "none", cursor: "pointer",
              }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: T.textDefault }}>{sec.title}</span>
                {openSections.has(idx) ? <ChevronUp size={16} color={T.textMedium} /> : <ChevronDown size={16} color={T.textMedium} />}
              </button>
              {/* Section 內容 */}
              {openSections.has(idx) && (
                <div style={{ padding: "0 24px 20px" }}>{sec.content}</div>
              )}
            </div>
          ))}
        </div>

        {/* CTA 按鈕 */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${T.borderLow}`, flexShrink: 0 }}>
          <button onClick={onConfirm} style={{
            width: "100%", height: 48, background: T.primary, color: T.white,
            border: "none", borderRadius: 6, fontSize: 16, fontWeight: 700,
            cursor: "pointer",
          }}>
            將符合條件的客戶加入組合
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── 主頁面 ────────────────────────────────────────────── */
export default function PortfolioPage() {
  const [view, setView] = useState<View>("list");
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [detailSearch, setDetailSearch] = useState("");
  const [filter, setFilter] = useState<FilterState>({
    tagType: [], gender: [], grade: [], ageMin: "", ageMax: "",
    birthMonth: "", income: [], agingDays: [],
  });

  /* 篩選後的客戶 */
  const filteredCustomers = useMemo(() => {
    return MOCK_CUSTOMERS.filter(c => {
      const tagLabel = c.tagType === "產" ? "客戶" : "準客戶";
      if (filter.tagType.length > 0 && !filter.tagType.includes(tagLabel)) return false;
      if (filter.gender.length > 0 && !filter.gender.includes(c.gender)) return false;
      if (filter.grade.length > 0 && !filter.grade.includes(c.grade)) return false;
      if (filter.ageMin && c.age < parseInt(filter.ageMin)) return false;
      if (filter.ageMax && c.age > parseInt(filter.ageMax)) return false;
      return true;
    });
  }, [filter]);

  /* 詳細頁客戶（依搜尋關鍵字過濾） */
  const detailCustomers = useMemo(() => {
    if (!selectedPortfolio) return [];
    const pool = selectedPortfolio.customerIds.map(id => MOCK_CUSTOMERS.find(c => c.id === id)!).filter(Boolean);
    if (!detailSearch) return pool;
    const q = detailSearch.toLowerCase();
    return pool.filter(c => c.name.includes(q) || c.grade.includes(q) || c.gender.includes(q));
  }, [selectedPortfolio, detailSearch]);

  /* 建立組合 */
  const handleCreatePortfolio = () => {
    const today = new Date();
    // 民國年
    const rocYear = today.getFullYear() - 1911;
    const dateStr = `${rocYear}/${String(today.getMonth()+1).padStart(2,"0")}/${String(today.getDate()).padStart(2,"0")}`;
    const newPortfolio: Portfolio = {
      id: Date.now().toString(),
      name: nameInput,
      createdDate: dateStr,
      customerIds: filteredCustomers.map(c => c.id),
    };
    setPortfolios(prev => [...prev, newPortfolio]);
    setView("success");
  };

  /* 成功後回到列表 */
  const handleSuccessConfirm = () => {
    setFilter({ tagType: [], gender: [], grade: [], ageMin: "", ageMax: "", birthMonth: "", income: [], agingDays: [] });
    setNameInput("");
    setView("list");
  };

  /* 進入詳細頁 */
  const handleOpenDetail = (p: Portfolio) => {
    setSelectedPortfolio(p);
    setDetailSearch("");
    setView("detail");
  };

  /* ── 詳細頁面 ─────────────────────────────────────── */
  if (view === "detail" && selectedPortfolio) {
    const pinnedCustomers = detailCustomers.filter(c => c.pinned);
    const unpinnedCustomers = detailCustomers.filter(c => !c.pinned);
    const sortedCustomers = [...pinnedCustomers, ...unpinnedCustomers];

    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'PingFang TC', 'Noto Sans TC', sans-serif", overflow: "hidden" }}>
        <AppHeader />
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <SideMenu />
          {/* 主內容 */}
          <main style={{ flex: 1, background: T.bgLight, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* 子標題列 */}
            <div style={{ background: T.white, borderBottom: `3px solid ${T.borderLow}`, padding: "16px 16px 0", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button onClick={() => setView("list")} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
                    <ArrowLeft size={20} color={T.textDefault} />
                  </button>
                  <h1 style={{ fontSize: 20, fontWeight: 700, color: T.textDefault, margin: 0 }}>
                    {selectedPortfolio.name}
                  </h1>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <button style={{
                    display: "flex", alignItems: "center", gap: 4, height: 40, padding: "0 12px",
                    background: T.primary, color: T.white, border: "none", borderRadius: 6,
                    fontSize: 16, fontWeight: 600, cursor: "pointer",
                  }}>
                    <Plus size={18} /> 加入客戶
                  </button>
                  <button style={{
                    display: "flex", alignItems: "center", gap: 4, height: 40, padding: "0 12px",
                    background: T.white, color: T.primary, border: `1px solid ${T.primary}`,
                    borderRadius: 6, fontSize: 16, fontWeight: 600, cursor: "pointer",
                  }}>
                    編輯組合 <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            </div>
            {/* 搜尋列 */}
            <div style={{ background: T.bgLight, padding: "16px 16px 8px", flexShrink: 0 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: T.textDefault, marginBottom: 8 }}>關鍵字搜尋</div>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, height: 40,
                padding: "0 12px", background: T.white, border: `1px solid ${T.borderLow}`,
                borderRadius: 8,
              }}>
                <input
                  value={detailSearch}
                  onChange={e => setDetailSearch(e.target.value)}
                  placeholder="搜尋列表任一欄位"
                  style={{ flex: 1, border: "none", outline: "none", fontSize: 16, color: T.textMedium, background: "transparent" }}
                />
                <Search size={20} color={T.textMedium} />
              </div>
            </div>
            {/* 表格 */}
            <div style={{ flex: 1, overflow: "auto", padding: "8px 16px 16px" }}>
              <div style={{ background: T.white, border: `1px solid ${T.borderLow}`, borderRadius: 8, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
                  <thead>
                    <tr style={{ background: T.bgTableHeader }}>
                      <th style={thStyle(40)}></th>
                      <th style={thStyle(200)}>姓名</th>
                      <th style={thStyle(100)}>個人分級</th>
                      <th style={thStyle(80)}>性別</th>
                      <th style={thStyle(110)}>出生日期</th>
                      <th style={thStyle(100)}>保險年齡</th>
                      <th style={thStyle(110)}>會員資格</th>
                      <th style={{ ...thStyle(150), position: "sticky", right: 0, background: T.bgTableHeader, boxShadow: "-2px 0 4px rgba(0,0,0,0.08)" }}>聯繫狀態</th>
                      <th style={thStyle(80)}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedCustomers.map((c, i) => (
                      <tr key={c.id} style={{ background: i % 2 === 0 ? T.white : "#fafafa", borderBottom: `1px solid ${T.borderLow}` }}>
                        {/* Pin */}
                        <td style={tdStyle(40, true)}>
                          <Pin size={14} color={c.pinned ? T.primary : T.borderDefault} fill={c.pinned ? T.primary : "none"} />
                        </td>
                        {/* 姓名 */}
                        <td style={tdStyle(200)}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <CustomerTag type={c.tagType} />
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 500, color: T.textDefault }}>{c.name}</div>
                              {c.subtitle && (
                                <div style={{ fontSize: 13, color: T.textMedium, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>
                                  {c.subtitle}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        {/* 個人分級 */}
                        <td style={tdStyle(100)}>{c.grade}</td>
                        {/* 性別 */}
                        <td style={tdStyle(80)}>{c.gender}</td>
                        {/* 出生日期 */}
                        <td style={tdStyle(110)}>{c.birthDate}</td>
                        {/* 保險年齡 */}
                        <td style={tdStyle(100)}>{c.age}</td>
                        {/* 會員資格 */}
                        <td style={tdStyle(110)}>{c.membership}</td>
                        {/* 聯繫狀態 (sticky) */}
                        <td style={{ ...tdStyle(150, true), position: "sticky", right: 0, background: i % 2 === 0 ? T.white : "#fafafa", boxShadow: "-2px 0 4px rgba(0,0,0,0.08)" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "stretch" }}>
                            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                              <ContactBadge status={c.contactStatus} />
                              {c.contactStatus === "已聯繫"
                                ? <button style={iconBtnStyle}><Eye size={14} color={T.primary} /></button>
                                : <button style={iconBtnStyle}><Pencil size={14} color={T.primary} /></button>
                              }
                            </div>
                            {c.contactDate && (
                              <div style={{ fontSize: 11, color: T.textMedium, opacity: 0.8 }}>{c.contactDate}</div>
                            )}
                          </div>
                        </td>
                        {/* 更多 */}
                        <td style={tdStyle(80, true)}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer", color: T.primary, fontWeight: 600, fontSize: 14 }}>
                            更多 <MoreHorizontal size={16} color={T.primary} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {sortedCustomers.length === 0 && (
                  <div style={{ padding: "40px 0", textAlign: "center", color: T.textMedium }}>
                    查無符合條件的客戶
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* ── 組合列表頁（含各種 overlay） ────────────────────── */
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'PingFang TC', 'Noto Sans TC', sans-serif", overflow: "hidden" }}>
      <AppHeader />
      <div style={{ display: "flex", flex: 1, overflow: "hidden", position: "relative" }}>
        <SideMenu />

        {/* 主內容 */}
        <main style={{ flex: 1, background: T.bgLight, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* 頁面標題列 */}
          <div style={{ background: T.white, borderBottom: `3px solid ${T.borderLow}`, padding: "16px 16px 0", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 16 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: T.textDefault, margin: 0 }}>我的自建組合</h1>
              <button
                onClick={() => { setNameInput(""); setView("name-dialog"); }}
                style={{
                  display: "flex", alignItems: "center", gap: 6, height: 40, padding: "0 16px",
                  background: T.primary, color: T.white, border: "none", borderRadius: 6,
                  fontSize: 16, fontWeight: 600, cursor: "pointer",
                }}
              >
                <Plus size={18} /> 新增自建組合
              </button>
            </div>
          </div>

          {/* 內容區 */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            {portfolios.length === 0 ? (
              /* 空值狀態 */
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 0" }}>
                <div style={{ width: 180, height: 180, marginBottom: 16, opacity: 0.4 }}>
                  <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="180" height="180" rx="90" fill="#e8f3fb"/>
                    <rect x="40" y="70" width="100" height="70" rx="8" fill="#b3d6ef"/>
                    <rect x="40" y="55" width="50" height="20" rx="6" fill="#7ab8dd"/>
                    <rect x="55" y="95" width="70" height="8" rx="4" fill="#fff" opacity="0.6"/>
                    <rect x="55" y="112" width="50" height="8" rx="4" fill="#fff" opacity="0.4"/>
                  </svg>
                </div>
                <p style={{ fontSize: 20, fontWeight: 700, color: T.textDefault }}>尚無自建組合</p>
              </div>
            ) : (
              /* 組合卡片 Grid */
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {portfolios.map(p => {
                  const pinned = p.customerIds.filter(id => MOCK_CUSTOMERS.find(c => c.id === id)?.pinned).length;
                  return (
                    <div key={p.id} onClick={() => handleOpenDetail(p)} style={{
                      background: T.white, borderRadius: 8, padding: 20, cursor: "pointer",
                      boxShadow: "0 2px 4px rgba(59,66,70,0.08)",
                      transition: "box-shadow 0.15s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,111,188,0.15)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 4px rgba(59,66,70,0.08)")}
                    >
                      {/* 日期 */}
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 24, height: 24, background: "rgba(84,159,210,0.16)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <FolderOpen size={14} color={T.primary} />
                        </div>
                        <span style={{ fontSize: 13, color: "#8d8d8d", fontWeight: 600 }}>{p.createdDate} 建立</span>
                      </div>
                      {/* 名稱 */}
                      <div style={{ fontSize: 18, fontWeight: 700, color: T.textDefault, marginBottom: 16, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p.name}
                      </div>
                      {/* 分隔線 */}
                      <div style={{ borderTop: `1px solid ${T.borderLow}`, marginBottom: 16 }} />
                      {/* 統計 */}
                      <div style={{ display: "flex", gap: 16 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Users size={18} color={T.primary} />
                          <span style={{ fontSize: 14, fontWeight: 600, color: T.primary }}>{p.customerIds.length}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <Pin size={18} color={T.primary} fill={T.primary} />
                          <span style={{ fontSize: 14, fontWeight: 600, color: T.primary }}>{pinned}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Step 1: 命名 Dialog ───────────────────────── */}
      {view === "name-dialog" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(19,26,52,0.6)" }} onClick={() => setView("list")} />
          <div style={{ position: "relative", width: 800, background: T.white, borderRadius: 12, boxShadow: "0 2px 4px rgba(59,66,70,0.08)", overflow: "hidden" }}>
            {/* 標題 */}
            <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${T.borderLow}` }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: T.textDefault, margin: 0 }}>編輯組合名稱</h2>
            </div>
            {/* 內容 */}
            <div style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: 15, color: T.textDefault, marginBottom: 8 }}>組合名稱</div>
              <input
                autoFocus
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="請輸入組合名稱"
                style={{
                  width: "100%", height: 48, padding: "0 16px", borderRadius: 8,
                  border: `1px solid ${T.primary}`, fontSize: 16, outline: "none",
                  boxSizing: "border-box",
                }}
                onKeyDown={e => { if (e.key === "Enter" && nameInput.trim()) setView("filter-dialog"); }}
              />
            </div>
            {/* 按鈕 */}
            <div style={{ padding: "0 24px 20px", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => { if (nameInput.trim()) setView("filter-dialog"); }}
                disabled={!nameInput.trim()}
                style={{
                  width: 160, height: 48, background: nameInput.trim() ? T.primary : T.textDisabled,
                  color: T.white, border: "none", borderRadius: 6, fontSize: 16, fontWeight: 700,
                  cursor: nameInput.trim() ? "pointer" : "not-allowed",
                }}
              >
                確定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: 篩選條件 Dialog ───────────────────── */}
      {view === "filter-dialog" && (
        <FilterDialog
          filter={filter}
          setFilter={setFilter}
          matchCount={filteredCustomers.length}
          portfolioName={nameInput}
          onConfirm={handleCreatePortfolio}
          onClose={() => setView("name-dialog")}
        />
      )}

      {/* ── 建立成功 Modal ────────────────────────────── */}
      {view === "success" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(19,26,52,0.6)" }} />
          <div style={{ position: "relative", width: 440, background: T.white, borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 4px rgba(59,66,70,0.08)" }}>
            {/* 圖示 + 文字 */}
            <div style={{ padding: "20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              {/* 綠色 checkmark */}
              <div style={{ width: 96, height: 96, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle size={80} color={T.positive} strokeWidth={1.5} />
              </div>
              <div style={{ width: "100%" }}>
                <h2 style={{ textAlign: "center", fontSize: 20, fontWeight: 700, color: T.textDefault, margin: "0 0 12px" }}>
                  已將符合條件的 {filteredCustomers.length} 位客戶加入組合
                </h2>
                <p style={{ textAlign: "left", fontSize: 16, color: T.textDefault, margin: 0, lineHeight: 1.6 }}>
                  您可再依據需求自行編輯名單<br />
                  提醒您，自建組合中的名單不會依據條件自動更新
                </p>
              </div>
            </div>
            {/* 按鈕 */}
            <div style={{ padding: 16 }}>
              <button
                onClick={handleSuccessConfirm}
                style={{
                  width: "100%", height: 48, background: T.primary, color: T.white,
                  border: "none", borderRadius: 6, fontSize: 18, fontWeight: 700, cursor: "pointer",
                }}
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── 樣式輔助 ─────────────────────────────────────────── */
function thStyle(width: number): React.CSSProperties {
  return {
    width, minWidth: width, padding: "10px 12px",
    textAlign: "left", fontSize: 15, fontWeight: 700,
    color: "#555", borderBottom: `1px solid ${T.borderLow}`,
    whiteSpace: "nowrap",
  };
}

function tdStyle(width: number, center = false): React.CSSProperties {
  return {
    width, minWidth: width, padding: "12px",
    fontSize: 15, color: T.textDefault,
    verticalAlign: "middle",
    textAlign: center ? "center" : "left",
  };
}

const iconBtnStyle: React.CSSProperties = {
  width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
  background: T.white, border: `1px solid ${T.primary}`, borderRadius: 4, cursor: "pointer", flexShrink: 0,
};
