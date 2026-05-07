# Personal-introduction-website · 沙漠风个人主页

> 一个为操作系统与数据库学习者设计的动态个人网站，采用沙漠卡通视觉风格，实时同步 GitHub 数据。

[![GitHub Pages](https://img.shields.io/badge/部署-GitHub%20Pages-87CEEB?logo=githubpages)](https://duz1287.github.io/Personal-introduction-website/)
[![GitHub license](https://img.shields.io/github/license/DUZ1287/Personal-introduction-website)](LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/DUZ1287/Personal-introduction-website)](https://github.com/DUZ1287/Personal-introduction-website/commits/main)

**在线访问**：[https://duz1287.github.io/Personal-introduction-website/](https://duz1287.github.io/Personal-introduction-website/)

---

## 📖 项目简介

这是我的个人品牌网站——一个同时服务于**学习者**和**展示者**的数字化名片。设计上融合了沙漠探险的轻松氛围，功能上则聚焦于：

* 实时同步 GitHub 公开数据（仓库数、关注者、年度贡献量）；
* 展示操作系统与数据库领域的系统化学习笔记；
* 通过“Building in Public”的方式持续记录与输出。

### 核心功能
* **动态 GitHub 数据**：调用 GitHub REST API，结合缓存策略与错误降级，实时显示最新的仓库与社区互动数据。
* **学习笔记入口**：直接链接到《Operating-System》和《Principles-of-Database》两个核心仓库，方便访客查阅完整笔记。
* **暗色模式**：跟随系统主题偏好或手动切换，切换状态保存在本地，下次访问自动恢复。
* **完全响应式**：为手机、平板、桌面分别优化了布局与交互。
* **无障碍支持**：提供键盘导航、屏幕阅读器兼容，并遵循减少动画的用户偏好设置。

---

## 🛠️ 技术栈

| 类别 | 技术 |
| ---- | ---- |
| 前端基础 | HTML5, CSS3, JavaScript (ES6+) |
| 样式与交互 | CSS Grid / Flexbox, CSS 自定义属性, 关键帧动画, 玻璃态设计 |
| 数据集成 | GitHub REST API（含超时控制、缓存、降级策略） |
| 托管与部署 | GitHub Pages |
| 版本管理 | Git |
| 辅助特性 | 本地存储 / 响应式断点 / 无障碍增强 / SEO 基础优化 |

---

## 📁 项目结构

```
Personal-introduction-website/
├── index.html                  # 主页面（含结构化数据、Open Graph）
├── styles.css                  # 完整样式（暗色模式、响应式、动画）
├── script.js                   # 核心逻辑（API 调用、暗色模式、粒子系统）
├── 912ba7c8afc8d5820ded7a30ff99d06.jpg   # 个人头像
├── .claude/                    # 编辑器配置（可忽略）
├── .trae/                      # 笔记文档（可忽略）
└── README.md                   # 项目说明文档
```

---

## 🚀 本地运行

1. 将仓库克隆到本地：
   ```bash
   git clone https://github.com/DUZ1287/Personal-introduction-website.git
   cd Personal-introduction-website
   ```

2. 直接用浏览器打开 `index.html` 即可预览。  
   推荐使用 Live Server 以获得最佳体验（VS Code 中右键 `index.html` → Open with Live Server）。

---

## 🌐 部署到 GitHub Pages

站点已经配置为通过项目站点的方式部署在 `Personal-introduction-website` 子目录下。如果你需要重新部署或复刻到自己的账号，步骤如下：

1. 在 GitHub 上创建一个**公共仓库**，名称可自定义（例如 `your-name.github.io` 或任意仓库名）。
2. 关联本地仓库并推送：
   ```bash
   git remote set-url origin https://github.com/你的用户名/你的仓库名.git
   git branch -M main
   git push -u origin main
   ```
3. 进入仓库 **Settings → Pages**，将 Source 设为 `main` 分支，文件夹选 `/ (root)`，点击 Save。
4. 等待 1–2 分钟，即可通过 `https://你的用户名.github.io/你的仓库名/` 访问网站。

> 若希望直接通过 `https://你的用户名.github.io` 访问，则需要将仓库命名为 `你的用户名.github.io`。

---

## 🔧 自定义配置

### 更换 GitHub 用户数据

在 `script.js` 文件顶部修改：

```js
const GITHUB_USERNAME = '你的用户名';   // 替换为自己的 GitHub ID
```

### 调整 API 缓存时长（单位毫秒）

```js
const CACHE_DURATION = 5 * 60 * 1000;   // 默认 5 分钟
```

### 更换网站主题色

编辑 `styles.css` 中的 `:root` 变量：

```css
:root {
    --sky-blue: #87CEEB;
    --sand-orange: #E8A853;
    --rock-pink: #D4A5A5;
    /* 其他颜色变量... */
}
```

### 修改头像图片

将你的头像图片放入项目根目录，并修改 `index.html` 中对应的 `src` 路径：

```html
<img src="你的图片文件名.jpg" ...>
```

---

## 📄 许可证

本项目采用 **MIT 许可证**，允许自由使用、修改和分发，但需保留原始版权声明。详见 [LICENSE](LICENSE) 文件。

---

## 📬 联系作者

* **GitHub**：[DUZ1287](https://github.com/DUZ1287)
* **邮箱**：1971263810@163.com（点击网站中的邮箱按钮即可唤起邮件客户端）

如果你对操作系统、数据库或前端开发感兴趣，欢迎通过 GitHub 进行交流。

**如果这个项目对你有帮助，欢迎点一个 ⭐ Star！**
```
