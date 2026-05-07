# 🏜️ DUZ1287 个人网站

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen?logo=github)](https://duz1287.github.io)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Built with](https://img.shields.io/badge/Built%20with-HTML%2FCSS%2FJS-orange)](https://github.com/DUZ1287/DUZ1287.github.io)

> 专注操作系统与数据库的开发者 · Building in public · Learning by doing

这是我的个人品牌网站，采用**沙漠卡通风**设计，集成了 GitHub API 实时数据、暗色模式、响应式布局和丰富的微交互动画。网站旨在展示我的学习历程、开源项目和技术笔记。

🔗 **在线访问**：[https://duz1287.github.io](https://duz1287.github.io)

---

## 📖 项目介绍

该网站是“随忘成方大佬”(DUZ1287) 的个人技术名片，聚焦计算机基础领域（操作系统、数据库原理）。通过 **Building in Public** 的方式，分享学习笔记、项目实践和日常思考。

### 核心内容模块
- **Hero 区**：动态 GitHub 数据展示（仓库数、关注者、年度贡献）、角色动画。
- **关于我**：真实身份介绍 + 实时 GitHub 统计数据（带缓存和降级）。
- **技能树**：操作系统、数据库原理、前端开发、学习能力（进度条动画）。
- **开源作品**：列出三个主要仓库（Yxy、Operating-System、Principles-of-Database），并自动更新每个仓库的 star 数、编程语言和最后更新时间。
- **学习笔记入口**：快速跳转到 GitHub 上的笔记仓库。
- **联系我**：邮箱（反爬虫保护）、GitHub 链接。

---

## 🛠️ 技术栈

| 类别       | 技术/工具                                          |
| ---------- | ------------------------------------------------- |
| 前端基础   | HTML5（语义化）、CSS3（动画/渐变/玻璃态）、JavaScript (ES6+) |
| 构建与部署 | 纯静态，无构建工具，直接部署至 GitHub Pages         |
| 数据接口   | GitHub REST API（用户信息 + 仓库列表）             |
| 存储       | LocalStorage（API 缓存，5分钟有效期）              |
| 性能优化   | 资源预连接、移动端自适应、硬件加速、懒加载、防抖/节流 |
| 无障碍     | ARIA 标签、键盘导航、`prefers-reduced-motion`      |
| 暗色模式   | 手动切换 + 跟随系统偏好 + 本地持久化                |
| 版本控制   | Git + GitHub                                      |

---

## ✨ 功能特点

- ✅ **实时 GitHub 数据**：通过 GitHub API 获取并展示用户信息、仓库元数据（star 数、语言、更新时间），带缓存和错误降级。
- ✅ **动态数字动画**：统计数据加载时有平滑的数字递增效果。
- ✅ **沙漠角色动画**：飞行器 + 披风飘动 + 云/岩石视差效果，营造沉浸感。
- ✅ **主题切换**：明/暗两种配色，支持系统级跟随。
- ✅ **完全响应式**：适配桌面、平板、手机（320px ~ 1920px），触摸优化。
- ✅ **高性能**：移动端自动禁用粒子背景、部分装饰元素；CSS 动画使用 `transform` 和 `opacity` 触发 GPU 加速。
- ✅ **SEO 友好**：meta 标签、Open Graph、JSON-LD 结构化数据。
- ✅ **邮箱反爬**：邮箱地址通过 `data-user` + `data-domain` 组合，页面加载后才渲染真实 `mailto` 链接。

---

## 🚀 部署说明（GitHub Pages）

本网站设计为 **纯静态站点**，可以一键部署到 GitHub Pages，也可托管在任何静态服务器（Vercel、Netlify 等）。

### 方式一：使用 `DUZ1287.github.io` 仓库（推荐）

1. **Fork 或克隆本仓库**  
   ```bash
   git clone https://github.com/DUZ1287/DUZ1287.github.io.git
   
