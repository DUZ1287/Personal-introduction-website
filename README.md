# 🏜️ 个人网站 · 操作系统与数据库学习笔记

> 一个专注 **操作系统** 与 **数据库原理** 的学习者，通过 **Building in Public** 的方式分享知识。

[![GitHub Pages](https://img.shields.io/badge/部署-GitHub%20Pages-87CEEB?logo=githubpages)](https://duz1287.github.io)
[![GitHub license](https://img.shields.io/github/license/DUZ1287/DUZ1287.github.io)](LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/DUZ1287/DUZ1287.github.io)](https://github.com/DUZ1287/DUZ1287.github.io/commits/main)

**在线访问**：👉 [https://duz1287.github.io](https://duz1287.github.io)

---

## 📖 项目简介

这是我的个人品牌网站，融合了 **沙漠探险** 视觉风格与 **开发者学习历程**。网站不仅展示了我的 GitHub 动态数据，还整理了操作系统、数据库等底层知识的学习笔记，并持续通过公开构建的方式迭代。

### 主要功能
- 🧑‍💻 **动态 GitHub 数据**：实时获取仓库数、关注者、年度贡献（带缓存与降级）
- 📚 **学习笔记入口**：操作系统、数据库原理等知识体系
- 🌙 **暗色模式**：跟随系统或手动切换，持久化存储
- 📱 **完全响应式**：手机、平板、桌面均完美适配
- ♿ **无障碍访问**：支持键盘导航、屏幕阅读器、减少动画偏好
- 🎨 **沙漠卡通风 UI**：动态粒子背景、角色飞行动画、玻璃态卡片

---

## 🛠️ 技术栈

| 类别       | 技术                                                        |
| ---------- | ----------------------------------------------------------- |
| 前端基础   | HTML5, CSS3, JavaScript (ES6+)                              |
| 样式与动画 | CSS Grid / Flexbox, 自定义属性 (CSS Variables), 关键帧动画  |
| 数据交互   | GitHub REST API (带超时、缓存、错误降级)                    |
| 部署平台   | GitHub Pages                                                |
| 版本控制   | Git                                                         |
| 其他特性   | 本地存储(主题/缓存) / 响应式设计 / 无障碍增强 / SEO 优化    |

---

## 🚀 如何部署到自己的 GitHub Pages

如果你想把这个项目克隆下来修改或部署到自己的账号，只需要几个步骤：

### 1. Fork 或下载本仓库

```bash
git clone https://github.com/DUZ1287/DUZ1287.github.io.git
cd DUZ1287.github.io
```

### 2. 修改个人资料

- 替换头像图片：把你的图片命名为 `912ba7c8afc8d5820ded7a30ff99d06.jpg`（或修改 `index.html` 中的 `src` 路径）。
- 修改 `index.html` 中的个人信息（名字、GitHub 用户名、邮箱等）。
- 在 `script.js` 中修改 `GITHUB_USERNAME` 常量为你自己的 GitHub 用户名。

### 3. 本地预览

直接用浏览器打开 `index.html` 即可。建议使用 Live Server 等工具获得最佳体验。

```bash
# 使用 VS Code Live Server 或 Python 简易服务器
python -m http.server 5500
```

### 4. 推送到自己的 GitHub 仓库

- 在 GitHub 创建一个 **公共仓库**，名称必须是 `你的用户名.github.io`（这样才能直接通过 `https://用户名.github.io` 访问）。
- 关联并推送：

```bash
git remote set-url origin https://github.com/你的用户名/你的用户名.github.io.git
git branch -M main
git push -u origin main
```

### 5. 启用 GitHub Pages

- 进入仓库 **Settings** → **Pages**
- **Branch** 选择 `main`，文件夹选 `/ (root)`，点击 **Save**
- 等待 1～2 分钟，访问 `https://你的用户名.github.io` 即可看到网站。

---

## 📁 项目结构

```
.
├── index.html          # 主页面（含结构化数据、Open Graph）
├── styles.css          # 完整样式（含暗色模式、响应式、动画）
├── script.js           # 核心逻辑（API 获取、暗色模式、粒子系统等）
├── 912ba7c8afc8d5820ded7a30ff99d06.jpg   # 头像图片
├── .claude/            # 编辑器配置（可忽略）
├── .trae/              # 笔记文档（可忽略）
└── README.md           # 项目说明
```

---

## 🔧 自定义配置

### 更换 GitHub API 用户

在 `script.js` 顶部修改：

```js
const GITHUB_USERNAME = '你的用户名';
```

### 调整缓存时长

```js
const CACHE_DURATION = 5 * 60 * 1000; // 默认 5 分钟
```

### 修改主题颜色

编辑 `styles.css` 中的 `:root` 变量：

```css
:root {
    --sky-blue: #87CEEB;
    --sand-orange: #E8A853;
    --rock-pink: #D4A5A5;
    /* ... */
}
```

---

## 🌟 亮点功能说明

| 功能               | 实现说明                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| GitHub 数据动态加载 | `fetchGitHubData()` 带超时、缓存、降级；显示速率限制状态。               |
| 暗色模式           | 通过 `data-theme` 属性 + CSS 变量切换；监听系统主题变化。                |
| 无障碍优化         | 跳转链接、语义标签、ARIA 属性、`prefers-reduced-motion` 支持。           |
| 性能优化           | 移动端禁用粒子背景、图片懒加载、`will-change` 提示、首屏加载动画。       |
| 邮箱反爬           | 邮箱地址使用 `data-` 属性 + JS 动态生成 `mailto:`。                      |

---

## 📄 许可证

本项目采用 **MIT 许可证**，你可以自由使用、修改、分发，但需保留原始版权声明。详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- 灵感来源于个人学习历程与 **Building in Public** 社区。
- GitHub API 提供实时数据支持。
- 所有开源社区的工具和资源。

---

## 📬 联系我

- GitHub: [DUZ1287](https://github.com/DUZ1287)
- 邮箱: 1971263810@163.com（点击网站上的邮箱按钮即可）

---

**如果这个项目对你有帮助，欢迎给个 ⭐️ Star！**

[⬆ 回到顶部](#)
```
