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
      Host: Michael Lo · Code for Taiwan
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
    <PageHead eyebrow="TWO QUICK QUESTIONS">Raise your hand</PageHead>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 64, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <HandUp>Written code with AI in the last 12 months?</HandUp>
      <HandUp>Shipped a website live with AI?</HandUp>
    </div>
    <Footer accent={accentH1} />
  </div>
);

/* H1-04 今天最重要的分界線 */
const Divider: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentH1}>THE MOST IMPORTANT LINE TODAY</Eyebrow>
    </div>
    <Title size={110}>
      Building with AI<br />comes in <span style={{ color: accentH1 }}>two modes</span>.
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
    <PageHead eyebrow="TWO MODES · WHO LEADS?">Vibe vs AI Coding</PageHead>
    <div style={{ display: 'flex', gap: 48, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <ModeCard tag="Vibe Coding" color={accentH1} who="→ AI leads"
        lines={['You just chat with AI', 'You take whatever it gives', 'Good enough if it runs']} />
      <ModeCard tag="AI Coding" color={accentH3} who="→ You lead"
        lines={['You know the goal', 'You pick, you say no', 'You step in when it matters']} />
    </div>
    <Footer accent={accentH1} />
  </div>
);

/* H1-06 一句話分 */
const OneLine: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <Title size={96}>
      <span style={{ color: accentH1 }}>Vibe</span> = AI leads.<br />
      <span style={{ color: accentH3 }}>AI Coding</span> = you lead.
    </Title>
    <p style={{ fontSize: 48, color: muted, marginTop: 48, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      AI is the tool. <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>You are the decision-maker.</span>
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
    <PageHead eyebrow="NOT RIVALS — TWO MODES">Know when to switch</PageHead>
    <div style={{ display: 'flex', gap: 64, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <SituationCard color={accentH1} head="Use Vibe" body="Toys, quick ideas, weekend projects — low effort, fast output." />
      <SituationCard color={accentH3} head="Use AI Coding" body="Long-term, shipping to real users, any serious project." />
    </div>
    <p style={{ fontSize: 36, color: muted, marginTop: 48, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      Today's goal: take you <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>from the first mode to the second</span>.
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
    <PageHead eyebrow="GET READY BEFORE WE BUILD">Let's install four things</PageHead>
    <div style={{ display: 'flex', gap: 28, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <SetupCard n="01" name="Warp" sub="Modern terminal" />
      <SetupCard n="02" name="Node + pnpm" sub="Engine to run the site" />
      <SetupCard n="03" name="Git" sub="Version control / upload" />
      <SetupCard n="04" name="Claude Code" sub="Today's main AI" />
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 48, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      Follow along step by step. <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>Raise your hand if it won't install</span> — a helper will come over.
    </p>
    <Footer accent={accentH1} />
  </div>
);

/* H1-09 Warp */
const SetupWarp: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="01 · TERMINAL">Install Warp</PageHead>
    <p style={{ fontSize: 34, color: muted, marginTop: 28, lineHeight: 1.5, animation: 'fadeUp 0.5s ease 0.08s both' }}>
      A <span style={{ color: 'var(--osd-text)' }}>nicer terminal</span> (the black window for typing commands) — AI built in, clean and easy.
    </p>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <UrlBar url="warp.dev" accent={accentH1} />
    </div>
    <p style={{ fontSize: 30, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.24s both' }}>
      Go to the site, click <span style={{ color: accentH1 }}>Download</span>, install it. We'll do it together — hand up when done.
    </p>
    <Footer accent={accentH1} />
  </div>
);

/* H1-10 Node + pnpm */
const SetupNode: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="02 · ENGINE + UPLOAD TOOL">Install Node + pnpm + Git</PageHead>
    <p style={{ fontSize: 28, color: muted, marginTop: 20, animation: 'fadeUp 0.5s ease 0.08s both' }}>
      For Node, go to <span style={{ color: accentH1, fontFamily: mono }}>nodejs.org/download</span>, pick macOS / nvm / pnpm, and paste:
    </p>
    <div style={{ marginTop: 24, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <WindowShell label="Warp · Terminal" accent={accentH1}>
        <div style={{ color: muted, fontSize: 24 }}># Node + pnpm</div>
        <div><span style={{ color: codeGreen }}>$</span> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash</div>
        <div><span style={{ color: codeGreen }}>$</span> nvm install 24</div>
        <div><span style={{ color: codeGreen }}>$</span> corepack enable pnpm</div>
        <div style={{ marginTop: 16, color: muted, fontSize: 24 }}># Git (usually built into macOS — just check)</div>
        <div><span style={{ color: codeGreen }}>$</span> git --version</div>
      </WindowShell>
    </div>
    <Footer accent={accentH1} />
  </div>
);

/* H1-11 Claude Code */
const SetupClaude: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="03 · TODAY'S MAIN TOOL">Install Claude Code</PageHead>
    <p style={{ fontSize: 30, color: muted, marginTop: 24, animation: 'fadeUp 0.5s ease 0.08s both' }}>
      Docs at <span style={{ color: accentH1, fontFamily: mono }}>code.claude.com/docs</span> — paste this one line in Warp:
    </p>
    <div style={{ marginTop: 28, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <WindowShell label="Warp · Terminal" accent={accentH1}>
        <div><span style={{ color: codeGreen }}>$</span> curl -fsSL https://claude.ai/install.sh | bash</div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 30, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.24s both' }}>
      Once installed, type <span style={{ color: accentH1, fontFamily: mono }}>claude</span> in Warp to launch it.
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
    <PageHead eyebrow="ALL INSTALLED? LET'S CHECK">A version number means OK</PageHead>
    <div style={{ marginTop: 40, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <CheckRow cmd="node -v" expect="shows v24…" />
      <CheckRow cmd="pnpm -v" expect="shows a version" />
      <CheckRow cmd="git --version" expect="shows a version" />
      <CheckRow cmd="claude --version" expect="shows a version" />
    </div>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <HandUp>Hand up if you see all four versions</HandUp>
    </div>
    <Footer accent={accentH1} />
  </div>
);

/* H1-13 H1 收束 + 預告 H2 */
const H1Close: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentH1}>END OF HOUR 1 · WHAT'S NEXT</Eyebrow>
    </div>
    <Title size={96}>
      Tools ready.<br />Next: <span style={{ color: accentH1 }}>how to use them</span>.
    </Title>
    <p style={{ fontSize: 36, color: muted, marginTop: 44, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      Hour 2: how to <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>drive Claude Code</span> + the one habit that makes AI reliable (SDD).
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
      <Eyebrow color={accentH2}>HOUR 2 · AI CODING · 15:00</Eyebrow>
    </div>
    <Title size={104}>
      Tools ready —<br />now learn to <span style={{ color: accentH2 }}>drive them</span>.
    </Title>
    <Footer accent={accentH2} />
  </div>
);

/* H2-02 打開 Claude Code */
const OpenClaude: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="TYPE ONE WORD IN WARP" eyebrowColor={accentH2}>Open Claude Code</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Warp · Terminal" accent={accentH2}>
        <div><span style={{ color: codeGreen }}>$</span> claude</div>
        <div style={{ marginTop: 12, color: codeGreen }}>● Hi! What can I help you build?</div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 34, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      Then just <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>talk to it</span> in plain words — no commands to memorize.
    </p>
    <Footer accent={accentH2} />
  </div>
);

/* H2-03 Plan Mode */
const PlanMode: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="THE ONE HABIT TO LEARN" eyebrowColor={accentH2}>Plan Mode</PageHead>
    <div style={{ display: 'flex', gap: 64, marginTop: 56, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.1s both' }}>
        <WindowShell label="Claude Code" accent={accentH2}>
          <div style={{ color: muted }}>Press <span style={{ color: accentH2 }}>Shift + Tab</span> twice</div>
          <div style={{ marginTop: 16, color: codeGreen }}>→ AI gives a plan first, no action yet</div>
          <div style={{ color: codeText }}>　what · which files · what order</div>
          <div style={{ marginTop: 16, color: codeText }}>You review, approve → then it runs</div>
        </WindowShell>
      </div>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.2s both' }}>
        <p style={{ fontSize: 36, lineHeight: 1.55, marginTop: 0 }}>
          Plan before acting — the thing vibe coding <span style={{ color: accentH2 }}>never does</span>.
        </p>
        <ul style={{ fontSize: 32, lineHeight: 1.6, paddingLeft: 36, color: muted }}>
          <li>AI drifts? You catch it at the plan stage</li>
          <li>No improvising once approved</li>
        </ul>
      </div>
    </div>
    <p style={{ fontSize: 40, color: accentH2, fontWeight: 700, marginTop: 40, animation: 'fadeUp 0.5s ease 0.28s both' }}>
      Plan before acting. Don't improvise as you go.
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
    <PageHead eyebrow="WHY WE NEED SDD" eyebrowColor={accentH2}>Three pains of just chatting</PageHead>
    <div style={{ display: 'flex', gap: 48, marginTop: 64, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <PainCard n="01" head="Inconsistent" body="Today's result differs from tomorrow's — you phrase it differently each time." />
      <PainCard n="02" head="Misses cases" body="Only the happy path; no offline, no empty fields handled." />
      <PainCard n="03" head="False confidence" body="AI happily says “Done!” — but done with what?" />
    </div>
    <Footer accent={accentH2} />
  </div>
);

/* H2-05 做完什麼？ */
const DoneWhat: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <p style={{ fontSize: 48, color: muted, margin: 0, animation: 'fadeUp 0.5s ease both' }}>
      AI says “Done” → you ask back:
    </p>
    <Title size={140}>
      <span style={{ color: accentH2 }}>Done with what?</span>
    </Title>
    <p style={{ fontSize: 38, color: muted, lineHeight: 1.6, maxWidth: 1500, marginTop: 40, animation: 'fadeUp 0.5s ease 0.18s both' }}>
      Can't answer = you never defined “done”. SDD = <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>write down what “done” means before you start</span>.
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
    <PageHead eyebrow="SDD IN 3 STAGES · PLAIN WORDS" eyebrowColor={accentH2}>Spell out what you want</PageHead>
    <div style={{ display: 'flex', gap: 40, marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <StageCard n="①" head="What you want" body="Who, and why. Sets the direction." />
      <StageCard n="②" head="How to do it" body="Layout / sections / limits. Sets the scope." />
      <StageCard n="③" head="Checkable tasks" body="Each one can be marked done or not." />
    </div>
    <p style={{ fontSize: 34, color: accentH2, fontWeight: 700, marginTop: 44, animation: 'fadeUp 0.5s ease 0.22s both' }}>
      Write it clearly → AI builds → check it → ship
    </p>
    <Footer accent={accentH2} />
  </div>
);

/* H2-07 輕量動手：試一個小指令 */
const TryClaude: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] GET A FEEL FOR IT" eyebrowColor={accentH2}>Say one thing to it</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Claude Code" accent={accentH2}>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 30, lineHeight: 1.6, color: 'var(--osd-text)' }}>
          Create a folder on my Desktop called <span style={{ color: accentH2 }}>my-first</span> with a text file that has my name in it.
        </div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      It plans, you approve, it acts — <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>that's the feel of AI Coding</span>.
    </p>
    <Footer accent={accentH2} />
  </div>
);

/* H2-08 收束 + 預告 H3 */
const H2Close: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentH3}>END OF HOUR 2 · WHAT'S NEXT</Eyebrow>
    </div>
    <Title size={96}>
      You can use it —<br />now <span style={{ color: accentH3 }}>build a real site</span>.
    </Title>
    <p style={{ fontSize: 36, color: muted, marginTop: 44, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      Hour 3: clone a template → make it yours with Claude Code → ship it. <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>Everyone leaves with a live URL.</span><br />
      10-min break, back at 16:00.
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
      <Eyebrow color={accentH3}>HOUR 3 · BUILD FROM TEMPLATE · 16:00</Eyebrow>
    </div>
    <Title size={104}>
      Clone a template,<br /><span style={{ color: accentH3 }}>make it yours</span>.
    </Title>
    <p style={{ fontSize: 36, color: muted, marginTop: 44, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      Hands-on all the way: grab the template → edit with Claude Code → ship. <span style={{ color: 'var(--osd-text)', fontWeight: 700 }}>Everyone leaves with a live URL.</span>
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
    <PageHead eyebrow="BEFORE WE BUILD · READ A SPEC" eyebrowColor={accentH3}>This is a real spec</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <WindowShell label="spec.md" accent={accentH3}>
        <div style={{ fontSize: 26, lineHeight: 1.45 }}>
          <SpecBlock head="Goal" lines={['Let people know me in 5 minutes']} />
          <SpecBlock head="Outcomes" lines={['Know who I am & what I do', 'See my best work', 'Find how to contact me']} />
          <SpecBlock head="Non-goals" lines={['No full portfolio · no blog']} />
          <SpecBlock head="Constraints" lines={['Mobile-readable · loads in 3s']} />
          <SpecBlock head="Success criteria" lines={['5 friends can describe my work after seeing it']} />
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
    <PageHead eyebrow="MISS A BLOCK, AI IMPROVISES" eyebrowColor={accentH3}>These 5 blocks are AI's contract</PageHead>
    <div style={{ marginTop: 44, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <MissingRow miss="No Goal" result="builds a generic portfolio" />
      <MissingRow miss="No Non-goals" result="adds features you never wanted" />
      <MissingRow miss="No Success criteria" result="you never know if it's OK" />
    </div>
    <Footer accent={accentH3} />
  </div>
);

/* H3-04 clone */
const CloneStep: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] STEP 1 · CLONE" eyebrowColor={accentH3}>Grab the template</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Warp · Terminal" accent={accentH3}>
        <div><span style={{ color: codeGreen }}>$</span> git clone https://github.com/Michael0520/portfolio-workshop.git</div>
        <div style={{ marginTop: 8 }}><span style={{ color: codeGreen }}>$</span> cd portfolio-workshop</div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 32, lineHeight: 1.5, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <span style={{ color: 'var(--osd-text)' }}>clone</span> = copy the whole template from the web onto your computer. Hand up if stuck.
    </p>
    <Footer accent={accentH3} />
  </div>
);

/* H3-05 install + dev */
const DevStep: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] STEP 2 · RUN IT" eyebrowColor={accentH3}>Install & see the template</PageHead>
    <div style={{ marginTop: 32, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Warp · Terminal" accent={accentH3}>
        <div><span style={{ color: codeGreen }}>$</span> pnpm install</div>
        <div style={{ marginTop: 8 }}><span style={{ color: codeGreen }}>$</span> pnpm dev</div>
        <div style={{ marginTop: 12, color: codeGreen, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="check" size={28} color={codeGreen} /> Ready
        </div>
        <div style={{ color: muted }}>→ open your browser at localhost:3000</div>
      </WindowShell>
    </div>
    <div style={{ marginTop: 28, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <HandUp accent={accentH3}>Hand up when you see the template site</HandUp>
    </div>
    <Footer accent={accentH3} />
  </div>
);

/* H3-06 用 Claude Code 改個人資料 */
const EditResume: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] MAKE IT YOURS WITH CLAUDE CODE" eyebrowColor={accentH3}>Edit your info in one line</PageHead>
    <div style={{ marginTop: 32, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Claude Code (inside portfolio-workshop)" accent={accentH3}>
        <div style={{ fontFamily: 'var(--osd-font-body)', fontSize: 30, lineHeight: 1.65, color: 'var(--osd-text)' }}>
          Change this site's name to <span style={{ color: accentH3 }}>[your name]</span>,
          city to <span style={{ color: accentH3 }}>[your city]</span>,
          and the intro to <span style={{ color: accentH3 }}>[one line about you]</span>.
        </div>
      </WindowShell>
    </div>
    <div style={{ marginTop: 28, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      <HandUp accent={accentH3}>Refresh the page — hand up when you see your info</HandUp>
    </div>
    <Footer accent={accentH3} />
  </div>
);

/* H3-07 GitHub repo */
const GithubRepo: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] PUT IT ON GITHUB" eyebrowColor={accentH3}>Create a new repo</PageHead>
    <ol style={{ fontSize: 36, lineHeight: 1.7, marginTop: 44, paddingLeft: 40, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <li>Go to <span style={{ color: accentH3, fontFamily: mono }}>github.com/new</span></li>
      <li>Name it (e.g. <span style={{ fontFamily: mono }}>my-portfolio</span>)</li>
      <li>Choose <span style={{ color: accentH3 }}>Public</span>, <span style={{ color: accentH3 }}>don't check</span> any init option</li>
      <li>Create</li>
    </ol>
    <Footer accent={accentH3} />
  </div>
);

/* H3-08 push */
const PushStep: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] PUSH IT UP" eyebrowColor={accentH3}>Copy the commands GitHub gives you</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      <WindowShell label="Warp · Terminal" accent={accentH3}>
        <div><span style={{ color: codeGreen }}>$</span> git remote add origin &lt;your repo URL&gt;</div>
        <div style={{ marginTop: 8 }}><span style={{ color: codeGreen }}>$</span> git push -u origin main</div>
      </WindowShell>
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 32, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      Don't want to type? Just ask Claude Code to push for you. Hand up if stuck.
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
      <span style={{ fontSize: 28, fontWeight: 600, color: accentH3 }}>Your URL</span>
    </div>
  </div>
);

const DeployStep: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <PageHead eyebrow="[DO] GO LIVE" eyebrowColor={accentH3}>Auto-deploy with Vercel</PageHead>
    <div style={{ marginTop: 48, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <DeployFlow />
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 56, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', animation: 'fadeUp 0.5s ease 0.2s both' }}>
      vercel.com → New Project → Import repo → Deploy. ~30 seconds.
      <span style={{ color: accentH3, display: 'inline-flex', alignItems: 'center', gap: 8 }}>Hand up when live <Icon name="hand" size={28} color={accentH3} /></span>
    </p>
    <Footer accent={accentH3} />
  </div>
);

/* H3-10 你做到了 */
const YouDidIt: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <Title size={140}>
      You <span style={{ color: accentH3 }}>did it</span>.
    </Title>
    <p style={{ fontSize: 44, marginTop: 40, animation: 'fadeUp 0.5s ease 0.14s both' }}>
      You have your own URL now.
    </p>
    <p style={{ fontSize: 36, color: muted, marginTop: 24, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      ① Post it on the shared board　② Screenshot & share — this is <span style={{ color: accentH3, fontWeight: 700 }}>what shipping feels like</span>.
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
    <PageHead eyebrow="WANT IT NICER? ADD A SKILL" eyebrowColor={accentH3}>skills.sh · skill ecosystem</PageHead>
    <div style={{ display: 'flex', gap: 56, marginTop: 44, alignItems: 'flex-start' }}>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.1s both' }}>
        <WindowShell label="Claude Code can add skills too" accent={accentH3}>
          <div style={{ color: codeText }}><span style={{ color: codeGreen }}>$</span> npx skills add <span style={{ color: accentH3 }}>&lt;package&gt;</span></div>
          <div style={{ color: muted, fontSize: 24, paddingLeft: 28 }}>add a skill = gain a new ability</div>
        </WindowShell>
        <p style={{ fontSize: 26, color: muted, marginTop: 24 }}>Browse <span style={{ fontFamily: mono }}>skills.sh</span> · open directory by Vercel</p>
      </div>
      <div style={{ flex: 1, animation: 'fadeUp 0.5s ease 0.18s both' }}>
        <div style={{ fontSize: 24, letterSpacing: '0.15em', color: muted, marginBottom: 8 }}>TOP INSTALLS</div>
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
    <PageHead eyebrow="[DO] ADD THIS DESIGN SKILL" eyebrowColor={accentH3}>Impeccable</PageHead>
    <p style={{ fontSize: 38, lineHeight: 1.5, marginTop: 28, animation: 'fadeUp 0.5s ease 0.1s both' }}>
      A skill that <span style={{ color: accentH3 }}>teaches your AI design taste</span> — evolved from Anthropic's frontend-design.
    </p>
    <div style={{ marginTop: 32, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <WindowShell label="Warp · Terminal" accent={accentH3}>
        <span style={{ color: codeGreen }}>$</span> npx skills add <span style={{ color: accentH3 }}>pbakaus/impeccable</span>
      </WindowShell>
    </div>
    <div style={{ display: 'flex', gap: 32, marginTop: 32, animation: 'fadeUp 0.5s ease 0.22s both' }}>
      <StatBox value="23" label="design commands (/audit /polish …)" />
      <StatBox value="7" label="reference domains (type / color …)" />
      <StatBox value="27" label="anti-pattern rules" />
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
    <PageHead eyebrow="[DO] POLISH YOUR SITE WITH IT" eyebrowColor={accentH3}>Lose the “AI look”</PageHead>
    <div style={{ marginTop: 32, animation: 'fadeUp 0.5s ease 0.08s both' }}>
      <WindowShell label="Claude Code" accent={accentH3}>
        <div style={{ fontSize: 28, lineHeight: 1.6, color: 'var(--osd-text)', fontFamily: 'var(--osd-font-body)' }}>
          Use <span style={{ fontFamily: mono, color: accentH3 }}>/polish</span> to refine my personal site's design.
        </div>
      </WindowShell>
    </div>
    <div style={{ display: 'flex', gap: 48, marginTop: 32, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 14, padding: '28px 36px' }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: muted, marginBottom: 16 }}>Without it: generic AI look</div>
        <GenericTag>Inter font</GenericTag>
        <GenericTag>purple-blue gradient</GenericTag>
        <GenericTag>cards on cards</GenericTag>
      </div>
      <div style={{ flex: 1, background: surface, border: `1px solid ${accentH3}`, borderRadius: 14, padding: '28px 36px' }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: accentH3, marginBottom: 16 }}>With it: design vocabulary for AI</div>
        <p style={{ fontSize: 28, lineHeight: 1.5, margin: 0 }}>
          <span style={{ color: accentH3, fontFamily: mono }}>/audit</span> finds issues　<span style={{ color: accentH3, fontFamily: mono }}>/critique</span> gives feedback
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
    <PageHead eyebrow="WRAPPING UP THREE HOURS" eyebrowColor={accentH3}>What you take home</PageHead>
    <div style={{ marginTop: 36, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <RecapRow tag="Hour 1" color={accentH1} body="Tools installed + got Vibe vs AI Coding" />
      <RecapRow tag="Hour 2" color={accentH2} body="Can drive Claude Code + spell out what you want (SDD)" />
      <RecapRow tag="Hour 3" color={accentH3} body="Template to live URL — shipped your own site" />
    </div>
    <p style={{ fontSize: 32, color: muted, marginTop: 36, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      At home: use this workflow to ship your next idea too.
    </p>
    <Footer accent={accentH3} />
  </div>
);

/* H3-16 謝謝 */
const ThankYou: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <Title size={150}>
      <span style={{ color: accentH3 }}>Thank you!</span>
    </Title>
    <p style={{ fontSize: 38, marginTop: 40, lineHeight: 1.6, animation: 'fadeUp 0.5s ease 0.14s both' }}>
      You're leaving with: <span style={{ color: accentH3, fontWeight: 700 }}>the URL you shipped</span> + a way to build things with AI.
    </p>
    <p style={{ fontSize: 32, color: muted, marginTop: 24, animation: 'fadeUp 0.5s ease 0.2s both' }}>
      Reach me: michaello.me · GitHub Michael0520 · here until 17:30
    </p>
    <Footer accent={accentH3} />
  </div>
);

export const meta: SlideMeta = {
  title: 'From Vibe to Spec — Taitung Workshop',
  theme: 'taitung',
  createdAt: '2026-05-22T15:31:57.855Z',
};

/* 雙語逐字稿：中文（你看懂、掌握節奏）——— 分隔線 ——— 英文（照念給學生）。
   寫長一點、生活化，避免講太短。 */
export const notes: (string | undefined)[] = [
  // H1
  `下午好，我是 Michael，今天下午這三個小時都會跟大家一起。先謝謝大家來到台東知本 —— TDF 是台灣最特別的數位遊牧節，這裡的精神就是「把作品 ship 出去」。ship 這個字今天會一直出現，意思就是「把東西真的做出來、放到網路上、讓別人連得到」。\n我先講白話一點：三小時後你帶走的，不會只是一個成品，而是一整套「用 AI 把東西做出來」的工作方式。我們分三段走 —— 第一小時把工具裝好、把觀念講清楚；第二小時學怎麼真正用 Claude Code；第三小時你親手做一個網站、推上線。放輕鬆，今天不需要你會寫程式。\n———\nGood afternoon, I'm Michael, and I'll be with you for these three hours. Thank you all for coming out to Zhiben, Taitung. TDF is Taiwan's most special digital-nomad festival, and the whole spirit here is to "ship" — that word will come up a lot today. It just means: actually build something, put it online, let people reach it.\nHere's the promise: in three hours, you won't just leave with a finished product — you'll leave with a whole way of building things with AI. We'll do it in three parts: hour one, install the tools and get the concepts; hour two, learn to actually drive Claude Code; hour three, you build a real website and ship it. Relax — you don't need to know how to code today.`,
  `簡單介紹我自己：我是 Web Developer，平常就在寫網頁；同時也是 Code for Taiwan 的成員，做開源社群的東西。我的網站是 michaello.me，GitHub 是 Michael0520，等下這些連結 Resource Pack 裡也有，有問題隨時找我。\n———\nQuick intro: I'm a web developer — I build websites for a living — and I'm also a member of Code for Taiwan, working on open-source community stuff. My site is michaello.me, GitHub is Michael0520. These links are in the resource pack too, so reach out anytime.`,
  `動手之前，先做兩個小調查，讓我抓一下大家的程度。第一個問題：過去 12 個月裡，有用 AI 寫過 code 的，請舉手。（停頓，掃一下，記個大概比例）好，放下。第二個：有真的用 AI 把一個網站 ship 上線過的，再舉一次手。（停頓，記比例）OK，大概知道大家的位置了 —— 沒舉手完全沒關係，今天就是從頭帶你做一次。\n———\nBefore we start, two quick questions so I can read the room. First: in the last 12 months, who has written code with AI? Raise your hand. (pause, scan, note roughly) Okay, hands down. Second: who has actually shipped a website live with AI? Raise again. (pause) Great — now I know where everyone is. If you didn't raise your hand, no problem at all — today we'll walk through it from scratch.`,
  `我先給你今天最重要的一條分界線，這條線你聽懂了，今天就值回票價了 —— 用 AI 寫東西，其實有兩種模式（mode）。很多人沒意識到這件事，結果用得卡卡的。我們先把這兩種分清楚。\n———\nLet me give you the single most important line of today — get this and the day is already worth it: building with AI actually comes in two modes. Most people don't realize this, and that's why it feels frustrating. Let's separate the two clearly.`,
  `第一種叫 Vibe Coding —— 你就是跟 AI 一直聊、它給你什麼你就收什麼、能跑起來就好。這種是「AI 主導」，你比較被動。第二種叫 AI Coding —— 你心裡有目標、會主動挑方案、看到不對會拒絕、關鍵時刻會跳進去改。這種是「你主導」。\n兩種沒有誰高誰低，但差別很大。\n———\nThe first is Vibe Coding — you just keep chatting with the AI, take whatever it gives you, and you're happy if it runs. Here the AI leads and you're passive. The second is AI Coding — you have a goal in mind, you actively pick approaches, you say no when something's off, and you step in at key moments. Here you lead.\nNeither is "better," but the difference is huge.`,
  `一句話總結：Vibe 是 AI 主導，AI Coding 是人主導。（這句慢慢講，停一下）說到底，AI 只是工具，真正的決策者是你。今天我想做的，就是把你從第一種，帶到第二種。\n———\nIn one line: Vibe means the AI leads; AI Coding means you lead. (say this slowly, pause) At the end of the day, AI is just a tool — you are the decision-maker. What I want to do today is move you from the first mode to the second.`,
  `要強調：這兩種不是對立的，是看情況用。你做個玩具、週末隨手試個點子 —— 用 vibe 完全沒問題，輕鬆又快。但只要這東西你要長期維護、要上線給別人用、是個正式的專案 —— 就該切到 AI Coding。高手是兩種都會、知道什麼時候用哪一種。今天的目標就是帶你學會切換。\n———\nTo be clear: these aren't rivals, you pick based on the situation. Building a toy, trying a quick weekend idea — vibe is totally fine, easy and fast. But the moment it's something you'll maintain long-term, ship to real users, a serious project — switch to AI Coding. The skilled move is knowing both and when to use which. Today's goal is to help you switch.`,
  `好，觀念先放這。動手之前，我們得先把工具裝好。今天要裝四樣東西：Warp，一個終端機；Node 加 pnpm，跑網站的引擎；Git，上傳用的；還有 Claude Code，今天的主角。聽起來有點多，但我會一步一步帶，每一步裝不起來就舉手，助教會立刻過去幫你。我們不趕，等大家都裝好再往下。\n———\nOkay, concepts aside for now. Before we build, we need the tools installed. Four things today: Warp, a terminal; Node plus pnpm, the engine that runs the site; Git, for uploading; and Claude Code, today's star. Sounds like a lot, but I'll walk you through each one. If any step won't install, raise your hand and a helper comes right over. No rush — we move on once everyone's set.`,
  `第一個，Warp。先解釋一下「終端機」是什麼 —— 就是那個可以打指令的黑色視窗，工程師每天都在用。Warp 是一個比較新、比較好用的終端機，介面好看、還內建 AI。我們一起到官網 warp.dev，點 Download，照著裝。（這裡帶大家到官網實際操作，不要只是念）裝好、打得開的，舉個手讓我看看。\n———\nFirst, Warp. Let me explain what a "terminal" is — it's that black window where you type commands; developers use it every day. Warp is a newer, nicer terminal — clean interface, AI built in. Let's go to warp.dev together, click Download, and install. (walk them to the actual site, don't just read it out) Once it's installed and opens, raise your hand so I can see.`,
  `第二個，Node 和 pnpm —— 這是讓網站能在你電腦上跑起來的引擎。我們到 nodejs.org 的下載頁，選 macOS、nvm、pnpm 這幾個選項，官網會直接給你幾行指令。我們照著複製、貼到 Warp 裡：先裝 nvm，再 nvm install 24 裝 Node，最後 corepack enable pnpm。Git 大部分 Mac 已經內建，打 git --version 確認一下就好。（一樣帶大家到官網複製，不要自己手打）\n———\nSecond, Node and pnpm — the engine that lets a website run on your computer. Go to the nodejs.org download page, pick macOS, nvm, pnpm, and the site hands you a few lines. Copy them into Warp: install nvm first, then nvm install 24 for Node, then corepack enable pnpm. Git is usually already on your Mac — just run git --version to check. (again, take them to the official site to copy, don't type it by hand)`,
  `第三個，Claude Code，今天的主角。它的官方文件在 code.claude.com，有繁體中文版。安裝超簡單，在 Warp 裡貼一行 curl 指令就好。裝完之後，在 Warp 打 claude 就能啟動它。等下我們整堂課都會用它。\n———\nThird, Claude Code, today's star. The official docs are at code.claude.com, with a traditional-Chinese version. Installing is dead simple — paste one curl line in Warp. Once it's done, just type claude in Warp to launch it. We'll use it for the rest of the workshop.`,
  `來，一起檢查裝好了沒。在 Warp 裡一個一個打：node -v、pnpm -v、git --version、claude --version。每一個都應該跳出一個版本號碼 —— 只要看到版本號，就代表那個工具裝好了。四個都看到版本的，舉手讓我確認一下。（這頁多留一點時間，這是第一個關卡，沒過的個別去救援，確保大家都過了再往下）\n———\nLet's check everything together. In Warp, type these one by one: node -v, pnpm -v, git --version, claude --version. Each should print a version number — if you see a version, that tool is installed. Raise your hand if you see all four. (give this slide extra time — it's the first checkpoint; help anyone stuck individually and make sure everyone passes before moving on)`,
  `工具到位了。第一段我們把環境跟觀念都準備好了 —— 接下來第二段，我們學怎麼真正「驅動」Claude Code，還有一個讓 AI 從「能用」變成「可靠」的關鍵習慣，叫 SDD。\n———\nTools are ready. In hour one we got the environment and the concepts set — next, in hour two, we learn to actually "drive" Claude Code, plus the one habit that turns AI from "usable" into "reliable": SDD.`,
  // H2
  `歡迎回來。工具大家都裝好了，現在進到重點：怎麼「驅動」它 —— 也就是怎麼讓 Claude Code 真的照你的意思做事，而不是亂做一通。\n———\nWelcome back. Everyone's got the tools installed — now the key part: how to "drive" it. That is, how to get Claude Code to actually do what you mean, instead of going off on its own.`,
  `打開 Claude Code 真的很簡單：在 Warp 裡打一個字 claude，按 enter，它就啟動了。然後你就用平常講話的方式，跟它說你要什麼就好 —— 不用背任何指令、不用記語法。這就是它對新手最友善的地方。\n———\nOpening Claude Code is genuinely easy: in Warp, type the word claude, press enter, and it starts. Then you just talk to it in plain language and tell it what you want — no commands to memorize, no syntax to learn. That's what makes it so beginner-friendly.`,
  `這裡我要特別講一個習慣，它是 vibe coding 跟 AI coding 的分水嶺 —— Plan Mode。在 Claude Code 裡連按兩次 Shift+Tab，它就不會馬上動手，而是先給你一份計畫：它打算做什麼、要改哪些檔案、按什麼順序。你看過、覺得 OK、按核可，它才開始做。\n核心一句話：動手前先給計畫，不要邊做邊發明。（這句停一下，讓它沉下去）這就是你拿回主導權的關鍵 —— AI 想偏了，你在計畫階段就攔下來，不用等它做完一團才後悔。\n———\nLet me highlight one habit — it's the dividing line between vibe coding and AI coding: Plan Mode. In Claude Code, press Shift+Tab twice and it won't act right away — instead it gives you a plan: what it intends to do, which files it'll change, in what order. You review it, approve it, and only then does it run.\nThe core line: plan before acting, don't improvise as you go. (pause, let it land) This is how you take back control — if the AI drifts, you catch it at the plan stage, instead of regretting a big mess after it's done.`,
  `為什麼要這麼麻煩？因為如果你只是用嘴巴一直聊，通常會踩三個坑。第一，風格不一致 —— 你今天講的跟明天講的不一樣，做出來就不一樣。第二，漏掉狀況 —— AI 只做了正常情況，沒網路、欄位空白這些它沒想到。第三，最危險的，假性自信 —— AI 會很開心地跟你說「做完了！」但你要問：做完什麼？\n———\nWhy bother? Because if you just keep chatting, you usually hit three traps. One, inconsistency — what you say today differs from tomorrow, so the output differs. Two, missed cases — the AI only handles the happy path; no offline, no empty fields. Three, the most dangerous, false confidence — the AI cheerfully says "Done!" — but you have to ask: done with what?`,
  `我把今天最重要的一句話送給你：當 AI 說「做完了」，你要反問一句 —— 做完什麼？（停一下）如果你答不出來，那不是 AI 的問題，是你從一開始就沒定義「什麼叫做完」。SDD 要解的就是這件事 —— 在動手之前，先把「做完」的標準寫下來。\n———\nHere's the most important line of the day: when the AI says "Done," ask it back — done with what? (pause) If you can't answer, that's not the AI's fault — it's that you never defined "done" in the first place. That's exactly what SDD solves: before you start, write down what "done" means.`,
  `怎麼把要什麼寫清楚？三個階段，而且用人話寫就好，不用很工程。第一，釐清你要什麼 —— 給誰看、為了什麼，這定方向。第二，怎麼做 —— 用什麼版型、放哪些區塊、有什麼限制，這定範圍。第三，拆成一條條可以勾選的任務 —— 每條都能說「做到了沒」。整個循環一句話：寫清楚 → AI 做 → 拿它來驗 → ship。\n———\nHow do you write down what you want? Three stages, and just use plain words — nothing technical. One, clarify what you want — for whom, and why; this sets the direction. Two, how to do it — what layout, which sections, what limits; this sets the scope. Three, break it into checkable tasks — each can be marked done or not. The whole loop in one line: write it clearly → AI builds → check it → ship.`,
  `來試一下手感，讓你感覺一下。打開 Claude Code，跟它說：「幫我在桌面建一個資料夾叫 my-first，裡面放一個寫著我名字的文字檔。」然後看 —— 它會先給你計畫，你按核可，它才動手做。這個「計畫 → 核可 → 執行」的節奏，就是 AI Coding 的手感。（走動，看看大家的反應，鼓勵一下）\n———\nLet's get a feel for it. Open Claude Code and say: "Create a folder on my Desktop called my-first with a text file that has my name in it." Then watch — it gives a plan first, you approve, and only then it acts. That rhythm — plan, approve, execute — is the feel of AI Coding. (walk around, watch reactions, encourage them)`,
  `你已經會用了。第三段，我們把這整套用在一個真的網站上：clone 一個現成的範本、用 Claude Code 改成你的、然後推上線。我保證，離開這個房間前，每個人都會有自己的網址。現在休息 10 分鐘，16:00 準時回來。\n———\nYou can use it now. In hour three, we apply all of this to a real website: clone a ready-made template, make it yours with Claude Code, then ship it. I promise — before you leave this room, everyone will have their own URL. Take a 10-minute break, back at 16:00 sharp.`,
  // H3
  `歡迎回來，最後一小時了，這一小時幾乎全程動手。我們會抓一個現成的網站範本，用 Claude Code 把它改成你的，然後推上線。再強調一次：離開前，每個人都會有自己的網址，這是今天的承諾。\n———\nWelcome back — last hour, and it's almost all hands-on. We'll grab a ready-made website template, make it yours with Claude Code, then ship it. Once more: before you leave, everyone will have their own URL. That's the promise.`,
  `動手之前，先花一分鐘看一份 spec —— 這是我提前幫你寫好的個人站 spec。它有五個區塊：Goal 是這個網站的目的、Outcomes 是訪客看完帶走什麼、Non-goals 是明說不做的事、Constraints 是限制、Success criteria 是怎麼算成功。等一下你就會照著這份去改。看起來不嚇人吧？就是用人話講清楚要什麼。\n———\nBefore we build, take a minute to read a spec — this is one I wrote ahead of time for the personal site. It has five blocks: Goal is the site's purpose, Outcomes is what a visitor takes away, Non-goals is what you explicitly won't do, Constraints are the limits, and Success criteria is how you know it worked. You'll edit based on this in a moment. Not scary, right? It's just plainly stating what you want.`,
  `為什麼一定要這五塊？因為少了任何一塊，AI 就會自由發揮。沒有 Goal，它就做一個很普通的 portfolio；沒有 Non-goals，它會加一堆你根本沒要的功能；沒有 Success criteria，你自己也不知道到底做好了沒。所以這五塊，其實就是你給 AI 的一份「契約」。\n———\nWhy these five blocks? Because miss any one and the AI improvises. No Goal, it builds a generic portfolio; no Non-goals, it adds features you never asked for; no Success criteria, you don't even know if it's done. So these five blocks are really a "contract" you give the AI.`,
  `第一步，clone。在 Warp 裡打 git clone 加上範本的網址，再 cd 進那個資料夾。clone 的意思就是把網路上的範本，整包複製到你自己的電腦。網址我會貼在大白板上，照著打就好。卡住的舉手。（走動巡視，看看大家有沒有打錯字）\n———\nStep one, clone. In Warp, type git clone plus the template's URL, then cd into that folder. Clone just means copying the whole template from the web onto your own computer. I'll put the URL on the big board — just type it as shown. Raise your hand if stuck. (walk around, check for typos)`,
  `第二步，跑起來。打 pnpm install 把需要的套件裝好，再打 pnpm dev 把它跑起來。看到 Ready，就打開瀏覽器、輸入 localhost:3000，你應該會看到一個現成的範本網站。看到的舉手。（這頁多留時間，這是第一個動手關卡，沒看到的我個別過去看）\n———\nStep two, run it. Type pnpm install to install the packages, then pnpm dev to start it. When you see Ready, open your browser at localhost:3000 — you should see a ready-made template site. Raise your hand when you see it. (give this extra time — first hands-on checkpoint; I'll come help anyone who doesn't see it)`,
  `現在最有趣的部分：用 Claude Code 把它改成你的。先確認你是在 portfolio-workshop 這個資料夾裡打開 claude，然後照著念：「幫我把這個網站的名字改成你的名字、城市改成你住的城市、自我介紹改成一句話。」它會先給計畫、你核可、它就改好了。改完重新整理網頁、看到自己資料的，舉手。（走動，這關有人會卡，個別救援）\n———\nNow the fun part: make it yours with Claude Code. First make sure you opened claude inside the portfolio-workshop folder, then say: "Change this site's name to your name, the city to where you live, and the intro to one line about you." It plans, you approve, it edits. Refresh the page and raise your hand when you see your own info. (walk around — some will get stuck here, help individually)`,
  `資料是你的了，現在把它放上 GitHub。到 github.com/new，名字隨便取，記得選 Public、然後不要勾任何初始化選項，按 Create。這幾個設定很重要，尤其「不要勾初始化」，不然等下推的時候會衝突。\n———\nYour info is in. Now put it on GitHub. Go to github.com/new, name it anything, choose Public, and don't check any init options, then hit Create. These settings matter — especially "don't check init," otherwise the push will conflict later.`,
  `Create 完，GitHub 會直接給你兩行指令，你把它複製、貼到 Warp 裡跑就好。如果你不想自己打，也可以直接請 Claude Code 幫你推上去 —— 跟它說「幫我把這個專案推到 GitHub」就行。卡住的舉手。\n———\nAfter Create, GitHub hands you two lines — copy them and run them in Warp. If you'd rather not type, just ask Claude Code to push for you — say "push this project to GitHub." Raise your hand if stuck.`,
  `最後一步，上線。到 vercel.com，點 New Project，Import 你剛剛建的那個 repo，全部用預設、按 Deploy。大概 30 秒，它就會給你一個網址。Deploy 成功、拿到網址的，舉手讓我看看。\n———\nLast step, go live. Go to vercel.com, click New Project, Import the repo you just made, keep all defaults, hit Deploy. In about 30 seconds it gives you a URL. Raise your hand when your deploy succeeds and you have a URL.`,
  `現在，你有自己的網址了！這是今天的高潮。兩件事：第一，把網址貼到共享白板上，大家互相看看彼此做的；第二，截個圖、分享出去，這是你今天的紀念。這個感覺 —— 就是 ship。（這裡能量拉高，幫大家鼓掌一下）\n———\nNow — you have your own URL! This is the high point of the day. Two things: one, post your URL on the shared board so everyone can see each other's work; two, take a screenshot and share it — that's your souvenir for today. This feeling — this is shipping. (raise the energy here, get a round of applause)`,
  `網站雖然上線了，但它還是「範本的樣子」，不夠像你。想讓它更專業，與其自己慢慢調 CSS，不如裝一個專門做設計的 skill。Claude Code 也能裝 skill，指令就是 npx skills add。skills.sh 是 Vercel 做的開放目錄，你可以去逛逛，排行榜第一名 find-skills 有一百五十萬次安裝，很多好東西。\n———\nYour site is live, but it still looks like the template — not quite you yet. To make it more polished, instead of tweaking CSS by hand, install a design skill. Claude Code can add skills too — the command is npx skills add. skills.sh is an open directory by Vercel; go browse it. The top one, find-skills, has 1.5 million installs — lots of good stuff there.`,
  `我帶你裝一個我自己很愛、而且免費的設計 skill —— Impeccable，它的作用就是「教你的 AI 設計品味」。在 Warp 裡打 npx skills add pbakaus/impeccable。裝完之後，你就多了 23 個設計指令、7 個參考領域、還有 27 條反模式偵測規則。它是從 Anthropic 官方的 frontend-design skill 演化來的。\n———\nLet me have you install a design skill I love, and it's free — Impeccable. Its whole job is to "teach your AI design taste." In Warp, type npx skills add pbakaus/impeccable. Once installed, you gain 23 design commands, 7 reference domains, and 27 anti-pattern rules. It evolved from Anthropic's official frontend-design skill.`,
  `裝好就用用看。跟 Claude Code 說「用 /polish 幫我的個人站打磨設計」。為什麼需要它？因為 AI 看過太多類似的範本，如果你沒特別講，它就會生出那種「一看就知道是 AI 做的」設計 —— Inter 字體、紫藍漸層、卡片疊卡片。Impeccable 做的事，就是把「好設計」變成 AI 跟你之間共用的詞彙，讓它知道你要的是什麼。\n———\nNow use it. Tell Claude Code "use /polish to refine my personal site's design." Why do you need it? Because the AI has seen too many similar templates — if you don't say otherwise, it produces that unmistakable "made by AI" look: Inter font, purple-blue gradients, cards stacked on cards. What Impeccable does is turn "good design" into shared vocabulary between you and the AI, so it knows what you actually want.`,
  `三小時走到這了，我們回顧一下你今天帶走了什麼。第一小時，你把工具都裝好了，也懂了 Vibe 跟 AI Coding 的差別。第二小時，你會用 Claude Code 了，也學會用 SDD 把「要什麼」講清楚。第三小時，你從一個範本，一路做到一個 live URL，真的 ship 了自己的網站。回家之後，就用今天這套工作方式，把你下一個想法也 ship 出來。\n———\nThree hours in — let's recap what you're taking home. Hour one, you installed all the tools and got the difference between Vibe and AI Coding. Hour two, you can drive Claude Code and learned to spell out what you want with SDD. Hour three, you went from a template all the way to a live URL — you actually shipped your own site. Back home, use this same workflow to ship your next idea too.`,
  `謝謝大家今天的耐心，三個小時對講者跟學員都不短。兩件事帶走：一個是你今天親手 ship 的網址，另一個是一整套用 AI 把東西做出來的工作方式。有任何問題、卡關、想多聊的，都來找我，我會留到 17:30，michaello.me 跟 GitHub 都歡迎。\n———\nThank you all for your patience — three hours is long for everyone. Two things to take home: the URL you shipped today, and a whole way of building things with AI. Any questions, anything you're stuck on, anything you want to chat about — come find me, I'll be here until 17:30, michaello.me and GitHub both welcome.`,
];

export default [
  Cover, Intro, HandsUp, Divider, VibeVsAI, OneLine, Switch,
  SetupOverview, SetupWarp, SetupNode, SetupClaude, CheckEnv, H1Close,
  H2Open, OpenClaude, PlanMode, Pains, DoneWhat, SddStages, TryClaude, H2Close,
  H3Open, SpecWalk, SpecMissing, CloneStep, DevStep, EditResume, GithubRepo, PushStep, DeployStep, YouDidIt, SkillsSh, Impeccable, Polish, Recap, ThankYou,
] satisfies Page[];
