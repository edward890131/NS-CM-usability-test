"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown, ChevronUp, Trash2, Check, ArrowRight, Info } from "lucide-react";

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
  textDisabled: "#ababab",
  borderLow: "#eeeeee",
  borderDefault: "#cacaca",
  error: "#d93025",
  errorLight: "#fff0ef",
  success: "#00a069",
  highlight: "#cce4f5",
};

// ── 會員等級設定 ────────────────────────────────────────────
const MEMBER_LEVELS = [
  { key: "1", name: "尊榮1星", threshold: 500000 },
  { key: "2", name: "尊榮2星", threshold: 1500000 },
  { key: "3", name: "尊榮3星", threshold: 3000000 },
  { key: "4", name: "尊榮4星", threshold: 5000000 },
];

// ── 主約商品資料 ────────────────────────────────────────────
// 欄位說明：
//   productTypeWeight  = 商品類型權數 (小數，300% → 3.0)
//   periodWeights      = 各繳費年期對應的商品年期權數 (小數，100% → 1.0)
//   defaultPeriod      = 主約選定後帶入的預設繳費年期
//   shortName          = 結果表格顯示的簡稱
export interface Product {
  id: string;
  name: string;
  shortName: string;
  currency: string;
  currencyLabel: string;
  defaultRate: number;
  productTypeWeight: number;
  category: "AH" | "other";
  paymentPeriods: string[];
  periodWeights: Record<string, number>;
  defaultPeriod: string;
}

const PRODUCTS: Product[] = [
  // ── SP 投資型 ─────────────────────────────────────────────
  {
    id: "BVA2",
    name: "南山人壽鑫富雙享２變額年金保險",
    shortName: "BVA2",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 1.0,
    category: "other",
    paymentPeriods: ["1年期"],
    periodWeights: { "1年期": 0.1 },
    defaultPeriod: "1年期",
  },
  // ── RP 壽險（USD）────────────────────────────────────────
  {
    id: "AYUPL3",
    name: "南山人壽美利保倍３美元利率變動型終身壽險（定期給付型）",
    shortName: "AYUPL3",
    currency: "USD",
    currencyLabel: "美金",
    defaultRate: 30,
    productTypeWeight: 1.0,
    category: "other",
    paymentPeriods: ["3年期", "6年期", "10年期", "20年期"],
    periodWeights: { "3年期": 0.3, "6年期": 0.6, "10年期": 1.0, "20年期": 1.0 },
    defaultPeriod: "3年期",
  },
  {
    id: "ARUE2",
    name: "南山人壽樂享６５美元利率變動型還本保險（定期給付型）",
    shortName: "ARUE2",
    currency: "USD",
    currencyLabel: "美金",
    defaultRate: 30,
    productTypeWeight: 1.0,
    category: "other",
    paymentPeriods: ["2年期", "6年期", "10年期", "15年期"],
    periodWeights: { "2年期": 0.2, "6年期": 0.6, "10年期": 1.0, "15年期": 1.0 },
    defaultPeriod: "2年期",
  },
  // ── A&H 醫療及意外險（商品類型權數 3）────────────────────
  {
    id: "TED",
    name: "南山人壽精選傷病定期保險",
    shortName: "TED",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 3.0,
    category: "AH",
    paymentPeriods: ["10年期", "20年期"],
    periodWeights: { "10年期": 1.0, "20年期": 1.0 },
    defaultPeriod: "10年期",
  },
  {
    id: "HPSI2",
    name: "南山人壽溢同安心２手術醫療保險",
    shortName: "HPSI2",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 3.0,
    category: "AH",
    paymentPeriods: ["10年期", "20年期"],
    periodWeights: { "10年期": 1.0, "20年期": 1.0 },
    defaultPeriod: "10年期",
  },
  {
    id: "HCAB2",
    name: "南山人壽滿溢久久２癌症醫療健康保險",
    shortName: "HCAB2",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 3.0,
    category: "AH",
    paymentPeriods: ["20年期"],
    periodWeights: { "20年期": 1.0 },
    defaultPeriod: "20年期",
  },
  {
    id: "SBB",
    name: "南山人壽意外骨折及特定手術傷害醫療保險",
    shortName: "SBB",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 3.0,
    category: "AH",
    paymentPeriods: ["1年期"],
    periodWeights: { "1年期": 0.1 },
    defaultPeriod: "1年期",
  },
  {
    id: "HC",
    name: "南山人壽心滿溢足癌症健康保險",
    shortName: "HC",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 3.0,
    category: "AH",
    paymentPeriods: ["10年期", "20年期"],
    periodWeights: { "10年期": 1.0, "20年期": 1.0 },
    defaultPeriod: "10年期",
  },
  {
    id: "FLTC",
    name: "南山人壽輕鬆陪伴長期照顧健康保險",
    shortName: "FLTC",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 3.0,
    category: "AH",
    paymentPeriods: ["10年期", "20年期", "30年期"],
    periodWeights: { "10年期": 1.0, "20年期": 1.0, "30年期": 1.0 },
    defaultPeriod: "10年期",
  },
  {
    id: "STCB",
    name: "南山人壽優樂康護短期照顧終身健康保險",
    shortName: "STCB",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 3.0,
    category: "AH",
    paymentPeriods: ["10年期", "20年期"],
    periodWeights: { "10年期": 1.0, "20年期": 1.0 },
    defaultPeriod: "10年期",
  },
  // ── SP 投資型（USD）──────────────────────────────────────
  {
    id: "UBVA2",
    name: "南山人壽鑫富雙享２外幣變額年金保險",
    shortName: "UBVA2",
    currency: "USD",
    currencyLabel: "美金",
    defaultRate: 30,
    productTypeWeight: 1.0,
    category: "other",
    paymentPeriods: ["躉繳"],
    periodWeights: { "躉繳": 0.1 },
    defaultPeriod: "躉繳",
  },
  // ── A&H 醫療（續）────────────────────────────────────────
  {
    id: "HPCHI2",
    name: "南山人壽全心溢靠２醫療保險",
    shortName: "HPCHI2",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 3.0,
    category: "AH",
    paymentPeriods: ["10年期", "20年期"],
    periodWeights: { "10年期": 1.0, "20年期": 1.0 },
    defaultPeriod: "10年期",
  },
  {
    id: "HPCHI2B",
    name: "南山人壽全心溢靠２醫療保險（HPCHI2B）",
    shortName: "HPCHI2B",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 3.0,
    category: "AH",
    paymentPeriods: ["10年期", "20年期"],
    periodWeights: { "10年期": 1.0, "20年期": 1.0 },
    defaultPeriod: "10年期",
  },
  {
    id: "WEHS",
    name: "南山人壽實健溢百住院醫療終身保險",
    shortName: "WEHS",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 3.0,
    category: "AH",
    paymentPeriods: ["10年期", "20年期", "30年期"],
    periodWeights: { "10年期": 1.0, "20年期": 1.0, "30年期": 1.0 },
    defaultPeriod: "10年期",
  },
  // ── RP 壽險（TWD）────────────────────────────────────────
  {
    id: "NATE",
    name: "南山人壽多利多鑫利率變動型還本終身保險（定期給付型）",
    shortName: "NATE",
    currency: "TWD",
    currencyLabel: "台幣",
    defaultRate: 1,
    productTypeWeight: 1.0,
    category: "other",
    paymentPeriods: ["6年期", "10年期", "20年期"],
    periodWeights: { "6年期": 0.6, "10年期": 1.0, "20年期": 1.0 },
    defaultPeriod: "6年期",
  },
];

// ── 缺口換算基準（按險種 × 年期） ───────────────────────────
// 公式：所需年繳保費(TWD) = 缺口 / (商品類型權數 × 商品年期權數)
// A&H 商品類型權數 = 3（300%）
const AH_GAP_ROWS = [
  { period: "1年期",        typeWeight: 3.0, periodWeight: 0.1 },
  { period: "2年期",        typeWeight: 3.0, periodWeight: 0.2 },
  { period: "3年期",        typeWeight: 3.0, periodWeight: 0.3 },
  { period: "6年期",        typeWeight: 3.0, periodWeight: 0.6 },
  { period: "10年期(含)以上", typeWeight: 3.0, periodWeight: 1.0 },
];

// RP/SP 商品類型權數 = 1（100%）
const OTHER_GAP_ROWS = [
  { period: "2年期",  typeWeight: 1.0, periodWeight: 0.2 },
  { period: "3年期",  typeWeight: 1.0, periodWeight: 0.3 },
  { period: "6年期",  typeWeight: 1.0, periodWeight: 0.6 },
  { period: "10年期", typeWeight: 1.0, periodWeight: 1.0 },
  { period: "躉繳",   typeWeight: 1.0, periodWeight: 0.1 },
];

// ── 會員權益資料 ────────────────────────────────────────────
const MEMBER_BENEFITS = [
  {
    category: "貴賓服務專線 (0800620168)",
    sub: null,
    vals: { "1": "check", "2": "check", "3": "check", "4": "check" },
  },
  {
    category: "會員禮",
    sub: null,
    vals: { "1": "check", "2": "check", "3": "check", "4": "check" },
  },
  {
    category: "首年禮",
    sub: "嚴選好禮",
    vals: { "1": null, "2": "1項", "3": "2項", "4": "3項" },
  },
  {
    category: "首年禮",
    sub: "機場接送",
    vals: { "1": null, "2": "2次", "3": "2次", "4": "4次" },
  },
  {
    category: "首年禮",
    sub: "機場貴賓室",
    vals: { "1": null, "2": "2次", "3": "2次", "4": "4次" },
  },
  {
    category: "首年禮",
    sub: "機場頂級通關",
    vals: { "1": null, "2": null, "3": "1次", "4": "2次" },
  },
  {
    category: "尊榮權益",
    sub: "核保/理賠綠色通關",
    vals: { "1": null, "2": null, "3": "check", "4": "check" },
  },
  {
    category: "尊榮權益",
    sub: "不定期活動邀請",
    vals: { "1": null, "2": null, "3": "check", "4": "check" },
  },
];

// ── 輔助函式 ────────────────────────────────────────────────
function getLevelByPremium(premium: number) {
  const eligible = MEMBER_LEVELS.filter((l) => premium >= l.threshold);
  return eligible[eligible.length - 1] || MEMBER_LEVELS[0];
}

function getNextLevel(premium: number) {
  return MEMBER_LEVELS.find((l) => premium < l.threshold) ?? null;
}

function formatTWD(n: number) {
  return n.toLocaleString("zh-TW");
}

function formatNumberWithCommas(raw: string) {
  if (!raw) return "";
  const digits = raw.replace(/[^0-9]/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

// ── PolicyEntry 型別 ─────────────────────────────────────────
interface PolicyEntry {
  uid: number;
  productId: string;
  currency: string;
  currencyLabel: string;
  rate: string;
  paymentPeriod: string;
  productTypeWeight: number;
  periodWeight: number;
  annualPremium: string;
  errors: { product?: string; paymentPeriod?: string; annualPremium?: string };
}

let _uid = 1;
function newPolicy(): PolicyEntry {
  return {
    uid: _uid++,
    productId: "",
    currency: "",
    currencyLabel: "",
    rate: "",
    paymentPeriod: "",
    productTypeWeight: 0,
    periodWeight: 0,
    annualPremium: "",
    errors: {},
  };
}

// ── CalcResult 型別 ──────────────────────────────────────────
interface PolicyResult {
  uid: number;
  productName: string;
  shortName: string;
  paymentPeriod: string;
  currency: string;
  annualPremium: string;
  rate: string;
  typeWeightPct: string;
  periodWeightPct: string;
  calcPremium: number;
}

interface CalcResult {
  additionalPremium: number;
  totalPremium: number;
  projectedLevel: (typeof MEMBER_LEVELS)[number];
  willUpgrade: boolean;
  policyResults: PolicyResult[];
}

// ═══════════════════════════════════════════════════════════
// 主元件
// ═══════════════════════════════════════════════════════════
interface Props {
  onClose: () => void;
  currentPremium: number;
}

export default function PremiumCalculatorModal({ onClose, currentPremium }: Props) {
  const [view, setView] = useState<"input" | "result">("input");
  const [gapOpen, setGapOpen] = useState(false);
  const [benefitsOpen, setBenefitsOpen] = useState(false);
  const [policies, setPolicies] = useState<PolicyEntry[]>([newPolicy()]);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingFading, setLoadingFading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const currentLevel = getLevelByPremium(currentPremium);
  const nextLevel = getNextLevel(currentPremium);
  const gap = nextLevel ? nextLevel.threshold - currentPremium : 0;

  // ── 欄位操作 ─────────────────────────────────────────────
  function onSelectProduct(uid: number, productId: string) {
    const p = PRODUCTS.find((x) => x.id === productId);
    setPolicies((prev) =>
      prev.map((pol) => {
        if (pol.uid !== uid) return pol;
        if (!p)
          return {
            ...pol,
            productId: "",
            currency: "",
            currencyLabel: "",
            rate: "",
            paymentPeriod: "",
            productTypeWeight: 0,
            periodWeight: 0,
            errors: { ...pol.errors, product: undefined },
          };
        return {
          ...pol,
          productId,
          currency: p.currency,
          currencyLabel: p.currencyLabel,
          rate: String(p.defaultRate),
          paymentPeriod: p.defaultPeriod,
          productTypeWeight: p.productTypeWeight,
          periodWeight: p.periodWeights[p.defaultPeriod] ?? 0,
          errors: { ...pol.errors, product: undefined, paymentPeriod: undefined },
        };
      })
    );
  }

  function onSelectPeriod(uid: number, period: string) {
    setPolicies((prev) =>
      prev.map((pol) => {
        if (pol.uid !== uid) return pol;
        const p = PRODUCTS.find((x) => x.id === pol.productId);
        const pw = p?.periodWeights[period] ?? 0;
        return {
          ...pol,
          paymentPeriod: period,
          periodWeight: pw,
          errors: { ...pol.errors, paymentPeriod: undefined },
        };
      })
    );
  }

  function onChangeRate(uid: number, val: string) {
    setPolicies((prev) =>
      prev.map((pol) => (pol.uid === uid ? { ...pol, rate: val } : pol))
    );
  }

  function onChangePremium(uid: number, val: string) {
    const formatted = formatNumberWithCommas(val);
    setPolicies((prev) =>
      prev.map((pol) =>
        pol.uid === uid
          ? { ...pol, annualPremium: formatted, errors: { ...pol.errors, annualPremium: undefined } }
          : pol
      )
    );
  }

  function onAddPolicy() {
    setPolicies((prev) => [...prev, newPolicy()]);
  }

  function onRemovePolicy(uid: number) {
    setPolicies((prev) => prev.filter((p) => p.uid !== uid));
  }

  function runWithLoading(onComplete: () => void) {
    if (showLoading) return;
    setShowLoading(true);
    setLoadingFading(false);
    setTimeout(() => {
      onComplete();
      setLoadingFading(true);
      setTimeout(() => {
        setShowLoading(false);
        setLoadingFading(false);
        // 等載入彈窗完全消失後，再回到彈窗內容頂部
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: "auto" });
      }, 300);
    }, 1700);
  }

  // ── 試算 ─────────────────────────────────────────────────
  function handleCalculate() {
    let hasErr = false;
    const validated = policies.map((pol) => {
      const errs: PolicyEntry["errors"] = {};
      if (!pol.productId) { errs.product = "不可為空"; hasErr = true; }
      if (!pol.paymentPeriod) { errs.paymentPeriod = "不可為空"; hasErr = true; }
      if (!pol.annualPremium) { errs.annualPremium = "不可為空"; hasErr = true; }
      return { ...pol, errors: errs };
    });
    setPolicies(validated);
    if (hasErr) return;

    const policyResults: PolicyResult[] = policies.map((pol) => {
      const annual = parseFloat(pol.annualPremium.replace(/,/g, "")) || 0;
      const rate = parseFloat(pol.rate) || 0;
      const calc = Math.round(annual * rate * pol.productTypeWeight * pol.periodWeight);
      const prod = PRODUCTS.find((x) => x.id === pol.productId);
      return {
        uid: pol.uid,
        productName: prod?.name ?? pol.productId,
        shortName: prod?.shortName ?? pol.productId,
        paymentPeriod: pol.paymentPeriod,
        currency: pol.currency,
        annualPremium: pol.annualPremium,
        rate: pol.rate,
        typeWeightPct: `${pol.productTypeWeight}`,
        periodWeightPct: `${Math.round(pol.periodWeight * 100)}%`,
        calcPremium: calc,
      };
    });

    const additional = policyResults.reduce((s, r) => s + r.calcPremium, 0);
    const total = currentPremium + additional;
    const projected = getLevelByPremium(total);
    const willUpgrade = projected.key !== currentLevel.key;

    const calcResult: CalcResult = { additionalPremium: additional, totalPremium: total, projectedLevel: projected, willUpgrade, policyResults };

    runWithLoading(() => {
      setResult(calcResult);
      setView("result");
    });
  }

  function handleReset() {
    runWithLoading(() => {
      setPolicies([newPolicy()]);
      setResult(null);
      setView("input");
      setBenefitsOpen(false);
    });
  }

  useEffect(() => {
    if (view === "result" && !showLoading) {
      scrollContainerRef.current?.scrollTo({ top: 0 });
    }
  }, [view, showLoading]);

  // ── 渲染 ─────────────────────────────────────────────────
  return (
    <>
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div
        className="relative flex flex-col rounded-[8px] overflow-hidden bg-white"
        style={{ width: 800, maxHeight: 700, fontFamily: "'PingFang TC', sans-serif" }}
      >
        {/* ── 標題列 ── */}
        <div
          className="shrink-0 flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${T.borderLow}` }}
        >
          <h2 className="text-[20px] font-semibold" style={{ color: T.textDefault }}>
            資格保費試算
          </h2>
          <button onClick={onClose} className="p-1" style={{ color: T.textMedium }}>
            <X size={20} />
          </button>
        </div>

        {/* ── 可滾動主體 ── */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
          {view === "input" ? (
            <InputView
              currentLevel={currentLevel}
              currentPremium={currentPremium}
              gap={gap}
              nextLevel={nextLevel}
              gapOpen={gapOpen}
              setGapOpen={setGapOpen}
              policies={policies}
              onSelectProduct={onSelectProduct}
              onSelectPeriod={onSelectPeriod}
              onChangeRate={onChangeRate}
              onChangePremium={onChangePremium}
              onAddPolicy={onAddPolicy}
              onRemovePolicy={onRemovePolicy}
            />
          ) : (
            <ResultView
              currentLevel={currentLevel}
              currentPremium={currentPremium}
              result={result!}
              benefitsOpen={benefitsOpen}
              setBenefitsOpen={setBenefitsOpen}
              policies={policies}
              onSelectProduct={onSelectProduct}
              onSelectPeriod={onSelectPeriod}
              onChangeRate={onChangeRate}
              onChangePremium={onChangePremium}
              onAddPolicy={onAddPolicy}
              onRemovePolicy={onRemovePolicy}
            />
          )}
        </div>

        {/* ── 底部按鈕列 ── */}
        <div
          className="shrink-0 flex items-center justify-between px-6 py-4"
          style={{ borderTop: `1px solid ${T.borderLow}` }}
        >
          {view === "result" ? (
            <button
              className="px-5 h-[44px] rounded-[6px] text-[16px] font-semibold"
              style={{ border: `1px solid ${T.primary}`, color: T.primary }}
              onClick={handleReset}
            >
              重設
            </button>
          ) : (
            <div />
          )}
          <button
            className="px-5 h-[44px] rounded-[6px] text-[16px] font-semibold"
            style={{ backgroundColor: T.primary, color: T.white }}
            onClick={handleCalculate}
          >
            開始試算
          </button>
        </div>
      </div>
    </div>

    {/* Loading 彈窗 */}
    {showLoading && createPortal(
      <div
        className="fixed inset-0 z-[400] flex items-center justify-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          opacity: loadingFading ? 0 : 1,
          transition: "opacity 0.3s ease",
          pointerEvents: loadingFading ? "none" : "auto",
        }}
      >
        <div
          className="flex flex-col items-center justify-center gap-3 rounded-[8px]"
          style={{
            backgroundColor: "rgba(19,26,52,0.85)",
            padding: "25px 40px",
          }}
        >
          {/* NS logo 動畫（黃色三角形） */}
          <div className="size-[80px] flex items-center justify-center" style={{ animation: "nsPulse 1.2s ease-in-out infinite" }}>
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
              {/* 外層大三角形 */}
              <polygon points="40,8 72,68 8,68" fill="#F5A800" />
              {/* 內層小三角形（鏤空效果） */}
              <polygon points="40,38 54,62 26,62" fill="rgba(19,26,52,0.85)" />
            </svg>
          </div>
          <p
            className="text-white text-[16px] font-medium whitespace-nowrap"
            style={{ fontFamily: "'PingFang TC', sans-serif" }}
          >
            載入中...
          </p>
        </div>
      </div>,
      document.body
    )}
    <style>{`
      @keyframes nsPulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(0.88); opacity: 0.75; }
      }
    `}</style>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// 試算前 View
// ═══════════════════════════════════════════════════════════
function InputView({
  currentLevel,
  currentPremium,
  gap,
  nextLevel,
  gapOpen,
  setGapOpen,
  policies,
  onSelectProduct,
  onSelectPeriod,
  onChangeRate,
  onChangePremium,
  onAddPolicy,
  onRemovePolicy,
}: {
  currentLevel: (typeof MEMBER_LEVELS)[number];
  currentPremium: number;
  gap: number;
  nextLevel: (typeof MEMBER_LEVELS)[number] | null;
  gapOpen: boolean;
  setGapOpen: (v: boolean) => void;
  policies: PolicyEntry[];
  onSelectProduct: (uid: number, id: string) => void;
  onSelectPeriod: (uid: number, p: string) => void;
  onChangeRate: (uid: number, v: string) => void;
  onChangePremium: (uid: number, v: string) => void;
  onAddPolicy: () => void;
  onRemovePolicy: (uid: number) => void;
}) {
  return (
    <div className="px-6 py-5 flex flex-col gap-5">
      {/* ── 當前等級資訊 ── */}
      <div className="flex flex-col gap-1">
        <div className="text-[14px]" style={{ color: T.textMedium }}>當前等級</div>
        <div className="text-[28px] font-bold" style={{ color: T.textDefault }}>
          {currentLevel.name}
        </div>
        <div className="text-[14px]" style={{ color: T.textMedium }}>
          當前資格保費 TWD {formatTWD(currentPremium)}
        </div>
      </div>

      {/* ── 缺口提示列 ── */}
      {nextLevel && (
        <div
          className="rounded-[6px] overflow-hidden"
          style={{ border: `1px solid ${T.borderLow}` }}
        >
          {/* 標題列：缺口金額 + 展開按鈕 */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              backgroundColor: "rgba(232, 242, 250, 1)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "rgba(0, 111, 188, 1)",
              borderTopWidth: 0,
              borderTopStyle: "none",
              borderTopColor: "rgba(0, 0, 0, 0)",
              borderRightWidth: 0,
              borderRightStyle: "none",
              borderRightColor: "rgba(0, 0, 0, 0)",
              borderLeftWidth: 0,
              borderLeftStyle: "none",
              borderLeftColor: "rgba(0, 0, 0, 0)",
              borderBottomColor: "rgba(0, 111, 188, 0.1)",
            }}
          >
            <span className="text-[15px]" style={{ color: T.textDefault }}>
              距離下一級還差{" "}
              <strong style={{ color: T.primary }}>TWD {formatTWD(gap)}</strong>
            </span>
            <button
              className="flex items-center gap-1 text-[14px] font-semibold"
              style={{ color: T.primary }}
              onClick={() => setGapOpen(!gapOpen)}
            >
              各險種換算實收年繳保費缺口
              {gapOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>

          {/* 展開：缺口換算表格 */}
          {gapOpen && <GapBreakdownTable gap={gap} />}
        </div>
      )}

      {/* ── 主約卡片清單 ── */}
      <div className="text-[15px] font-semibold" style={{ color: T.textDefault }}>
        輸入資訊開始試算：
      </div>
      <div className="flex flex-col gap-4">
        {policies.map((pol, idx) => (
          <PolicyCard
            key={pol.uid}
            pol={pol}
            index={idx}
            showDelete={policies.length > 1}
            onSelectProduct={onSelectProduct}
            onSelectPeriod={onSelectPeriod}
            onChangeRate={onChangeRate}
            onChangePremium={onChangePremium}
            onRemove={onRemovePolicy}
          />
        ))}
      </div>

      {/* ── 新增主約 ── */}
      <button
        className="w-full h-[44px] rounded-[6px] text-[15px] font-semibold flex items-center justify-center gap-1"
        style={{
          border: `1px solid ${T.primary}`,
          color: T.primary,
          backgroundColor: T.white,
        }}
        onClick={onAddPolicy}
      >
        + 新增主約
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 試算後 View
// ═══════════════════════════════════════════════════════════
function ResultView({
  currentLevel,
  currentPremium,
  result,
  benefitsOpen,
  setBenefitsOpen,
  policies,
  onSelectProduct,
  onSelectPeriod,
  onChangeRate,
  onChangePremium,
  onAddPolicy,
  onRemovePolicy,
}: {
  currentLevel: (typeof MEMBER_LEVELS)[number];
  currentPremium: number;
  result: CalcResult;
  benefitsOpen: boolean;
  setBenefitsOpen: (v: boolean) => void;
  policies: PolicyEntry[];
  onSelectProduct: (uid: number, id: string) => void;
  onSelectPeriod: (uid: number, p: string) => void;
  onChangeRate: (uid: number, v: string) => void;
  onChangePremium: (uid: number, v: string) => void;
  onAddPolicy: () => void;
  onRemovePolicy: (uid: number) => void;
}) {
  const projected = result.projectedLevel;
  const isUpgrade = result.willUpgrade;

  return (
    <div className="px-6 py-5 flex flex-col gap-5">
      {/* ── 等級比較 Header ── */}
      <div className="flex items-start justify-between">
        <div className="w-full flex items-center gap-3">
          {/* 當前等級 */}
          <div className="flex flex-col w-full">
            <div className="text-[12px]" style={{ color: T.textMedium }}>當前等級</div>
            <div className="text-[26px] font-bold" style={{ color: T.textDefault }}>
              {currentLevel.name}
            </div>
            <div className="text-[13px]" style={{ color: T.textMedium }}>
              當前資格保費 TWD {formatTWD(currentPremium)}
            </div>
          </div>

          <ArrowRight size={32} style={{ color: T.textMedium, marginTop: 8 }} />

          {/* 試算後等級 */}
          <div className="flex flex-col w-full">
            <div className="text-[12px]" style={{ color: T.textMedium }}>試算後等級</div>
            <div
              className="text-[26px] font-bold"
              style={{ color: isUpgrade ? T.primary : T.textDefault }}
            >
              {projected.name}
            </div>
            <div className="text-[13px]" style={{ color: T.textMedium }}>
              試算後總資格保費 TWD {formatTWD(result.totalPremium)}
            </div>
          </div>
        </div>

        {/* 建立建議書 */}
        <button
          className="w-[124px] px-3 h-[36px] rounded-[6px] text-[14px] font-semibold flex items-center gap-1"
          style={{ border: `1px solid ${T.primary}`, color: T.primary }}
        >
          + 建立建議書
        </button>
      </div>

      {/* ── 本次試算明細表格 ── */}
      <div
        className="rounded-[6px] overflow-hidden"
        style={{ border: `1px solid ${T.borderLow}` }}
      >
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr style={{ backgroundColor: T.bgTableHeader }}>
              {["商品名稱", "年期", "年繳/躉繳保費", "匯率", "商品類型權數", "商品年期權數", "資格保費"].map((h, hIdx) => (
                <th
                  key={h}
                  className="px-3 py-2 text-left font-semibold whitespace-nowrap"
                  style={{
                    color: T.textDark,
                    borderBottom: `1px solid ${T.borderLow}`,
                    // 第一欄以外加直行分隔線
                    borderLeft: hIdx > 0 ? `1px solid ${T.borderDefault}` : undefined,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.policyResults.map((r, rowIdx) => (
              // 奇偶列交替底色
              <tr
                key={r.uid}
                style={{
                  borderBottom: `1px solid ${T.borderLow}`,
                  backgroundColor: rowIdx % 2 === 0 ? T.white : T.bgLight,
                }}
              >
                <td className="px-3 py-2" style={{ color: T.textDefault }}>{r.shortName}</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>{r.paymentPeriod}</td>
                <td className="px-3 py-2 whitespace-nowrap" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>
                  {r.currency} {Number(r.annualPremium.replace(/,/g, "")).toLocaleString()}
                </td>
                <td className="px-3 py-2" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>x{r.rate}</td>
                <td className="px-3 py-2" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>x{r.typeWeightPct}</td>
                <td className="px-3 py-2" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>x{r.periodWeightPct}</td>
                <td className="px-3 py-2 font-semibold whitespace-nowrap" style={{ color: T.textDefault, borderLeft: `1px solid ${T.borderDefault}` }}>
                  TWD {formatTWD(r.calcPremium)}
                </td>
              </tr>
            ))}
            {/* 合計列：白底、保留直行分隔線 */}
            <tr>
              <td
                colSpan={6}
                className="px-3 py-2 font-semibold text-left"
                style={{ color: T.textDark, backgroundColor: T.white }}
              >
                本次試算資格保費加總
              </td>
              <td
                className="px-3 py-2 font-semibold"
                style={{ color: T.textDefault, backgroundColor: T.white, borderLeft: `1px solid ${T.borderDefault}` }}
              >
                TWD {formatTWD(result.additionalPremium)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── 各等級會員權益（可展開） ── */}
      <div className="rounded-[6px] overflow-hidden">
        <div
          className="rounded-[6px] overflow-hidden"
          style={{ border: `1px solid ${T.borderLow}` }}
        >
          <button
            className="w-full flex items-center justify-between px-4 py-3 font-semibold text-[15px]"
            style={{ backgroundColor: T.primaryLight, color: T.primary }}
            onClick={() => setBenefitsOpen(!benefitsOpen)}
          >
            各等級會員權益
            <span className="flex items-center gap-1 text-[14px]">
              權益一覽
              {benefitsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </button>

          {benefitsOpen && <BenefitsTable highlightKey={projected.key} />}
        </div>

        {benefitsOpen && (
          <div className="p-0" style={{ borderTop: "none", borderImage: "none" }}>
            <div className="flex items-start gap-2 mt-3">
              <Info size={14} style={{ color: T.textMedium, marginTop: 3, flexShrink: 0 }} />
              <ol
                className="text-[13px] leading-[20px] list-decimal list-outside pl-4 flex flex-col gap-[2px]"
                style={{ color: T.textMedium }}
              >
                <li>顯示內容為服務總覽，倘貴賓資格為升等，服務將以差額提供。</li>
                <li>會員禮：成為尊榮會員或會員生日時（會員資格期間），公司將致贈會員禮，每年度（曆年）限定領取一次，依據會員資格狀態，至多領取3年。</li>
                <li>首年禮：成為尊榮2星、尊榮3星、尊榮4星會員時，公司將致贈首年禮，兌換效期至服務起始日隔年12月31日止。</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* ── 分隔線 ── */}
      <div style={{ borderTop: `1px solid ${T.borderLow}` }} />

      {/* ── 繼續試算：主約卡片 ── */}
      <div className="flex flex-col gap-4">
        <div className="text-[15px] font-semibold" style={{ color: T.textDefault }}>
          輸入資訊開始試算：
        </div>
        {policies.map((pol, idx) => (
          <PolicyCard
            key={pol.uid}
            pol={pol}
            index={idx}
            showDelete={policies.length > 1}
            onSelectProduct={onSelectProduct}
            onSelectPeriod={onSelectPeriod}
            onChangeRate={onChangeRate}
            onChangePremium={onChangePremium}
            onRemove={onRemovePolicy}
          />
        ))}
        <button
          className="w-full h-[44px] rounded-[6px] text-[15px] font-semibold flex items-center justify-center"
          style={{ border: `1px solid ${T.primary}`, color: T.primary }}
          onClick={onAddPolicy}
        >
          + 新增主約
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 缺口換算表格
// ═══════════════════════════════════════════════════════════
function GapBreakdownTable({ gap }: { gap: number }) {
  function calcRequired(typeW: number, periodW: number) {
    return Math.ceil(gap / (typeW * periodW));
  }

  return (
    <div className="px-4 py-4" style={{ backgroundColor: "rgba(232, 242, 250, 1)" }}>
      <p className="text-[14px] mb-3" style={{ color: T.textMedium }}>
        如果要升等，新約保單的年繳保費需超過：
      </p>
      <div
        className="grid grid-cols-2 gap-4"
        style={{ padding: 12, backgroundColor: T.white, borderRadius: 4 }}
      >
        {/* A&H */}
        <div style={{ paddingRight: 8 }}>
          <div
            className="text-[14px] font-semibold mb-2"
            style={{ color: T.textDefault }}
          >
            A&H
          </div>
          <table className="w-full text-[14px]">
            <tbody>
              {AH_GAP_ROWS.map((row) => (
                <tr key={row.period}>
                  <td className="py-1" style={{ color: T.textMedium }}>{row.period}</td>
                  <td className="py-1 text-right font-semibold" style={{ color: T.textDefault }}>
                    {formatTWD(calcRequired(row.typeWeight, row.periodWeight))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 其他商品 */}
        <div style={{ borderLeft: "1px solid rgba(60, 60, 60, 0.1)", paddingLeft: 16 }}>
          <div
            className="text-[14px] font-semibold mb-2"
            style={{ color: T.textDefault }}
          >
            其他商品
          </div>
          <table className="w-full text-[14px]">
            <tbody>
              {OTHER_GAP_ROWS.map((row) => (
                <tr key={row.period}>
                  <td className="py-1" style={{ color: T.textMedium }}>{row.period}</td>
                  <td className="py-1 text-right font-semibold" style={{ color: T.textDefault }}>
                    {formatTWD(calcRequired(row.typeWeight, row.periodWeight))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 會員權益對照表
// ═══════════════════════════════════════════════════════════
function BenefitsTable({ highlightKey }: { highlightKey: string }) {
  const categories = Array.from(new Set(MEMBER_BENEFITS.map((b) => b.category)));

  // 攤平所有列，方便取得全域 rowIndex 與判斷最後一列
  const allRows = categories.flatMap((cat) => {
    const rows = MEMBER_BENEFITS.filter((b) => b.category === cat);
    return rows.map((b, ri) => ({ cat, b, ri, catRowCount: rows.length }));
  });
  const totalRows = allRows.length;

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <table className="w-full border-collapse text-[14px]">
          <thead>
            <tr style={{ backgroundColor: T.bgTableHeader }}>
              <th
                colSpan={2}
                className="px-3 py-2 text-left font-semibold"
                style={{ color: T.textDark, borderBottom: `1px solid ${T.borderLow}`, width: 248 }}
              >
                會員權益
              </th>
              {MEMBER_LEVELS.map((lv) => {
                const isHL = lv.key === highlightKey;
                return (
                  <th
                    key={lv.key}
                    className="px-3 py-2 text-center font-semibold whitespace-nowrap"
                    style={{
                      // highlight 欄：藍底白字 + 2px 藍框；其他欄：正常表頭底色 + 1px 分隔線
                      color: isHL ? T.textWhite : T.textDark,
                      backgroundColor: isHL ? "#0099e0" : T.bgTableHeader,
                      borderBottom: `1px solid ${T.borderLow}`,
                      borderLeft: isHL ? `2px solid #0099e0` : `1px solid ${T.borderDefault}`,
                      borderTop: isHL ? `2px solid #0099e0` : undefined,
                      borderRight: isHL ? `2px solid #0099e0` : undefined,
                    }}
                  >
                    {lv.name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {allRows.map(({ cat, b, ri, catRowCount }, rowIdx) => {
              const isLastRow = rowIdx === totalRows - 1;
              // 奇偶列交替底色
              const rowBg = rowIdx % 2 === 0 ? T.white : T.bgLight;
              return (
                <tr
                  key={`${cat}-${ri}`}
                  style={{ borderBottom: `1px solid ${T.borderLow}` }}
                >
                  {/* 類別欄：只在分組第一列顯示，固定淺灰底色（跨列無法交替） */}
                  {ri === 0 && (
                    <td
                      rowSpan={catRowCount}
                      className="px-3 py-2 font-semibold align-middle"
                      style={{
                        width: 160,
                        color: T.textDefault,
                        backgroundColor: T.bgLight,
                        borderRight: `1px solid ${T.borderDefault}`,
                        verticalAlign: "middle",
                      }}
                    >
                      {cat}
                    </td>
                  )}
                  {/* 子類別 */}
                  <td
                    className="px-3 py-2"
                    style={{
                      color: T.textMedium,
                      backgroundColor: rowBg,
                      borderRight: `1px solid ${T.borderDefault}`,
                    }}
                  >
                    {b.sub ?? ""}
                  </td>
                  {/* 各等級值 */}
                  {MEMBER_LEVELS.map((lv) => {
                    const isHL = lv.key === highlightKey;
                    const val = b.vals[lv.key as keyof typeof b.vals];
                    return (
                      <td
                        key={lv.key}
                        className="px-3 py-2 text-center"
                        style={{
                          backgroundColor: rowBg,
                          // highlight 欄：左右 2px 藍框，最後一列額外加底部藍框
                          borderLeft: isHL ? `2px solid #0099e0` : `1px solid ${T.borderDefault}`,
                          borderRight: isHL ? `2px solid #0099e0` : undefined,
                          borderBottom: isHL && isLastRow ? `2px solid #0099e0` : undefined,
                        }}
                      >
                        {val === "check" ? (
                          <Check
                            size={16}
                            className="mx-auto"
                            style={{ color: T.success }}
                          />
                        ) : (
                          <span style={{ color: T.textDefault }}>{val ?? ""}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </>
  );
}

// ═══════════════════════════════════════════════════════════
// 主約卡片
// ═══════════════════════════════════════════════════════════
function PolicyCard({
  pol,
  index,
  showDelete,
  onSelectProduct,
  onSelectPeriod,
  onChangeRate,
  onChangePremium,
  onRemove,
}: {
  pol: PolicyEntry;
  index: number;
  showDelete: boolean;
  onSelectProduct: (uid: number, id: string) => void;
  onSelectPeriod: (uid: number, p: string) => void;
  onChangeRate: (uid: number, v: string) => void;
  onChangePremium: (uid: number, v: string) => void;
  onRemove: (uid: number) => void;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const product = PRODUCTS.find((p) => p.id === pol.productId);

  const inputStyle = (disabled: boolean): React.CSSProperties => ({
    height: 40,
    border: `1px solid ${T.borderDefault}`,
    borderRadius: 6,
    padding: "0 10px",
    fontSize: 15,
    color: disabled ? T.textDisabled : T.textDefault,
    backgroundColor: disabled ? T.borderLow : T.white,
    width: "100%",
    fontFamily: "'PingFang TC', sans-serif",
    outline: "none",
  });

  return (
    <>
    <div
      className="rounded-[8px] px-4 py-4 flex flex-col gap-4"
      style={{ border: `1px solid ${T.borderLow}`, backgroundColor: T.bgLight }}
    >
      {/* 標題 + 刪除 */}
      <div className="flex items-center justify-between">
        <span className="text-[15px] font-semibold" style={{ color: T.textDefault }}>
          主約{["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"][index] ?? index + 1}
        </span>
        {showDelete && (
          <button
            className="flex items-center gap-1 text-[13px] font-semibold"
            style={{ color: T.error }}
            onClick={() => setShowConfirm(true)}
          >
            <Trash2 size={14} />
            刪除
          </button>
        )}
      </div>

      {/* 上排：主約商品 × 繳費年期 × 幣別 */}
      <div className="grid grid-cols-3 gap-3">
        {/* 主約商品 */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-semibold" style={{ color: T.textDefault }}>
            主約商品 <span style={{ color: T.error }}>*</span>
          </label>
          <div className="relative">
            <select
              value={pol.productId}
              onChange={(e) => onSelectProduct(pol.uid, e.target.value)}
              style={{ ...inputStyle(false), paddingRight: 28, appearance: "none" }}
            >
              <option value="">選擇主約</option>
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {`${p.shortName} ${p.name}`}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: T.textMedium }}
            />
          </div>
          {pol.errors.product && (
            <span className="text-[12px]" style={{ color: T.error }}>{pol.errors.product}</span>
          )}
        </div>

        {/* 繳費年期 */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-semibold" style={{ color: T.textDefault }}>
            繳費年期 <span style={{ color: T.error }}>*</span>
          </label>
          <div className="relative">
            <select
              value={pol.paymentPeriod}
              disabled={!pol.productId}
              onChange={(e) => onSelectPeriod(pol.uid, e.target.value)}
              style={{ ...inputStyle(!pol.productId), paddingRight: 28, appearance: "none" }}
            >
              <option value="">選擇繳費年期</option>
              {product?.paymentPeriods.map((pp) => (
                <option key={pp} value={pp}>{pp}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: T.textMedium }}
            />
          </div>
          {pol.errors.paymentPeriod && (
            <span className="text-[12px]" style={{ color: T.error }}>{pol.errors.paymentPeriod}</span>
          )}
        </div>

        {/* 幣別（disabled） */}
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-semibold" style={{ color: T.textDefault }}>幣別</label>
          <div className="relative">
            <select
              value={pol.currency}
              disabled
              style={{ ...inputStyle(true), paddingRight: 28, appearance: "none" }}
            >
              <option value="">{pol.productId ? "請選擇幣別" : ""}</option>
              {pol.currency && (
                <option value={pol.currency}>{pol.currencyLabel}</option>
              )}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: T.textMedium }}
            />
          </div>
        </div>
      </div>

      {/* 下排：資格保費公式 */}
      <div className="flex flex-col gap-1">
        <label className="text-[13px] font-semibold" style={{ color: T.textDefault }}>
          資格保費 =
        </label>
        <div className="flex items-center gap-2">
          {/* 年繳保費 */}
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-[12px]" style={{ color: T.textMedium }}>
              年繳保費（原幣別）<span style={{ color: T.error }}>*</span>
            </label>
            <input
              value={pol.annualPremium}
              onChange={(e) => onChangePremium(pol.uid, e.target.value)}
              placeholder="輸入年繳保費"
              style={inputStyle(false)}
            />
            {pol.errors.annualPremium && (
              <span className="text-[12px]" style={{ color: T.error }}>{pol.errors.annualPremium}</span>
            )}
          </div>

          <span className="text-[16px] mt-4" style={{ color: T.textMedium }}>×</span>

          {/* 匯率 */}
          <div className="flex flex-col gap-1 w-[100px]">
            <label className="text-[12px]" style={{ color: T.textMedium }}>
              匯率 <span style={{ color: T.error }}>*</span>
            </label>
            <input
              value={pol.rate}
              disabled={!pol.productId}
              onChange={(e) => onChangeRate(pol.uid, e.target.value)}
              placeholder="輸入匯率"
              style={inputStyle(!pol.productId)}
            />
          </div>

          <span className="text-[16px] mt-4" style={{ color: T.textMedium }}>×</span>

          {/* 商品類型權數（disabled） */}
          <div className="flex flex-col gap-1 w-[110px]">
            <label className="text-[12px]" style={{ color: T.textMedium }}>商品類型權數</label>
            <input
              disabled
              value={pol.productTypeWeight ? `${pol.productTypeWeight}` : ""}
              style={inputStyle(true)}
            />
          </div>

          <span className="text-[16px] mt-4" style={{ color: T.textMedium }}>×</span>

          {/* 商品年期權數（disabled） */}
          <div className="flex flex-col gap-1 w-[110px]">
            <label className="text-[12px]" style={{ color: T.textMedium }}>商品年期權數</label>
            <input
              disabled
              value={pol.periodWeight ? `${Math.round(pol.periodWeight * 100)}%` : ""}
              style={inputStyle(true)}
            />
          </div>
        </div>
      </div>
    </div>

    {/* 刪除確認彈窗 */}
    {showConfirm && createPortal(
      <div
        className="fixed inset-0 z-[300] flex items-center justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      >
        <div
          className="flex flex-col rounded-[12px] overflow-hidden"
          style={{
            backgroundColor: T.white,
            width: 280,
            boxShadow: "0px 2px 4px 0px rgba(59,66,70,0.08)",
          }}
        >
          {/* 圖示 + 標題 */}
          <div className="flex flex-col items-center gap-4 p-4">
            {/* 警告圖示：外圈淡紅 + 內圈實心紅 + 白色驚嘆號 */}
            <div
              className="size-24 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#fce8e6" }}
            >
              <div
                className="size-[72px] rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#e60013" }}
              >
                <span
                  className="text-white font-black text-[36px] leading-none select-none"
                  style={{ fontFamily: "sans-serif" }}
                >
                  !
                </span>
              </div>
            </div>
            <p
              className="text-center font-semibold text-[20px] leading-8 w-full"
              style={{ color: T.textDefault, fontFamily: "'PingFang TC', sans-serif" }}
            >
              確定要刪除此主約嗎？
            </p>
          </div>
          {/* 按鈕區 */}
          <div className="flex gap-4 p-4">
            <button
              className="flex-1 h-12 flex items-center justify-center rounded-[6px] font-semibold text-[18px]"
              style={{
                border: `1px solid ${T.primary}`,
                color: T.primary,
                fontFamily: "'PingFang TC', sans-serif",
              }}
              onClick={() => setShowConfirm(false)}
            >
              返回
            </button>
            <button
              className="flex-1 h-12 flex items-center justify-center rounded-[6px] font-semibold text-[18px]"
              style={{
                backgroundColor: "#e60013",
                color: T.white,
                fontFamily: "'PingFang TC', sans-serif",
              }}
              onClick={() => {
                onRemove(pol.uid);
                setShowConfirm(false);
              }}
            >
              確定刪除
            </button>
          </div>
        </div>
      </div>,
      document.body
    )}
    </>
  );
}
