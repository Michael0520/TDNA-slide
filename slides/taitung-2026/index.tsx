import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';
import claudeLogo from '@assets/logos/claude.svg';
import vercelLogo from '@assets/logos/vercel.svg';
import githubLogo from '@assets/logos/github.svg';
import posthogLogo from '@assets/logos/posthog-full.png';
import mcpArchitecture from './assets/mcp-architecture.webp';

export const design: DesignSystem = {
  palette: { bg: '#0E0E10', text: '#F5F4F2', accent: '#D97757' },
  fonts: {
    display: '"PingFang TC", "Noto Sans TC", -apple-system, "Inter", system-ui, sans-serif',
    body: '"PingFang TC", "Noto Sans TC", -apple-system, "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 150, body: 38 },
  radius: 16,
};

/* ── palette extensions (outside DesignSystem shape) ── */
const muted = '#9A9A9F';
const surface = '#1A1A1F';
const border = '#2A2A30';
const accentB1 = '#D97757'; // 懂 — Claude orange
const accentB2 = '#4ADE80'; // 做 — green / ship / go
const accentB3 = '#7AA2F7'; // 驗 — blue / data / system
const codeText = '#E6E6E6';
const codeGreen = '#7EE787';
const mono = '"SF Mono", "JetBrains Mono", "Fira Code", ui-monospace, monospace';

const styles = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  position: 'relative' as const,
} as const;

/* ── shared fixed components (from themes/taitung.md) ── */
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

const Eyebrow = ({ children, color = accentB1 }: { children: React.ReactNode; color?: string }) => (
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

const Footer = ({ accent = accentB1 }: { accent?: string }) => {
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
        color: muted,
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

const HandUp = ({ children, accent = accentB1 }: { children: React.ReactNode; accent?: string }) => (
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
    <Icon name="hand" size={36} color={accent} />
    {children}
  </div>
);

const WindowShell = ({
  label,
  accent = accentB1,
  children,
}: {
  label: string;
  accent?: string;
  children: React.ReactNode;
}) => (
  <div style={{ borderRadius: 16, border: `1px solid ${border}`, background: surface, overflow: 'hidden' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '18px 24px',
        borderBottom: `1px solid ${border}`,
      }}
    >
      <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#FF5F57' }} />
      <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#FEBC2E' }} />
      <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#28C840' }} />
      <span style={{ marginLeft: 'auto', fontFamily: 'var(--osd-font-body)', fontSize: 22, color: muted }}>
        {label}
      </span>
    </div>
    <div style={{ padding: 36, fontFamily: mono, fontSize: 30, lineHeight: 1.6, color: codeText }}>{children}</div>
  </div>
);

/* ── Icons (inlined lucide SVG paths — lucide.dev, ISC; no package import) ── */
type IconName = 'hand' | 'check' | 'arrow-right';
const ICON_PATHS: Record<IconName, React.ReactNode> = {
  // lucide "hand"
  hand: (
    <>
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </>
  ),
  // lucide "check"
  check: <path d="M20 6 9 17l-5-5" />,
  // lucide "arrow-right"
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
};

const Icon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2 }: { name: IconName; size?: number; color?: string; strokeWidth?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, display: 'block' }}
    aria-hidden="true"
  >
    {ICON_PATHS[name]}
  </svg>
);

/* ── Logo tile: a brand logo on a surface card with a caption ── */
const LogoTile = ({
  src,
  alt,
  caption,
  accent,
  pad = 28,
}: {
  src: string;
  alt: string;
  caption?: string;
  accent: string;
  pad?: number;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18,
    }}
  >
    <div
      style={{
        width: 160,
        height: 160,
        borderRadius: 24,
        background: surface,
        border: `1px solid ${border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: pad,
      }}
    >
      <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
    </div>
    {caption && <span style={{ fontSize: 28, fontWeight: 600, color: accent }}>{caption}</span>}
  </div>
);

/* ── A page-content shell: eyebrow + heading at top, footer at bottom. ── */
const PageHead = ({
  eyebrow,
  eyebrowColor = accentB1,
  children,
}: {
  eyebrow: string;
  eyebrowColor?: string;
  children: React.ReactNode;
}) => (
  <div style={{ animation: 'fadeUp 0.5s ease both' }}>
    <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
    <Title>{children}</Title>
  </div>
);

/* ════════════════════════════════════════════════════════
   B1 · 懂 (slides 1–22) — accent: Claude orange
   ════════════════════════════════════════════════════════ */

/* S1 — 封面 */
const S1: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB1}>Code for Taiwan · TDF 台東 · 14:00–17:00</Eyebrow>
    </div>
    <div style={{ animation: 'fadeUp 0.5s ease 0.08s both' }}>
      <Title size={150}>
        From Vibe<br />to <span style={{ color: accentB1 }}>Spec</span>
      </Title>
    </div>
    <p style={{ fontSize: 44, color: 'var(--osd-text)', marginTop: 40, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      Ship Your First Personal Site with AI
    </p>
    <p style={{ fontSize: 32, color: muted, marginTop: 16, animation: 'fadeUp 0.5s ease 0.22s both' }}>
      主講：Michael Lo · Sr. Software Engineer @ Moxa · Code for Taiwan
    </p>
  </div>
);

/* S2 — 自我介紹 */
const S2: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="自我介紹">嗨，我是 Michael</PageHead>
    <ul style={{ fontSize: 40, lineHeight: 1.7, marginTop: 56, paddingLeft: 40, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <li>在 <span style={{ color: accentB1 }}>Moxa</span> 寫 Angular / React</li>
      <li><span style={{ color: accentB1 }}>Code for Taiwan</span> 社群組織者</li>
      <li>今天負責下午這 3 小時</li>
    </ul>
    <Footer />
  </div>
);

/* S3 — 場域 + 承諾 */
const S3: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="場域 + 承諾">把作品 ship 出去</PageHead>
    <p style={{ fontSize: 38, lineHeight: 1.6, color: muted, maxWidth: 1500, marginTop: 48, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <span style={{ color: accentB1, fontWeight: 700 }}>ship</span> = 把東西做出來、放到網路上讓別人看得到。
    </p>
    <p style={{ fontSize: 40, lineHeight: 1.6, maxWidth: 1500, marginTop: 32, animation: 'fadeUp 0.5s ease 0.18s both' }}>
      3 小時後你帶走的不是一個成品，是一套<span style={{ color: accentB1 }}>「用 AI 把東西做出來」的工作方式</span>。
    </p>
    <Footer />
  </div>
);

/* S4 — 兩個舉手 */
const S4: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="先做兩個小調查">換你舉手</PageHead>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 64, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <HandUp>過去 12 個月，用 AI 寫過 code？</HandUp>
      <HandUp>用 AI 把網站 ship 上線過？</HandUp>
    </div>
    <Footer />
  </div>
);

/* S5 — 今天最重要的分界線 */
const S5: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB1}>今天最重要的一條線</Eyebrow>
    </div>
    <Title size={110}>
      用 AI 寫 code，<br />其實有<span style={{ color: accentB1 }}>兩種 mode</span>。
    </Title>
    <Footer />
  </div>
);

/* S6 / S7 — Vibe / AI Coding 對照卡 */
const ModeCard = ({
  tag,
  color,
  who,
  lines,
}: {
  tag: string;
  color: string;
  who: string;
  lines: string[];
}) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 56 }}>
    <div style={{ fontSize: 44, fontWeight: 800, color, fontFamily: 'var(--osd-font-display)' }}>{tag}</div>
    <div style={{ fontSize: 30, color, marginTop: 8, marginBottom: 36, fontWeight: 600 }}>{who}</div>
    {lines.map((l) => (
      <p key={l} style={{ fontSize: 34, lineHeight: 1.5, margin: '0 0 18px' }}>{l}</p>
    ))}
  </div>
);

const S6: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="兩種 mode · 誰主導？">Vibe vs AI Coding</PageHead>
    <div style={{ display: 'flex', gap: 48, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <ModeCard
        tag="Vibe Coding"
        color={accentB1}
        who="→ AI 主導"
        lines={['你跟 AI 聊聊聊', 'AI 給什麼，你就收什麼', '能跑就好']}
      />
      <ModeCard
        tag="AI Coding"
        color={accentB2}
        who="→ 人主導"
        lines={['你知道目標', '主動選方案、敢拒絕', '關鍵時刻你介入']}
      />
    </div>
    <Footer />
  </div>
);

/* S8 — 一句話分（全幅大字） */
const S8: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <Title size={104}>
      <span style={{ color: accentB1 }}>Vibe</span> 是 AI 主導，<br />
      <span style={{ color: accentB2 }}>AI Coding</span> 是人主導。
    </Title>
    <p style={{ fontSize: 48, color: muted, marginTop: 48, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      AI 是工具，<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>你是決策者</span>。
    </p>
    <Footer />
  </div>
);

/* S9 — 不是對立 */
const SituationCard = ({ color, head, body }: { color: string; head: string; body: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 48 }}>
    <div style={{ fontSize: 34, fontWeight: 700, color, marginBottom: 20 }}>{head}</div>
    <p style={{ fontSize: 32, lineHeight: 1.5, margin: 0, color: 'var(--osd-text)' }}>{body}</p>
  </div>
);

const S9: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="不是對立，是兩種 mode">看情境，學會切換</PageHead>
    <div style={{ display: 'flex', gap: 64, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <SituationCard color={accentB1} head="用 Vibe" body="玩具、驗證 idea、週末小專案 — 門檻低、產出快。" />
      <SituationCard color={accentB2} head="用 AI Coding" body="長期維護、要上線給人用、任何商業專案。" />
    </div>
    <p style={{ fontSize: 36, color: muted, marginTop: 48, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      今天的目標：帶你<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>從第一種，走到第二種</span>。
    </p>
    <Footer />
  </div>
);

/* S10 — 5 era timeline */
const EraStep = ({ label, active = false }: { label: string; active?: boolean }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: active ? accentB1 : surface,
        border: `2px solid ${active ? accentB1 : border}`,
      }}
    />
    <span style={{ fontSize: 30, fontWeight: active ? 800 : 500, color: active ? accentB1 : muted }}>{label}</span>
  </div>
);

const S10: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="30 秒 AI coding 史（不用記）">工具走到哪了</PageHead>
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
        marginTop: 80,
        animation: 'fadeUp 0.5s ease 0.12s both',
      }}
    >
      <div style={{ position: 'absolute', top: 13, left: 40, right: 40, height: 2, background: border }} />
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <EraStep label="Prompt" />
        <EraStep label="Context" />
        <EraStep label="Tool Use" />
        <EraStep label="MCP" />
        <EraStep label="SDD" active />
      </div>
    </div>
    <p style={{ fontSize: 36, color: muted, marginTop: 80, maxWidth: 1500, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      前四個解「AI <span style={{ color: 'var(--osd-text)' }}>怎麼動</span>」，現在這個解「AI <span style={{ color: accentB1, fontWeight: 700 }}>該動什麼</span>」。
    </p>
    <Footer />
  </div>
);

/* S11 — 舉手：Claude / Plan Mode */
const S11: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="段 2 · 怎麼驅動 Claude">先問一下</PageHead>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 64, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <HandUp>用過 Claude 寫東西？</HandUp>
      <HandUp>用過 Plan Mode？</HandUp>
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 48, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      沒用過沒關係，這段從頭講。
    </p>
    <Footer />
  </div>
);

/* S12 — Claude 三種輸入 */
const InputCard = ({ n, head, body }: { n: string; head: string; body: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 44 }}>
    <div style={{ fontSize: 30, color: accentB1, fontFamily: mono, marginBottom: 18 }}>{n}</div>
    <div style={{ fontSize: 38, fontWeight: 700, marginBottom: 16 }}>{head}</div>
    <p style={{ fontSize: 30, lineHeight: 1.5, color: muted, margin: 0 }}>{body}</p>
  </div>
);

const S12: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="驅動 Claude 的三種輸入">對話 / 檔案 / 指令</PageHead>
    <div style={{ display: 'flex', gap: 48, marginTop: 64, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <InputCard n="01" head="對話" body="打字跟它講你要什麼。大家都會。" />
      <InputCard n="02" head="給它檔案" body="丟檔案、截圖給它看 — 截圖比文字描述快很多。" />
      <InputCard n="03" head="/ 指令" body="打一個斜線，叫出預設好的動作（很多來自 skill）。" />
    </div>
    <Footer />
  </div>
);

/* S13 — Plan Mode（主打） */
const S13: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="最該學的一個習慣">Plan Mode</PageHead>
    <div style={{ display: 'flex', gap: 64, marginTop: 56, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.1s both' }}>
        <WindowShell label="Claude Code">
          <div style={{ color: muted }}>連按兩次 <span style={{ color: accentB1 }}>Shift + Tab</span></div>
          <div style={{ color: muted }}>或輸入 <span style={{ color: accentB1 }}>/plan</span></div>
          <div style={{ marginTop: 20, color: codeGreen }}>→ AI 先給計畫，不直接動手</div>
          <div style={{ color: codeText }}>　做什麼 · 改哪些檔 · 什麼順序</div>
          <div style={{ marginTop: 20, color: codeText }}>你核可 → 才執行</div>
        </WindowShell>
      </div>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.2s both' }}>
        <p style={{ fontSize: 36, lineHeight: 1.55, marginTop: 0 }}>
          動手前先給計畫，就是 vibe coding <span style={{ color: accentB1 }}>不會做的事</span>。
        </p>
        <ul style={{ fontSize: 32, lineHeight: 1.6, paddingLeft: 36, color: muted }}>
          <li>偏了 / 想太多 → 計畫階段就擋下</li>
          <li>核可後不會邊做邊發明</li>
        </ul>
      </div>
    </div>
    <p style={{ fontSize: 40, color: accentB1, fontWeight: 700, marginTop: 40, animation: 'fadeUp 0.5s ease 0.28s both' }}>
      動手前先給計畫，不要邊做邊發明。
    </p>
    <Footer />
  </div>
);

/* S14 — Desktop 沒原生 Plan Mode */
const S14: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="預告段 4">Desktop 沒有 Plan Mode</PageHead>
    <p style={{ fontSize: 40, lineHeight: 1.6, maxWidth: 1500, marginTop: 48, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      第二小時用的 Claude Desktop 沒有原生 Plan Mode。
    </p>
    <p style={{ fontSize: 40, lineHeight: 1.6, maxWidth: 1500, marginTop: 24, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      但精神一樣 — 你先寫清楚要什麼，AI 才動。那個東西叫 <span style={{ color: accentB1, fontWeight: 700 }}>spec</span>（段 4 講）。
    </p>
    <Footer />
  </div>
);

/* S15 — Desktop 三件套大圖 */
const TripletCard = ({ name, sub }: { name: string; sub: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 48, textAlign: 'center' }}>
    <div style={{ fontSize: 46, fontWeight: 800, color: accentB1, fontFamily: 'var(--osd-font-display)' }}>{name}</div>
    <p style={{ fontSize: 30, color: muted, marginTop: 20, marginBottom: 0, lineHeight: 1.4 }}>{sub}</p>
  </div>
);

const S15: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="段 3 · Claude Desktop 三件套">不只是更漂亮的 chat</PageHead>
    <div style={{ display: 'flex', gap: 48, marginTop: 72, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <TripletCard name="MCP" sub="讓 AI 有手" />
      <TripletCard name="Skills" sub="預打包的能力" />
      <TripletCard name="Artifacts" sub="可重用的工件" />
    </div>
    <p style={{ fontSize: 36, color: muted, marginTop: 56, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      Desktop 是一個<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>工作環境</span>，不是更漂亮的 chat。
    </p>
    <Footer />
  </div>
);

/* S16 — MCP 對照 */
/* MCP 連接示意：Claude ──MCP── 你的資料夾 */
const McpBridge = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 130, height: 130, borderRadius: 22, background: surface, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 26, boxSizing: 'border-box' }}>
        <img src={claudeLogo} alt="Claude" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <span style={{ fontSize: 26, color: muted }}>Claude</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 24, fontWeight: 700, color: accentB1, letterSpacing: '0.1em' }}>MCP</span>
      <div style={{ display: 'flex', alignItems: 'center', color: accentB1 }}>
        <span style={{ width: 90, height: 2, background: accentB1 }} />
        <Icon name="arrow-right" size={26} color={accentB1} />
      </div>
      <span style={{ fontSize: 22, color: muted }}>讀寫檔案</span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 130, height: 130, borderRadius: 22, background: surface, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentB1 }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </svg>
      </div>
      <span style={{ fontSize: 26, color: muted }}>你的資料夾</span>
    </div>
  </div>
);

const S16: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="MCP = USB-C for AI（Anthropic 官方比喻）">讓 AI 有手</PageHead>
    <div style={{ marginTop: 40, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <McpBridge />
    </div>
    <div style={{ display: 'flex', gap: 48, marginTop: 44, animation: 'fadeUp 0.5s ease 0.18s both' }}>
      <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: '28px 36px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: muted, marginBottom: 12 }}>無 MCP</div>
        <p style={{ fontSize: 28, lineHeight: 1.5, margin: 0, color: muted }}>貼檔 → 改 → 貼回 → 跑 → 截圖（5 步）</p>
      </div>
      <div style={{ flex: 1, background: surface, border: `1px solid ${accentB1}`, borderRadius: 16, padding: '28px 36px' }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: accentB1, marginBottom: 12 }}>有 MCP</div>
        <p style={{ fontSize: 28, lineHeight: 1.5, margin: 0 }}>「把名字改成 Michael」<span style={{ color: codeGreen }}>→ 一句話搞定</span></p>
      </div>
    </div>
    <p style={{ fontSize: 28, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.24s both' }}>
      今天用 Filesystem MCP。可控的能力擴張：你選啟用、限資料夾、隨時關。
    </p>
    <Footer />
  </div>
);

/* S16b — MCP architecture 官方示意圖（全幅，淺底圖放白卡） */
const S16b: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB1}>一張圖看懂 MCP</Eyebrow>
    </div>
    <div
      style={{
        marginTop: 24,
        borderRadius: 20,
        overflow: 'hidden',
        background: '#FFFFFF',
        border: `1px solid ${border}`,
        alignSelf: 'center',
        animation: 'fadeUp 0.5s ease 0.12s both',
      }}
    >
      <img src={mcpArchitecture} alt="MCP architecture — Claude / MCP clients 透過 MCP（像 USB-C）接到各種 MCP server" style={{ display: 'block', width: 1280, height: 'auto' }} />
    </div>
    <p style={{ fontSize: 28, color: muted, marginTop: 28, alignSelf: 'center', animation: 'fadeUp 0.5s ease 0.2s both' }}>
      一個接口（MCP），接上各種服務 —— Slack、Gmail、行事曆、本地檔案。<span style={{ color: accentB1 }}>就像 USB-C。</span>
    </p>
    <Footer />
  </div>
);

/* S17 — Skills */
/* Skills 示意：一個 .md 卡 → 變成一條 / 指令 */
const SkillChip = ({ label, dim = false }: { label: string; dim?: boolean }) => (
  <span
    style={{
      padding: '14px 24px',
      borderRadius: 12,
      background: surface,
      border: `1px solid ${dim ? border : accentB1}`,
      fontSize: 28,
      fontFamily: mono,
      color: dim ? muted : accentB1,
    }}
  >
    {label}
  </span>
);

const S17: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="三件套之二">Skills</PageHead>
    <p style={{ fontSize: 38, lineHeight: 1.55, maxWidth: 1500, marginTop: 36, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      預打包的能力，<span style={{ color: accentB1 }}>用 markdown 寫的</span> — 人人能寫、能分享。
    </p>
    {/* skill.md → 安裝 → / 指令 */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 48, animation: 'fadeUp 0.5s ease 0.18s both' }}>
      <div style={{ width: 150, height: 150, borderRadius: 20, background: surface, border: `1px solid ${border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, color: accentB1 }}>
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>
        <span style={{ fontSize: 22, color: muted, fontFamily: mono }}>skill.md</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: accentB1 }}>
        <Icon name="arrow-right" size={30} color={accentB1} />
        <span style={{ fontSize: 22, color: muted }}>安裝</span>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <SkillChip label="/plan" />
        <SkillChip label="/commit" dim />
        <SkillChip label="/review" dim />
      </div>
    </div>
    <p style={{ fontSize: 34, lineHeight: 1.55, maxWidth: 1500, marginTop: 44, color: muted, animation: 'fadeUp 0.5s ease 0.24s both' }}>
      想成手機裝 App、瀏覽器裝外掛 — 多裝一個就多一個本事。那些 <span style={{ color: accentB1, fontFamily: mono }}>/</span> 指令，很多就來自 skill。
    </p>
    <Footer />
  </div>
);

/* S17b — skills.sh：去哪找 skill（B2 動手脈絡） */
const RankRow = ({ rank, name, owner, installs, hot = false }: { rank: string; name: string; owner: string; installs: string; hot?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '16px 0', borderBottom: `1px solid ${border}` }}>
    <span style={{ fontSize: 28, fontFamily: mono, color: hot ? accentB2 : muted, width: 44, flexShrink: 0 }}>{rank}</span>
    <span style={{ fontSize: 32, fontWeight: 700, fontFamily: mono, color: hot ? accentB2 : 'var(--osd-text)', flex: 1 }}>{name}</span>
    <span style={{ fontSize: 26, color: muted, fontFamily: mono }}>{owner}</span>
    <span style={{ fontSize: 28, fontWeight: 700, color: hot ? accentB2 : muted, width: 110, textAlign: 'right', flexShrink: 0 }}>{installs}</span>
  </div>
);

const S17b: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="想讓網站更好看？先找個 skill" eyebrowColor={accentB2}>skills.sh · 開放 skill 生態</PageHead>
    <div style={{ display: 'flex', gap: 56, marginTop: 44, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.1s both' }}>
        <WindowShell label="~ / npx skills" accent={accentB2}>
          <div style={{ color: codeText }}><span style={{ color: codeGreen }}>$</span> npx skills add <span style={{ color: accentB2 }}>&lt;package&gt;</span></div>
          <div style={{ color: muted, fontSize: 24, paddingLeft: 28 }}>安裝一個 skill</div>
          <div style={{ marginTop: 14, color: codeText }}><span style={{ color: codeGreen }}>$</span> npx skills find <span style={{ color: accentB2 }}>[query]</span></div>
          <div style={{ color: muted, fontSize: 24, paddingLeft: 28 }}>搜尋 skill</div>
        </WindowShell>
        <p style={{ fontSize: 26, color: muted, marginTop: 24 }}>Vercel 做的開放目錄 · 250+ skills · 一鍵安裝</p>
      </div>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.18s both' }}>
        <div style={{ fontSize: 24, letterSpacing: '0.15em', color: muted, marginBottom: 8 }}>熱門排行</div>
        <RankRow rank="1" name="find-skills" owner="vercel-labs" installs="1.5M" hot />
        <RankRow rank="2" name="frontend-design" owner="anthropics" installs="421K" />
        <RankRow rank="3" name="react-best-practices" owner="vercel-labs" installs="389K" />
        <RankRow rank="40" name="shadcn" owner="shadcn/ui" installs="147K" />
      </div>
    </div>
    <Footer accent={accentB2} />
  </div>
);

/* S17c — Impeccable 概覽（B2 動手裝） */
const StatBox = ({ value, label }: { value: string; label: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: '32px 36px' }}>
    <div style={{ fontSize: 52, fontWeight: 800, color: accentB2, fontFamily: 'var(--osd-font-display)' }}>{value}</div>
    <div style={{ fontSize: 26, color: muted, marginTop: 8 }}>{label}</div>
  </div>
);

const S17c: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] 一起裝這個 skill" eyebrowColor={accentB2}>Impeccable</PageHead>
    <p style={{ fontSize: 38, lineHeight: 1.5, marginTop: 28, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <span style={{ color: accentB2 }}>Design fluency for AI harnesses</span> — 教你的 AI 設計品味的 skill。
    </p>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <WindowShell label="terminal" accent={accentB2}>
        <span style={{ color: codeGreen }}>$</span> npx skills add <span style={{ color: accentB2 }}>pbakaus/impeccable</span>
      </WindowShell>
    </div>
    <div style={{ display: 'flex', gap: 32, marginTop: 36, animation: 'fadeUp 0.5s ease 0.22s both' }}>
      <StatBox value="23" label="設計指令（/audit /polish …）" />
      <StatBox value="7" label="參考領域（字體 / 色彩 / 動態 …）" />
      <StatBox value="27" label="反模式偵測規則" />
    </div>
    <Footer accent={accentB2} />
  </div>
);

/* S17d — 現在就用 Impeccable /polish 改你剛 ship 的網站（B2 動手 + 為何） */
const GenericTag = ({ children }: { children: React.ReactNode }) => (
  <span style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: `1px solid ${muted}`, color: muted, fontSize: 24, fontFamily: mono, margin: '0 8px 8px 0' }}>{children}</span>
);

const S17d: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] 用它打磨你剛 ship 的網站" eyebrowColor={accentB2}>擺脫「AI 味」</PageHead>
    <div style={{ marginTop: 32, animation: 'fadeUp 0.5s ease 0.08s both' }}>
      <WindowShell label="Claude Desktop" accent={accentB2}>
        <div style={{ fontSize: 28, lineHeight: 1.6, color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
          用 <span style={{ fontFamily: mono, color: accentB2 }}>/polish</span> 幫我的個人站打磨設計。
        </div>
      </WindowShell>
    </div>
    <div style={{ display: 'flex', gap: 48, marginTop: 32, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: '28px 36px' }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: muted, marginBottom: 16 }}>沒有它：generic AI 味</div>
        <GenericTag>Inter 字體</GenericTag>
        <GenericTag>紫藍漸層</GenericTag>
        <GenericTag>卡片疊卡片</GenericTag>
      </div>
      <div style={{ flex: 1, background: surface, border: `1px solid ${accentB2}`, borderRadius: 14, padding: '28px 36px' }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: accentB2, marginBottom: 16 }}>有它：給 AI 設計詞彙</div>
        <p style={{ fontSize: 28, lineHeight: 1.5, margin: 0 }}>
          <span style={{ color: accentB2, fontFamily: mono }}>/audit</span> 揪問題　<span style={{ color: accentB2, fontFamily: mono }}>/critique</span> 給評論
        </p>
      </div>
    </div>
    <p style={{ fontSize: 28, color: muted, marginTop: 28, animation: 'fadeUp 0.5s ease 0.24s both' }}>
      演化自 Anthropic 的 frontend-design skill — 把「好設計」變成 AI 和你<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>共用的詞彙</span>。
    </p>
    <Footer accent={accentB2} />
  </div>
);

/* S18 — Artifacts */
const S18: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="三件套之三">Artifacts</PageHead>
    <p style={{ fontSize: 40, lineHeight: 1.6, maxWidth: 1500, marginTop: 48, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      可重用的<span style={{ color: accentB1 }}>工件</span> — AI 給的 code、文件、圖，包成成品放在對話旁。
    </p>
    <p style={{ fontSize: 38, lineHeight: 1.6, maxWidth: 1500, marginTop: 24, color: muted, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      可預覽、複製、繼續改。對話的產出不會散掉，變成能一直迭代的東西。
    </p>
    <Footer />
  </div>
);

/* S19 — vibe 三個痛 */
const PainCard = ({ n, head, body }: { n: string; head: string; body: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 44 }}>
    <div style={{ fontSize: 30, color: accentB1, fontFamily: mono, marginBottom: 16 }}>{n}</div>
    <div style={{ fontSize: 34, fontWeight: 700, marginBottom: 14 }}>{head}</div>
    <p style={{ fontSize: 28, lineHeight: 1.5, color: muted, margin: 0 }}>{body}</p>
  </div>
);

const S19: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="段 4 · 為什麼需要 SDD">vibe coding 的三個痛</PageHead>
    <div style={{ display: 'flex', gap: 48, marginTop: 64, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <PainCard n="01" head="風格不一致" body="今天聊的跟明天聊的長不一樣，因為每次指示都不同。" />
      <PainCard n="02" head="漏掉邊界" body="只做了正常情況；沒網路、欄位空白全沒處理。" />
      <PainCard n="03" head="假性自信" body="AI 很開心說「做完了！」— 但做完什麼？" />
    </div>
    <Footer />
  </div>
);

/* S20 — 做完什麼？（全幅大字） */
const S20: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <p style={{ fontSize: 48, color: muted, margin: 0, animation: 'fadeUp 0.5s ease both' }}>
      AI 說「做完了」→ 你要反問：
    </p>
    <Title size={150}>
      <span style={{ color: accentB1 }}>做完什麼？</span>
    </Title>
    <p style={{ fontSize: 38, color: muted, lineHeight: 1.6, maxWidth: 1500, marginTop: 40, animation: 'fadeUp 0.5s ease 0.18s both' }}>
      答不出來 = 你從頭沒定義「什麼叫做完」。SDD = <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>動手前先把「做完」的標準寫下來</span>。
    </p>
    <Footer />
  </div>
);

/* S21 — SDD 三階段 */
const StageCard = ({ n, head, body }: { n: string; head: string; body: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 40 }}>
    <div style={{ fontSize: 28, color: accentB1, fontFamily: mono, marginBottom: 14 }}>{n}</div>
    <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 14 }}>{head}</div>
    <p style={{ fontSize: 27, lineHeight: 1.5, color: muted, margin: 0 }}>{body}</p>
  </div>
);

const S21: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="SDD 三階段 · 適合新手">用人話寫，不用會寫測試</PageHead>
    <div style={{ display: 'flex', gap: 40, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <StageCard n="①" head="釐清要什麼" body="誰、為了什麼。定方向。" />
      <StageCard n="②" head="怎麼做" body="版型 / 區塊 / 限制。定範圍。" />
      <StageCard n="③" head="拆可驗任務" body="每塊都能說「做到了沒」。" />
    </div>
    <p style={{ fontSize: 34, color: accentB1, fontWeight: 700, marginTop: 44, animation: 'fadeUp 0.5s ease 0.22s both' }}>
      寫 spec → AI 做 → 拿 spec 驗 → ship
    </p>
    <Footer />
  </div>
);

/* S22 — 三關鍵字收尾 + 接動手 */
const KeywordPill = ({ word, def, color }: { word: string; def: string; color: string }) => (
  <div style={{ background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: '32px 40px' }}>
    <span style={{ fontSize: 44, fontWeight: 800, color, fontFamily: 'var(--osd-font-display)' }}>{word}</span>
    <span style={{ fontSize: 32, color: muted, marginLeft: 28 }}>{def}</span>
  </div>
);

const S22: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB1}>第一小時結束 · 只記三個字</Eyebrow>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <KeywordPill word="Vibe" def="AI 主導，適合玩具 / 探索" color={accentB1} />
      <KeywordPill word="AI Coding" def="人主導，有目標、會拒絕、先給計畫" color={accentB2} />
      <KeywordPill word="SDD" def="先講清楚、AI 照做、拿 spec 驗" color={accentB3} />
    </div>
    <p style={{ fontSize: 34, color: muted, marginTop: 48, animation: 'fadeUp 0.5s ease 0.22s both' }}>
      休息 10 分鐘，<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>15:00 回來</span> — 第二小時每人 ship 一個網站。
    </p>
    <Footer />
  </div>
);

/* ════════════════════════════════════════════════════════
   B2 · 做 (slides 23–40) — accent: green (ship / 動手)
   ════════════════════════════════════════════════════════ */

/* S23 — 接 B1 */
const S23: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB2}>B2 · 做 · 15:00</Eyebrow>
    </div>
    <Title size={110}>
      B1 是地圖，<br />現在<span style={{ color: accentB2 }}>開始走路</span>。
    </Title>
    <p style={{ fontSize: 36, color: muted, marginTop: 44, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      30 秒回顧：MCP 讓 AI 有手 · Skills 預打包能力 · Artifacts 可重用工件。
    </p>
    <Footer accent={accentB2} />
  </div>
);

/* S24 — B2 路線 */
const RouteStep = ({ label }: { label: string }) => (
  <span
    style={{
      padding: '14px 28px',
      borderRadius: 12,
      background: surface,
      border: `1px solid ${border}`,
      fontSize: 32,
      fontWeight: 600,
      fontFamily: mono,
      color: 'var(--osd-text)',
    }}
  >
    {label}
  </span>
);

const S24: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="B2 路線 · 幾乎全程動手" eyebrowColor={accentB2}>5 分鐘看 spec，然後動手</PageHead>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <RouteStep label="clone" />
      <span style={{ color: accentB2, fontSize: 32 }}>→</span>
      <RouteStep label="改" />
      <span style={{ color: accentB2, fontSize: 32 }}>→</span>
      <RouteStep label="push" />
      <span style={{ color: accentB2, fontSize: 32 }}>→</span>
      <RouteStep label="deploy" />
      <span style={{ color: accentB2, fontSize: 32 }}>→</span>
      <RouteStep label="改顏色" />
    </div>
    <p style={{ fontSize: 40, color: accentB2, fontWeight: 700, marginTop: 56, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      離開前，每個人都有自己的網址。
    </p>
    <Footer accent={accentB2} />
  </div>
);

/* S25 — spec 全文（artifact 形式） */
const SpecBlock = ({ head, lines }: { head: string; lines: string[] }) => (
  <div style={{ marginBottom: 18 }}>
    <span style={{ color: accentB2, fontWeight: 700 }}># {head}</span>
    {lines.map((l) => (
      <div key={l} style={{ color: codeText, paddingLeft: 8 }}>{l}</div>
    ))}
  </div>
);

const S25: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="段 2 · 我提前寫好的個人站 spec" eyebrowColor={accentB2}>這是一份真的 spec</PageHead>
    <div style={{ marginTop: 40, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <WindowShell label="spec.md" accent={accentB2}>
        <div style={{ fontSize: 26, lineHeight: 1.45 }}>
          <SpecBlock head="Goal" lines={['讓潛在合作對象 5 分鐘內認識我']} />
          <SpecBlock head="Outcomes" lines={['知道我是誰、做什麼', '看到代表作品 / 案例', '找到聯絡方式']} />
          <SpecBlock head="Non-goals" lines={['不放完整 portfolio · 不寫 blog · 不炫技']} />
          <SpecBlock head="Constraints" lines={['手機可讀 · 3 秒載完 · 純靜態']} />
          <SpecBlock head="Success criteria" lines={['5 個朋友看完能口頭介紹我的工作']} />
        </div>
      </WindowShell>
    </div>
    <Footer accent={accentB2} />
  </div>
);

/* S27 — 缺了會怎樣 */
const MissingRow = ({ miss, result }: { miss: string; result: string }) => (
  <div style={{ display: 'flex', gap: 32, padding: '22px 0', borderBottom: `1px solid ${border}` }}>
    <span style={{ fontSize: 32, fontWeight: 700, color: accentB2, width: 360, flexShrink: 0 }}>{miss}</span>
    <span style={{ fontSize: 32, color: muted }}>{result}</span>
  </div>
);

const S27: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="每一塊缺了 AI 都自由發揮" eyebrowColor={accentB2}>缺了會怎樣</PageHead>
    <div style={{ marginTop: 48, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <MissingRow miss="缺 Goal" result="做出一般 portfolio" />
      <MissingRow miss="缺 Non-goals" result="加一堆你沒要的 feature" />
      <MissingRow miss="缺 Success criteria" result="你不知道 OK 沒" />
    </div>
    <Footer accent={accentB2} />
  </div>
);

/* S29 — Step1 clone */
const S29: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="段 3 · [DO] Step 1 · clone" eyebrowColor={accentB2}>把 repo 抓到電腦</PageHead>
    <div style={{ marginTop: 48, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <WindowShell label="terminal" accent={accentB2}>
        <span style={{ color: codeGreen }}>$</span> git clone &lt;待補 workshop repo URL&gt;
      </WindowShell>
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 36, lineHeight: 1.5, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <span style={{ color: 'var(--osd-text)' }}>clone</span> = 把網路上的範本整包複製到你電腦。完成後會多一個資料夾。卡住的舉手。
    </p>
    <Footer accent={accentB2} />
  </div>
);

/* S30 — Step2-3 cd + install */
const S30: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="Step 2–3 · cd + install" eyebrowColor={accentB2}>進資料夾，裝套件</PageHead>
    <div style={{ marginTop: 48, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <WindowShell label="terminal" accent={accentB2}>
        <div><span style={{ color: codeGreen }}>$</span> cd portfolio</div>
        <div style={{ marginTop: 8 }}><span style={{ color: codeGreen }}>$</span> pnpm install</div>
        <div style={{ marginTop: 16, color: muted }}># 第一次大概 1–2 分鐘</div>
      </WindowShell>
    </div>
    <Footer accent={accentB2} />
  </div>
);

/* S31 — Step4 dev */
const S31: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="Step 4 · dev" eyebrowColor={accentB2}>看到範本網站</PageHead>
    <div style={{ marginTop: 44, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="terminal" accent={accentB2}>
        <div><span style={{ color: codeGreen }}>$</span> pnpm dev</div>
        <div style={{ marginTop: 12, color: codeGreen, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="check" size={28} color={codeGreen} /> Ready
        </div>
        <div style={{ color: muted }}>→ 打開瀏覽器看 localhost:3000</div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 28, color: muted, marginTop: 24, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      localhost = 在你自己電腦上跑的網站，只有你看得到（還沒上線）。
    </p>
    <div style={{ marginTop: 24, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <HandUp accent={accentB2}>看到範本網站的舉手</HandUp>
    </div>
    <Footer accent={accentB2} />
  </div>
);

/* S32 — 把 B1 的 MCP 用出來 */
const S32: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB2}>段 4 · [DO] 改 resume</Eyebrow>
    </div>
    <Title size={104}>
      B1 講的 <span style={{ color: accentB2 }}>MCP</span>，<br />現在你親手用一次。
    </Title>
    <p style={{ fontSize: 38, color: muted, marginTop: 44, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      讓 AI 讀你網站的<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>個人資料</span>，一句話改成你的。
    </p>
    <Footer accent={accentB2} />
  </div>
);

/* S33 — 改 resume prompt（照念） */
const S33: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="Claude Desktop · 第一句照念" eyebrowColor={accentB2}>一句話改成你的</PageHead>
    <div style={{ marginTop: 40, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Claude Desktop" accent={accentB2}>
        <div style={{ fontSize: 30, lineHeight: 1.65, color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
          幫我把這個 portfolio 網站的名字改成 <span style={{ color: accentB2 }}>[你的名字]</span>、
          所在城市改成 <span style={{ color: accentB2 }}>[你住的城市]</span>、
          自我介紹改成 <span style={{ color: accentB2 }}>[一句話介紹你自己]</span>。
        </div>
      </WindowShell>
    </div>
    <div style={{ marginTop: 28, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <HandUp accent={accentB2}>重新整理網頁、看到自己資料的舉手</HandUp>
    </div>
    <Footer accent={accentB2} />
  </div>
);

/* S34 — GitHub repo */
const S34: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="Step 6 · 把 code 推上 GitHub" eyebrowColor={accentB2}>開一個新 repo</PageHead>
    <ol style={{ fontSize: 36, lineHeight: 1.7, marginTop: 48, paddingLeft: 40, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <li>github.com → <span style={{ color: accentB2 }}>New repository</span></li>
      <li>命名（例如 <span style={{ fontFamily: mono }}>my-portfolio</span>）</li>
      <li>選 <span style={{ color: accentB2 }}>Public</span>，<span style={{ color: accentB2 }}>不勾</span>任何初始化</li>
      <li>Create</li>
    </ol>
    <Footer accent={accentB2} />
  </div>
);

/* S35 — push 指令 */
const S35: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="複製「push an existing repository」" eyebrowColor={accentB2}>推上去</PageHead>
    <div style={{ marginTop: 44, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="terminal" accent={accentB2}>
        <div><span style={{ color: codeGreen }}>$</span> git remote add origin &lt;your-repo-url&gt;</div>
        <div style={{ marginTop: 8 }}><span style={{ color: codeGreen }}>$</span> git push -u origin main</div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      貼進終端機跑。卡住的舉手。
    </p>
    <Footer accent={accentB2} />
  </div>
);

/* S36 — Vercel import */
/* deploy 流程：GitHub repo → Vercel → 上線 */
const DeployFlow = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
    <LogoTile src={githubLogo} alt="GitHub" caption="GitHub repo" accent={muted} />
    <Icon name="arrow-right" size={32} color={accentB2} />
    <LogoTile src={vercelLogo} alt="Vercel" caption="Vercel" accent={muted} pad={40} />
    <Icon name="arrow-right" size={32} color={accentB2} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div style={{ width: 160, height: 160, borderRadius: 24, background: surface, border: `1px solid ${accentB2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentB2 }}>
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" /><path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>
      <span style={{ fontSize: 28, fontWeight: 600, color: accentB2 }}>你的網址</span>
    </div>
  </div>
);

const S36: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="段 5 · [DO] 上線" eyebrowColor={accentB2}>Vercel 自動部署</PageHead>
    <div style={{ marginTop: 48, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <DeployFlow />
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 56, display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      vercel.com → New Project → Import repo → Deploy。自動偵測 Next.js，約 30 秒。
      <span style={{ color: accentB2, display: 'inline-flex', alignItems: 'center', gap: 8 }}>成功舉手 <Icon name="hand" size={28} color={accentB2} /></span>
    </p>
    <Footer accent={accentB2} />
  </div>
);

/* S37 — 你做到了（大字） */
const S37: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <Title size={140}>
      你<span style={{ color: accentB2 }}>做到了</span>。
    </Title>
    <p style={{ fontSize: 44, marginTop: 40, animation: 'fadeUp 0.5s ease 0.14s both' }}>
      你有自己的網址了。
    </p>
    <p style={{ fontSize: 36, color: muted, marginTop: 24, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      ① 貼共享白板互看　② 截圖分享 — 這就是 <span style={{ color: accentB2, fontWeight: 700 }}>ship 的感覺</span>。
    </p>
    <Footer accent={accentB2} />
  </div>
);

/* S38 — catch up 緩衝 */
const S38: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="緩衝時間" eyebrowColor={accentB2}>等等大家</PageHead>
    <p style={{ fontSize: 40, lineHeight: 1.6, maxWidth: 1500, marginTop: 48, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      給還沒 deploy 的人時間。<br />
      <span style={{ color: muted }}>已 deploy 的，先別走 — 下一步我們一起改顏色。</span>
    </p>
    <Footer accent={accentB2} />
  </div>
);

/* S39 — 一句話改主色 */
const S39: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="段 6 · [DO] 第一次用一句話改設計" eyebrowColor={accentB2}>改你的主色</PageHead>
    <div style={{ marginTop: 40, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Claude Desktop" accent={accentB2}>
        <div style={{ fontSize: 30, lineHeight: 1.6, color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
          幫我把網站的主色改成 <span style={{ color: accentB2 }}>[深藍色]</span>、背景換成 <span style={{ color: accentB2 }}>[米白色]</span>。
        </div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 34, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      重新整理網頁就看到變化 — <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>你完全不用懂程式</span>。
    </p>
    <Footer accent={accentB2} />
  </div>
);

/* S40 — B3 預告 */
const S40: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB3}>預告 B3</Eyebrow>
    </div>
    <Title size={96}>
      你的網站上線了 —<br />但<span style={{ color: accentB3 }}>有沒有人來看？</span>
    </Title>
    <p style={{ fontSize: 36, color: muted, marginTop: 44, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      B3 一開始就解（PostHog 看訪客），再講 OpenSpec 把 SDD 系統化。<br />
      休息 10 分鐘，<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>16:00 回來</span>。
    </p>
    <Footer accent={accentB3} />
  </div>
);

/* ════════════════════════════════════════════════════════
   B3 · 驗 (slides 41–58) — accent: blue (data / system)
   ════════════════════════════════════════════════════════ */

/* S41 — 開場：ship 了，但有人看嗎？ */
const S41: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB3}>B3 · 驗 · 16:00</Eyebrow>
    </div>
    <Title size={104}>
      ship 了，<br />但<span style={{ color: accentB3 }}>有人看嗎？</span>
    </Title>
    <div style={{ marginTop: 44, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <HandUp accent={accentB3}>知道自己網站幾人看過的舉手</HandUp>
    </div>
    <p style={{ fontSize: 34, color: muted, marginTop: 36, animation: 'fadeUp 0.5s ease 0.24s both' }}>
      ship 不是終點，是<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>起點</span>。前半 PostHog 看訪客、後半 OpenSpec 系統化。
    </p>
    <Footer accent={accentB3} />
  </div>
);

/* S42 — PostHog 是什麼 */
const WhyCard = ({ n, body }: { n: string; body: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 40 }}>
    <div style={{ fontSize: 28, color: accentB3, fontFamily: mono, marginBottom: 16 }}>{n}</div>
    <p style={{ fontSize: 30, lineHeight: 1.5, margin: 0 }}>{body}</p>
  </div>
);

const S42: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB3}>段 2 · [DEMO] 看就好，回家做</Eyebrow>
      {/* 官方完整 logo（含黑字 wordmark）放白底 bar，深背景上才讀得到 */}
      <div style={{ display: 'inline-flex', alignItems: 'center', background: '#FFFFFF', borderRadius: 16, padding: '18px 28px', marginBottom: 28 }}>
        <img src={posthogLogo} alt="PostHog" style={{ height: 56, display: 'block' }} />
      </div>
      <Title>看見你的真實訪客</Title>
    </div>
    <p style={{ fontSize: 36, color: muted, marginTop: 36, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      開源、免費額度大的<span style={{ color: 'var(--osd-text)' }}>產品分析</span>工具。為什麼推薦給新手？
    </p>
    <div style={{ display: 'flex', gap: 40, marginTop: 40, animation: 'fadeUp 0.5s ease 0.18s both' }}>
      <WhyCard n="01" body="免費額度個人站綽綽有餘" />
      <WhyCard n="02" body="一段 snippet 就接好，不用後端" />
      <WhyCard n="03" body="從「幾人看」到「怎麼用」全包" />
    </div>
    <Footer accent={accentB3} />
  </div>
);

/* S43 — 怎麼接 */
const S43: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="怎麼接（學員看就好，回家做）" eyebrowColor={accentB3}>四步接上你的站</PageHead>
    <ol style={{ fontSize: 36, lineHeight: 1.7, marginTop: 44, paddingLeft: 40, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <li>到 posthog.com 註冊（免費）</li>
      <li>它給你<span style={{ color: accentB3 }}>一小段程式碼</span>（snippet）</li>
      <li>請 Claude 幫你貼進網站（範本已留好位置）</li>
      <li>重新上線一次</li>
    </ol>
    <p style={{ fontSize: 32, color: muted, marginTop: 36, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      接好之後，每個來看你網站的人都會自動被記錄下來。
    </p>
    <Footer accent={accentB3} />
  </div>
);

/* S44 — 看到第一個訪問（dashboard mockup） */
const Metric = ({ label, value }: { label: string; value: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: 32 }}>
    <div style={{ fontSize: 26, color: muted, marginBottom: 12 }}>{label}</div>
    <div style={{ fontSize: 56, fontWeight: 800, color: accentB3, fontFamily: 'var(--osd-font-display)' }}>{value}</div>
  </div>
);

const S44: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="講師 dashboard demo" eyebrowColor={accentB3}>看到第一個訪問</PageHead>
    <div style={{ display: 'flex', gap: 32, marginTop: 64, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <Metric label="Unique visitors" value="248" />
      <Metric label="Page views" value="1.1k" />
      <Metric label="行動裝置" value="82%" />
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 48, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      誰來、來幾次、從哪來、用什麼裝置 — <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>snippet 自己收集，不用寫 code</span>。
    </p>
    <Footer accent={accentB3} />
  </div>
);

/* S45 — 數據幫你做決定 */
const DecideRow = ({ obs, act }: { obs: string; act: string }) => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: '22px 0', borderBottom: `1px solid ${border}` }}>
    <span style={{ fontSize: 32, color: muted, flex: 1 }}>{obs}</span>
    <span style={{ fontSize: 32, color: accentB3 }}>→</span>
    <span style={{ fontSize: 32, color: 'var(--osd-text)', fontWeight: 600, flex: 1 }}>{act}</span>
  </div>
);

const S45: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="ship 後該做的事" eyebrowColor={accentB3}>不是猜，是看數據</PageHead>
    <div style={{ marginTop: 44, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <DecideRow obs="80% 從手機進來" act="顧手機版" />
      <DecideRow obs="都停首頁、沒點聯絡" act="CTA 有問題" />
    </div>
    <Footer accent={accentB3} />
  </div>
);

/* S46 — 功能全景 */
const S46: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB3}>段 3 · 功能導覽</Eyebrow>
    </div>
    <Title size={96}>
      不只看流量。
    </Title>
    <p style={{ fontSize: 38, color: muted, marginTop: 44, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      不用全記 — <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>知道有這些武器，需要時回去找</span>。
    </p>
    <Footer accent={accentB3} />
  </div>
);

/* S47 — 核心 4 */
const FeatCard = ({ n, name, body }: { n: string; name: string; body: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 36 }}>
    <div style={{ fontSize: 26, color: accentB3, fontFamily: mono, marginBottom: 12 }}>{n}</div>
    <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 14 }}>{name}</div>
    <p style={{ fontSize: 26, lineHeight: 1.45, color: muted, margin: 0 }}>{body}</p>
  </div>
);

const S47: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="核心 4 個功能" eyebrowColor={accentB3}>最常用的四把</PageHead>
    <div style={{ display: 'flex', gap: 28, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <FeatCard n="①" name="Analytics" body="誰來、來幾次、從哪來、什麼裝置" />
      <FeatCard n="②" name="Session Replay" body="像錄影重播訪客操作，看他卡哪" />
      <FeatCard n="③" name="Heatmaps" body="點擊疊成熱力圖，看哪裡有人碰" />
      <FeatCard n="④" name="Funnels" body="設定步驟，看每步流失多少人" />
    </div>
    <Footer accent={accentB3} />
  </div>
);

/* S48 — 推薦 3 */
const S48: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="推薦 3 個（之後值得玩）" eyebrowColor={accentB3}>進階但好用</PageHead>
    <div style={{ display: 'flex', gap: 32, marginTop: 64, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <FeatCard n="⑤" name="Feature Flags" body="不改 code 開關功能 / 灰度發布" />
      <FeatCard n="⑥" name="A/B Testing" body="自動分流，用數據決定哪個好" />
      <FeatCard n="⑦" name="Surveys" body="直接在網站彈問卷問訪客" />
    </div>
    <Footer accent={accentB3} />
  </div>
);

/* S49 — 新手順序 */
const OrderStep = ({ n, body }: { n: string; body: string }) => (
  <div style={{ display: 'flex', gap: 28, alignItems: 'center', padding: '22px 0', borderBottom: `1px solid ${border}` }}>
    <span style={{ fontSize: 30, color: accentB3, fontFamily: mono, width: 120, flexShrink: 0 }}>{n}</span>
    <span style={{ fontSize: 34, color: 'var(--osd-text)' }}>{body}</span>
  </div>
);

const S49: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="新手別貪 · 建議順序" eyebrowColor={accentB3}>怎麼挑</PageHead>
    <div style={{ marginTop: 40, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <OrderStep n="第一步" body="接上去，看 Analytics（有沒有人來）" />
      <OrderStep n="第二步" body="看 3–5 個 Session Replay（他們怎麼用）" />
      <OrderStep n="之後" body="有問題才用 Funnel / Flag / A/B" />
    </div>
    <p style={{ fontSize: 34, color: accentB3, fontWeight: 700, marginTop: 40, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      價值不在功能多，在拿它做決定。
    </p>
    <Footer accent={accentB3} />
  </div>
);

/* S50 — 從 SDD 到 OpenSpec */
const S50: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="段 4 · 純講解" eyebrowColor={accentB3}>從 SDD 觀念到 OpenSpec</PageHead>
    <p style={{ fontSize: 38, lineHeight: 1.6, maxWidth: 1500, marginTop: 44, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      B1 講了 SDD、B2 用了一份 spec — 但那是<span style={{ color: accentB3 }}>一次性</span>的。
    </p>
    <p style={{ fontSize: 38, lineHeight: 1.6, maxWidth: 1500, marginTop: 24, color: muted, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      真做專案會一直有新需求，散著寫很快就亂。<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>OpenSpec 解這件事。</span>
    </p>
    <Footer accent={accentB3} />
  </div>
);

/* S51 — OpenSpec 是什麼 */
const S51: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="開源工具 · Fission-AI" eyebrowColor={accentB3}>OpenSpec 是什麼</PageHead>
    <p style={{ fontSize: 38, lineHeight: 1.6, maxWidth: 1500, marginTop: 44, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      把「每次要改什麼」管成一個個 <span style={{ color: accentB3 }}>change</span> — 每個 change 有完整 spec + 任務拆解，做完歸檔。
    </p>
    <p style={{ fontSize: 36, lineHeight: 1.6, maxWidth: 1500, marginTop: 28, color: muted, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      = SDD 變成<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>資料夾結構 + 一套指令</span>。
    </p>
    <Footer accent={accentB3} />
  </div>
);

/* S52 — 流程圖 */
const FlowStep = ({ label }: { label: string }) => (
  <span
    style={{
      padding: '20px 32px',
      borderRadius: 12,
      background: surface,
      border: `1px solid ${accentB3}`,
      fontSize: 30,
      fontWeight: 700,
      fontFamily: mono,
      color: accentB3,
    }}
  >
    {label}
  </span>
);

const S52: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="5 步循環" eyebrowColor={accentB3}>OpenSpec 的流程</PageHead>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center', marginTop: 72, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <FlowStep label="propose" />
      <span style={{ color: accentB3, fontSize: 30 }}>→</span>
      <FlowStep label="spec" />
      <span style={{ color: accentB3, fontSize: 30 }}>→</span>
      <FlowStep label="tasks" />
      <span style={{ color: accentB3, fontSize: 30 }}>→</span>
      <FlowStep label="apply" />
      <span style={{ color: accentB3, fontSize: 30 }}>→</span>
      <FlowStep label="archive" />
    </div>
    <Footer accent={accentB3} />
  </div>
);

/* S53 — 五步說明 */
const FiveStep = ({ n, head, body }: { n: string; head: string; body: string }) => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'baseline', padding: '16px 0', borderBottom: `1px solid ${border}` }}>
    <span style={{ fontSize: 28, color: accentB3, fontFamily: mono, width: 180, flexShrink: 0 }}>{n}</span>
    <span style={{ fontSize: 32, fontWeight: 700, width: 200, flexShrink: 0 }}>{head}</span>
    <span style={{ fontSize: 30, color: muted }}>{body}</span>
  </div>
);

const S53: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="今天只要看懂，不用動手" eyebrowColor={accentB3}>五步說明</PageHead>
    <div style={{ marginTop: 32, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <FiveStep n="① Propose" head="提案" body="為什麼要、要解什麼問題" />
      <FiveStep n="② Spec" head="規格" body="這個 change 的具體行為" />
      <FiveStep n="③ Tasks" head="拆任務" body="一條條可勾選、能說做到沒" />
      <FiveStep n="④ Apply" head="實作" body="AI 照 tasks 做，spec 當契約" />
      <FiveStep n="⑤ Archive" head="歸檔" body="累積成專案的活文件" />
    </div>
    <Footer accent={accentB3} />
  </div>
);

/* S54 — 今天這場就是 OpenSpec 做的 */
const S54: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="最有說服力的例子" eyebrowColor={accentB3}>今天這場就是它做的</PageHead>
    <div style={{ marginTop: 40, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="openspec/changes" accent={accentB3}>
        <div style={{ color: accentB3 }}>freeze-v4-workshop-design/</div>
        <div style={{ color: muted, paddingLeft: 36 }}>proposal · specs · tasks（17 個任務）</div>
        <div style={{ color: accentB3, marginTop: 16 }}>restructure-b1-explain-hour/</div>
        <div style={{ color: muted, paddingLeft: 36 }}>B1 重構：propose → spec → tasks → apply</div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      整場 workshop 設計，照同一套流程走。
    </p>
    <Footer accent={accentB3} />
  </div>
);

/* S55 — 為什麼推薦 + 適合誰 */
const S55: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="為什麼推薦你 · 適合誰" eyebrowColor={accentB3}>串成一條線</PageHead>
    <p style={{ fontSize: 38, lineHeight: 1.6, maxWidth: 1500, marginTop: 44, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      把今天學的（Plan Mode / spec / MCP）串成一條線；<span style={{ color: accentB3 }}>不只管 code</span> — 我用它管這場 workshop。
    </p>
    <p style={{ fontSize: 36, lineHeight: 1.6, maxWidth: 1500, marginTop: 28, color: muted, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>今天不動手，回家發揮</span> — Resource Pack 有 getting started。
    </p>
    <Footer accent={accentB3} />
  </div>
);

/* S56 — 三小時收束 + 回家順序 */
const RecapRow = ({ tag, color, body }: { tag: string; color: string; body: string }) => (
  <div style={{ display: 'flex', gap: 28, alignItems: 'center', padding: '20px 0', borderBottom: `1px solid ${border}` }}>
    <span style={{ fontSize: 36, fontWeight: 800, color, width: 120, flexShrink: 0, fontFamily: 'var(--osd-font-display)' }}>{tag}</span>
    <span style={{ fontSize: 34, color: 'var(--osd-text)' }}>{body}</span>
  </div>
);

const S56: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="段 5 · 三小時收束" eyebrowColor={accentB3}>你帶走了什麼</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <RecapRow tag="B1" color={accentB1} body="懂 — Plan Mode、Desktop 三件套、SDD" />
      <RecapRow tag="B2" color={accentB2} body="做 — 從 template 到 live URL，ship 了" />
      <RecapRow tag="B3" color={accentB3} body="看到 — PostHog 看訪客、OpenSpec 系統化" />
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 36, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      回家：這週接 PostHog → 下個月玩 OpenSpec → 半年慢慢吃。
    </p>
    <Footer accent={accentB3} />
  </div>
);

/* S57 — 紙本回饋 */
const S57: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="全員寫 + 點 2–3 人分享" eyebrowColor={accentB3}>三題回饋</PageHead>
    <ol style={{ fontSize: 38, lineHeight: 1.8, marginTop: 44, paddingLeft: 40, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <li>今天最有用的一件事？</li>
      <li>回家第一個會做什麼？</li>
      <li>1–10 推薦給朋友</li>
    </ol>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <HandUp accent={accentB3}>寫完別走，我邊收邊問</HandUp>
    </div>
    <Footer accent={accentB3} />
  </div>
);

/* S58 — 謝謝 + 合照 */
const S58: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <Title size={140}>
      <span style={{ color: accentB3 }}>謝謝</span>。合照！
    </Title>
    <p style={{ fontSize: 38, marginTop: 40, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.14s both' }}>
      兩個帶走：<span style={{ color: accentB2, fontWeight: 700 }}>你 ship 的網址</span> + <span style={{ color: accentB3, fontWeight: 700 }}>Resource Pack</span>
    </p>
    <p style={{ fontSize: 32, color: muted, marginTop: 24, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      聯絡方式：Discord / email &lt;待補&gt; · 留場到 17:30
    </p>
    <Footer accent={accentB3} />
  </div>
);

export const meta: SlideMeta = {
  title: 'From Vibe to Spec — 台東 Workshop',
  theme: 'taitung',
  createdAt: '2026-05-22T15:31:57.855Z',
};

/* ════════════════════════════════════════════════════════
   Presenter notes — 投影不顯示，只在 Present 模式的講者視窗 / Notes drawer。
   陣列 index 對齊下方 export default 的「渲染順序」（非 S 編號）。
   口語稿，可直接念；() 內為走位/停頓/互動提示。
   ════════════════════════════════════════════════════════ */
export const notes: (string | undefined)[] = [
  // 1 · S1 封面
  `下午好，我是 Michael，Code for Taiwan 社群組織者，平常在 Moxa 寫 Angular 跟 React。今天負責下午這 3 小時。\n（站定中央、眼神掃過全場，建立場域，先別急著翻頁）`,
  // 2 · S2 自我介紹
  `簡單講一下我自己：白天在 Moxa 寫前端，Angular 跟 React 都寫；下班後在 Code for Taiwan 做開源社群。今天這 3 小時，我會把我自己每天在用的 AI 工作方式，整套帶給你。`,
  // 3 · S3 場域 + 承諾
  `先謝謝大家來到台東知本。TDF 是台灣最特別的數位遊牧節 —— 不是來度假、不是來開會，是來把作品「ship」出去。ship 這個字今天會一直出現，意思就是「把東西做出來、放到網路上讓別人看得到」。\n3 小時後，你帶走的不是一個成品，是一套「用 AI 把東西做出來」的工作方式。第一小時把觀念講清楚，第二小時你親手 ship 一個網站，第三小時學怎麼驗證它、然後帶資源回家。`,
  // 4 · S4 兩個舉手
  `先兩個小調查。第一個：過去 12 個月，用 AI 寫過 code 的，舉手。（停頓，記比例）\n第二個：有用 AI 把網站 ship 上線過的，再舉手。（停頓，記比例）\nOK，大概知道大家的位置了 —— 後面我會照這個比例調整深淺。`,
  // 5 · S5 今天最重要的分界線
  `先給你今天最重要的一條分界線 —— 用 AI 寫 code，其實有兩種 mode。這條線你聽懂了，今天就值回票價了。`,
  // 6 · S6 Vibe vs AI Coding 對照
  `第一種叫 Vibe Coding —— 你跟 AI 聊聊聊，它寫出什麼你看一看，覺得不錯就收。你不太確定自己要什麼、AI 給什麼你就收什麼、能跑就好。這是「AI 主導」。\n第二種我今天叫它 AI Coding —— 你知道目標、你主動選方案、你看得懂也敢拒絕 AI 的建議、關鍵時刻你介入掌控。這是「人主導」。\n（手指左右兩張卡對照念）`,
  // 7 · S8 一句話分（大字）
  `一句話分：Vibe 是 AI 主導，AI Coding 是人主導。AI 是工具，你是決策者。\n（這句慢、停頓，是今天的核心句之一，讓它沉下去）`,
  // 8 · S9 不是對立
  `這兩個不是對立，是兩種 mode，看情境用。做玩具、驗證一個 idea、週末小專案 —— vibe 完全 OK，門檻低、產出快。但你要長期維護、要上線給別人用、任何商業專案 —— 就該切到 AI Coding。\n今天的目標是讓你學會「切換」。我們這場叫 From Vibe to Spec，就是帶你從第一種，走到第二種。`,
  // 9 · S10 5 era timeline
  `為什麼現在這條線特別重要？因為工具走到這了。一張圖快速帶過，不用記 —— AI coding 這幾年走過五個階段：Prompt、Context、Tool Use、MCP，現在到 SDD。\n前面四個解決的是「AI 怎麼動」，現在這個階段解決的是「AI 該動什麼」。這就是今天的重點。\n（手指 timeline 滑過，停在 SDD）`,
  // 10 · S11 舉手：Claude / Plan Mode
  `在講「該動什麼」之前，先花十分鐘讓你會「怎麼驅動」這個工具。\n先問一下：用過 Claude 寫東西的舉手？（記）用過 Plan Mode 的再舉手？（記）沒用過沒關係，這段從頭講。`,
  // 11 · S12 Claude 三種輸入
  `驅動 Claude 你會用到三種東西。第一是對話，打字跟它講你要什麼，大家都會。第二是給它檔案 —— 你可以把檔案、截圖丟給它看，等下你會發現截圖比文字描述快很多。第三是斜線指令，打一個 / 叫出預設好的動作，等下講 Skills 你會看到這些指令可以自己加。`,
  // 12 · S13 Plan Mode（主打）
  `這三個裡面我要特別講一個，因為它是 vibe coding 跟 AI coding 的分水嶺 —— Plan Mode。\n在 Claude Code 裡，連按兩次 Shift+Tab，或輸入 /plan，就進到這個模式。進去之後 Claude 不會直接寫檔、不會跑指令 —— 它先給你一份計畫：要做什麼、改哪幾個檔、按什麼順序。你看過、覺得 OK，按核可，它才動。\n這個動作解了兩個痛：第一，動手前你可以擋 —— AI 想偏了你在計畫階段就看到。第二，它不會邊做邊發明。\n核心一句話：動手前先給計畫，不要邊做邊發明。（停頓）`,
  // 13 · S14 Desktop 沒原生 Plan Mode
  `等下第二小時我們用的是 Claude Desktop，它沒有原生的 Plan Mode。但精神今天會用另一個形式做到 —— 你先寫清楚要什麼，AI 才動。那個東西就是 spec，待會段 4 會講。先把工具的另一半講完。`,
  // 14 · S15 Desktop 三件套
  `第二小時我們用 Claude Desktop。它比「線上對話」多三件事，今天三件都會用到：MCP、Skills、Artifacts。\nDesktop 不是「更漂亮的 chat」，它是一個完整的工作環境。我一個一個講。`,
  // 15 · S16 MCP 對照
  `第一件，MCP。一句話定義：USB-C for AI —— 這是 Anthropic 官方的比喻。它讓 AI 能讀寫你電腦上的東西。\n沒有 MCP 的時候：你想改一個檔，要先把檔貼給 AI、它寫好回給你、你貼回去、跑起來看、有錯再截圖。改一個欄位五個步驟。\n有了 MCP：你說「把名字改成 Michael、城市改成台北」，AI 自己讀檔、自己改、自己回報。一句話搞定。\n今天你裝的是 Filesystem MCP。而且它不是「AI 越獄」—— 你選哪些啟用、限定它能碰哪個資料夾、隨時可以關。是可控的能力擴張。`,
  // 16 · S16b MCP architecture 圖
  `這張圖幫你把 MCP 一次看懂 —— 想像你的筆電有一個 USB-C hub，這個 hub 就是 MCP。Claude 這些 MCP client 從一邊接進來，另一邊插上各種「MCP server」：Slack、Gmail、行事曆、你的本地檔案。\n重點：你不用為每個服務寫一套接法，MCP 就是那個統一接口。就像 USB-C —— 一個孔，什麼都能接。（手指圖：左邊是各種服務，右邊是 Claude；中間那條就是 MCP）`,
  // 17 · S17 Skills
  `第二件，Skills —— 預打包的能力。你裝一個 skill，就多一組指令。想成手機裝 App、瀏覽器裝外掛，多裝一個就多一個本事。\n差別是：skill 是用人話寫的，一個 markdown 文字檔，不是用程式碼寫的。所以任何人都能寫、都能分享。剛剛講的斜線指令，很多就是 skill 給的。`,
  // 17 · S18 Artifacts
  `第三件，Artifacts，可以想成「可以重複使用的成品」。AI 給你的一段程式碼、一份文件、一張圖，它會包成一個成品放在對話旁邊 —— 你可以預覽、複製、繼續改。\n今天寫 spec、改 code，你都會看到 artifact。它讓對話的產出不會散掉，變成可以一直迭代的東西。`,
  // 18 · S19 vibe 三個痛
  `工具講完了。但工具再好，如果你給的指令是模糊的，AI 還是會自由發揮。所以最後十五分鐘講今天的核心 —— SDD。\n先講為什麼需要它。你跟 AI 聊一聊、它寫一寫，通常會踩三個包：第一，風格不一致；第二，漏掉邊界情況；第三，最危險的 —— AI 的假性自信，它很開心跟你說「做完了！」但做完什麼？`,
  // 19 · S20 做完什麼？（大字）
  `我把今天最重要的一句話送給你。當 AI 跟你說「做完了」，你要能反問一句：做完什麼？\n（停頓，讓這句沉下去）\n如果你答不出來，那不是 AI 的問題，是你從頭就沒定義「什麼叫做完」。SDD 要解的就是這件事 —— 動手之前，先把「做完」的標準寫下來。`,
  // 20 · S21 SDD 三階段
  `怎麼寫清楚？拆成三個階段，由粗到細。第一，釐清要什麼 —— 誰、為了什麼，定方向。第二，怎麼做 —— 版型、區塊、限制，定範圍。第三，拆成可驗的任務 —— 每塊都能明確說「做到了沒」。\n這三層就是你交給 AI 的契約。它越清楚，AI 越不會自由發揮。\n而且這招特別適合新手：它不需要你會寫 code，只要你會用人話講清楚要什麼。整個循環就一句話：寫 spec → AI 做 → 拿 spec 驗 → ship。`,
  // 21 · S22 三關鍵字收尾
  `第一小時結束。如果只帶走三個字，請是這三個：Vibe —— AI 主導，適合玩具、探索。AI Coding —— 人主導，有目標、知道拒絕、先給計畫。SDD —— 先把要什麼講清楚、AI 照做、拿 spec 來驗。\n這三個字是你接下來看任何 AI 工具的篩網。\n現在休息 10 分鐘，15:00 整準時回來 —— 第二小時，每個人都會 ship 一個網站。趁休息打開 Claude Desktop、確認 Filesystem MCP 設好。`,
  // 22 · S23 接 B1
  `歡迎回來。第一小時我們講了三個關鍵字、講了 Plan Mode、講了 Desktop 三件套：MCP 讓 AI 有手、Skills 預打包能力、Artifacts 可重用工件。\n那是地圖。現在我們開始走路。（不重講三件套，30 秒帶過就好）`,
  // 23 · S24 B2 路線
  `接下來這 50 分鐘幾乎全是你動手：先花 5 分鐘看一份真的 spec，然後你親手 clone 一個 template、跑起來、用 Desktop 改成你的、推到 GitHub、讓 Vercel 上線，最後用一句話改顏色。\n離開這個 Block 之前，每個人都會有自己的網址。`,
  // 24 · S25 spec 全文
  `動手之前先給你看一個東西。B1 我講了 SDD 是「先把要什麼寫清楚」，但你還沒看過 spec 真的長什麼樣。這份是我提前寫好的個人站 spec 範例，等下你就照它改。\n（手指逐塊掃過：Goal 一句話定目的、Outcomes 訪客帶走什麼、Non-goals 明說不做、Constraints 限制、Success criteria 客觀可驗）`,
  // 25 · S27 缺了會怎樣
  `為什麼是這五個區塊？因為每一塊缺了 AI 都會自由發揮：缺 Goal，它做出一般的 portfolio；缺 Non-goals，它加一堆你沒要的功能；缺 Success criteria，你也不知道 OK 沒。\n這五區塊就是給 AI 的契約 —— 它越清楚，你越省心。OK，理論到此，接下來全部是動手。`,
  // 26 · S29 Step1 clone
  `第一步，clone。我把指令貼在投影，自己跟著做、不會的舉手。\ngit clone，後面接 workshop 的 repo 網址（網址我寫在大白板上）。這是把 GitHub 上的 repo 抓到你電腦，clone 完你會多一個 portfolio 資料夾。\n現在請你做這一步，卡住的舉手。（走動 1-2 分鐘巡視）`,
  // 27 · S30 Step2-3 cd + install
  `第二步，cd portfolio，進到這個資料夾。第三步，pnpm install，把專案需要的套件全部裝起來，第一次大概 1-2 分鐘。\n這兩步一起做，等 install 跑完。（走動巡視，回答問題；Node / pnpm 版本問題在這裡會浮現，預先準備救援指令）`,
  // 28 · S31 Step4 dev
  `第四步，pnpm dev，這會在你電腦上跑一個 local server。看到「Ready」就成功，打開 localhost:3000，應該看到一個 portfolio 範本。\n現在大家應該都看得到這個 default 網站 —— 看不到的舉手。（等 30 秒，個別救援，這是第一個動手關卡，多留時間）\n接下來請打開 Claude Desktop，確認 Filesystem MCP 路徑包含這個 portfolio 資料夾 —— 這是 B2 最高風險點，務必逐一盯。`,
  // 29 · S32 把 B1 的 MCP 用出來
  `第一小時我講 MCP 是「讓 AI 有手」，它能讀寫你電腦上的檔案。現在你親手用一次 —— 讓 AI 讀你的 resume 檔，用一句話改成你的。沒有 MCP 你得 cat 檔案、複製貼上跑五步；有了 MCP，一句話搞定。`,
  // 30 · S33 改 resume prompt
  `打開 Claude Desktop，開新對話，第一句話照念：「幫我把這個 portfolio 網站的名字改成你的名字、所在城市改成你住的城市、自我介紹改成一句話介紹你自己。」\nClaude 會自己去讀檔、改檔、回報，你會看到一個預覽 —— 這就是 B1 講的可重用工件 artifact。做完後重新整理網頁，應該看到你的資料。看到的舉手。（走動 3-4 分鐘，個別救援改檔失敗的人）`,
  // 31 · S34 GitHub repo
  `資料是你的了，現在把 code 推到 GitHub。打開 github.com → New repository，命名隨意，例如 my-portfolio，選 Public，不要勾任何初始化選項，然後 Create。\n（提醒：一定要選 Public、一定不要勾初始化，不然等下 push 會衝突）`,
  // 32 · S35 push 指令
  `Create 完會跳出一頁。複製「push an existing repository」那段指令 —— git remote add origin 加你的 repo 網址，然後 git push。貼進你的終端機跑。卡住的舉手。（走動 2-3 分鐘；GitHub auth 卡的，預先準備 PAT 流程）`,
  // 33 · S36 Vercel import
  `最後一步，上線。打開 vercel.com → New Project，Import 你剛剛的 GitHub repo，設定全部用 default，然後 Deploy。Vercel 會自動偵測這是 Next.js、跑 build、給你一個網址，大概 30 秒。\ndeploy 成功的舉手。（逐一確認；Wi-Fi 是這段的風險點）`,
  // 34 · S37 你做到了（大字）
  `現在你有自己的網址了，打開來看。兩個動作：第一，把網址貼到 workshop 共享白板，給大家互看；第二，截圖發限動，今天的紀念。\n這就是 ship 的感覺。第一小時講了一堆，這就是它的成果。（能量拉高，這是 B2 的高潮）`,
  // 35 · S38 catch up 緩衝
  `給還沒 deploy 成功的人一點時間，我來個別幫忙。已經 deploy 的，先別走 —— 下一步我們玩個有趣的：用一句話改你的網站長相。（這段是 buffer，個別救援；最差結束前一定讓每個人有 URL）`,
  // 36 · S39 一句話改主色
  `你現在有一個能跑的網站了，但它還是範本的樣子，不是你的樣子。花兩分鐘，跟 Claude 講一句話就好。回到 Desktop 照念：「把主色改成深藍、背景換成米白。」\nClaude 一樣用 MCP 改檔，改完 refresh localhost 看顏色變了。這就是你第一次用一句話改設計 —— 不用會寫 CSS、不用一個一個調。`,
  // S17b skills.sh（B2 動手）
  `改了顏色，但你可能覺得「整體還是有點陽春」。想讓它更專業，與其自己慢慢調，不如裝一個專門做設計的 skill。\n先講 skill 去哪找 —— 這個網站叫 skills.sh，Vercel 做的開放目錄，250 多個 skill，照安裝數排行。安裝一行 npx skills add 加套件名；搜尋用 npx skills find。你看排行榜：find-skills 一百五十萬、Anthropic 的 frontend-design 四十二萬。`,
  // S17c Impeccable 概覽（B2 動手裝）
  `現在我們一起裝一個我很愛、免費的設計 skill —— Impeccable。標語「Design fluency for AI harnesses」，白話講：教你的 AI 設計品味。\n跟著我念這行：npx skills add pbakaus/impeccable。裝完你就多了 23 個設計指令、7 個參考領域、27 條反模式規則。裝好的舉手。（順手打開 skill 資料夾，給大家看它的 markdown 內容 —— 呼應 B1「skill 是人話寫的」）`,
  // S17d 用 /polish 打磨（B2 動手 + 為何）
  `裝好了，現在用它。回 Desktop 照念：「用 /polish 幫我的個人站打磨設計。」\n為什麼需要它？因為 AI 看過太多類似範本，沒特別講就生出那種「一看就知道是 AI 做的」設計 —— Inter 字體、紫藍漸層、卡片疊卡片。Impeccable 把「好設計」變成 AI 跟你共用的詞彙。除了 /polish，還有 /audit 揪問題、/critique 給評論。\n改完 refresh，比較一下打磨前後 —— 這就是 skill 的威力。`,
  // 37 · S40 B3 預告
  `你的網站上線了、也改成你的樣子了。但這裡有個你可能還沒想到的問題 —— 到底有沒有人來看？來了看什麼？你完全不知道。\n這個問題 B3 一開始就會解：一個免費工具讓你看見真實訪客；然後我會講 OpenSpec，怎麼把今天學的 SDD 變成你回家能一直重複用的流程。\n現在休息 10 分鐘，16:00 整準時回來。沒 deploy 成功的趁現在找我。`,
  // 38 · S41 開場：有人看嗎？
  `歡迎回來。B2 你 ship 了人生第一個由 AI 幫你完成的網站，還順手用一句話改了顏色。\n但我問你一個問題 —— 你的網站上線了，到底有沒有人來看？（停頓）知道自己網站有幾個人看過的，舉手。（多半沒人舉）\n對，這就是重點。大部分人推了網站就再也沒回去看。ship 不是終點，是起點。最後一小時兩件事：前半 PostHog 看訪客，後半 OpenSpec 系統化。`,
  // 39 · S42 PostHog 是什麼
  `我用的工具叫 PostHog —— 一個開源、免費額度很大的「產品分析」工具。為什麼推薦給新手？第一，免費額度個人站綽綽有餘；第二，一段 snippet 就接好，不用後端；第三，從「有幾個人看」到「他們怎麼用」全包，不用裝十個工具。`,
  // 40 · S43 怎麼接
  `我帶你看怎麼接 —— 你不用當場做，看就好，回家 Resource Pack 有步驟。到 posthog.com 註冊、開一個 project 拿到一段 snippet，把這段貼進你網站的 head（這個 template 已經預留位置），re-deploy。就這樣，接好之後你網站每一個訪問都會自動回報給 PostHog。`,
  // 41 · S44 看到第一個訪問
  `我切到我自己的 PostHog dashboard —— 這是我一個真的有在跑的站。看，這裡是訪問人數、來源、用什麼裝置。這些資料你完全不用寫 code，snippet 自己收集。\n（demo：手指 unique visitors / page views / 來源 / 裝置；如果 live 掛了切預錄畫面）`,
  // 42 · S45 數據幫你做決定
  `數據的重點不是「好看」，是「幫你做決定」。比如我發現 80% 的人從手機進來，那我就知道手機版要顧好；又比如大家都停在首頁、沒人點到聯絡頁，那我就知道我的 CTA 有問題。\nship 之後該做的事 —— 不是猜，是看數據。`,
  // 43 · S46 功能全景
  `很多人以為分析工具就是「看幾個人來」。PostHog 比那多很多。我快速帶你看幾個 —— 你不用全記，知道有這些武器，需要時回去找。`,
  // 44 · S47 核心 4
  `四個核心功能。第一，Analytics 流量分析，誰來、從哪來、用什麼裝置，最基本最常看。第二，Session Replay 畫面回放，這個最神奇，它能像錄影一樣重播訪客的操作，你會親眼看到「喔原來他找不到按鈕」。第三，Heatmaps 熱區圖，把所有人的點擊疊成一張熱力圖。第四，Funnels 轉換漏斗，看每一步流失多少人。`,
  // 45 · S48 推薦 3
  `再給你三個之後值得玩的。第五，Feature Flags 功能開關，不改 code、不 re-deploy 就能開關功能或灰度發布。第六，A/B Testing，兩個版本讓 PostHog 自動分流、告訴你哪個好，用數據決定不用吵架。第七，Surveys，直接在網站上彈問卷問訪客。`,
  // 46 · S49 新手順序
  `功能很多，新手別貪。建議順序：第一步，接上去看 Analytics，有沒有人來；第二步，開 Session Replay 看 3-5 個 replay，他們怎麼用；之後有具體問題了，才去用 Funnel、Flag、A/B。\n數據工具的價值不在功能多，在你拿它做決定。Resource Pack 有完整連結。`,
  // 47 · S50 從 SDD 到 OpenSpec
  `你現在會 ship、會看數據了。最後一段，我把今天學的 SDD 收成一套你能一直用的流程 —— OpenSpec。\n回到第一小時，我講過 SDD：先把要什麼寫清楚再讓 AI 做，B2 你也用了一份 spec。但那份 spec 是一次性的。真正做專案，你會一直有新需求、一直要改，每次重寫一份散在各處的 spec 很快就亂掉。OpenSpec 解的就是這件事。`,
  // 48 · S51 OpenSpec 是什麼
  `OpenSpec 是一個開源工具，Fission-AI 做的。一句話講：它幫你把「每一次要改什麼」管理成一個個 change，每個 change 都有完整的 spec 和任務拆解，做完了就歸檔。\n你可以想成 —— SDD 是「寫清楚再做」這個習慣，OpenSpec 是把這習慣變成一個資料夾結構加一套指令，讓你跟 AI 每次都照同一套流程走。`,
  // 49 · S52 流程圖
  `它的流程大概是這五步：propose、spec、tasks、apply、archive。我帶你走過一遍，今天只要看懂，不用動手。（手指流程圖五個節點滑過）`,
  // 50 · S53 五步說明
  `第一，Propose 提案 —— 你有個想法，先寫為什麼要、要解什麼問題。第二，Spec 規格 —— 把這個 change 要達成的具體行為寫清楚，就是 B1 講的把要什麼寫明白。第三，Tasks —— 拆成一條條可勾選的任務。第四，Apply —— 讓 AI 照 tasks 一條條做，做的時候有 spec 當契約。第五，Archive 歸檔，你的 spec 就一直累積成專案的活文件。\n這五步就是 SDD 的循環，只是被工具固定下來、可以一直重複。`,
  // 51 · S54 今天這場就是 OpenSpec 做的
  `最有說服力的例子 —— 今天這整場 workshop，就是我用 OpenSpec 設計的。我有一個 change 叫 freeze-v4-workshop-design，裡面有 proposal、spec、跟 17 個下游任務。我臨時要把第一小時重構，又開了一個 change，照同一套流程走。這就是 OpenSpec 在真實場景的樣子。`,
  // 52 · S55 為什麼推薦
  `為什麼把這個留到最後、推薦給你？因為今天三小時你學的所有東西 —— Plan Mode、寫 spec、用 MCP 改 —— OpenSpec 把它們串成一條完整的線。你不用每次重新發明流程，照它走就好。而且它不只能管 code，我用它管一場 workshop。\n今天我不帶你動手裝 —— 這是回家作業，Resource Pack 有 getting started。先聽懂「它是把 SDD 系統化的流程」就夠了。`,
  // 53 · S56 三小時收束
  `三小時到這。回顧你今天帶走的：B1 你學會了人主導的 AI Coding —— Plan Mode、Desktop 三件套、SDD；B2 你親手做到了，從 template 到 live URL，ship 了自己的網站；B3 你看到了怎麼用 PostHog 看見真實訪客、用 OpenSpec 把 SDD 變成流程。\n一條線：ship 出來 → 看見訪客 → 用流程一直 ship 得更好。\n回家順序：這週把網站接上 PostHog，下個月玩 OpenSpec 管一個小專案，Resource Pack 是半年的地圖。`,
  // 54 · S57 紙本回饋
  `我發 Resource Pack，每人一份，裡面夾一張 3 題回饋卡。請花 2 分鐘寫：第一題，今天最有用的一件事？第二題，你回家第一個會做什麼？第三題，1 到 10 推薦給朋友。\n寫完別走，我邊收、邊問 2-3 位口頭分享第二題。（點 2-3 人，各 30-45 秒）沒被點到的別失望，紙本我全部會看。`,
  // 55 · S58 謝謝 + 合照
  `謝謝你們今天的耐心，3 小時對講師對學員都不短。兩件事帶走：你 ship 的網址，你的第一個 AI Coding 作品；還有 Resource Pack，半年的學習地圖。\n今天聽不懂的、卡關的、想多問的，找我，我留到 17:30。Discord 跟 email 都歡迎。\n最後 —— 合照！請大家集中到投影螢幕前。（拍 1-2 張）辛苦了。`,
];

export default [
  S1, S2, S3, S4, S5, S6, S8, S9, S10,
  S11, S12, S13, S14, S15, S16, S16b, S17, S18, S19, S20, S21, S22,
  S23, S24, S25, S27, S29, S30, S31, S32,
  S33, S34, S35, S36, S37, S38, S39, S17b, S17c, S17d, S40,
  S41, S42, S43, S44, S45, S46, S47, S48, S49, S50,
  S51, S52, S53, S54, S55, S56, S57, S58,
] satisfies Page[];
