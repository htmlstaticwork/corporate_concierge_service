document.addEventListener('DOMContentLoaded', () => {
    // --- THEME MANAGEMENT ---
    const themeToggle = document.querySelectorAll('.theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    themeToggle.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    function updateThemeIcons(theme) {
        document.querySelectorAll('.sun-icon').forEach(icon => {
            icon.style.display = theme === 'light' ? 'none' : 'block';
        });
        document.querySelectorAll('.moon-icon').forEach(icon => {
            icon.style.display = theme === 'light' ? 'block' : 'none';
        });
    }

    // --- RTL MANAGEMENT ---
    const rtlToggle = document.querySelectorAll('.rtl-toggle');
    const savedDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);

    rtlToggle.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            document.documentElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateRTLStyles(newDir);
        });
    });

    function updateRTLStyles(dir) {
        // Any specific JS logic for RTL inversion can go here
    }

    // --- SIDEBAR MENU ---
    const hamburger = document.querySelector('.hamburger-btn');
    const sidebar = document.querySelector('.sidebar-nav');
    const scrim = document.querySelector('.sidebar-scrim');
    const closeBtn = document.querySelector('.sidebar-close');

    if (hamburger && sidebar && scrim) {
        hamburger.addEventListener('click', () => {
            const isOpen = sidebar.classList.contains('open');
            sidebar.classList.toggle('open');
            scrim.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', !isOpen);
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });

        [closeBtn, scrim].forEach(el => {
            if (el) {
                el.addEventListener('click', () => {
                    sidebar.classList.remove('open');
                    scrim.classList.remove('open');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                scrim.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // --- INTERSECTION OBSERVER FOR ANIMATIONS ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // For reveal class animation start
                if(entry.target.classList.contains('reveal')) {
                    entry.target.style.opacity = '1';
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.curtain-reveal, .reveal, .fade-slide-up').forEach(el => {
        observer.observe(el);
    });

    // --- STATS COUNTER ---
    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.ceil(current);
            }
        }, 16);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statEl = entry.target.querySelector('.stat-value');
                if (statEl) countUp(statEl);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });

    // --- COPYRIGHT YEAR ---
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});
