// FUNDÉCORS 网站交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 淘宝下单功能
    window.openTaobao = function() {
        // 这里可以替换为实际的淘宝店铺链接
        const taobaoUrl = 'https://shop.m.taobao.com/shop/srp.htm?q=fundecors+电阻';
        window.open(taobaoUrl, '_blank');
    };
    
    // 下载规格书功能
    window.downloadSpec = function(series) {
        // 模拟下载功能
        const specs = {
            'FTH': 'FTH系列大功率厚膜电阻规格书.pdf',
            'FTP': 'FTP系列精密厚膜电阻规格书.pdf',
            'FHV': 'FHV系列高压厚膜电阻规格书.pdf'
        };
        
        // 创建提示信息
        const message = `正在下载: ${specs[series]}\n\n如需更多详细规格信息，请联系客服！`;
        
        // 显示提示（可以用更美观的弹窗替代）
        if (confirm(message)) {
            // 实际项目中这里应该是真实的下载链接
            console.log(`下载 ${specs[series]}`);
            alert('规格书下载功能已启动！如有需要请联系客服获取完整版。');
        }
    };
    
    // 导航链接平滑滚动
    document.addEventListener('DOMContentLoaded', function() {
        // 轮播图功能
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        // 轮播图自动播放
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        // 每5秒切换一次
        setInterval(nextSlide, 5000);

        // 点击指示点切换
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
        
        // 平滑滚动功能
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // 如果是页面内链接，进行平滑滚动
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // 更新活动链接状态
                        navLinks.forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                    }
                }
                // 如果是页面间链接，直接跳转
                else {
                    // 无需处理，浏览器会自动跳转
                }
            });
        });
        
        // 滚动时更新活动链接
        window.addEventListener('scroll', function() {
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
        
        // 语言切换功能
        let currentLang = localStorage.getItem('selectedLanguage') || 'zh';
        
        function switchLanguage(lang) {
            // 更新当前语言
            currentLang = lang;
            localStorage.setItem('selectedLanguage', lang);
            
            // 更新语言按钮状态
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-lang') === lang) {
                    btn.classList.add('active');
                }
            });
            
            // 更新所有带有data-zh和data-en属性的元素
            document.querySelectorAll('[data-zh][data-en]').forEach(element => {
                if (lang === 'zh') {
                    element.textContent = element.getAttribute('data-zh');
                } else {
                    element.textContent = element.getAttribute('data-en');
                }
            });
        }
        
        // 绑定语言切换按钮事件
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                switchLanguage(this.getAttribute('data-lang'));
            });
        });
        
        // 初始化语言
        switchLanguage(currentLang);
    });
    // 轮播图功能
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // 轮播图自动播放
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // 每5秒切换一次
    setInterval(nextSlide, 5000);

    // 点击指示点切换
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // 移动端菜单切换
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // 导航菜单激活状态
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 产品卡片悬停效果
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 页面滚动时的导航栏效果
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header) {
            if (scrollTop > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'transparent';
                header.style.backdropFilter = 'none';
            }
        }
        
        lastScrollTop = scrollTop;
    });

    console.log('FundéCORS 网站已加载完成');
});