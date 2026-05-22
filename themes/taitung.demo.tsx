import { type DesignSystem, type Page, useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#0E0E10', text: '#F5F4F2', accent: '#D97757' },
  fonts: {
    display: '"PingFang TC", "Noto Sans TC", -apple-system, "Inter", system-ui, sans-serif',
    body: '"PingFang TC", "Noto Sans TC", -apple-system, "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 150, body: 38 },
  radius: 16,
};

const muted = '#9A9A9F';
const surface = '#1A1A1F';
const border = '#2A2A30';
const accentB1 = '#D97757';
const accentB2 = '#4ADE80';
const accentB3 = '#7AA2F7';
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
};

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

const HandIcon = ({ size = 36, color = accentB1 }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
       strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
    <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
    <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </svg>
);

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
    <HandIcon size={36} color={accent} />
    {children}
  </div>
);

const Cover: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB1}>B1 · 懂 · 14:00–17:00</Eyebrow>
    </div>
    <div style={{ animation: 'fadeUp 0.5s ease 0.08s both' }}>
      <Title size={150}>From Vibe to Spec</Title>
    </div>
    <p style={{ fontSize: 'var(--osd-size-body)', color: muted, maxWidth: 1300, marginTop: 32, animation: 'fadeUp 0.5s ease 0.16s both' }}>
      Ship Your First Personal Site with AI · Michael Lo
    </p>
    <Footer accent={accentB1} />
  </div>
);

const ColumnCard = ({ tag, color, lines }: { tag: string; color: string; lines: string[] }) => (
  <div style={{ flex: 1, background: surface, border: `1px solid ${border}`, borderRadius: 16, padding: 48 }}>
    <div style={{ fontSize: 30, fontWeight: 700, color, marginBottom: 24, fontFamily: 'var(--osd-font-display)' }}>{tag}</div>
    {lines.map((l) => (
      <p key={l} style={{ fontSize: 32, lineHeight: 1.5, color: 'var(--osd-text)', margin: '0 0 16px' }}>{l}</p>
    ))}
  </div>
);

const Content: Page = () => (
  <div style={{ ...fill, padding: 120 }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB1}>今天最重要的分界線</Eyebrow>
      <Title>兩種 mode：誰主導？</Title>
    </div>
    <div style={{ display: 'flex', gap: 64, marginTop: 64, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <ColumnCard tag="Vibe Coding" color={accentB1} lines={['你跟 AI 聊聊聊', 'AI 給什麼收什麼', '能跑就好 → AI 主導']} />
      <ColumnCard tag="AI Coding" color={accentB2} lines={['你知道目標', '主動選方案、敢拒絕', '關鍵時介入 → 人主導']} />
    </div>
    <Footer accent={accentB1} />
  </div>
);

const Closer: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 120px' }}>
    <style>{styles}</style>
    <div style={{ animation: 'fadeUp 0.5s ease both' }}>
      <Eyebrow color={accentB3}>三個關鍵字</Eyebrow>
      <Title size={120}>
        <span style={{ color: accentB1 }}>Vibe</span> · <span style={{ color: accentB2 }}>AI Coding</span> · <span style={{ color: accentB3 }}>SDD</span>
      </Title>
    </div>
    <div style={{ marginTop: 56, animation: 'fadeUp 0.5s ease 0.12s both' }}>
      <HandUp accent={accentB3}>離開前，每個人都有自己的網址</HandUp>
    </div>
    <Footer accent={accentB3} />
  </div>
);

export default [Cover, Content, Closer];
