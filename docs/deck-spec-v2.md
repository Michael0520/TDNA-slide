# Deck Spec v2 — TDNA-slide / taitung-2026

**狀態:** 草稿,待 Michael 確認後重構 deck
**日期:** 2026-05-23
**取代:** 原 brief(Claude Desktop + MCP + PostHog,已脫節)

---

## Goal（北極星）

讓非工程師參與者,在三小時內**親手用 Claude Code(CLI)把一個網站範本改成自己的、ship 上線**,並帶走一套「先講清楚要什麼、再讓 AI 做」的 SDD 工作方式。

## 三小時新結構

| 小時 | 主題 | 核心 |
|------|------|------|
| **H1** | 安裝 + 開場觀念 | Vibe vs AI Coding 分界 + 現場帶裝 Warp / Claude Code / Node(nvm)/ pnpm / Git |
| **H2** | AI Coding | Claude Code 怎麼用(指令 / Plan Mode / 讀改檔)+ SDD 觀念(做完什麼?三階段)+ 輕量動手 |
| **H3** | 改樣板 + ship | clone portfolio-workshop → Claude Code 改成自己的 → push → Vercel deploy → 用 skill 打磨設計 → 收尾 |

## 移除（相對目前 50 頁）

- ❌ Claude **Desktop** 三件套:MCP、Skills(概念頁)、Artifacts、MCP 架構圖 → Desktop 專有,改 Claude Code CLI 不適用
- ❌ 5-era timeline、「驅動 Claude 三種輸入」、「Desktop 沒 Plan Mode」
- ❌ OpenSpec 整段(S50–S55)
- ❌ PostHog(已移除)
- ❌ B3「驗」這個 block 概念(改成 H3「改樣板」)

## 保留

- ✅ 封面、自我介紹(已用真實素材)
- ✅ Vibe vs AI Coding 分界(舉手 / 兩種 mode / 一句話 / 看情境)
- ✅ Plan Mode(移到 H2,Claude Code 原生支援)
- ✅ SDD(vibe 三痛 / 做完什麼 / 三階段)
- ✅ clone→改→push→deploy 動手流程(改成 Claude Code + 你的 template)
- ✅ skills.sh + Impeccable /polish(放 H3 改設計)
- ✅ 收尾 / 回饋 / 合照

## 新增

- 🆕 **Warp 是什麼 + 裝 Warp**:現代終端機(取代內建 terminal),tagline "Ship better software with any agent",跨 Mac/Win/Linux
- 🆕 **裝 Claude Code**:`curl -fsSL https://claude.ai/install.sh | bash`,文件 https://code.claude.com/docs/zh-TW/overview
- 🆕 **裝 Node(nvm)+ pnpm**:照 Node 官網 macOS / nvm / 含 pnpm:
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
  nvm install 24            # Node v24 LTS
  corepack enable pnpm
  ```
- 🆕 **環境檢查**:`node -v` / `pnpm -v` / `git --version` / `claude --version`,看到版本就 OK(舉手)
- 🆕 **Claude Code 怎麼用**:在終端機打 `claude`、用自然語言下指令、Plan Mode、讓它讀檔改檔

## 真實素材（已在專案）

- `assets/avatars/michael.jpg`、`assets/logos/code4tw.png`、`github.svg`、`vercel.svg`
- template:`github.com/Michael0520/portfolio-workshop`(Next.js + pnpm,`engines: node >=18`)

## 逐頁草案（H1 / H2 / H3）

### H1 · 安裝 + 開場觀念（~14 頁）
1. 封面（保留 S1）
2. 自我介紹（保留 S2）
3. 兩個舉手（保留 S4）
4. 今天最重要的分界線（保留 S5）
5. Vibe vs AI Coding 對照（保留 S6）
6. 一句話分（保留 S8）
7. 看情境切換（保留 S9）
8. 🆕 今天要裝四個東西（總覽:Warp / Claude Code / Node / Git）
9. 🆕 Warp 是什麼 + 裝
10. 🆕 裝 Node（nvm）+ pnpm
11. 🆕 裝 Git（或併入上頁）
12. 🆕 裝 Claude Code（curl install.sh）
13. 🆕 環境檢查（node -v / claude --version… 舉手）
14. H1 收束 + 預告 H2

### H2 · AI Coding（~10 頁）
15. H2 開場:會工具了,現在學怎麼「驅動」
16. 打開 Claude Code（終端機打 `claude`）
17. Plan Mode（保留 S13,動手前先給計畫）
18. vibe 三個痛（保留 S19）
19. 做完什麼?（保留 S20）
20. SDD 三階段（保留 S21）
21. 🆕 輕量動手:用 Claude Code 試一個小指令
22. H2 收束 + 預告 H3（改你的網站）

### H3 · 改樣板 + ship（~16 頁）
23. H3 開場:clone 一個範本,改成你的
24. spec 走讀（保留 S25）
25. 缺了會怎樣（保留 S27）
26-28. clone / install / dev（改成 portfolio-workshop + Warp）
29. 用 Claude Code 改個人資料（改 S33,非 Desktop）
30. GitHub repo（保留 S34）
31. push（保留 S35）
32. Vercel deploy（保留 S36）
33. 你做到了（保留 S37）
34. 一句話改主色（改 S39,Claude Code）
35-37. skills.sh / Impeccable / /polish 打磨（保留 S17b/c/d,改 Claude Code 脈絡）
38. 三小時收束（改 S56,去 OpenSpec）
39. 回饋（保留 S57）
40. 謝謝 + 合照（保留 S58）

> 目標總頁數:~40 頁（目前 50,砍 Desktop/OpenSpec 約 18、新增安裝/CC 約 8）。
