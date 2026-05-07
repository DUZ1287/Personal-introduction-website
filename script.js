document.addEventListener('DOMContentLoaded', function() {
    // ========== 首屏加载优化 ==========
    const pageLoader = document.getElementById('page-loader');
    
    // 移除加载动画
    setTimeout(() => {
        if (pageLoader) {
            pageLoader.classList.add('loaded');
            setTimeout(() => pageLoader.remove(), 600);
        }
        document.body.classList.add('loaded');
    }, 800);
    
    // ========== GitHub API 动态数据获取（核心升级） ==========
    fetchGitHubData();
    
    // ========== 暗色模式切换 ==========
    initDarkMode();
    
    // ========== 粒子背景系统 ==========
    initParticles();
    
    // ========== 导航栏系统（增强无障碍） ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger && navLinks) {
        // 汉堡菜单点击事件
        hamburger.addEventListener('click', function() {
            const isExpanded = this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // 更新ARIA属性
            this.setAttribute('aria-expanded', isExpanded);
            
            // 焦点管理：打开时聚焦到第一个菜单项
            if (isExpanded) {
                const firstLink = navLinks.querySelector('a');
                if (firstLink) {
                    setTimeout(() => firstLink.focus(), 100);
                }
            }
        });
        
        // ESC键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
        
        // 点击外部关闭菜单
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
    
    // 滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
    
    // 平滑滚动（移动端优化）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 移动端考虑导航栏高度的偏移
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // 在移动端点击链接后关闭菜单
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // ========== 打字机效果 ==========
    initTypeWriter();
    
    // ========== 滚动动画系统 ==========
    initScrollAnimations();
    
    // ========== 技能条动画 ==========
    initSkillBars();

    // ========== 鼠标跟随效果 ==========
    initMouseFollow();
    
    // ========== 视差效果 ==========
    initParallax();

    // ========== 邮箱保护与显示 ==========
    initEmailProtection();

    // ========== 设置面板初始化 ==========
    initSettingsPanel();

    // ========== 手动刷新按钮 ==========
    initRefreshButton();
});

// ========== 粒子背景初始化 ==========
function initParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-js';
    document.body.prepend(particlesContainer);
    
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    particlesContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrame;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
            this.opacity = Math.random() * 0.6 + 0.2;
            this.color = getRandomColor();
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color.replace(')', `, ${this.opacity})`).replace('rgb', 'rgba');
            ctx.fill();
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }
    }
    
    function getRandomColor() {
        const colors = [
            'rgb(212, 165, 165)',
            'rgb(205, 145, 158)',
            'rgb(135, 206, 235)',
            'rgb(232, 168, 83)',
            'rgb(255, 248, 231)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.15;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(212, 165, 165, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// ========== 打字机效果 ==========
function initTypeWriter() {
    const glitchText = document.querySelector('.glitch-text');
    
    if (glitchText) {
        const originalText = glitchText.textContent;
        glitchText.textContent = '';
        glitchText.style.borderRight = '3px solid var(--rock-pink)';
        
        let charIndex = 0;
        const typeSpeed = 80;
        
        function type() {
            if (charIndex < originalText.length) {
                glitchText.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(type, typeSpeed);
            } else {
                setTimeout(() => {
                    glitchText.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(type, 800);
    }
}

// ========== 滚动动画系统 ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                if (entry.target.dataset.delay) {
                    entry.target.style.transitionDelay = entry.target.dataset.delay + 's';
                }
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(`
        .about-text p,
        .stat-item,
        .skill-card,
        .project-card,
        .contact-method,
        .section-title
    `);
    
    animatedElements.forEach((el, index) => {
        el.classList.add('scroll-reveal');
        el.style.transitionDelay = `${index * 0.12}s`;
        observer.observe(el);
    });
}

// ========== 技能条动画 ==========
function initSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observerOptions = {
        threshold: 0.4
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.querySelector('.skill-progress');
                if (progress && !progress.classList.contains('animated')) {
                    const targetWidth = progress.getAttribute('data-width');
                    
                    setTimeout(() => {
                        progress.style.width = targetWidth;
                        progress.classList.add('animated');
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    skillCards.forEach(card => observer.observe(card));
}

// ========== 鼠标跟随效果（桌面端仅） ==========
function initMouseFollow() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }

    const heroImage = document.querySelector('.hero-image');
    const avatar = document.querySelector('.avatar-container');
    const cards = document.querySelectorAll('.skill-card, .project-card');

    if (!heroImage && !avatar && !cards.length) return;

    let ticking = false;

    document.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;

                if (heroImage) {
                    const xPercent = ((clientX / innerWidth) - 0.5) * 25;
                    const yPercent = ((clientY / innerHeight) - 0.5) * 15;
                    heroImage.style.transform = `translate(${xPercent}px, ${yPercent}px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg)`;
                }

                if (avatar) {
                    const rect = avatar.getBoundingClientRect();
                    const deltaX = (clientX - rect.left - rect.width / 2) / 30;
                    const deltaY = (clientY - rect.top - rect.height / 2) / 30;
                    avatar.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg)`;
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        if (heroImage) heroImage.style.transform = 'translate(0, 0)';
        if (avatar) avatar.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            card.style.transform = `
                perspective(1000px)
                rotateX(${(y - centerY) / 20}deg)
                rotateY(${(centerX - x) / 20}deg)
                translateZ(10px)
                translateY(-10px)
                scale(1.02)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ========== 视差效果 ==========
function initParallax() {
    const decorations = document.querySelector('.decorations');
    const heroSection = document.querySelector('.hero');
    const parallaxElements = document.querySelectorAll('.rock, .tower, .cloud');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                if (decorations && heroSection && scrolled < window.innerHeight) {
                    decorations.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0003})`;
                    decorations.style.opacity = 1 - (scrolled / (window.innerHeight * 1.2));
                }

                parallaxElements.forEach((el, index) => {
                    el.style.transform = `translateY(${-(scrolled * (0.1 + index * 0.05))}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ========== 通知提示 ==========
function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = message;
    
    const bgColor = type === 'success' 
        ? 'linear-gradient(135deg, #27ae60, #2ecc71)' 
        : 'linear-gradient(135deg, #e74c3c, #c0392b)';
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: bgColor,
        color: 'white',
        padding: '1.2rem 2.5rem',
        borderRadius: '20px',
        boxShadow: '0 15px 45px rgba(0,0,0,0.3)',
        zIndex: '99999',
        fontSize: '1.1rem',
        fontWeight: '600',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        animation: 'notificationSlideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        maxWidth: '400px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.3)'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.5s ease-in forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3500);
    
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes notificationSlideIn {
                from {
                    transform: translateX(500px) rotate(-10deg);
                    opacity: 0;
                }
                to {
                    transform: translateX(0) rotate(0deg);
                    opacity: 1;
                }
            }
            @keyframes notificationSlideOut {
                from {
                    transform: translateX(0) rotate(0deg);
                    opacity: 1;
                }
                to {
                    transform: translateX(500px) rotate(10deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========== 彩带庆祝效果 ==========
function createConfetti() {
    const confettiCount = 60;
    const colors = ['#D4A5A5', '#CD919E', '#87CEEB', '#E8A853', '#E74C3C', '#27ae60'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDelay = Math.random() * 2;
        const size = Math.random() * 10 + 5;

        confetti.style.setProperty('--confetti-x', `${(Math.random() > 0.5 ? '' : '-')}${Math.random() * 200}px`);
        Object.assign(confetti.style, {
            position: 'fixed',
            top: '-20px',
            left: left + '%',
            width: size + 'px',
            height: size + 'px',
            backgroundColor: color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            zIndex: '99998',
            pointerEvents: 'none',
            animation: `confettiFall ${Math.random() * 2 + 2}s linear ${animationDelay}s forwards`,
            boxShadow: `0 0 ${size/2}px ${color}`
        });

        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4500);
    }
    
    if (!document.querySelector('#confetti-styles')) {
        const style = document.createElement('style');
        style.id = 'confetti-styles';
        style.textContent = `
            @keyframes confettiFall {
                0% {
                    top: -20px;
                    opacity: 1;
                    transform: rotate(0deg) translateX(0);
                }
                100% {
                    top: 100vh;
                    opacity: 0;
                    transform: rotate(720deg) translateX(var(--confetti-x, 100px));
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========== 控制台欢迎信息 ==========
console.log('%c🏜️ 欢迎来到随忘成方大佬的个人网站！', 
    'font-size: 24px; font-weight: bold; color: #CD919E; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);');
console.log('%c✨ GitHub: DUZ1287 | 设计风格：沙漠卡通风 | 数据：GitHub API实时同步', 
    'font-size: 14px; color: #87CEEB; font-weight: 600;');
console.log('%c💻 技术栈：HTML5 + CSS3 + JavaScript (Vanilla)', 
    'font-size: 13px; color: #E8A853;');
console.log('%c🎨 特色：动态数据 | 暗色模式 | 玻璃态设计 | 流畅动画', 
    'font-size: 13px; color: #D4A5A5;');
console.log('%c🌟 如果喜欢这个设计，记得在GitHub上给个Star哦！', 
    'font-size: 14px; color: #27ae60; font-weight: bold;');

// ========== GitHub API 数据动态获取系统（增强版 - 带缓存/Token/自动刷新/实时贡献数据） ==========
const GITHUB_USERNAME = 'DUZ1287';
const CACHE_KEY = `github_data_${GITHUB_USERNAME}`;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存
const TOKEN_KEY = `github_token_${GITHUB_USERNAME}`;
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5分钟自动刷新
let isFetching = false;
let refreshTimer = null;
let lastUpdatedTime = null;

// ========== GitHub Token 管理 ==========
function getGitHubToken() {
    return localStorage.getItem(TOKEN_KEY) || '';
}

function saveGitHubToken(token) {
    if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        showNotification('✅ Token 已保存！API 限流提升至 5000次/小时', 'success');
    } else {
        localStorage.removeItem(TOKEN_KEY);
        showNotification('Token 已清除', 'success');
    }
    // 保存后立即刷新数据
    setTimeout(() => fetchGitHubData(), 500);
}

function clearGitHubToken() {
    saveGitHubToken('');
}

// ========== 自动刷新机制 ==========
function startAutoRefresh() {
    if (refreshTimer) clearInterval(refreshTimer);
    refreshTimer = setInterval(() => {
        console.log('🔄 自动刷新 GitHub 数据...');
        fetchGitHubData();
    }, REFRESH_INTERVAL);
    console.log(`⏰ 自动刷新已启动，每 ${REFRESH_INTERVAL / 60000} 分钟一次`);

    // 每30秒更新一次"上次刷新"显示（让用户看到实时流逝的时间）
    if (!window.__lastUpdatedTimer) {
        window.__lastUpdatedTimer = setInterval(() => {
            if (lastUpdatedTime && !document.hidden) {
                updateLastUpdatedDisplay();
            }
        }, 30000);
    }
}

function stopAutoRefresh() {
    if (refreshTimer) {
        clearInterval(refreshTimer);
        refreshTimer = null;
    }
}

function updateLastUpdatedDisplay() {
    const statusEl = document.getElementById('api-status');
    if (statusEl && lastUpdatedTime) {
        const seconds = Math.floor((Date.now() - lastUpdatedTime) / 1000);
        const text = seconds < 60
            ? `${seconds}秒前`
            : `${Math.floor(seconds / 60)}分钟前`;
        statusEl.className = 'api-status success';
        statusEl.innerHTML = `<span class="status-indicator success"></span>✅ 数据已更新 · ${text}`;
    }
}

// 页面可见时更新"上次刷新时间"（用户切回标签时）
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && lastUpdatedTime) {
        updateLastUpdatedDisplay();
    }
});

async function fetchGitHubData() {
    // 防止重复请求
    if (isFetching) return;
    isFetching = true;

    const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
    const REPOS_API = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=public`;
    const EVENTS_API = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`;
    const token = getGitHubToken();
    const GRAPHQL_API = 'https://api.github.com/graphql';

    // 更新API状态显示
    function updateApiStatus(status, message) {
        const apiStatusEl = document.getElementById('api-status');
        if (apiStatusEl) {
            apiStatusEl.className = `api-status ${status}`;
            apiStatusEl.innerHTML = `<span class="status-indicator ${status}"></span>${message}`;
        }
    }

    let cachedData = null;
    let cachedContribs = null;

    try {
        // ========== 1. 尝试从缓存读取 ==========
        cachedData = localStorage.getItem(CACHE_KEY);
        cachedContribs = localStorage.getItem(`github_contribs_${GITHUB_USERNAME}`);

        if (cachedData) {
            const { timestamp, data } = JSON.parse(cachedData);
            const cacheAge = Date.now() - timestamp;

            if (cacheAge < CACHE_DURATION) {
                console.log('📦 使用缓存数据（', Math.round(cacheAge / 1000), '秒前）');
                if (cachedContribs) {
                    try {
                        const { contribs } = JSON.parse(cachedContribs);
                        data.contributions = contribs;
                    } catch(e) {}
                }
                applyGitHubData(data);
                updateApiStatus('success', `✅ 使用缓存 · ${new Date(timestamp).toLocaleTimeString()}`);

                // 后台静默刷新（不阻塞UI）
                silentRefresh(API_URL, REPOS_API, EVENTS_API, GRAPHQL_API, token, updateApiStatus);

                isFetching = false;
                return;
            }
        }

        updateApiStatus('loading', '正在从GitHub API加载数据...');

        // ========== 2. 并行获取用户信息 + 仓库列表 ==========
        const [userResponse, reposResponse] = await Promise.all([
            fetchWithTimeout(API_URL, 8000),
            fetchWithTimeout(REPOS_API, 6000)
        ]);

        if (!userResponse.ok) {
            if (userResponse.status === 403 || userResponse.status === 429) {
                throw new Error('API速率限制 (Rate Limit)，请稍后重试');
            }
            throw new Error(`HTTP error! status: ${userResponse.status}`);
        }

        // 检查剩余请求次数
        const rateLimitRemaining = userResponse.headers.get('X-RateLimit-Remaining');
        const rateLimitReset = userResponse.headers.get('X-RateLimit-Reset');
        const hasToken = !!token;

        if (parseInt(rateLimitRemaining) <= 5) {
            console.warn(`⚠️ GitHub API 限流剩余: ${rateLimitRemaining}`);
        }

        const userData = await userResponse.json();
        console.log('📊 GitHub用户数据:', userData);

        let reposData = [];
        if (reposResponse.ok) {
            reposData = await reposResponse.json();
            console.log(`📦 仓库数据: ${reposData.length} 个仓库`);
        } else {
            console.warn('仓库数据获取失败');
        }

        // ========== 3. 获取真实贡献数据 ==========
        let contributions = null;
        try {
            if (hasToken) {
                // 有Token时使用 GraphQL API 获取精确贡献数
                contributions = await fetchContributionsGraphQL(GRAPHQL_API, token);
            } else {
                // 无Token时使用 Events API 估算
                contributions = await fetchContributionsFromEvents(EVENTS_API);
            }
        } catch (contribError) {
            console.warn('贡献数获取失败:', contribError.message);
        }

        // 组合完整数据对象
        const completeData = {
            userData,
            repos: reposData,
            contributions,
            fetchedAt: new Date().toISOString()
        };

        // ========== 4. 应用数据到页面 ==========
        applyGitHubData(completeData);

        // ========== 5. 缓存数据 ==========
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            data: completeData
        }));
        if (contributions !== null) {
            localStorage.setItem(`github_contribs_${GITHUB_USERNAME}`, JSON.stringify({
                timestamp: Date.now(),
                contribs: contributions
            }));
        }
        // 记录剩余请求数
        const requestInfo = hasToken ? `Token剩余: ${rateLimitRemaining}` : `未认证剩余: ${rateLimitRemaining}`;
        updateApiStatus('success', `✅ 数据实时更新 · ${hasToken ? '🔑 已认证' : '🔓 未认证'} | ${new Date().toLocaleTimeString()}`);

        // ========== 6. 启动自动刷新（仅在首次成功后启动） ==========
        if (!refreshTimer) {
            startAutoRefresh();
        }

    } catch (error) {
        console.error('❌ GitHub API错误:', error);

        // 错误处理策略
        if (error.message.includes('Rate Limit') || error.message.includes('rate')) {
            updateApiStatus('warning', `⏳ GitHub API限速中... 使用缓存或默认值`);

            // 尝试使用过期缓存
            if (cachedData) {
                const { data } = JSON.parse(cachedData);
                applyGitHubData(data);
                updateApiStatus('success', `⚠️ 使用过期缓存（API限速中）`);
            } else {
                setFallbackData();
                updateApiStatus('error', `⚠️ API限速 + 无缓存 | 显示静态数据`);
            }
        } else if (error.name === 'TimeoutError') {
            updateApiStatus('error', `⏱️ 请求超时 | 网络可能较慢`);
            setFallbackData();
        } else {
            updateApiStatus('error', `❌ 加载失败: ${error.message}（使用默认值显示）`);
            setFallbackData();
        }
    } finally {
        isFetching = false;
    }
}

// ========== 从 Events API 获取贡献数据 ==========
async function fetchContributionsFromEvents(eventsApiUrl) {
    try {
        const response = await fetchWithTimeout(eventsApiUrl, 5000);
        if (!response.ok) return null;

        const events = await response.json();
        if (!events || !Array.isArray(events)) return null;

        // 统计 PushEvent 数量作为"近期贡献"估算
        const pushEvents = events.filter(e => e.type === 'PushEvent').length;
        const createEvents = events.filter(e => e.type === 'CreateEvent').length;
        const total = pushEvents + createEvents;

        return Math.max(total, 0);
    } catch (e) {
        return null;
    }
}

// ========== 从 GraphQL API 获取精确贡献数据（需要 Token） ==========
async function fetchContributionsGraphQL(graphqlUrl, token) {
    if (!token) return null;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(graphqlUrl, {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'User-Agent': 'PersonalWebsite/1.0'
            },
            body: JSON.stringify({
                query: `query {
                    user(login: "${GITHUB_USERNAME}") {
                        contributionsCollection {
                            contributionCalendar {
                                totalContributions
                            }
                        }
                    }
                }`
            })
        });
        clearTimeout(timeoutId);
        if (!response.ok) return null;

        const result = await response.json();
        const total = result?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;
        return total || null;
    } catch (e) {
        return null;
    }
}

// 带超时的fetch封装（支持自定义headers和认证）
async function fetchWithTimeout(url, timeout = 5000, customHeaders = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // 构建请求头
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'PersonalWebsite/1.0',
        ...customHeaders
    };

    // 如果有Token，添加到请求头
    const token = getGitHubToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            signal: controller.signal,
            headers
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error(`TimeoutError: 请求超时 (${timeout}ms)`);
        }
        throw error;
    }
}

// 后台静默刷新（用于更新缓存）
async function silentRefresh(userApiUrl, reposApiUrl, eventsApiUrl, graphqlUrl, token, statusUpdater) {
    try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 延迟2秒

        const [userData, reposData] = await Promise.all([
            fetchWithTimeout(userApiUrl).then(r => r.ok ? r.json() : null),
            fetchWithTimeout(reposApiUrl).then(r => r.ok ? r.json() : null)
        ]);

        if (userData) {
            // 静默获取贡献数据
            let contributions = null;
            try {
                if (token) {
                    contributions = await fetchContributionsGraphQL(graphqlUrl, token);
                } else {
                    contributions = await fetchContributionsFromEvents(eventsApiUrl);
                }
            } catch(e) {}

            const data = {
                userData,
                repos: reposData || [],
                contributions,
                fetchedAt: new Date().toISOString()
            };

            // 更新缓存
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data
            }));
            if (contributions !== null) {
                localStorage.setItem(`github_contribs_${GITHUB_USERNAME}`, JSON.stringify({
                    timestamp: Date.now(),
                    contribs: contributions
                }));
            }

            // 更新UI（如果用户还在页面）
            applyGitHubData(data);
            if (statusUpdater) {
                statusUpdater('success', `✅ 后台刷新成功 · ${new Date().toLocaleTimeString()}`);
            }
        }
    } catch (error) {
        console.warn('后台刷新失败（不影响用户体验）:', error.message);
    }
}

// 应用GitHub数据到DOM
function applyGitHubData(data) {
    const { userData, repos, contributions } = data;

    // 更新Hero区域统计
    if (userData) {
        updateElement('hero-repos', userData.public_repos);
        updateElement('hero-followers', userData.followers);

        // 使用真实贡献数据
        const contribCount = contributions !== null && contributions !== undefined
            ? contributions
            : (userData.public_repos > 5 ? '50+' : '10+');
        updateElement('hero-contributions', contribCount);

        // 更新"关于我"区域统计
        updateElement('stat-repos', userData.public_repos);
        updateElement('stat-followers', userData.followers);
        updateElement('stat-contributions', contribCount);
    }

    // 动态渲染项目卡片
    if (repos && repos.length > 0) {
        renderProjectCards(repos);
    }

    // 更新"上次刷新"时间
    lastUpdatedTime = Date.now();
    setTimeout(updateLastUpdatedDisplay, 100);
}

// 更新DOM元素内容
function updateElement(elementId, value) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = value;
        // 添加数字增长动画效果
        if (!isNaN(value)) {
            animateValue(element, 0, parseInt(value), 1500);
        }
    }
}

// 数字增长动画
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * (end - start) + start);
        
        element.textContent = current;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    
    window.requestAnimationFrame(step);
}

// 增强项目卡片（添加star数、语言、更新时间）
// ========== 从 API 数据动态渲染项目卡片 ==========
function renderProjectCards(reposData) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    // 过滤掉不需要显示的仓库（如个人主页仓库）
    const excludeRepos = new Set([`${GITHUB_USERNAME.toLowerCase()}`, '.github']);
    const repos = reposData.filter(r => !excludeRepos.has(r.name.toLowerCase()));

    // 按更新时间排序，最新的在前
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    // 限制最多显示 12 个
    const displayRepos = repos.slice(0, 12);

    // 清空容器（保留加载占位以作回退，但会被覆盖）
    grid.innerHTML = '';

    if (displayRepos.length === 0) {
        grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#999;padding:3rem;">暂无公开仓库</p>`;
        return;
    }

    displayRepos.forEach((repo, index) => {
        const repoName = repo.name;
        const isFork = repo.fork;
        const description = repo.description || '暂无描述';
        const language = repo.language || 'Unknown';
        const stars = repo.stargazers_count || 0;
        const forks = repo.forks_count || 0;
        const topics = repo.topics || [];
        const updatedAt = repo.updated_at;
        const repoUrl = repo.html_url;
        const defaultBranch = repo.default_branch || 'main';
        const repoEmoji = getRepoEmoji(repoName, language);

        // 构建技术标签
        const tags = [];
        if (language) tags.push(language);
        // 限制 topics 最多 3 个
        topics.slice(0, 3).forEach(t => {
            if (!tags.includes(t)) tags.push(t);
        });
        if (isFork) tags.push('Fork');
        tags.push(isFork ? 'Forked' : 'Public');

        const card = document.createElement('article');
        card.className = 'project-card';
        card.dataset.repo = repoName;
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder" aria-hidden="true">${repoEmoji}</div>
                <div class="project-meta-overlay" id="meta-${repoName}">
                    <span class="repo-language" style="color:${getLanguageColor(language)}">● ${language}</span>
                    <span class="repo-stars" data-stars="${stars}">⭐ ${formatNumber(stars)}</span>
                    <span class="repo-updated" data-updated="${updatedAt}">Updated: ${timeAgo(updatedAt)}</span>
                    ${forks > 0 ? `<span class="repo-forks" data-forks="${forks}">⑂ ${formatNumber(forks)}</span>` : ''}
                </div>
            </div>
            <div class="project-info">
                <h3>${escapeHtml(repoName)}</h3>
                <div class="project-description">
                    <p class="desc-main">${escapeHtml(description)}</p>
                    <p class="desc-details">
                        🧠 <strong>语言：</strong> ${language}<br>
                        📦 <strong>默认分支：</strong> ${defaultBranch}<br>
                        🔄 <strong>更新于：</strong> ${timeAgo(updatedAt)}
                    </p>
                </div>
                <div class="tech-tags">
                    ${tags.map(t => `<span>${escapeHtml(t)}</span>`).join('')}
                </div>
                <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link">
                    查看源码 <span aria-hidden="true">→</span>
                </a>
            </div>
        `;

        // 添加滚动动画观察
        card.classList.add('scroll-reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(card);

        grid.appendChild(card);
    });
}

// 根据仓库名和语言选择 Emoji 图标
function getRepoEmoji(repoName, language) {
    const name = repoName.toLowerCase();

    // 关键词匹配
    if (name.includes('operating') || name.includes('os')) return '💻';
    if (name.includes('database') || name.includes('db') || name.includes('sql')) return '🗄️';
    if (name.includes('note') || name.includes('learn') || name.includes('study') || name.includes('tutorial')) return '📚';
    if (name.includes('algorithm') || name.includes('data-struct')) return '🧮';
    if (name.includes('web') || name.includes('site') || name.includes('page') || name.includes('html')) return '🌐';
    if (name.includes('react') || name.includes('vue') || name.includes('angular') || name.includes('frontend')) return '⚛️';
    if (name.includes('api') || name.includes('backend') || name.includes('server')) return '⚙️';
    if (name.includes('python') || name.includes('script') || name.includes('tool')) return '🔧';
    if (name.includes('game') || name.includes('demo') || name.includes('playground')) return '🎮';
    if (name.includes('config') || name.includes('dotfile') || name.includes('rc')) return '⚙️';
    if (name.includes('test') || name.includes('spec') || name.includes('e2e')) return '🧪';
    if (name.includes('docker') || name.includes('k8s') || name.includes('deploy')) return '🐳';
    if (name.includes('blog') || name.includes('doc') || name.includes('wiki')) return '📝';
    if (name.includes('Yxy')) return '🎉';

    // 语言匹配
    const langLower = (language || '').toLowerCase();
    if (langLower === 'html' || langLower === 'css' || langLower === 'javascript' || langLower === 'typescript') return '🌐';
    if (langLower === 'python') return '🐍';
    if (langLower === 'java') return '☕';
    if (langLower === 'go') return '🔵';
    if (langLower === 'rust') return '🦀';
    if (langLower === 'c' || langLower === 'c++' || langLower === 'cpp') return '⚡';
    if (langLower === 'markdown') return '📝';

    return '📁'; // 默认
}

// HTML 转义（防止 XSS）
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 格式化数字（如 1200 -> 1.2k）
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
}

// 时间相对显示（如 "3天前"）
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    const intervals = [
        { label: '年', seconds: 31536000 },
        { label: '月', seconds: 2592000 },
        { label: '周', seconds: 604800 },
        { label: '天', seconds: 86400 },
        { label: '小时', seconds: 3600 },
        { label: '分钟', seconds: 60 }
    ];
    
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count}${interval.label}前`;
        }
    }
    
    return '刚刚';
}

// 获取编程语言颜色
function getLanguageColor(language) {
    const colors = {
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'TypeScript': '#2b7489',
        'Markdown': '#083fa1',
        'C': '#555555',
        'C++': '#f34b7d',
        'Go': '#00ADD8',
        'Rust': '#dea584'
    };
    
    return colors[language] || '#555';
}

// Fallback数据（当API失败时使用）
function setFallbackData() {
    const fallbackData = {
        repos: 3,
        followers: 5,
        contributions: 31
    };

    setTimeout(() => {
        updateElement('hero-repos', fallbackData.repos);
        updateElement('hero-followers', fallbackData.followers);
        updateElement('stat-repos', fallbackData.repos);
        updateElement('stat-followers', fallbackData.followers);
        updateElement('stat-contributions', fallbackData.contributions);
    }, 500);

    // 渲染离线版项目卡片
    const grid = document.getElementById('projects-grid');
    if (grid) {
        renderFallbackProjects(grid);
    }
}

// API 失败时渲染 fallback 项目卡片
function renderFallbackProjects(grid) {
    const fallbackRepos = [
        {
            name: 'Yxy',
            description: 'Web开发实验场 — HTML5语义化标签、CSS3动画效果、响应式布局',
            language: 'HTML',
            stargazers_count: 0,
            forks_count: 0,
            updated_at: new Date().toISOString(),
            html_url: 'https://github.com/DUZ1287/Yxy',
            topics: ['HTML5', 'CSS3'],
            default_branch: 'main',
            fork: false
        },
        {
            name: 'Operating-System',
            description: '操作系统原理知识图谱 — 进程调度、内存管理、文件系统',
            language: 'Markdown',
            stargazers_count: 0,
            forks_count: 0,
            updated_at: new Date().toISOString(),
            html_url: 'https://github.com/DUZ1287/Operating-System',
            topics: ['操作系统', '进程管理'],
            default_branch: 'main',
            fork: false
        },
        {
            name: 'Principles-of-Database',
            description: '数据库系统原理精要 — 关系代数、SQL进阶、事务ACID',
            language: 'Markdown',
            stargazers_count: 0,
            forks_count: 0,
            updated_at: new Date().toISOString(),
            html_url: 'https://github.com/DUZ1287/Principles-of-Database',
            topics: ['数据库', 'SQL'],
            default_branch: 'main',
            fork: false
        }
    ];
    renderProjectCards(fallbackRepos);
}

// ========== 暗色模式切换系统 ==========
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (!themeToggle) return;
    
    // 检查本地存储的主题偏好
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 应用保存的主题或系统偏好
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', '切换到亮色模式');
    }
    
    // 切换主题事件
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.textContent = '🌙';
            themeToggle.setAttribute('aria-label', '切换到暗色模式');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
            themeToggle.setAttribute('aria-label', '切换到亮色模式');
            localStorage.setItem('theme', 'dark');
        }
        
        // 添加切换动画反馈
        themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
    
    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '☀️';
            } else {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.textContent = '🌙';
            }
        }
    });
}

// ========== 性能优化：精细化 will-change 控制 ==========
(function optimizePerformance() {
    // 仅在支持硬件加速的设备上启用will-change
    if ('CSS' in window && CSS.supports('will-change', 'transform')) {
        // 检测是否为移动设备
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // 移动设备：减少装饰元素以提升性能
            const decorations = document.querySelector('.decorations');
            if (decorations) {
                // 隐藏部分装饰元素
                const clouds = decorations.querySelectorAll('.cloud');
                clouds.forEach((cloud, index) => {
                    if (index > 1) cloud.style.display = 'none';
                });
                
                const smoke = decorations.querySelector('.smoke');
                if (smoke) smoke.style.display = 'none';
            }
            
            // 禁用粒子背景（移动端性能考虑）
            const particlesContainer = document.getElementById('particles-js');
            if (particlesContainer) {
                particlesContainer.style.display = 'none';
            }
        }
    }
    
    // 图片懒加载增强（如果浏览器不支持原生lazy loading）
    if ('loading' in HTMLImageElement.prototype === false) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
})();

// ========== 邮箱保护与显示（防爬虫） ==========
function initEmailProtection() {
    const emailLink = document.getElementById('email-link');
    const emailDisplay = document.getElementById('email-display');

    if (emailLink && emailDisplay) {
        setTimeout(() => {
            const user = emailLink.dataset.user;
            const domain = emailLink.dataset.domain;
            emailDisplay.textContent = `${user}@${domain}`;
            emailLink.href = `mailto:${user}@${domain}?subject=来自个人网站的问候&body=你好！`;
        }, 2000);

        emailLink.addEventListener('mouseenter', function() {
            const user = this.dataset.user;
            const domain = this.dataset.domain;
            emailDisplay.textContent = `${user}@${domain}`;
            this.href = `mailto:${user}@${domain}?subject=来自个人网站的问候&body=你好！`;
        });

        emailLink.addEventListener('click', function(e) {
            const user = this.dataset.user;
            const domain = this.dataset.domain;
            this.href = `mailto:${user}@${domain}?subject=来自个人网站的问候&body=你好！`;
        });
    }
}

// ========== 进度条Fallback：无JS时自动填充 ==========
// 在CSS中已设置初始width:0%，此脚本确保JS加载后触发动画
window.addEventListener('load', function() {
    // 如果页面加载完成但进度条仍未动画，强制触发
    setTimeout(() => {
        document.querySelectorAll('.skill-progress').forEach(progress => {
            if (progress.style.width === '0%' || progress.style.width === '') {
                const targetWidth = progress.getAttribute('data-width');
                if (targetWidth) {
                    progress.style.width = targetWidth;
                }
            }
        });
    }, 100);
});

// ========== 设置面板初始化 ==========
function initSettingsPanel() {
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsOverlay = document.getElementById('settings-overlay');
    const settingsCloseBtn = document.getElementById('settings-close-btn');
    const tokenInput = document.getElementById('github-token-input');
    const tokenSaveBtn = document.getElementById('token-save-btn');
    const tokenClearBtn = document.getElementById('token-clear-btn');
    const tokenVisibilityToggle = document.getElementById('token-visibility-toggle');
    const tokenStatus = document.getElementById('token-status');

    if (!settingsToggle || !settingsOverlay) return;

    // 加载已保存的Token
    const savedToken = getGitHubToken();
    if (tokenInput && savedToken) {
        tokenInput.value = savedToken;
        if (tokenStatus) {
            tokenStatus.textContent = '✅ 已配置 Token（未显示完整）';
        }
    }

    // 打开面板
    settingsToggle.addEventListener('click', () => {
        settingsOverlay.classList.add('active');
        if (tokenInput) {
            tokenInput.value = getGitHubToken() ? '••••••••' + getGitHubToken().slice(-4) : '';
        }
        if (tokenInput) setTimeout(() => tokenInput.focus(), 100);
    });

    // 关闭面板
    function closeSettings() {
        settingsOverlay.classList.remove('active');
    }

    if (settingsCloseBtn) {
        settingsCloseBtn.addEventListener('click', closeSettings);
    }

    // 点击遮罩关闭
    settingsOverlay.addEventListener('click', (e) => {
        if (e.target === settingsOverlay) closeSettings();
    });

    // ESC 关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsOverlay.classList.contains('active')) {
            closeSettings();
        }
    });

    // 切换Token可见性
    if (tokenVisibilityToggle && tokenInput) {
        tokenVisibilityToggle.addEventListener('click', () => {
            const isPassword = tokenInput.type === 'password';
            tokenInput.type = isPassword ? 'text' : 'password';
            tokenVisibilityToggle.textContent = isPassword ? '🙈' : '👁️';
        });
    }

    // 保存Token
    if (tokenSaveBtn && tokenInput) {
        tokenSaveBtn.addEventListener('click', () => {
            const token = tokenInput.value.trim();
            if (token && token.length > 10) {
                saveGitHubToken(token);
                if (tokenStatus) {
                    tokenStatus.textContent = '✅ Token 已保存，正在刷新数据...';
                    tokenStatus.className = 'token-status';
                }
                closeSettings();
            } else if (token && token.length <= 10) {
                if (tokenStatus) {
                    tokenStatus.textContent = '❌ Token 格式不正确，请检查';
                    tokenStatus.className = 'token-status error';
                }
            } else {
                if (tokenStatus) {
                    tokenStatus.textContent = '请在输入框中粘贴 Token';
                    tokenStatus.className = 'token-status error';
                }
            }
        });
    }

    // 清除Token
    if (tokenClearBtn) {
        tokenClearBtn.addEventListener('click', () => {
            clearGitHubToken();
            if (tokenInput) tokenInput.value = '';
            if (tokenStatus) {
                tokenStatus.textContent = '✅ Token 已清除';
                tokenStatus.className = 'token-status';
            }
            closeSettings();
        });
    }
}

// ========== 手动刷新按钮 ==========
function initRefreshButton() {
    const refreshBtn = document.getElementById('refresh-btn');
    const autoRefreshIndicator = document.getElementById('auto-refresh-indicator');

    if (!refreshBtn) return;

    refreshBtn.addEventListener('click', async () => {
        // 禁用按钮，添加加载状态
        refreshBtn.disabled = true;
        refreshBtn.classList.add('loading');
        refreshBtn.innerHTML = `🔄 刷新中...`;

        // 清除缓存强制刷新
        localStorage.removeItem(CACHE_KEY);

        await fetchGitHubData();

        // 恢复按钮
        refreshBtn.disabled = false;
        refreshBtn.classList.remove('loading');
        refreshBtn.innerHTML = `🔄 手动刷新`;
    });

    // 更新自动刷新指示器
    if (autoRefreshIndicator) {
        // 定期检查刷新状态
        setInterval(() => {
            if (refreshTimer) {
                autoRefreshIndicator.textContent = '⏰ 自动刷新已开启（每5分钟）';
                autoRefreshIndicator.className = 'auto-refresh-indicator';
            }
        }, 10000);
    }
}
