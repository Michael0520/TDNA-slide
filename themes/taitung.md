---
name: "Taitung Workshop"
description: "深色 tech 投影簡報主題 — near-black 背景、Claude orange accent、B1/B2/B3 三段各有 block 色、大字留白、輕量淡入。新手友善的講解型 deck。"
---

# Taitung Workshop

為「From Vibe to Spec — Ship Your First Personal Site with AI」台東 workshop 設計的深色投影主題。一張一重點、大字、留白；中文為主，技術名詞保留英文。三個 block（懂 / 做 / 驗）用不同 accent 色區分，整體保持一致。

## Palette

| Role          | Value     | Notes                                            |
| ------------- | --------- | ------------------------------------------------ |
| bg            | `#0E0E10` | near-black 主背景                                 |
| surface       | `#1A1A1F` | 卡片 / code block / window mockup 底              |
| border        | `#2A2A30` | 卡片與分隔線                                       |
| text          | `#F5F4F2` | 主要文字（暖白）                                   |
| muted         | `#9A9A9F` | 次要文字、caption、footer                          |
| accent        | `#D97757` | 主 accent（Claude orange）— 全域一致              |
| accentB1      | `#D97757` | B1「懂」段 accent = Claude orange（理解 / 觀念）  |
| accentB2      | `#4ADE80` | B2「做」段 accent = 綠（ship / 動手 / go）         |
| accentB3      | `#7AA2F7` | B3「驗」段 accent = 藍（數據 / 系統 / 驗證）        |
| code          | `#E6E6E6` | code block 文字                                    |
| codeGreen     | `#7EE787` | 終端機 success 行 / check icon                     |

主 accent 永遠是 Claude orange `#D97757`。Block accent 只用在該 block 的 eyebrow、章節色條、關鍵字 highlight；body 與背景三段一致，保持整體統一。

## Typography

- Display font: `"PingFang TC", "Noto Sans TC", -apple-system, "Inter", system-ui, sans-serif` — 中文標題用 weight 800–900。
- Body font: 同一 stack — weight 400–500。
- Mono font: `"SF Mono", "JetBrains Mono", "Fira Code", ui-monospace, monospace` — 指令 / code / 終端機。
- Type-scale（1920×1080，投影遠看）：
  - Hero title（封面 / 全幅大字）：150 px
  - Section heading（章節）：96 px
  - Page heading（一般頁標題）：68 px
  - Body：38 px
  - Caption / label / eyebrow：26 px
  - Mono code：30 px

## Layout

- Content padding：120 px from canvas edges（1920 × 1080）。
- Alignment：左對齊單欄為主（editorial 感）；「核心一句話」與封面置中。
- 對照類內容（vibe vs AI、無 MCP vs 有 MCP、缺了會怎樣）用左右並排兩欄，gap 64 px。
- Eyebrow（章節 / block 標籤）放標題上方，letter-spacing 0.2em，用該 block 的 accent 色。
- 互動點：放一個明顯的舉手 chip（accent 邊框 + 半透明底 + 內嵌 lucide `hand` SVG）。不用 emoji。

## Fixed components

These are paste-ready. Copy them verbatim into a slide that uses this theme.

### Title

```tsx
const Title = ({ children, size = 68 }: { children: React.ReactNode; size?: number }) => (
  <h1
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 800,
      lineHeight: 1.12,
      letterSpacing: '-0.01em',
      margin: 0,
      color: 'var(--osd-text)',
    }}
  >
    {children}
  </h1>
);
```

### Eyebrow

Block 標籤，傳入該 block 的 accent 色。

```tsx
const Eyebrow = ({ children, color = '#D97757' }: { children: React.ReactNode; color?: string }) => (
  <div
    style={{
      fontFamily: 'var(--osd-font-body)',
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '0.2em',
      color,
      marginBottom: 28,
    }}
  >
    {children}
  </div>
);
```

### Footer

Pull the page number from `useSlidePageNumber()` — never hardcode.

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = ({ accent = '#D97757' }: { accent?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--osd-font-body)',
        fontSize: 24,
        color: '#9A9A9F',
      }}
    >
      <span>From Vibe to Spec · Code for Taiwan · TDF 台東</span>
      <span>
        <span style={{ color: accent, fontWeight: 700 }}>{String(current).padStart(2, '0')}</span>
        {' / '}
        {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};
```

### HandUp（互動點 chip）

互動點用內嵌的 lucide `hand` SVG（不 import 套件，符合 slide 契約）。整個 deck 不用 emoji。

```tsx
// 內嵌 lucide "hand"（lucide.dev, ISC）
const HandIcon = ({ size = 36, color = '#D97757' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
       strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);

const HandUp = ({ children, accent = '#D97757' }: { children: React.ReactNode; accent?: string }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16,
      padding: '16px 28px',
      borderRadius: 14,
      border: `2px solid ${accent}`,
      background: `${accent}1A`,
      fontFamily: 'var(--osd-font-body)',
      fontSize: 30,
      fontWeight: 600,
      color: 'var(--osd-text)',
    }}
  >
    <HandIcon size={36} color={accent} />
    {children}
  </div>
);
```

### WindowShell（終端機 / 瀏覽器 mockup 外框）

```tsx
const WindowShell = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div
    style={{
      borderRadius: 16,
      border: '1px solid #2A2A30',
      background: '#1A1A1F',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '18px 24px',
        borderBottom: '1px solid #2A2A30',
      }}
    >
      <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#FF5F57' }} />
      <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#FEBC2E' }} />
      <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#28C840' }} />
      <span style={{ marginLeft: 'auto', fontFamily: 'var(--osd-font-body)', fontSize: 22, color: '#9A9A9F' }}>
        {label}
      </span>
    </div>
    <div style={{ padding: 36 }}>{children}</div>
  </div>
);
```

## Motion

- Philosophy: **subtle** — 只做進場淡入上移，無循環動畫；現場投影不分心、不會頻頻動。
- Reusable keyframes（paste-ready）:

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

每頁根節點掛一個共用 `styles` string（內含上面的 keyframes），主要元素加 `animation: 'fadeUp 0.5s ease both'`，可用 `animationDelay` 做輕量 stagger（0 / 0.08 / 0.16s）。

## Aesthetic

深色技術 editorial。near-black 背景、暖白文字、Claude orange 為核心 accent，三個 block 用 orange/green/blue 區分。大字、大量留白、左對齊單欄；指令與 code 用 monospace window mockup 呈現，帶 macOS 紅黃綠交通燈。整體像一份乾淨、有自信、不花俏的技術簡報。圖示一律用內嵌 lucide SVG（不用 emoji、不 import 套件）。避免：漸層、圓角過度、emoji、陰影堆疊、亮色背景。

## Example usage

```tsx
const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%', background: 'var(--osd-bg)', color: 'var(--osd-text)', padding: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: 'var(--osd-font-body)' }}>
    <Eyebrow color="#D97757">B1 · 懂 · 14:00</Eyebrow>
    <Title size={150}>From Vibe to Spec</Title>
    <p style={{ fontSize: 38, color: 'var(--osd-muted)', maxWidth: 1300, marginTop: 32 }}>
      Ship Your First Personal Site with AI
    </p>
    <Footer accent="#D97757" />
  </div>
);
```
