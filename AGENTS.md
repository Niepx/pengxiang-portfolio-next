# AGENTS.md — 作品集「next 部署线」协作约定与变更记录

> 本仓库 `Niepx/pengxiang-portfolio-next` 是 WorkBuddy 的可部署线（GitHub Pages 自动部署到
> https://niepx.github.io/pengxiang-portfolio-next/ ）。
> 定稿主线 `Niepx/pengxiang-content-portfolio`（Codex 定稿，面试正式链接指向它）**冻结不动**。
> 本文件供 WorkBuddy 与 Codex 共同交接：任何一方改动都要在此追加一行，归属清晰、可追溯、可回退。

## 一、红线（不可违背）

1. 不得破坏线上现有设计与布局 —— 面试作品集，视觉是核心资产。
2. 个人内容文案（About 等）是用户原话，只做排版结构分层，措辞一字不改。
3. 面试以移动端为主；电脑端改动必须与移动端隔离（媒体查询/交互触发），不得影响移动端。
4. 任何改动前先确认当前线上 commit，作为回退还原点。

## 二、认证方式（2026-11-21 起，无需 token）

- push 使用仓库级 SSH 配置，复用本地已有 key `~/.ssh/id_ed25519_codex_github`（该 key 即当初给 Codex 配的，认证的是 Niepx 账号身份，不影响 Codex 仓库）：
  ```
  git config core.sshCommand "ssh -i ~/.ssh/id_ed25519_codex_github -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"
  git remote set-url origin git@github.com:Niepx/pengxiang-portfolio-next.git
  ```
- 原因：Fine-grained token 会过期（90 天）且被网页端重新生成/改权限后立即失效（曾导致 401）。SSH key 长期有效，一劳永逸。
- 远端源码核对用 GitHub API contents 接口（`Accept: application/vnd.github.raw`）或 `?ref=<sha>`，避免 raw.githubusercontent.com 的 CDN 缓存误导。

## 三、部署说明

- `.github/workflows/deploy.yml`：push 到 main 触发，build → upload-pages-artifact → deploy-pages。
- 有 `concurrency: cancel-in-progress: true`，短时间连续推送会互相取消，导致产物卡在旧版本。**改动后只推一次，等部署完成再验证，不要连续空推。**
- build 前已加 `rm -rf dist node_modules/.vite && find . -name "*.tsbuildinfo" -delete`，并用 `pnpm exec vite build` 直接构建（跳过 tsc -b 可能的缓存干扰）。

## 四、变更记录

记录格式：日期（北京时间）｜改动方｜Commit｜改动内容。

| 日期 | 改动方 | Commit | 改动内容 |
|---|---|---|---|
| 2026-11-21 | WorkBuddy | `b3bf7bc` | 适配新仓库 Pages base 路径 `/pengxiang-portfolio-next/` |
| 2026-11-21 | WorkBuddy | `5d600a0` | 手机端 About→Expertise 加浅灰垫层（`.expertise-stage`）消除黑三角 + 入场动效 |
| 2026-11-21 | WorkBuddy | `34117c8` | 手机端产品功能图容器背景统一为 `#1d1e20`（robot-case.css，懒加载分块） |
| 2026-11-21 | WorkBuddy | `d8b75d2` | index.html 加构建标记（诊断产物是否更新用） |
| 2026-11-21 | WorkBuddy | `8f8d6ac` | 部署 workflow 加缓存清理、改用 vite build |
| 2026-11-21 | WorkBuddy | `aa11eda` | **电脑端加载优化**：Hero 11MB 交互视频由首屏预加载改为首次真实交互（鼠标移动/滚动）才加载，首屏只保留 223KB poster；移动端不受影响 |
| 2026-11-21 | WorkBuddy | `3e3dbb5` | 新增本变更记录文档（认证方式/部署说明/变更表） |
| 2026-11-21 | WorkBuddy | `2680e5b` | 手机端 AI ROBOT 项目 Content System 素材随滚动固定显示：手机端把图容器改回 sticky 固定（top:0，22svh），滚动时素材持续可见并随步骤切换；桌面端不受影响 |

## 五、待办 / 遗留

- 桌面端 Hero 交互视频延迟加载后，首次交互需等视频下载（约 11MB）才能看到角色跟随，属预期权衡；如需进一步优化可考虑压缩视频素材（需 ffmpeg + 素材）。
- 电脑端四套滚动驱动机制未收敛（用户此前明确暂不处理）。
