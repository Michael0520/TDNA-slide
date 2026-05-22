import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';
import vercelLogo from '@assets/logos/vercel.svg';
import githubLogo from '@assets/logos/github.svg';
import code4twLogo from '@assets/logos/code4tw.png';
import michaelAvatar from '@assets/avatars/michael.jpg';

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
const accentH1 = '#D97757'; // 安裝 + 觀念 — Claude orange
const accentH2 = '#D97757'; // AI Coding — orange（觀念延續）
const accentH3 = '#4ADE80'; // 改樣板 — green / ship / go
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

const Eyebrow = ({ children, color = accentH1 }: { children: React.ReactNode; color?: string }) => (
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

const Footer = ({ accent = accentH1 }: { accent?: string }) => {
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

const HandUp = ({ children, accent = accentH1 }: { children: React.ReactNode; accent?: string }) => (
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
  accent = accentH1,
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
type IconName = 'hand' | 'check' | 'arrow-right' | 'globe';
const ICON_PATHS: Record<IconName, React.ReactNode> = {
  hand: (
    <>
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
};

const Icon = ({ name, size = 24, color = 'currentColor', strokeWidth = 2 }: { name: IconName; size?: number; color?: string; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, display: 'block' }} aria-hidden="true">
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
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
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
  eyebrowColor = accentH1,
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

/* 「去這個網址」大網址列 */
const UrlBar = ({ url, accent = accentH1 }: { url: string; accent?: string }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 18, padding: '20px 32px', borderRadius: 14, background: surface, border: `1px solid ${accent}` }}>
    <Icon name="globe" size={32} color={accent} />
    <span style={{ fontFamily: mono, fontSize: 34, color: 'var(--osd-text)' }}>{url}</span>
  </div>
);

/* ════════════════════════════════════════════════════════
   H1 · 安裝 + 開場觀念 — accent: orange
   ════════════════════════════════════════════════════════ */

/* H1-01 封面 */
const Cover: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentH1}>Code for Taiwan · TDF 台東 · 14:00–17:00</Eyebrow>
    </div>
    <div style={{ animation: 'fadeUp 0.5s ease 0.08s both' }}>
      <Title size={150}>
        From Vibe<br />to <span style={{ color: accentH1 }}>Spec</span>
      </Title>
    </div>
    <p style={{ fontSize: 44, color: 'var(--osd-text)', marginTop: 40, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      Ship Your First Personal Site with AI
    </p>
    <p style={{ fontSize: 32, color: muted, marginTop: 16, animation: 'fadeUp 0.5s ease 0.22s both' }}>
      主講：Michael Lo · Code for Taiwan
    </p>
  </div>
);

/* H1-02 自我介紹 */
const IntroRow = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <li style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
    <span style={{ width: 48, display: 'inline-flex', justifyContent: 'center', flexShrink: 0 }}>{icon}</span>
    <span>{children}</span>
  </li>
);

const Intro: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', gap: 100, padding: 120 }}>
    <style>{styles}</style>
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, animation: 'fadeUp 0.5s ease both' }}>
        <Title size={104}>Michael Lo</Title>
        <span style={{ fontSize: 40, fontStyle: 'italic', color: accentH1, fontFamily: 'cursive' }}>ming</span>
      </div>
      <ul style={{ fontSize: 38, lineHeight: 1.9, marginTop: 40, padding: 0, listStyle: 'none', animation: 'fadeUp 0.5s ease 0.12s both' }}>
        <IntroRow icon={<span style={{ fontFamily: mono, color: accentH1, fontSize: 30 }}>{'</>'}</span>}>Web Developer</IntroRow>
        <IntroRow icon={<img src={code4twLogo} alt="Code for Taiwan" style={{ width: 44, height: 44, objectFit: 'contain' }} />}>
          Code for Taiwan Member
        </IntroRow>
      </ul>
      <p style={{ fontSize: 32, fontStyle: 'italic', color: muted, marginTop: 36, animation: 'fadeUp 0.5s ease 0.18s both' }}>
        “Coding is my way of making tomorrow a little lazier.”
      </p>
      <div style={{ display: 'flex', gap: 48, marginTop: 44, fontSize: 30, color: muted, animation: 'fadeUp 0.5s ease 0.24s both' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="globe" size={28} color={muted} /> michaello.me
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={githubLogo} alt="GitHub" style={{ width: 28, height: 28, objectFit: 'contain' }} /> Michael0520
        </span>
      </div>
    </div>
    <img src={michaelAvatar} alt="Michael Lo"
      style={{ width: 380, height: 380, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, animation: 'fadeUp 0.5s ease 0.1s both' }} />
    <Footer accent={accentH1} />
  </div>
);

/* H1-03 兩個舉手 */
const HandsUp: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="先做兩個小調查">換你舉手</PageHead>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 64, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <HandUp>過去 12 個月，用 AI 寫過 code？</HandUp>
      <HandUp>用 AI 把網站 ship 上線過？</HandUp>
    </div>
    <Footer accent={accentH1} />
  </div>
);

/* H1-04 今天最重要的分界線 */
const Divider: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentH1}>今天最重要的一條線</Eyebrow>
    </div>
    <Title size={110}>
      用 AI 寫東西，<br />其實有<span style={{ color: accentH1 }}>兩種 mode</span>。
    </Title>
    <Footer accent={accentH1} />
  </div>
);

/* H1-05 Vibe vs AI Coding 對照 */
const ModeCard = ({ tag, color, who, lines }: { tag: string; color: string; who: string; lines: string[] }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 56 }}>
    <div style={{ fontSize: 44, fontWeight: 800, color, fontFamily: 'var(--osd-font-display)' }}>{tag}</div>
    <div style={{ fontSize: 30, color, marginTop: 8, marginBottom: 36, fontWeight: 600 }}>{who}</div>
    {lines.map((l) => (
      <p key={l} style={{ fontSize: 34, lineHeight: 1.5, margin: '0 0 18px' }}>{l}</p>
    ))}
  </div>
);

const VibeVsAI: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="兩種 mode · 誰主導？">Vibe vs AI Coding</PageHead>
    <div style={{ display: 'flex', gap: 48, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <ModeCard tag="Vibe Coding" color={accentH1} who="→ AI 主導"
        lines={['你跟 AI 聊聊聊', 'AI 給什麼，你就收什麼', '能跑就好']} />
      <ModeCard tag="AI Coding" color={accentH3} who="→ 人主導"
        lines={['你知道目標', '主動選方案、敢拒絕', '關鍵時刻你介入']} />
    </div>
    <Footer accent={accentH1} />
  </div>
);

/* H1-06 一句話分 */
const OneLine: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <Title size={104}>
      <span style={{ color: accentH1 }}>Vibe</span> 是 AI 主導，<br />
      <span style={{ color: accentH3 }}>AI Coding</span> 是人主導。
    </Title>
    <p style={{ fontSize: 48, color: muted, marginTop: 48, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      AI 是工具，<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>你是決策者</span>。
    </p>
    <Footer accent={accentH1} />
  </div>
);

/* H1-07 看情境切換 */
const SituationCard = ({ color, head, body }: { color: string; head: string; body: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 48 }}>
    <div style={{ fontSize: 34, fontWeight: 700, color, marginBottom: 20 }}>{head}</div>
    <p style={{ fontSize: 32, lineHeight: 1.5, margin: 0, color: 'var(--osd-text)' }}>{body}</p>
  </div>
);

const Switch: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="不是對立，是兩種 mode">看情境，學會切換</PageHead>
    <div style={{ display: 'flex', gap: 64, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <SituationCard color={accentH1} head="用 Vibe" body="玩具、驗證 idea、週末小專案 — 門檻低、產出快。" />
      <SituationCard color={accentH3} head="用 AI Coding" body="長期維護、要上線給人用、任何正式專案。" />
    </div>
    <p style={{ fontSize: 36, color: muted, marginTop: 48, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      今天的目標：帶你<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>從第一種，走到第二種</span>。
    </p>
    <Footer accent={accentH1} />
  </div>
);

/* H1-08 安裝總覽：今天先裝四個東西 */
const SetupCard = ({ n, name, sub }: { n: string; name: string; sub: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 40, textAlign: 'center' }}>
    <div style={{ fontSize: 26, color: accentH1, fontFamily: mono, marginBottom: 16 }}>{n}</div>
    <div style={{ fontSize: 38, fontWeight: 800, fontFamily: 'var(--osd-font-display)' }}>{name}</div>
    <p style={{ fontSize: 26, color: muted, marginTop: 12, marginBottom: 0, lineHeight: 1.4 }}>{sub}</p>
  </div>
);

const SetupOverview: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="段 2 · 動手前的準備">先一起裝四個東西</PageHead>
    <div style={{ display: 'flex', gap: 28, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <SetupCard n="01" name="Warp" sub="現代終端機" />
      <SetupCard n="02" name="Node + pnpm" sub="跑網站的引擎" />
      <SetupCard n="03" name="Git" sub="版本管理 / 上傳" />
      <SetupCard n="04" name="Claude Code" sub="今天的主角 AI" />
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 48, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      跟著我一步步來，<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>裝不起來就舉手</span>，助教會過去。
    </p>
    <Footer accent={accentH1} />
  </div>
);

/* H1-09 Warp */
const SetupWarp: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="01 · 終端機">裝 Warp</PageHead>
    <p style={{ fontSize: 34, color: muted, marginTop: 28, lineHeight: 1.5, animation: 'fadeUp 0.5s ease 0.08s both' }}>
      一個<span style={{ color: 'var(--osd-text)' }}>更好用的終端機</span>（打指令的黑視窗）— 內建 AI、好看好操作。
    </p>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <UrlBar url="warp.dev" accent={accentH1} />
    </div>
    <p style={{ fontSize: 30, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.24s both' }}>
      到官網點 <span style={{ color: accentH1 }}>Download</span> 裝起來。我們一起做 — 裝好的舉手。
    </p>
    <Footer accent={accentH1} />
  </div>
);

/* H1-10 Node + pnpm */
const SetupNode: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="02 · 跑網站的引擎">裝 Node + pnpm</PageHead>
    <p style={{ fontSize: 30, color: muted, marginTop: 24, animation: 'fadeUp 0.5s ease 0.08s both' }}>
      到 <span style={{ color: accentH1, fontFamily: mono }}>nodejs.org/zh-tw/download</span> 選 macOS / nvm / pnpm，照官網貼這幾行：
    </p>
    <div style={{ marginTop: 28, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <WindowShell label="Warp · 終端機" accent={accentH1}>
        <div style={{ color: muted, fontSize: 24 }}># 裝 nvm（Node 版本管理）</div>
        <div><span style={{ color: codeGreen }}>$</span> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash</div>
        <div style={{ marginTop: 12, color: muted, fontSize: 24 }}># 裝 Node + pnpm</div>
        <div><span style={{ color: codeGreen }}>$</span> nvm install 24</div>
        <div><span style={{ color: codeGreen }}>$</span> corepack enable pnpm</div>
      </WindowShell>
    </div>
    <Footer accent={accentH1} />
  </div>
);

/* H1-11 Claude Code */
const SetupClaude: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="03 · 今天的主角">裝 Claude Code</PageHead>
    <p style={{ fontSize: 30, color: muted, marginTop: 24, animation: 'fadeUp 0.5s ease 0.08s both' }}>
      文件在 <span style={{ color: accentH1, fontFamily: mono }}>code.claude.com/docs/zh-TW</span> — 在 Warp 貼這行就裝好：
    </p>
    <div style={{ marginTop: 28, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <WindowShell label="Warp · 終端機" accent={accentH1}>
        <div><span style={{ color: codeGreen }}>$</span> curl -fsSL https://claude.ai/install.sh | bash</div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 30, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.24s both' }}>
      （Git 通常 macOS 已內建；沒有的話它會提示你裝。）
    </p>
    <Footer accent={accentH1} />
  </div>
);

/* H1-12 環境檢查 */
const CheckRow = ({ cmd, expect }: { cmd: string; expect: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '16px 0', borderBottom: `1px solid ${border}` }}>
    <span style={{ fontFamily: mono, fontSize: 32, color: 'var(--osd-text)', width: 360, flexShrink: 0 }}>
      <span style={{ color: codeGreen }}>$</span> {cmd}
    </span>
    <Icon name="check" size={28} color={codeGreen} />
    <span style={{ fontSize: 30, color: muted }}>{expect}</span>
  </div>
);

const CheckEnv: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="裝好了嗎？一起檢查">看到版本就 OK</PageHead>
    <div style={{ marginTop: 40, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <CheckRow cmd="node -v" expect="出現版本號 v24…" />
      <CheckRow cmd="pnpm -v" expect="出現版本號" />
      <CheckRow cmd="git --version" expect="出現版本號" />
      <CheckRow cmd="claude --version" expect="出現版本號" />
    </div>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <HandUp>四個都看到版本的舉手</HandUp>
    </div>
    <Footer accent={accentH1} />
  </div>
);

/* H1-13 H1 收束 + 預告 H2 */
const H1Close: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentH1}>第一段結束 · 預告</Eyebrow>
    </div>
    <Title size={96}>
      工具到位了。<br />接下來 <span style={{ color: accentH1 }}>學怎麼用</span>。
    </Title>
    <p style={{ fontSize: 36, color: muted, marginTop: 44, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      第二段：怎麼<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>驅動 Claude Code</span> + 一個讓 AI 變可靠的關鍵習慣（SDD）。
    </p>
    <Footer accent={accentH1} />
  </div>
);

/* ════════════════════════════════════════════════════════
   H2 · AI Coding（Claude Code + SDD）— accent: orange
   ════════════════════════════════════════════════════════ */

/* H2-01 開場 */
const H2Open: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentH2}>第二小時 · AI Coding · 15:00</Eyebrow>
    </div>
    <Title size={104}>
      工具會了，<br />現在學<span style={{ color: accentH2 }}>怎麼驅動它</span>。
    </Title>
    <Footer accent={accentH2} />
  </div>
);

/* H2-02 打開 Claude Code */
const OpenClaude: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="在 Warp 裡打一個字" eyebrowColor={accentH2}>打開 Claude Code</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Warp · 終端機" accent={accentH2}>
        <div><span style={{ color: codeGreen }}>$</span> claude</div>
        <div style={{ marginTop: 12, color: codeGreen }}>● 你好！要我幫你做什麼？</div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 34, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      然後就<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>用講話的方式</span>跟它說你要什麼 — 不用記指令。
    </p>
    <Footer accent={accentH2} />
  </div>
);

/* H2-03 Plan Mode */
const PlanMode: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="最該學的一個習慣" eyebrowColor={accentH2}>Plan Mode</PageHead>
    <div style={{ display: 'flex', gap: 64, marginTop: 56, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.1s both' }}>
        <WindowShell label="Claude Code" accent={accentH2}>
          <div style={{ color: muted }}>連按兩次 <span style={{ color: accentH2 }}>Shift + Tab</span></div>
          <div style={{ marginTop: 16, color: codeGreen }}>→ AI 先給計畫，不直接動手</div>
          <div style={{ color: codeText }}>　做什麼 · 改哪些檔 · 什麼順序</div>
          <div style={{ marginTop: 16, color: codeText }}>你看過、按核可 → 才執行</div>
        </WindowShell>
      </div>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.2s both' }}>
        <p style={{ fontSize: 36, lineHeight: 1.55, marginTop: 0 }}>
          動手前先給計畫，就是 vibe coding <span style={{ color: accentH2 }}>不會做的事</span>。
        </p>
        <ul style={{ fontSize: 32, lineHeight: 1.6, paddingLeft: 36, color: muted }}>
          <li>AI 想偏了，你在計畫階段就擋下</li>
          <li>核可後不會邊做邊發明</li>
        </ul>
      </div>
    </div>
    <p style={{ fontSize: 40, color: accentH2, fontWeight: 700, marginTop: 40, animation: 'fadeUp 0.5s ease 0.28s both' }}>
      動手前先給計畫，不要邊做邊發明。
    </p>
    <Footer accent={accentH2} />
  </div>
);

/* H2-04 vibe 三個痛 */
const PainCard = ({ n, head, body }: { n: string; head: string; body: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 44 }}>
    <div style={{ fontSize: 30, color: accentH2, fontFamily: mono, marginBottom: 16 }}>{n}</div>
    <div style={{ fontSize: 34, fontWeight: 700, marginBottom: 14 }}>{head}</div>
    <p style={{ fontSize: 28, lineHeight: 1.5, color: muted, margin: 0 }}>{body}</p>
  </div>
);

const Pains: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="為什麼需要 SDD" eyebrowColor={accentH2}>只用嘴巴聊的三個痛</PageHead>
    <div style={{ display: 'flex', gap: 48, marginTop: 64, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <PainCard n="01" head="風格不一致" body="今天聊的跟明天聊的長不一樣，因為每次說法都不同。" />
      <PainCard n="02" head="漏掉狀況" body="只做了正常情況；沒網路、欄位空白全沒處理。" />
      <PainCard n="03" head="假性自信" body="AI 很開心說「做完了！」— 但做完什麼？" />
    </div>
    <Footer accent={accentH2} />
  </div>
);

/* H2-05 做完什麼？ */
const DoneWhat: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <p style={{ fontSize: 48, color: muted, margin: 0, animation: 'fadeUp 0.5s ease both' }}>
      AI 說「做完了」→ 你要反問：
    </p>
    <Title size={150}>
      <span style={{ color: accentH2 }}>做完什麼？</span>
    </Title>
    <p style={{ fontSize: 38, color: muted, lineHeight: 1.6, maxWidth: 1500, marginTop: 40, animation: 'fadeUp 0.5s ease 0.18s both' }}>
      答不出來 = 你從頭沒定義「什麼叫做完」。SDD = <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>動手前先把「做完」的標準寫下來</span>。
    </p>
    <Footer accent={accentH2} />
  </div>
);

/* H2-06 SDD 三階段 */
const StageCard = ({ n, head, body }: { n: string; head: string; body: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 40 }}>
    <div style={{ fontSize: 28, color: accentH2, fontFamily: mono, marginBottom: 14 }}>{n}</div>
    <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 14 }}>{head}</div>
    <p style={{ fontSize: 27, lineHeight: 1.5, color: muted, margin: 0 }}>{body}</p>
  </div>
);

const SddStages: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="SDD 三階段 · 用人話寫就好" eyebrowColor={accentH2}>把「要什麼」講清楚</PageHead>
    <div style={{ display: 'flex', gap: 40, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <StageCard n="①" head="釐清要什麼" body="誰、為了什麼。定方向。" />
      <StageCard n="②" head="怎麼做" body="版型 / 區塊 / 限制。定範圍。" />
      <StageCard n="③" head="拆可驗任務" body="每塊都能說「做到了沒」。" />
    </div>
    <p style={{ fontSize: 34, color: accentH2, fontWeight: 700, marginTop: 44, animation: 'fadeUp 0.5s ease 0.22s both' }}>
      寫清楚 → AI 做 → 拿它來驗 → ship
    </p>
    <Footer accent={accentH2} />
  </div>
);

/* H2-07 輕量動手：試一個小指令 */
const TryClaude: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] 試一下手感" eyebrowColor={accentH2}>先跟它說一句話</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Claude Code" accent={accentH2}>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 30, lineHeight: 1.6, color: 'var(--osd-text)' }}>
          幫我在桌面建一個資料夾叫 <span style={{ color: accentH2 }}>my-first</span>，裡面放一個寫著我名字的文字檔。
        </div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      看它先給計畫、你按核可、它動手 — <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>這就是 AI Coding 的手感</span>。
    </p>
    <Footer accent={accentH2} />
  </div>
);

/* H2-08 收束 + 預告 H3 */
const H2Close: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentH3}>第二段結束 · 預告</Eyebrow>
    </div>
    <Title size={96}>
      會用了 —<br />接下來<span style={{ color: accentH3 }}>做一個真網站</span>。
    </Title>
    <p style={{ fontSize: 36, color: muted, marginTop: 44, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      第三段：clone 一個範本 → 用 Claude Code 改成你的 → 推上線。<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>離開前每人有自己的網址。</span><br />
      休息 10 分鐘，16:00 回來。
    </p>
    <Footer accent={accentH3} />
  </div>
);

/* ════════════════════════════════════════════════════════
   H3 · 改樣板 + ship — accent: green
   ════════════════════════════════════════════════════════ */

/* H3-01 開場 */
const H3Open: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentH3}>第三小時 · 改樣板 · 16:00</Eyebrow>
    </div>
    <Title size={104}>
      clone 一個範本，<br /><span style={{ color: accentH3 }}>改成你的</span>。
    </Title>
    <p style={{ fontSize: 36, color: muted, marginTop: 44, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      全程動手：抓範本 → 用 Claude Code 改 → 推上線。<span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>離開前每人有自己的網址。</span>
    </p>
    <Footer accent={accentH3} />
  </div>
);

/* H3-02 spec 走讀 */
const SpecBlock = ({ head, lines }: { head: string; lines: string[] }) => (
  <div style={{ marginBottom: 18 }}>
    <span style={{ color: accentH3, fontWeight: 700 }}># {head}</span>
    {lines.map((l) => (
      <div key={l} style={{ color: codeText, paddingLeft: 8 }}>{l}</div>
    ))}
  </div>
);

const SpecWalk: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="動手前 · 先看一份 spec" eyebrowColor={accentH3}>這是一份真的 spec</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <WindowShell label="spec.md" accent={accentH3}>
        <div style={{ fontSize: 26, lineHeight: 1.45 }}>
          <SpecBlock head="Goal" lines={['讓人 5 分鐘內認識我']} />
          <SpecBlock head="Outcomes" lines={['知道我是誰、做什麼', '看到代表作品', '找到聯絡方式']} />
          <SpecBlock head="Non-goals" lines={['不放完整 portfolio · 不寫 blog']} />
          <SpecBlock head="Constraints" lines={['手機可讀 · 3 秒載完']} />
          <SpecBlock head="Success criteria" lines={['5 個朋友看完能介紹我的工作']} />
        </div>
      </WindowShell>
    </div>
    <Footer accent={accentH3} />
  </div>
);

/* H3-03 缺了會怎樣 */
const MissingRow = ({ miss, result }: { miss: string; result: string }) => (
  <div style={{ display: 'flex', gap: 32, padding: '22px 0', borderBottom: `1px solid ${border}` }}>
    <span style={{ fontSize: 32, fontWeight: 700, color: accentH3, width: 360, flexShrink: 0 }}>{miss}</span>
    <span style={{ fontSize: 32, color: muted }}>{result}</span>
  </div>
);

const SpecMissing: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="每一塊缺了 AI 都自由發揮" eyebrowColor={accentH3}>這 5 塊是給 AI 的契約</PageHead>
    <div style={{ marginTop: 44, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <MissingRow miss="缺 Goal" result="做出一般的 portfolio" />
      <MissingRow miss="缺 Non-goals" result="加一堆你沒要的功能" />
      <MissingRow miss="缺 Success criteria" result="你不知道 OK 沒" />
    </div>
    <Footer accent={accentH3} />
  </div>
);

/* H3-04 clone */
const CloneStep: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] Step 1 · clone" eyebrowColor={accentH3}>把範本抓到電腦</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Warp · 終端機" accent={accentH3}>
        <div><span style={{ color: codeGreen }}>$</span> git clone https://github.com/Michael0520/portfolio-workshop.git</div>
        <div style={{ marginTop: 8 }}><span style={{ color: codeGreen }}>$</span> cd portfolio-workshop</div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 32, lineHeight: 1.5, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <span style={{ color: 'var(--osd-text)' }}>clone</span> = 把網路上的範本整包複製到你電腦。卡住的舉手。
    </p>
    <Footer accent={accentH3} />
  </div>
);

/* H3-05 install + dev */
const DevStep: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] Step 2 · 跑起來" eyebrowColor={accentH3}>裝套件，看範本</PageHead>
    <div style={{ marginTop: 32, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Warp · 終端機" accent={accentH3}>
        <div><span style={{ color: codeGreen }}>$</span> pnpm install</div>
        <div style={{ marginTop: 8 }}><span style={{ color: codeGreen }}>$</span> pnpm dev</div>
        <div style={{ marginTop: 12, color: codeGreen, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="check" size={28} color={codeGreen} /> Ready
        </div>
        <div style={{ color: muted }}>→ 打開瀏覽器看 localhost:3000</div>
      </WindowShell>
    </div>
    <div style={{ marginTop: 28, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <HandUp accent={accentH3}>看到範本網站的舉手</HandUp>
    </div>
    <Footer accent={accentH3} />
  </div>
);

/* H3-06 用 Claude Code 改個人資料 */
const EditResume: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] 用 Claude Code 改成你的" eyebrowColor={accentH3}>一句話改個人資料</PageHead>
    <div style={{ marginTop: 32, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Claude Code（在 portfolio-workshop 資料夾）" accent={accentH3}>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 30, lineHeight: 1.65, color: 'var(--osd-text)' }}>
          幫我把這個網站的名字改成 <span style={{ color: accentH3 }}>[你的名字]</span>、
          所在城市改成 <span style={{ color: accentH3 }}>[你住的城市]</span>、
          自我介紹改成 <span style={{ color: accentH3 }}>[一句話介紹你自己]</span>。
        </div>
      </WindowShell>
    </div>
    <div style={{ marginTop: 28, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <HandUp accent={accentH3}>重新整理網頁、看到自己資料的舉手</HandUp>
    </div>
    <Footer accent={accentH3} />
  </div>
);

/* H3-07 GitHub repo */
const GithubRepo: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] 把成果放上 GitHub" eyebrowColor={accentH3}>開一個新 repo</PageHead>
    <ol style={{ fontSize: 36, lineHeight: 1.7, marginTop: 44, paddingLeft: 40, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <li>到 <span style={{ color: accentH3, fontFamily: mono }}>github.com/new</span></li>
      <li>命名（例如 <span style={{ fontFamily: mono }}>my-portfolio</span>）</li>
      <li>選 <span style={{ color: accentH3 }}>Public</span>、<span style={{ color: accentH3 }}>不勾</span>任何初始化</li>
      <li>Create</li>
    </ol>
    <Footer accent={accentH3} />
  </div>
);

/* H3-08 push */
const PushStep: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] 推上去" eyebrowColor={accentH3}>複製 GitHub 給的指令</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Warp · 終端機" accent={accentH3}>
        <div><span style={{ color: codeGreen }}>$</span> git remote add origin &lt;你的 repo 網址&gt;</div>
        <div style={{ marginTop: 8 }}><span style={{ color: codeGreen }}>$</span> git push -u origin main</div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      不會打也可以請 Claude Code 幫你推。卡住的舉手。
    </p>
    <Footer accent={accentH3} />
  </div>
);

/* H3-09 Vercel deploy */
const DeployFlow = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40 }}>
    <LogoTile src={githubLogo} alt="GitHub" caption="GitHub repo" accent={muted} />
    <Icon name="arrow-right" size={32} color={accentH3} />
    <LogoTile src={vercelLogo} alt="Vercel" caption="Vercel" accent={muted} pad={40} />
    <Icon name="arrow-right" size={32} color={accentH3} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <div style={{ width: 160, height: 160, borderRadius: 24, background: surface, border: `1px solid ${accentH3}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accentH3 }}>
        <Icon name="globe" size={60} color={accentH3} strokeWidth={1.8} />
      </div>
      <span style={{ fontSize: 28, fontWeight: 600, color: accentH3 }}>你的網址</span>
    </div>
  </div>
);

const DeployStep: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] 上線" eyebrowColor={accentH3}>Vercel 自動部署</PageHead>
    <div style={{ marginTop: 48, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <DeployFlow />
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 56, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', animation: 'fadeUp 0.5s ease 0.2s both' }}>
      vercel.com → New Project → Import repo → Deploy。約 30 秒。
      <span style={{ color: accentH3, display: 'inline-flex', alignItems: 'center', gap: 8 }}>成功舉手 <Icon name="hand" size={28} color={accentH3} /></span>
    </p>
    <Footer accent={accentH3} />
  </div>
);

/* H3-10 你做到了 */
const YouDidIt: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <Title size={140}>
      你<span style={{ color: accentH3 }}>做到了</span>。
    </Title>
    <p style={{ fontSize: 44, marginTop: 40, animation: 'fadeUp 0.5s ease 0.14s both' }}>
      你有自己的網址了。
    </p>
    <p style={{ fontSize: 36, color: muted, marginTop: 24, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      ① 貼共享白板互看　② 截圖分享 — 這就是 <span style={{ color: accentH3, fontWeight: 700 }}>ship 的感覺</span>。
    </p>
    <Footer accent={accentH3} />
  </div>
);

/* H3-11 一句話改主色 */
const ChangeColor: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] 第一次用一句話改設計" eyebrowColor={accentH3}>改你的主色</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Claude Code" accent={accentH3}>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 30, lineHeight: 1.6, color: 'var(--osd-text)' }}>
          幫我把網站的主色改成 <span style={{ color: accentH3 }}>[深藍色]</span>、背景換成 <span style={{ color: accentH3 }}>[米白色]</span>。
        </div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 34, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      重新整理就看到變化 — <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>你完全不用懂程式</span>。
    </p>
    <Footer accent={accentH3} />
  </div>
);

/* H3-12 skills.sh */
const RankRow = ({ rank, name, owner, installs, hot = false }: { rank: string; name: string; owner: string; installs: string; hot?: boolean }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '16px 0', borderBottom: `1px solid ${border}` }}>
    <span style={{ fontSize: 28, fontFamily: mono, color: hot ? accentH3 : muted, width: 44, flexShrink: 0 }}>{rank}</span>
    <span style={{ fontSize: 32, fontWeight: 700, fontFamily: mono, color: hot ? accentH3 : 'var(--osd-text)', flex: 1 }}>{name}</span>
    <span style={{ fontSize: 26, color: muted, fontFamily: mono }}>{owner}</span>
    <span style={{ fontSize: 28, fontWeight: 700, color: hot ? accentH3 : muted, width: 110, textAlign: 'right', flexShrink: 0 }}>{installs}</span>
  </div>
);

const SkillsSh: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="想讓網站更好看？裝個 skill" eyebrowColor={accentH3}>skills.sh · skill 生態</PageHead>
    <div style={{ display: 'flex', gap: 56, marginTop: 44, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.1s both' }}>
        <WindowShell label="Claude Code 也能裝 skill" accent={accentH3}>
          <div style={{ color: codeText }}><span style={{ color: codeGreen }}>$</span> npx skills add <span style={{ color: accentH3 }}>&lt;package&gt;</span></div>
          <div style={{ color: muted, fontSize: 24, paddingLeft: 28 }}>裝一個 skill = 多一組能力</div>
        </WindowShell>
        <p style={{ fontSize: 26, color: muted, marginTop: 24 }}>到 <span style={{ fontFamily: mono }}>skills.sh</span> 逛 · Vercel 做的開放目錄</p>
      </div>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.18s both' }}>
        <div style={{ fontSize: 24, letterSpacing: '0.15em', color: muted, marginBottom: 8 }}>熱門排行</div>
        <RankRow rank="1" name="find-skills" owner="vercel-labs" installs="1.5M" hot />
        <RankRow rank="2" name="frontend-design" owner="anthropics" installs="421K" />
        <RankRow rank="3" name="react-best-practices" owner="vercel-labs" installs="389K" />
      </div>
    </div>
    <Footer accent={accentH3} />
  </div>
);

/* H3-13 Impeccable 概覽 */
const StatBox = ({ value, label }: { value: string; label: string }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: '32px 36px' }}>
    <div style={{ fontSize: 52, fontWeight: 800, color: accentH3, fontFamily: 'var(--osd-font-display)' }}>{value}</div>
    <div style={{ fontSize: 26, color: muted, marginTop: 8 }}>{label}</div>
  </div>
);

const Impeccable: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] 一起裝這個設計 skill" eyebrowColor={accentH3}>Impeccable</PageHead>
    <p style={{ fontSize: 38, lineHeight: 1.5, marginTop: 28, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <span style={{ color: accentH3 }}>教你的 AI 設計品味</span>的 skill — 演化自 Anthropic 的 frontend-design。
    </p>
    <div style={{ marginTop: 32, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <WindowShell label="Warp · 終端機" accent={accentH3}>
        <span style={{ color: codeGreen }}>$</span> npx skills add <span style={{ color: accentH3 }}>pbakaus/impeccable</span>
      </WindowShell>
    </div>
    <div style={{ display: 'flex', gap: 32, marginTop: 32, animation: 'fadeUp 0.5s ease 0.22s both' }}>
      <StatBox value="23" label="設計指令（/audit /polish …）" />
      <StatBox value="7" label="參考領域（字體 / 色彩 …）" />
      <StatBox value="27" label="反模式偵測規則" />
    </div>
    <Footer accent={accentH3} />
  </div>
);

/* H3-14 用 /polish 打磨 */
const GenericTag = ({ children }: { children: React.ReactNode }) => (
  <span style={{ display: 'inline-block', padding: '8px 16px', borderRadius: 8, border: `1px solid ${muted}`, color: muted, fontSize: 24, fontFamily: mono, margin: '0 8px 8px 0' }}>{children}</span>
);

const Polish: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] 用它打磨你的網站" eyebrowColor={accentH3}>擺脫「AI 味」</PageHead>
    <div style={{ marginTop: 32, animation: 'fadeUp 0.5s ease 0.08s both' }}>
      <WindowShell label="Claude Code" accent={accentH3}>
        <div style={{ fontSize: 28, lineHeight: 1.6, color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
          用 <span style={{ fontFamily: mono, color: accentH3 }}>/polish</span> 幫我的個人站打磨設計。
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
      <div style={{ flex: 1, background: surface, border: `1px solid ${accentH3}`, borderRadius: 14, padding: '28px 36px' }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: accentH3, marginBottom: 16 }}>有它：給 AI 設計詞彙</div>
        <p style={{ fontSize: 28, lineHeight: 1.5, margin: 0 }}>
          <span style={{ color: accentH3, fontFamily: mono }}>/audit</span> 揪問題　<span style={{ color: accentH3, fontFamily: mono }}>/critique</span> 給評論
        </p>
      </div>
    </div>
    <Footer accent={accentH3} />
  </div>
);

/* H3-15 三小時收束 */
const RecapRow = ({ tag, color, body }: { tag: string; color: string; body: string }) => (
  <div style={{ display: 'flex', gap: 28, alignItems: 'center', padding: '20px 0', borderBottom: `1px solid ${border}` }}>
    <span style={{ fontSize: 34, fontWeight: 800, color, width: 200, flexShrink: 0, fontFamily: 'var(--osd-font-display)' }}>{tag}</span>
    <span style={{ fontSize: 34, color: 'var(--osd-text)' }}>{body}</span>
  </div>
);

const Recap: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="三小時收束" eyebrowColor={accentH3}>你帶走了什麼</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <RecapRow tag="第一小時" color={accentH1} body="裝好工具 + 懂 Vibe vs AI Coding" />
      <RecapRow tag="第二小時" color={accentH2} body="會用 Claude Code + SDD 把要什麼講清楚" />
      <RecapRow tag="第三小時" color={accentH3} body="從範本到 live URL，ship 了自己的網站" />
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 36, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      回家：用今天的工作方式，把你下一個想法也 ship 出來。
    </p>
    <Footer accent={accentH3} />
  </div>
);

/* H3-16 紙本回饋 */
const Feedback: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="全員寫 + 點 2–3 人分享" eyebrowColor={accentH3}>三題回饋</PageHead>
    <ol style={{ fontSize: 38, lineHeight: 1.8, marginTop: 44, paddingLeft: 40, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <li>今天最有用的一件事？</li>
      <li>回家第一個會做什麼？</li>
      <li>1–10 推薦給朋友</li>
    </ol>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <HandUp accent={accentH3}>寫完別走，我邊收邊問</HandUp>
    </div>
    <Footer accent={accentH3} />
  </div>
);

/* H3-17 謝謝 + 合照 */
const ThankYou: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <Title size={140}>
      <span style={{ color: accentH3 }}>謝謝</span>。合照！
    </Title>
    <p style={{ fontSize: 38, marginTop: 40, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.14s both' }}>
      帶走的：<span style={{ color: accentH3, fontWeight: 700 }}>你 ship 的網址</span> + 一套用 AI 做東西的工作方式。
    </p>
    <p style={{ fontSize: 32, color: muted, marginTop: 24, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      聯絡方式：michaello.me · GitHub Michael0520 · 留場到 17:30
    </p>
    <Footer accent={accentH3} />
  </div>
);

export const meta: SlideMeta = {
  title: 'From Vibe to Spec — 台東 Workshop',
  theme: 'taitung',
  createdAt: '2026-05-22T15:31:57.855Z',
};

export const notes: (string | undefined)[] = [
  // H1
  `下午好，我是 Michael。先謝謝大家來到台東知本 —— TDF 是台灣最特別的數位遊牧節，重點是把作品「ship」出去（ship 就是「把東西做出來、放到網路上讓別人看到」）。\n三小時後你帶走的不是一個成品，是一套「用 AI 把東西做出來」的工作方式：第一小時裝好工具 + 講觀念、第二小時學怎麼用 Claude Code、第三小時親手 ship 一個網站。`,
  `簡單講一下我自己：我是 Web Developer、寫網頁的；同時也是 Code for Taiwan 的成員。我的網站 michaello.me、GitHub Michael0520。`,
  `先兩個小調查。第一個：過去 12 個月用 AI 寫過 code 的舉手。（停頓記比例）第二個：用 AI 把網站 ship 上線過的再舉手。（停頓記比例）OK，大概知道大家的位置了。`,
  `先給你今天最重要的一條分界線 —— 用 AI 寫東西，其實有兩種 mode。這條線聽懂了，今天就值回票價。`,
  `第一種叫 Vibe Coding —— 你跟 AI 聊聊聊、它給什麼你收什麼、能跑就好，是 AI 主導。第二種叫 AI Coding —— 你知道目標、主動選方案、敢拒絕、關鍵時介入，是人主導。`,
  `一句話分：Vibe 是 AI 主導，AI Coding 是人主導。AI 是工具，你是決策者。（這句慢、停頓）`,
  `這兩個不是對立，看情境用。玩具、週末小專案 → vibe OK；要長期維護、要上線給人用 → 切到 AI Coding。今天的目標是帶你從第一種走到第二種。`,
  `好，動手前先把工具裝好。今天要裝四個東西：Warp（終端機）、Node + pnpm（跑網站的引擎）、Git（上傳用）、Claude Code（今天的主角）。跟著我一步步來，裝不起來就舉手、助教會過去。`,
  `第一個，Warp。它是一個更好用的終端機 —— 終端機就是那個打指令的黑視窗，Warp 內建 AI、好看好操作。我們一起到 warp.dev，點 Download 裝起來。（帶大家到官網操作）裝好的舉手。`,
  `第二個，Node 跟 pnpm —— 跑網站需要的引擎。到 nodejs.org 的下載頁，選 macOS、nvm、pnpm，它會給你這幾行指令。我們照著貼到 Warp 裡：先裝 nvm、再 nvm install 24、最後 corepack enable pnpm。（帶大家到官網複製指令）`,
  `第三個，Claude Code，今天的主角。文件在 code.claude.com 的繁中頁。在 Warp 貼這行 curl 指令就裝好。Git 通常 macOS 已經內建，沒有的話系統會提示你裝。`,
  `來檢查裝好了沒。在 Warp 一個一個打：node -v、pnpm -v、git --version、claude --version。每一個都應該跳出版本號 —— 看到版本就代表裝好了。四個都看到的舉手。（這裡多留時間，個別救援）`,
  `工具到位了。第一段我們把觀念跟環境準備好 —— 接下來第二段，學怎麼真正驅動 Claude Code，還有一個讓 AI 變可靠的關鍵習慣，叫 SDD。`,
  // H2
  `歡迎回來。工具都會了，現在學怎麼「驅動」它 —— 怎麼讓 Claude Code 照你的意思做事。`,
  `打開 Claude Code 超簡單：在 Warp 裡打一個字 claude，按 enter，它就開始了。然後你就用講話的方式跟它說你要什麼，不用記任何指令。`,
  `這裡要特別講一個習慣，它是 vibe 跟 AI coding 的分水嶺 —— Plan Mode。在 Claude Code 裡連按兩次 Shift+Tab，它就不會直接動手，而是先給你一份計畫：要做什麼、改哪些檔、什麼順序。你看過、按核可，它才動。\n核心一句話：動手前先給計畫，不要邊做邊發明。（停頓）`,
  `為什麼要這樣？因為只用嘴巴聊，通常會踩三個包：第一風格不一致、第二漏掉狀況、第三最危險的假性自信 —— AI 很開心說「做完了！」但做完什麼？`,
  `我把今天最重要的一句話送給你：當 AI 說「做完了」，你要反問「做完什麼？」。答不出來，就是你從頭沒定義什麼叫做完。SDD 要解的就是這件事 —— 動手前先把「做完」的標準寫下來。`,
  `怎麼寫清楚？三個階段，用人話寫就好：第一釐清要什麼（誰、為了什麼）、第二怎麼做（版型、區塊、限制）、第三拆成可驗的任務。整個循環就一句話：寫清楚 → AI 做 → 拿它來驗 → ship。`,
  `來試一下手感。打開 Claude Code，跟它說：「幫我在桌面建一個資料夾叫 my-first，裡面放一個寫著我名字的文字檔。」看它先給計畫、你按核可、它動手 —— 這就是 AI Coding 的手感。（走動，看大家反應）`,
  `會用了。第三段我們把這套用在一個真的網站上：clone 一個範本、用 Claude Code 改成你的、推上線。離開前每人有自己的網址。休息 10 分鐘，16:00 回來。`,
  // H3
  `歡迎回來。最後一小時全程動手 —— 我們抓一個現成的網站範本，用 Claude Code 改成你的，然後推上線。離開前每個人都會有自己的網址。`,
  `動手前先看一份 spec —— 這是我提前寫好的個人站 spec。五個區塊：Goal（這站的目的）、Outcomes（訪客帶走什麼）、Non-goals（明說不做）、Constraints（限制）、Success criteria（怎麼算成功）。等下你會照它改。`,
  `為什麼是這五塊？因為每一塊缺了 AI 都會自由發揮：缺 Goal 它做一般 portfolio、缺 Non-goals 它加一堆你沒要的、缺 Success criteria 你也不知道 OK 沒。這五塊就是給 AI 的契約。`,
  `第一步，clone。在 Warp 打 git clone 加上範本網址，再 cd 進資料夾。clone 就是把網路上的範本整包複製到你電腦。卡住的舉手。（走動巡視）`,
  `第二步，pnpm install 裝套件、pnpm dev 跑起來。看到 Ready，打開瀏覽器看 localhost:3000，應該看到範本網站。看到的舉手。（多留時間，這是第一個動手關卡）`,
  `現在用 Claude Code 改成你的。確認你在 portfolio-workshop 資料夾裡打開 claude，然後照念：「幫我把這個網站的名字改成你的名字、城市改成你住的、自我介紹改成一句話。」它會先給計畫、你核可、它改。重新整理看到自己資料的舉手。（走動，個別救援）`,
  `資料是你的了，把它放上 GitHub。到 github.com/new，命名隨意，選 Public、不要勾任何初始化，Create。`,
  `Create 完 GitHub 會給你兩行指令，複製貼到 Warp 跑。不會打也可以直接請 Claude Code 幫你推。卡住的舉手。`,
  `最後上線。到 vercel.com，New Project、Import 你剛剛的 repo、Deploy。大概 30 秒它給你一個網址。成功的舉手。`,
  `現在你有自己的網址了！兩個動作：貼到共享白板讓大家互看、截圖分享。這就是 ship 的感覺。（能量拉高，這是高潮）`,
  `網站是你的了，但還是範本的樣子。花兩分鐘跟 Claude Code 說一句話：「把主色改成深藍、背景換成米白。」重新整理就看到變化 —— 你完全不用懂程式。`,
  `想讓它更專業？與其自己慢慢調，不如裝一個設計 skill。Claude Code 也能裝 skill，指令是 npx skills add。去 skills.sh 逛逛（Vercel 做的開放目錄），排行榜第一是 find-skills 一百五十萬安裝。`,
  `我帶你裝一個我很愛的設計 skill —— Impeccable，它教你的 AI 設計品味。在 Warp 打 npx skills add pbakaus/impeccable。裝完多了 23 個設計指令、7 個參考領域、27 條反模式規則。`,
  `裝好就用。跟 Claude Code 說「用 /polish 幫我的個人站打磨設計」。為什麼需要它？因為 AI 看過太多範本，沒特別講就生出 Inter 字體、紫藍漸層、卡片疊卡片那種「一看就是 AI 做的」設計。Impeccable 把好設計變成 AI 跟你共用的詞彙。`,
  `三小時到這。回顧：第一小時你裝好工具、懂了 Vibe vs AI Coding；第二小時會用 Claude Code、學會用 SDD 把要什麼講清楚；第三小時從範本到 live URL，ship 了自己的網站。回家就用這套工作方式，把你下一個想法也 ship 出來。`,
  `請花兩分鐘寫手上那張卡：第一題今天最有用的一件事、第二題回家第一個會做什麼、第三題 1 到 10 推薦。寫完別走，我邊收邊問 2-3 位分享第二題。`,
  `謝謝大家今天的耐心。兩件事帶走：你 ship 的網址，還有一套用 AI 做東西的工作方式。有問題找我，我留到 17:30，michaello.me 跟 GitHub 都歡迎。最後 —— 合照！請大家集中到投影前。`,
];

export default [
  Cover, Intro, HandsUp, Divider, VibeVsAI, OneLine, Switch,
  SetupOverview, SetupWarp, SetupNode, SetupClaude, CheckEnv, H1Close,
  H2Open, OpenClaude, PlanMode, Pains, DoneWhat, SddStages, TryClaude, H2Close,
  H3Open, SpecWalk, SpecMissing, CloneStep, DevStep, EditResume, GithubRepo, PushStep, DeployStep, YouDidIt, ChangeColor, SkillsSh, Impeccable, Polish, Recap, Feedback, ThankYou,
] satisfies Page[];
