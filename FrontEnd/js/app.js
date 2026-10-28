document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // Storage & State Initialization
    // -------------------------------------------------------------


    // Initialize history & stats
    let scanHistory = JSON.parse(localStorage.getItem('cyberGuard_history')) || [];
    let totalAnalyzed = parseInt(localStorage.getItem('cyberGuard_analyzed')) || scanHistory.length;
    let totalIdentified = parseInt(localStorage.getItem('cyberGuard_identified')) || scanHistory.filter(h => h.isThreat).length;

    // Current Session
    let currentUser = JSON.parse(sessionStorage.getItem('cyberGuard_user')) || null;
    let currentTheme = localStorage.getItem('cyberGuard_theme') || 'light';

    // -------------------------------------------------------------
    // DOM Elements
    // -------------------------------------------------------------
    const htmlElement = document.documentElement;
    const navbar = document.getElementById('navbar');
    const footer = document.getElementById('footer');
    const faqSection = document.getElementById('faq-section');
    const views = document.querySelectorAll('.view-section');
    const navLinks = document.querySelectorAll('.nav-link[data-target], .nav-card[data-target]');
    const logoHome = document.getElementById('logo-home');

    // Theme Elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const authThemeToggleBtn = document.getElementById('auth-theme-toggle');
    const authThemeIcon = document.getElementById('auth-theme-icon');

    // Auth Elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const guestBtn = document.getElementById('guest-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userBadge = document.getElementById('user-badge');
    const adminNavItem = document.getElementById('admin-nav-item');

    // Modals
    const loginPromptModal = document.getElementById('login-prompt-modal');
    const promptCloseBtn = document.getElementById('prompt-close-btn');
    const promptGotoLoginBtn = document.getElementById('prompt-goto-login-btn');
    const promptGotoRegisterBtn = document.getElementById('prompt-goto-register-btn');

    const regEmailModal = document.getElementById('reg-email-modal');
    const regEmailCloseBtn = document.getElementById('reg-email-close-btn');
    const regEmailTarget = document.getElementById('reg-email-target');
    // const regEmailContinueBtn = document.getElementById('reg-email-continue-btn');

    // Settings Modal Elements
    const settingsBtn = document.getElementById('settings-btn');
    const profileModal = document.getElementById('profile-modal');
    const profileCloseBtn = document.getElementById('profile-close-btn');
    const profileName = document.getElementById('profile-name');
    const profileUsername = document.getElementById('profile-username');
    const profileEmail = document.getElementById('profile-email');
    const profileRole = document.getElementById('profile-role');
    const profileAvatar = document.getElementById('profile-avatar');
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const forgotPasswordBtn = document.getElementById('forgot-password-btn');
    const registerTerms = document.getElementById('reg-terms');
    const registerTncLink = document.getElementById('register-tnc-link');
    const registerTncModal = document.getElementById('register-tnc-modal');
    const registerTncCloseBtn = document.getElementById('register-tnc-close-btn');
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    const forgotPasswordCloseBtn = document.getElementById('forgot-password-close-btn');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const resetPasswordModal = document.getElementById('reset-password-modal');
    const resetPasswordCloseBtn = document.getElementById('reset-password-close-btn');
    const resetPasswordForm = document.getElementById('reset-password-form');
    const settingsResetPasswordBtn = document.getElementById('settings-reset-password-btn');
    const settingsResetPasswordForm = document.getElementById('settings-reset-password-form');
    const settingsResetPasswordSubmit = document.getElementById('settings-reset-password-submit');
    const settingsHistoryBtn = document.getElementById('settings-history-btn');

    // Settings Tabs
    const tabSettingsAccount = document.getElementById('tab-settings-account');
    const tabSettingsContact = document.getElementById('tab-settings-contact');
    const settingsAccountSec = document.getElementById('settings-account-sec');
    const settingsContactSec = document.getElementById('settings-contact-sec');

    // Analysis Elements
    const analyzeBtns = document.querySelectorAll('.analyze-btn');
    const ocrAnalyzeBtns = document.querySelectorAll('.ocr-analyze-btn');
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('ransomware-file');
    const fileNameDisplay = document.getElementById('file-name');

    // History Elements
    const historyTableBody = document.getElementById('history-table-body');
    const historyEmpty = document.getElementById('history-empty');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    // Admin Elements
    const adminUserTableBody = document.getElementById('admin-user-table-body');
    const adminStatUsers = document.getElementById('admin-stat-users');
    const adminStatScans = document.getElementById('admin-stat-scans');
    const adminStatThreats = document.getElementById('admin-stat-threats');

    // Toast & Modal
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const modal = document.getElementById('result-modal');
    const reportModal = document.getElementById('report-modal');
    const reportCloseBtn = document.getElementById('report-close-btn');
    const reportTitle = document.getElementById('report-title');
    const reportTimestamp = document.getElementById('report-timestamp');
    const reportBody = document.getElementById('report-body');
    const reportIcon = document.getElementById('report-icon');
    const printReportBtn = document.getElementById('print-report-btn');
    const downloadReportBtn = document.getElementById('download-report-btn');
    const viewDetailedReportBtn = document.getElementById('view-detailed-report-btn');

    let currentLatestScan = null;
    let newlyRegisteredUsername = '';

    // -------------------------------------------------------------
    // Holographic Cyber Radar & Circuit Defense World Engine
    // -------------------------------------------------------------
    const canvas = document.getElementById('cyber-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Interactive Mouse Sonar Ping Waves
        const sonarPings = [];
        window.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.05) {
                sonarPings.push({
                    x: e.clientX,
                    y: e.clientY,
                    radius: 2,
                    maxRadius: 80 + Math.random() * 40,
                    alpha: 0.6
                });
            }
        });

        window.addEventListener('click', (e) => {
            sonarPings.push({
                x: e.clientX,
                y: e.clientY,
                radius: 5,
                maxRadius: 150,
                alpha: 0.95
            });
        });

        // Cyber Nodes & Target Reticles
        const nodeCount = 45;
        const nodes = [];
        const cyberLabels = ['SOC_NODE_01', 'FIREWALL_OK', 'IP_TRACE_STABLE', 'SYS_ENCRYPTED', 'PORT_8080', 'SHIELD_99.9%', 'DNS_VERIFIED'];

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 2,
                label: Math.random() < 0.3 ? cyberLabels[Math.floor(Math.random() * cyberLabels.length)] : null,
                pingAlpha: 0
            });
        }

        // Radar Sweep Parameters
        let radarAngle = 0;
        const radarSpeed = 0.012;

        function renderCyberRadarWorld() {
            ctx.clearRect(0, 0, width, height);

            const isDark = htmlElement.getAttribute('data-theme') === 'dark';
            const blueRgb = isDark ? '59, 130, 246' : '37, 99, 235';
            const cyanRgb = isDark ? '96, 165, 250' : '2, 132, 199';

            const centerX = width / 2;
            const centerY = height / 2;
            const maxRadarRadius = Math.max(width, height) * 0.7;

            // 1. Draw Concentric Cyber Radar Grid Rings
            ctx.lineWidth = 1;
            for (let r = 100; r < maxRadarRadius; r += 160) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${blueRgb}, ${isDark ? 0.08 : 0.06})`;
                ctx.stroke();
            }

            // Radar Axis Lines
            ctx.beginPath();
            ctx.moveTo(centerX - maxRadarRadius, centerY);
            ctx.lineTo(centerX + maxRadarRadius, centerY);
            ctx.moveTo(centerX, centerY - maxRadarRadius);
            ctx.lineTo(centerX, centerY + maxRadarRadius);
            ctx.strokeStyle = `rgba(${blueRgb}, ${isDark ? 0.07 : 0.05})`;
            ctx.stroke();

            // 2. Draw 360° Rotating Cyber Radar Sweeper Beam
            radarAngle += radarSpeed;
            if (radarAngle >= Math.PI * 2) radarAngle = 0;

            const sweepGradient = ctx.createConicGradient(radarAngle, centerX, centerY);
            sweepGradient.addColorStop(0, `rgba(${blueRgb}, ${isDark ? 0.22 : 0.16})`);
            sweepGradient.addColorStop(0.12, `rgba(${cyanRgb}, ${isDark ? 0.08 : 0.04})`);
            sweepGradient.addColorStop(0.25, `rgba(${blueRgb}, 0)`);
            sweepGradient.addColorStop(1, `rgba(${blueRgb}, 0)`);

            ctx.beginPath();
            ctx.arc(centerX, centerY, maxRadarRadius, 0, Math.PI * 2);
            ctx.fillStyle = sweepGradient;
            ctx.fill();

            // Radar Sweeper Leading Edge Line
            const sweepX = centerX + Math.cos(radarAngle) * maxRadarRadius;
            const sweepY = centerY + Math.sin(radarAngle) * maxRadarRadius;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(sweepX, sweepY);
            ctx.strokeStyle = `rgba(${cyanRgb}, ${isDark ? 0.6 : 0.45})`;
            ctx.lineWidth = 1.8;
            ctx.stroke();

            // 3. Render Cyber Nodes & Crosshairs
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                n.x += n.vx;
                n.y += n.vy;

                if (n.x < 0 || n.x > width) n.vx *= -1;
                if (n.y < 0 || n.y > height) n.vy *= -1;

                const dx = n.x - centerX;
                const dy = n.y - centerY;
                let nodeAngle = Math.atan2(dy, dx);
                if (nodeAngle < 0) nodeAngle += Math.PI * 2;

                const angleDiff = Math.abs(radarAngle - nodeAngle);
                if (angleDiff < 0.08) {
                    n.pingAlpha = 1.0;
                } else {
                    n.pingAlpha *= 0.96;
                }

                ctx.beginPath();
                ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${blueRgb}, ${0.4 + n.pingAlpha * 0.5})`;
                ctx.fill();

                if (n.pingAlpha > 0.05) {
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, n.size * 3 + n.pingAlpha * 12, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(${cyanRgb}, ${n.pingAlpha * 0.6})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.rect(n.x - 8, n.y - 8, 16, 16);
                    ctx.strokeStyle = `rgba(${cyanRgb}, ${n.pingAlpha * 0.4})`;
                    ctx.stroke();
                }

                if (n.label) {
                    ctx.font = '10px monospace';
                    ctx.fillStyle = `rgba(${blueRgb}, ${0.45 + n.pingAlpha * 0.45})`;
                    ctx.fillText(n.label, n.x + 10, n.y + 3);
                }
            }

            // 4. Render Connecting Circuit Vector Pathways
            const maxConnDist = 170;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const n1 = nodes[i];
                    const n2 = nodes[j];
                    const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

                    if (dist < maxConnDist) {
                        const alpha = (1 - dist / maxConnDist) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(n1.x, n1.y);
                        const midX = (n1.x + n2.x) / 2;
                        ctx.lineTo(midX, n1.y);
                        ctx.lineTo(midX, n2.y);
                        ctx.lineTo(n2.x, n2.y);

                        ctx.strokeStyle = `rgba(${blueRgb}, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // 5. Render Interactive Mouse Sonar Ping Waves
            for (let i = sonarPings.length - 1; i >= 0; i--) {
                const ping = sonarPings[i];
                ping.radius += 2.5;
                ping.alpha *= 0.96;

                if (ping.alpha <= 0.01 || ping.radius >= ping.maxRadius) {
                    sonarPings.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(ping.x, ping.y, ping.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(${cyanRgb}, ${ping.alpha})`;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            }

            requestAnimationFrame(renderCyberRadarWorld);
        }

        renderCyberRadarWorld();
    }

    // -------------------------------------------------------------
    // Theme Engine
    // -------------------------------------------------------------
    function applyTheme(theme) {
        currentTheme = theme;
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('cyberGuard_theme', theme);

        const iconClass = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
        if (themeIcon) themeIcon.className = iconClass;
        if (authThemeIcon) authThemeIcon.className = iconClass;
    }

    [themeToggleBtn, authThemeToggleBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                applyTheme(currentTheme === 'light' ? 'dark' : 'light');
            });
        }
    });

    // -------------------------------------------------------------
    // View Navigation & Guest Access Guard
    // -------------------------------------------------------------
    function showView(targetId) {
        // GUEST PERMISSION RULES:
        // 'website-view' IS ALLOWED FOR GUEST!
        // 'email-view', 'sms-view', 'ransomware-view' ARE RESTRICTED FOR GUEST.
        const restrictedForGuest = ['email-view', 'sms-view', 'ransomware-view', 'ocr-view', 'file-view'];

        if (currentUser && currentUser.role === 'guest' && restrictedForGuest.includes(targetId)) {
            showLoginPromptModal();
            return;
        }

        // Admin Guard
        if (targetId === 'admin-view' && (!currentUser || currentUser.role !== 'admin')) {
            showToast('Access Denied: Administrator privileges required.', true);
            showView('dashboard');
            return;
        }

        views.forEach(view => {
            if (view.id === targetId) {
                view.classList.remove('hidden');
                view.classList.add('active');
            } else {
                view.classList.add('hidden');
                view.classList.remove('active');
            }
        });

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Refresh dynamic view contents
        if (targetId === 'history-view') renderHistoryUI();
        if (targetId === 'admin-view') renderAdminUI();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showLoginPromptModal() {
        if (loginPromptModal) loginPromptModal.classList.remove('hidden');
    }

    if (promptCloseBtn) {
        promptCloseBtn.addEventListener('click', () => {
            loginPromptModal.classList.add('hidden');
        });
    }

    if (promptGotoLoginBtn) {
        promptGotoLoginBtn.addEventListener('click', () => {
            loginPromptModal.classList.add('hidden');
            showView('login-view');
            switchAuthTab('login');
        });
    }

    if (promptGotoRegisterBtn) {
        promptGotoRegisterBtn.addEventListener('click', () => {
            loginPromptModal.classList.add('hidden');
            showView('login-view');
            switchAuthTab('register');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            if (target) {
                if (!currentUser && target !== 'login-view') {
                    showView('login-view');
                } else {
                    showView(target);
                }
            }
        });
    });

    if (logoHome) {
        logoHome.addEventListener('click', () => {
            if (currentUser) showView('dashboard');
        });
    }

 // -------------------------------------------------------------
// Authentication & Registration Logic
// -------------------------------------------------------------

const API_BASE = window.location.protocol.startsWith('http') ? window.location.origin : 'http://127.0.0.1:5000';

// Keep guest mode frontend-only for now.
// Guest permissions can be changed later.

function normalizeBackendUser(user) {
    if (!user) return null;

    return {
        id: user.id,
        fullname: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        joined: user.created_at || new Date().toLocaleDateString()
    };
}


function switchAuthTab(tab) {
    if (tab === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');

        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');

        document.getElementById(
            'auth-subtitle'
        ).textContent =
            'Log in to access advanced cybersecurity threat scanners';

        if (newlyRegisteredUsername) {
            document.getElementById(
                'username'
            ).value = newlyRegisteredUsername;

            document.getElementById(
                'password'
            ).focus();
        }

    } else {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');

        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');

        document.getElementById(
            'auth-subtitle'
        ).textContent =
            'Create an account to start scanning digital assets for threats';
    }
}


tabLogin.addEventListener(
    'click',
    () => switchAuthTab('login')
);

tabRegister.addEventListener(
    'click',
    () => switchAuthTab('register')
);


// -------------------------------------------------------------
// REAL BACKEND LOGIN
// -------------------------------------------------------------

loginForm.addEventListener(
    'submit',
    async (e) => {
        e.preventDefault();

        const identifier = document
            .getElementById('username')
            .value
            .trim();

        const password = document
            .getElementById('password')
            .value;

        if (!identifier || !password) {
            alert(
                'Please enter your username/email and password.'
            );
            return;
        }

        try {
            showToast(
                'Signing in...',
                false,
                true
            );

            const response = await fetch(
                `${API_BASE}/auth/login`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    credentials: 'include',

                    body: JSON.stringify({
                        identifier,
                        password
                    })
                }
            );

            const data = await response.json();

            hideToast();

            if (!response.ok) {
                alert(
                    data.message ||
                    'Invalid login credentials.'
                );
                return;
            }

            currentUser = normalizeBackendUser(
                data.user
            );

            newlyRegisteredUsername = '';

            // Do NOT store password.
            // Store only non-sensitive UI state.
            sessionStorage.setItem(
                'cyberGuard_user',
                JSON.stringify(currentUser)
            );

            updateUserUI();

            showView('dashboard');

            showToast(
                `Welcome back, ${currentUser.fullname}!`
            );

            loginForm.reset();

        } catch (error) {
            hideToast();

            console.error(
                'Login error:',
                error
            );

            alert(
                'Unable to connect to the Cyber Defence backend.'
            );
        }
    }
);


// -------------------------------------------------------------
// REGISTRATION TERMS & CONDITIONS
// -------------------------------------------------------------

if (registerTncLink && registerTncModal) {
    registerTncLink.addEventListener('click', (event) => {
        event.preventDefault();
        registerTncModal.classList.remove('hidden');
    });
}

if (registerTncCloseBtn && registerTncModal) {
    registerTncCloseBtn.addEventListener('click', () => {
        registerTncModal.classList.add('hidden');
    });
}

if (registerTncModal) {
    registerTncModal.addEventListener('click', (event) => {
        if (event.target === registerTncModal) {
            registerTncModal.classList.add('hidden');
        }
    });
}


// -------------------------------------------------------------
// REAL BACKEND REGISTRATION + EMAIL OTP VERIFICATION
// -------------------------------------------------------------

registerForm.addEventListener(
    'submit',
    async (e) => {
        e.preventDefault();

        const fullname = document
            .getElementById('reg-fullname')
            .value
            .trim();

        const username = document
            .getElementById('reg-username')
            .value
            .trim();

        const email = document
            .getElementById('reg-email')
            .value
            .trim();

        const password = document
            .getElementById('reg-password')
            .value;

        if (registerTerms && !registerTerms.checked) {
            alert('Please agree to provide your information and accept the Terms & Conditions before creating your account.');
            return;
        }

        if (
            !fullname ||
            !username ||
            !email ||
            !password
        ) {
            alert(
                'Please fill in all registration fields.'
            );
            return;
        }

        try {
            showToast(
                'Creating your account...',
                false,
                true
            );

            const response = await fetch(
                `${API_BASE}/auth/register`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    credentials: 'include',

                    body: JSON.stringify({
                        name: fullname,
                        username: username,
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            hideToast();

            if (!response.ok) {
                alert(
                    data.message ||
                    'Registration failed.'
                );
                return;
            }

            newlyRegisteredUsername = username;

            currentUser = null;

            sessionStorage.removeItem(
                'cyberGuard_user'
            );

            updateUserUI();

            registerForm.reset();

            // Store the email temporarily for OTP verification
            window.registrationOTPEmail = email;

            // Show OTP modal
            if (regEmailTarget) {
                regEmailTarget.textContent = email;
            }

            if (regEmailModal) {
                regEmailModal.classList.remove(
                    'hidden'
                );
            }

            const otpInput =
                document.getElementById(
                    'reg-otp-input'
                );

            const otpMessage =
                document.getElementById(
                    'reg-otp-message'
                );

            if (otpInput) {
                otpInput.value = '';
                otpInput.focus();
            }

            if (otpMessage) {
                otpMessage.textContent =
                    'Verification code sent. Check your email.';
                otpMessage.style.color = '';
            }

        } catch (error) {
            hideToast();

            console.error(
                'Registration error:',
                error
            );

            alert(
                'Unable to connect to the Cyber Defence backend.'
            );
        }
    }
);

// -------------------------------------------------------------
// EMAIL OTP VERIFICATION
// -------------------------------------------------------------

const regOtpVerifyBtn =
    document.getElementById(
        'reg-otp-verify-btn'
    );

const regOtpResendBtn =
    document.getElementById(
        'reg-otp-resend-btn'
    );

const regOtpInput =
    document.getElementById(
        'reg-otp-input'
    );

const regOtpMessage =
    document.getElementById(
        'reg-otp-message'
    );


// -------------------------------------------------------------
// VERIFY OTP
// -------------------------------------------------------------

if (regOtpVerifyBtn) {

    regOtpVerifyBtn.addEventListener(
        'click',
        async () => {

            const email =
                window.registrationOTPEmail;

            const otp =
                regOtpInput
                    ? regOtpInput.value.trim()
                    : '';

            if (!email) {
                alert(
                    'Registration email is missing. Please register again.'
                );
                return;
            }

            if (!/^\d{6}$/.test(otp)) {

                if (regOtpMessage) {
                    regOtpMessage.textContent =
                        'Please enter a valid 6-digit OTP.';
                }

                return;
            }

            try {

                regOtpVerifyBtn.disabled = true;

                showToast(
                    'Verifying your email...',
                    false,
                    true
                );

                const response =
                    await fetch(
                        `${API_BASE}/auth/verify-otp`,
                        {
                            method: 'POST',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            credentials: 'include',

                            body: JSON.stringify({
                                email: email,
                                otp: otp
                            })
                        }
                    );

                const data =
                    await response.json();

                hideToast();

                if (!response.ok) {

                    if (regOtpMessage) {
                        regOtpMessage.textContent =
                            data.message ||
                            'OTP verification failed.';
                    }

                    regOtpVerifyBtn.disabled = false;

                    return;
                }

                if (regOtpMessage) {
                    regOtpMessage.textContent =
                        'Email verified successfully!';
                }

                // Close OTP modal
                setTimeout(() => {

                    if (regEmailModal) {
                        regEmailModal.classList.add(
                            'hidden'
                        );
                    }

                    // Move user to login
                    showView('login-view');

                    switchAuthTab('login');

                    // Pre-fill username
                    if (
                        newlyRegisteredUsername
                    ) {
                        const loginIdentifier =
                            document.getElementById(
                                'login-identifier'
                            );

                        if (loginIdentifier) {
                            loginIdentifier.value =
                                newlyRegisteredUsername;
                        }
                    }

                    alert(
                        'Email verified successfully. You can now log in.'
                    );

                    regOtpVerifyBtn.disabled =
                        false;

                }, 700);

            } catch (error) {

                hideToast();

                console.error(
                    'OTP verification error:',
                    error
                );

                if (regOtpMessage) {
                    regOtpMessage.textContent =
                        'Unable to connect to the backend.';
                }

                regOtpVerifyBtn.disabled = false;
            }
        }
    );
}


// -------------------------------------------------------------
// RESEND OTP
// -------------------------------------------------------------

if (regOtpResendBtn) {

    regOtpResendBtn.addEventListener(
        'click',
        async () => {

            const email =
                window.registrationOTPEmail;

            if (!email) {
                alert(
                    'Registration email is missing. Please register again.'
                );
                return;
            }

            try {

                regOtpResendBtn.disabled = true;

                showToast(
                    'Sending a new OTP...',
                    false,
                    true
                );

                const response =
                    await fetch(
                        `${API_BASE}/auth/resend-otp`,
                        {
                            method: 'POST',

                            headers: {
                                'Content-Type':
                                    'application/json'
                            },

                            credentials: 'include',

                            body: JSON.stringify({
                                email: email
                            })
                        }
                    );

                const data =
                    await response.json();

                hideToast();

                if (!response.ok) {

                    if (regOtpMessage) {
                        regOtpMessage.textContent =
                            data.message ||
                            'Unable to resend OTP.';
                    }

                    regOtpResendBtn.disabled =
                        false;

                    return;
                }

                if (regOtpMessage) {
                    regOtpMessage.textContent =
                        'A new OTP has been sent to your email.';
                }

                if (regOtpInput) {
                    regOtpInput.value = '';
                    regOtpInput.focus();
                }

                regOtpResendBtn.disabled =
                    false;

            } catch (error) {

                hideToast();

                console.error(
                    'Resend OTP error:',
                    error
                );

                if (regOtpMessage) {
                    regOtpMessage.textContent =
                        'Unable to connect to the backend.';
                }

                regOtpResendBtn.disabled =
                    false;
            }
        }
    );
}


function redirectToLogin() {
    if (regEmailModal) {
        regEmailModal.classList.add(
            'hidden'
        );
    }

    showView('login-view');

    switchAuthTab('login');

    showToast(
        'Registration complete! Please enter your password to sign in.'
    );
}


if (regEmailCloseBtn) {
    regEmailCloseBtn.addEventListener(
        'click',
        () => {
            regEmailModal.classList.add('hidden');
        }
    );
}

// -------------------------------------------------------------
// GUEST MODE
// -------------------------------------------------------------

guestBtn.addEventListener(
    'click',
    () => {

        const guestUser = {
            id: null,
            fullname: 'Guest User',
            username: 'Guest',
            email: 'guest@platform.local',
            role: 'guest',
            joined: new Date().toLocaleDateString()
        };

        currentUser = guestUser;

        sessionStorage.setItem(
            'cyberGuard_user',
            JSON.stringify(guestUser)
        );

        updateUserUI();

        showView('dashboard');

        showToast(
            'Logged in as Guest. You can test the Website URL Scanner!'
        );
    }
);


// -------------------------------------------------------------
// LOGOUT
// -------------------------------------------------------------

logoutBtn.addEventListener(
    'click',
    async (e) => {

        e.preventDefault();

        try {
            await fetch(
                `${API_BASE}/auth/logout`,
                {
                    method: 'POST',
                    credentials: 'include'
                }
            );

        } catch (error) {
            console.error(
                'Logout request failed:',
                error
            );
        }

        currentUser = null;

        sessionStorage.removeItem(
            'cyberGuard_user'
        );

        updateUserUI();

        showView('login-view');

        loginForm.reset();

        showToast(
            'Logged out successfully.'
        );
    }
);


// -------------------------------------------------------------
// UPDATE USER UI
// -------------------------------------------------------------

function updateUserUI() {

    if (currentUser) {

        navbar.classList.remove(
            'hidden'
        );

        footer.classList.remove(
            'hidden'
        );
        if (faqSection) faqSection.classList.remove('hidden');

        if (userBadge) userBadge.textContent =
            currentUser.username;

        if (
            currentUser.role === 'admin'
        ) {

            if (userBadge) userBadge.className =
                'badge-admin';

            adminNavItem.classList.remove(
                'hidden'
            );

        } else if (
            currentUser.role === 'guest'
        ) {

            if (userBadge) userBadge.className =
                'badge-user text-muted';

            if (userBadge) userBadge.textContent =
                'Guest';

            adminNavItem.classList.add(
                'hidden'
            );

        } else {

            if (userBadge) userBadge.className =
                'badge-user';

            adminNavItem.classList.add(
                'hidden'
            );
        }

    } else {

        navbar.classList.add(
            'hidden'
        );

        footer.classList.add(
            'hidden'
        );
        if (faqSection) faqSection.classList.add('hidden');
    }

    updateStatsUI();
}


// -------------------------------------------------------------
// RESTORE BACKEND SESSION ON PAGE LOAD
// -------------------------------------------------------------

async function restoreBackendSession() {

    try {

        const response = await fetch(
            `${API_BASE}/auth/me`,
            {
                method: 'GET',
                credentials: 'include'
            }
        );

        if (!response.ok) {
            return;
        }

        const data =
            await response.json();

        if (
            data.status === 'success' &&
            data.user
        ) {

            currentUser =
                normalizeBackendUser(
                    data.user
                );

            sessionStorage.setItem(
                'cyberGuard_user',
                JSON.stringify(currentUser)
            );

            updateUserUI();

            showView('dashboard');
        }

    } catch (error) {

        console.warn(
            'Backend session could not be restored:',
            error
        );
    }
}

    // -------------------------------------------------------------
    // Unified Settings Modal Logic
    // -------------------------------------------------------------
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            if (!currentUser) return;
            profileName.textContent = currentUser.fullname || currentUser.name || currentUser.username;
            profileUsername.textContent = currentUser.username;
            profileEmail.textContent = currentUser.email || 'N/A';
            profileRole.textContent = currentUser.role.toUpperCase();
            profileAvatar.textContent = (currentUser.fullname || currentUser.name || currentUser.username).charAt(0).toUpperCase();

            if (currentUser.role === 'guest') {
                deleteAccountBtn.classList.add('hidden');
            } else {
                deleteAccountBtn.classList.remove('hidden');
            }

            // Default to Tab 1
            switchSettingsTab('account');

            profileModal.classList.remove('hidden');
        });
    }

    function switchSettingsTab(tab) {
        if (tab === 'account') {
            tabSettingsAccount.classList.add('active');
            tabSettingsContact.classList.remove('active');
            settingsAccountSec.classList.remove('hidden');
            settingsContactSec.classList.add('hidden');
        } else {
            tabSettingsContact.classList.add('active');
            tabSettingsAccount.classList.remove('active');
            settingsContactSec.classList.remove('hidden');
            settingsAccountSec.classList.add('hidden');
        }
    }

    if (tabSettingsAccount) tabSettingsAccount.addEventListener('click', () => switchSettingsTab('account'));
    if (tabSettingsContact) tabSettingsContact.addEventListener('click', () => switchSettingsTab('contact'));

    if (settingsHistoryBtn) {
        settingsHistoryBtn.addEventListener('click', () => {
            profileModal.classList.add('hidden');
            showView('history-view');
        });
    }

    if (profileCloseBtn) {
        profileCloseBtn.addEventListener('click', () => {
            profileModal.classList.add('hidden');
        });
    }

    if (settingsResetPasswordBtn) {
        settingsResetPasswordBtn.addEventListener('click', () => {
            settingsResetPasswordForm?.classList.toggle('hidden');
        });
    }

    if (settingsResetPasswordSubmit) {
        settingsResetPasswordSubmit.addEventListener('click', async () => {
            const newPassword = document.getElementById('settings-new-password')?.value || '';
            const confirmPassword = document.getElementById('settings-confirm-password')?.value || '';
            if (newPassword.length < 6) return alert('Password must contain at least 6 characters.');
            if (newPassword !== confirmPassword) return alert('The passwords do not match.');
            try {
                const response = await fetch(`${API_BASE}/auth/change-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ password: newPassword })
                });
                const data = await response.json();
                if (!response.ok) return alert(data.message || 'Unable to update password.');
                document.getElementById('settings-new-password').value = '';
                document.getElementById('settings-confirm-password').value = '';
                settingsResetPasswordForm?.classList.add('hidden');
                alert('Password updated successfully.');
            } catch (error) {
                console.error('Settings password update error:', error);
                alert('Unable to connect to the Cyber Defence backend.');
            }
        });
    }

    if (forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', () => {
            forgotPasswordModal?.classList.remove('hidden');
            document.getElementById('forgot-password-email')?.focus();
        });
    }
    if (forgotPasswordCloseBtn) forgotPasswordCloseBtn.addEventListener('click', () => forgotPasswordModal?.classList.add('hidden'));
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('forgot-password-email').value.trim();
            try {
                const response = await fetch(`${API_BASE}/auth/forgot-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ email })
                });
                const data = await response.json();
                if (!response.ok) return alert(data.message || 'Unable to send reset link.');
                forgotPasswordModal?.classList.add('hidden');
                forgotPasswordForm.reset();
                alert(data.message);
            } catch (error) {
                console.error('Forgot password error:', error);
                alert('Unable to connect to the Cyber Defence backend.');
            }
        });
    }
    if (resetPasswordCloseBtn) resetPasswordCloseBtn.addEventListener('click', () => resetPasswordModal?.classList.add('hidden'));
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newPassword = document.getElementById('reset-password-new').value;
            const confirmPassword = document.getElementById('reset-password-confirm').value;
            const token = new URLSearchParams(window.location.search).get('reset_token');
            if (!token) return alert('This password reset link is missing or invalid.');
            if (newPassword.length < 6) return alert('Password must contain at least 6 characters.');
            if (newPassword !== confirmPassword) return alert('The passwords do not match.');
            try {
                const response = await fetch(`${API_BASE}/auth/reset-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ token, password: newPassword })
                });
                const data = await response.json();
                if (!response.ok) return alert(data.message || 'Unable to reset password.');
                resetPasswordModal?.classList.add('hidden');
                resetPasswordForm.reset();
                window.history.replaceState({}, document.title, window.location.pathname);
                alert('Password reset successfully. You can now sign in.');
                showView('login-view');
                switchAuthTab('login');
            } catch (error) {
                console.error('Reset password error:', error);
                alert('Unable to connect to the Cyber Defence backend.');
            }
        });
    }

    // Open the reset form automatically when the emailed link is visited.
    const initialResetToken = new URLSearchParams(window.location.search).get('reset_token');
    if (initialResetToken && resetPasswordModal) {
        resetPasswordModal.classList.remove('hidden');
    }

    deleteAccountBtn.addEventListener('click', async () => {
        if (currentUser.role === 'admin') {
            return alert('Primary System Admin account cannot be deleted.');
        }

        if (!confirm(`Are you sure you want to permanently delete your account (${currentUser.username})?`)) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/auth/delete-account`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await response.json();

            if (!response.ok) {
                return alert(data.message || 'Unable to delete your account.');
            }

            profileModal.classList.add('hidden');
            currentUser = null;
            sessionStorage.removeItem('cyberGuard_user');
            updateUserUI();
            showView('login-view');
            showToast('Your account has been deleted permanently.');
        } catch (error) {
            console.error('Delete account error:', error);
            alert('Unable to connect to the Cyber Defence backend.');
        }
    });

    // -------------------------------------------------------------
    // Drag & Drop File Handler for Ransomware
    // -------------------------------------------------------------
    if (dropZone && fileInput) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, e => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.add('drag-over'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.remove('drag-over'), false);
        });

        dropZone.addEventListener('drop', e => {
            handleFiles(e.dataTransfer.files);
        });

        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                fileNameDisplay.textContent = `Selected File: ${files[0].name} (${(files[0].size / 1024).toFixed(1)} KB)`;
            }
        }
    }
// -------------------------------------------------------------
// REAL BACKEND WEBSITE URL SCAN
// -------------------------------------------------------------

async function scanWebsiteUrl(url) {
    const response = await fetch(
        `${API_BASE}/scan/url`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                url: url
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || 'URL scan failed'
        );
    }

    return data;
}

// -------------------------------------------------------------
// REAL BACKEND EMAIL SCAN
// -------------------------------------------------------------

async function scanEmailContent(email) {
    const response = await fetch(
        `${API_BASE}/scan/email`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                email: email
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || 'Email scan failed'
        );
    }

    return data;
}

// -------------------------------------------------------------
// REAL BACKEND SMS SCAN
// -------------------------------------------------------------

async function scanSmsContent(message) {
    const response = await fetch(
        `${API_BASE}/scan/sms`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                message: message
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || 'SMS scan failed'
        );
    }

    return data;
}

// -------------------------------------------------------------
// REAL BACKEND RANSOMWARE SCAN
// -------------------------------------------------------------

async function scanRansomwareFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
        `${API_BASE}/scan/ransomware`,
        {
            method: 'POST',
            credentials: 'include',
            body: formData
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Ransomware scan failed');
    }

    return data;
}

// -------------------------------------------------------------
// REAL BACKEND OCR SCREENSHOT SCAN
// -------------------------------------------------------------
async function scanOcrImage(type, file) {
    // ---------------------------------------------------------
    // Browser-side OCR using Tesseract.js
    // This avoids requiring the Tesseract executable on Vercel.
    // ---------------------------------------------------------

    const endpointMap = {
        url: '/scan/url',
        email: '/scan/email',
        sms: '/scan/sms'
    };

    const endpoint = endpointMap[type];

    if (!endpoint) {
        throw new Error('Invalid OCR scan type.');
    }

    if (!file) {
        throw new Error('No image file selected.');
    }

    // Load Tesseract.js dynamically if it is not already loaded.
    if (!window.Tesseract) {
        await new Promise((resolve, reject) => {
            const existingScript = document.querySelector(
                'script[src*="tesseract.js"]'
            );

            if (existingScript) {
                existingScript.addEventListener('load', resolve, { once: true });
                existingScript.addEventListener('error', reject, { once: true });
                return;
            }

            const script = document.createElement('script');

            script.src =
                'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';

            script.onload = resolve;
            script.onerror = () => {
                reject(
                    new Error(
                        'Unable to load the OCR engine. Please check your internet connection and try again.'
                    )
                );
            };

            document.head.appendChild(script);
        });
    }

    // Perform OCR directly in the user's browser.
    const result = await Tesseract.recognize(
        file,
        'eng',
        {
            logger: message => {
                // Keep progress handling silent so the existing UI
                // does not get disturbed.
                if (message && message.status) {
                    console.log(
                        `[OCR] ${message.status}`,
                        message.progress !== undefined
                            ? Math.round(message.progress * 100) + '%'
                            : ''
                    );
                }
            }
        }
    );

    const extractedText = (result.data.text || '').trim();

    if (!extractedText) {
        throw new Error(
            'No readable text was found in the image. Please use a clearer screenshot.'
        );
    }

    // ---------------------------------------------------------
    // Send the extracted text to the existing scanners.
    // ---------------------------------------------------------

    let response;
    let requestBody;

    if (type === 'url') {
        // Find URLs inside OCR text.
        const urlMatches = extractedText.match(
            /https?:\/\/[^\s<>"']+/gi
        ) || [];

        // Also handle common OCR output where "https://" may be
        // damaged or punctuation is attached to the URL.
        let urls = urlMatches
            .map(url => url.replace(/[),.;!?]+$/g, ''))
            .filter(Boolean);

        // If no http/https URL was detected, try www.example.com style.
        if (urls.length === 0) {
            const wwwMatches = extractedText.match(
                /(?:www\.)[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s<>"']*)?/gi
            ) || [];

            urls = wwwMatches
                .map(url => {
                    url = url.replace(/[),.;!?]+$/g, '');
                    return `https://${url}`;
                })
                .filter(Boolean);
        }

        if (urls.length === 0) {
            throw new Error(
                'No URL was detected in the screenshot. Please upload a clearer image containing a website URL.'
            );
        }

        // The existing /scan/url endpoint accepts one URL.
        // Use the first detected URL for the scan.
        requestBody = {
            url: urls[0]
        };

    } else if (type === 'email') {
        requestBody = {
            email: extractedText
        };

    } else if (type === 'sms') {
        requestBody = {
            message: extractedText
        };
    }

    response = await fetch(
        `${API_BASE}${endpoint}`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }
    );

    // Don't blindly call response.json().
    // If the server ever returns HTML, this gives a useful error
    // instead of "Unexpected token '<'".
    const contentType = response.headers.get('content-type') || '';

    let data;

    if (contentType.includes('application/json')) {
        data = await response.json();
    } else {
        const text = await response.text();

        throw new Error(
            `Server returned an unexpected response (${response.status}).`
        );
    }

    if (!response.ok) {
        throw new Error(
            data.message ||
            data.error ||
            'OCR scan failed.'
        );
    }

    // Return the same general structure expected by the
    // existing OCR UI.
    return {
        status: 'success',
        extracted_text: extractedText,
        result: data.result,
        urls: type === 'url'
            ? (requestBody.url ? [requestBody.url] : [])
            : []
    };
}


    // -------------------------------------------------------------
    // OCR FILE UPLOAD + BUTTON EXECUTION
    // -------------------------------------------------------------
    const ocrSelectedFiles = {
        url: [],
        email: [],
        sms: []
    };

    const ocrInputMap = {
        url: 'ocr-url-file',
        email: 'ocr-email-file',
        sms: 'ocr-sms-file'
    };

    const ocrDisplayMap = {
        url: 'ocr-url-file-name',
        email: 'ocr-email-file-name',
        sms: 'ocr-sms-file-name'
    };

    function updateOcrUploadUI(type) {
        const files = ocrSelectedFiles[type] || [];
        const display = document.getElementById(ocrDisplayMap[type]);
        const actions = document.getElementById(`ocr-${type}-file-actions`);
        const status = document.getElementById(`ocr-${type}-file-status`);

        if (display) {
            display.textContent = files[0]
                ? `Uploaded: ${files[0].name}`
                : '';
        }
        if (actions) {
            actions.classList.toggle('hidden', files.length === 0);
        }
        if (status) {
            status.textContent = files.length ? '1 file uploaded.' : '';
        }
    }

    Object.entries(ocrInputMap).forEach(([type, id]) => {
        const input = document.getElementById(id);
        if (!input) return;
        input.addEventListener('change', () => {
            if (input.files && input.files[0]) {
                ocrSelectedFiles[type] = [input.files[0]];
                updateOcrUploadUI(type);
            }
        });
    });

    document.querySelectorAll('.ocr-remove-file-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.ocrType;
            const firstInput = document.getElementById(ocrInputMap[type]);
            ocrSelectedFiles[type] = [];
            if (firstInput) firstInput.value = '';
            updateOcrUploadUI(type);
        });
    });

    ocrAnalyzeBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const type = btn.dataset.ocrType;
            const selectedFiles = (ocrSelectedFiles[type] || []).filter(Boolean);

            if (!selectedFiles.length) {
                alert('Please select a screenshot to analyze.');
                return;
            }

            showToast('Extracting text and analyzing screenshot...', false, true);
            btn.disabled = true;

            try {
                const responses = [];
                for (const selectedFile of selectedFiles) {
                    responses.push(await scanOcrImage(type, selectedFile));
                }

                const results = responses.map(data => data.result || {});
                const scores = results
                    .map(result => Number(result.score ?? result.internal_score ?? 0))
                    .filter(Number.isFinite)
                    .map(score => Math.max(0, Math.min(100, score)));
                const safeScore = scores.length ? Math.max(...scores) : 0;

                let verdict;
                if (safeScore >= 81) verdict = 'Dangerous';
                else if (safeScore >= 51) verdict = 'Suspicious';
                else verdict = 'Safe';

                const reasons = results.flatMap(result =>
                    Array.isArray(result.reasons) ? result.reasons : []
                );
                const extractedText = responses
                    .map(data => data.extracted_text || '')
                    .filter(Boolean)
                    .join('\n\n');

                const targets = [];
                results.forEach(result => {
                    if (Array.isArray(result.urls)) {
                        result.urls.forEach(item => {
                            if (item && item.url) targets.push(item.url);
                        });
                    }
                });
                const target = targets.length ? targets.join(', ') : extractedText;

                const newScanRecord = {
                    id: 'SCAN-' + Date.now(),
                    timestamp: new Date().toLocaleString(),
                    scanType: `OCR ${type.toUpperCase()}`,
                    target: target.length > 60 ? target.substring(0, 60) + '...' : target,
                    fullTarget: target,
                    extractedText,
                    filesAnalyzed: selectedFiles.map(file => file.name),
                    isThreat: safeScore >= 81,
                    verdict,
                    score: safeScore,
                    riskScore: safeScore,
                    confidence: responses.length > 1 ? 'normal' : String(results[0]?.confidence || 'limited'),
                    ml: results[0]?.ml || null,
                    reasons: [...new Set(reasons)],
                    user: currentUser ? currentUser.username : 'Anonymous'
                };

                currentLatestScan = newScanRecord;
                scanHistory.unshift(newScanRecord);
                localStorage.setItem('cyberGuard_history', JSON.stringify(scanHistory));
                totalAnalyzed++;
                if (newScanRecord.isThreat) totalIdentified++;
                localStorage.setItem('cyberGuard_analyzed', totalAnalyzed);
                localStorage.setItem('cyberGuard_identified', totalIdentified);
                updateStatsUI();

                hideToast();
                btn.disabled = false;
                showResultModal(newScanRecord);

                ocrSelectedFiles[type] = [];
                const input = document.getElementById(ocrInputMap[type]);
                if (input) input.value = '';
                updateOcrUploadUI(type);
            } catch (error) {
                console.error('OCR scan error:', error);
                hideToast();
                btn.disabled = false;
                alert(error.message || 'Unable to connect to the OCR scan service.');
            }
        });
    });

    // -------------------------------------------------------------
    // Analysis Scanner Execution
    // -------------------------------------------------------------
analyzeBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
            const scanType = btn.dataset.type;

            // GUEST RULE: Guests CAN analyze 'Phishing Website' URL scanner!
            // Other scanners block Guest and open prompt.
            if (currentUser && currentUser.role === 'guest' && scanType !== 'Phishing Website') {
                showLoginPromptModal();
                return;
            }

            let targetContent = '';

            if (scanType === 'Phishing Email') {
                targetContent = document.getElementById('email-content').value.trim();
                if (!targetContent) return alert('Please paste email content or headers to analyze.');
            } else if (scanType === 'Phishing Website') {
    targetContent = document.getElementById('website-url').value.trim();
    if (!targetContent) return alert('Please enter a valid website URL.');
            } else if (scanType === 'SMS Spam') {
                targetContent = document.getElementById('sms-content').value.trim();
                if (!targetContent) return alert('Please paste SMS text content.');
            } else if (scanType === 'Ransomware') {
                if (!fileInput.files || fileInput.files.length === 0) return alert('Please select or drop a file to analyze.');
                targetContent = fileInput.files[0].name;
            }

// -------------------------------------------------------------
// REAL WEBSITE URL BACKEND SCAN
// -------------------------------------------------------------

if (scanType === 'Phishing Website') {

    showToast(
        'Analyzing website URL...',
        false,
        true
    );

    btn.disabled = true;

    try {
        const data = await scanWebsiteUrl(
            targetContent
        );

        const result = data.result || {};

        const verdict = String(
            result.verdict || 'Unknown'
        );

        const confidence = String(
            result.confidence || 'limited'
        );

        const reasons = Array.isArray(
            result.reasons
        )
            ? result.reasons
            : [];

        const normalizedVerdict =
            verdict.toLowerCase();

        const isThreat =
            normalizedVerdict === 'dangerous' ||
            normalizedVerdict === 'malicious';

        const newScanRecord = {
            id:
                'SCAN-' + Date.now(),

            timestamp:
                new Date().toLocaleString(),

            scanType:
                scanType,

            target:
                targetContent,

            fullTarget:
                targetContent,

            isThreat:
                isThreat,

            verdict:
                verdict,

            confidence:
                confidence,

            score:
                Number(result.score || result.internal_score || 0),

            ml:
                result.ml || null,

            user:
                currentUser
                    ? currentUser.username
                    : 'Anonymous'
        };

        currentLatestScan =
            newScanRecord;

        // Keep frontend history for the current UI.
        // The real scan is already stored by Flask in SQLite.
        scanHistory.unshift(
            newScanRecord
        );

        localStorage.setItem(
            'cyberGuard_history',
            JSON.stringify(
                scanHistory
            )
        );

        totalAnalyzed++;

        if (isThreat) {
            totalIdentified++;
        }

        localStorage.setItem(
            'cyberGuard_analyzed',
            totalAnalyzed
        );

        localStorage.setItem(
            'cyberGuard_identified',
            totalIdentified
        );

        updateStatsUI();

        hideToast();

        btn.disabled = false;

        // Show the actual backend verdict.
        showResultModal(
            newScanRecord
        );

        document.getElementById(
            'website-url'
        ).value = '';

    } catch (error) {

        console.error(
            'Website URL scan error:',
            error
        );

        hideToast();

        btn.disabled = false;

        alert(
            error.message ||
            'Unable to connect to the scan service.'
        );
    }

    // IMPORTANT:
    // Do not execute the old Math.random()
    // simulation for the URL scanner.
    return;
}

// -------------------------------------------------------------
// REAL EMAIL BACKEND SCAN
// -------------------------------------------------------------

if (scanType === 'Phishing Email') {

    showToast(
        'Analyzing email...',
        false,
        true
    );

    btn.disabled = true;

    try {

        const data = await scanEmailContent(
            targetContent
        );

        const result = data.result || {};

        const verdict = String(
            result.verdict || 'Unknown'
        );

        const confidence = String(
            result.confidence || 'limited'
        );

        const reasons = Array.isArray(
            result.reasons
        )
            ? result.reasons
            : [];

        const normalizedVerdict =
            verdict.toLowerCase();

        const isThreat =
            normalizedVerdict === 'dangerous' ||
            normalizedVerdict === 'malicious';

        const newScanRecord = {
            id:
                'SCAN-' + Date.now(),

            timestamp:
                new Date().toLocaleString(),

            scanType:
                scanType,

            target:
                targetContent.length > 50
                    ? targetContent.substring(0, 50) + '...'
                    : targetContent,

            fullTarget:
                targetContent,

            isThreat:
                isThreat,

            verdict:
                verdict,

            confidence:
                confidence,

            score:
                Number(result.score || result.internal_score || 0),

            ml:
                result.ml || null,

            user:
                currentUser
                    ? currentUser.username
                    : 'Anonymous'
        };

        currentLatestScan =
            newScanRecord;

        scanHistory.unshift(
            newScanRecord
        );

        localStorage.setItem(
            'cyberGuard_history',
            JSON.stringify(
                scanHistory
            )
        );

        totalAnalyzed++;

        if (isThreat) {
            totalIdentified++;
        }

        localStorage.setItem(
            'cyberGuard_analyzed',
            totalAnalyzed
        );

        localStorage.setItem(
            'cyberGuard_identified',
            totalIdentified
        );

        updateStatsUI();

        hideToast();

        btn.disabled = false;

        showResultModal(
            newScanRecord
        );

        document.getElementById(
            'email-content'
        ).value = '';

    } catch (error) {

        console.error(
            'Email scan error:',
            error
        );

        hideToast();

        btn.disabled = false;

        alert(
            error.message ||
            'Unable to connect to the email scan service.'
        );
    }

    return;
}

    // -------------------------------------------------------------
    // REAL SMS BACKEND SCAN
    // -------------------------------------------------------------

    if (scanType === 'SMS Spam') {

        showToast(
            'Analyzing SMS...',
            false,
            true
        );

        btn.disabled = true;

        try {

            const data = await scanSmsContent(
                targetContent
            );

            const result = data.result || {};

            const verdict = String(
                result.verdict || 'Unknown'
            );

            const confidence = String(
                result.confidence || 'limited'
            );

            const reasons = Array.isArray(
                result.reasons
            )
                ? result.reasons
                : [];

            const normalizedVerdict =
                verdict.toLowerCase();

            const isThreat =
                normalizedVerdict === 'dangerous' ||
                normalizedVerdict === 'malicious';

            const newScanRecord = {
                id:
                    'SCAN-' + Date.now(),

                timestamp:
                    new Date().toLocaleString(),

                scanType:
                    scanType,

                target:
                    targetContent.length > 50
                        ? targetContent.substring(0, 50) + '...'
                        : targetContent,

                fullTarget:
                    targetContent,

                isThreat:
                    isThreat,

                verdict:
                    verdict,

                confidence:
                    confidence,

                score:
                    Number(result.score || result.internal_score || 0),

                ml:
                    result.ml || null,

                user:
                    currentUser
                        ? currentUser.username
                        : 'Anonymous'
            };

            currentLatestScan =
                newScanRecord;

            scanHistory.unshift(
                newScanRecord
            );

            localStorage.setItem(
                'cyberGuard_history',
                JSON.stringify(
                    scanHistory
                )
            );

            totalAnalyzed++;

            if (isThreat) {
                totalIdentified++;
            }

            localStorage.setItem(
                'cyberGuard_analyzed',
                totalAnalyzed
            );

            localStorage.setItem(
                'cyberGuard_identified',
                totalIdentified
            );

            updateStatsUI();

            hideToast();

            btn.disabled = false;

	console.log("SMS BACKEND RESULT:", data);
        console.log("SMS FRONTEND RECORD:", newScanRecord);

            showResultModal(
                newScanRecord
            );

            document.getElementById(
                'sms-content'
            ).value = '';

        } catch (error) {

            console.error(
                'SMS scan error:',
                error
            );

            hideToast();

            btn.disabled = false;

            alert(
                error.message ||
                'Unable to connect to the SMS scan service.'
            );
        }

        return;
    }

    // -------------------------------------------------------------
    // REAL RANSOMWARE BACKEND SCAN
    // -------------------------------------------------------------

    if (scanType === 'Ransomware') {

        const selectedFile =
            fileInput.files &&
            fileInput.files.length > 0
                ? fileInput.files[0]
                : null;

        if (!selectedFile) {
            alert(
                'Please select or drop a file to analyze.'
            );
            return;
        }

        showToast(
            'Analyzing file...',
            false,
            true
        );

        btn.disabled = true;

        try {

            const data =
                await scanRansomwareFile(
                    selectedFile
                );

            const result =
                data.result || {};

            const verdict = String(
                result.verdict ||
                result.level ||
                'Unknown'
            );

            const confidence = String(
                result.confidence ||
                'limited'
            );

            const reasons =
                Array.isArray(result.reasons)
                    ? result.reasons
                    : [];

            const normalizedVerdict =
                verdict.toLowerCase();

            const isThreat =
                normalizedVerdict === 'dangerous' ||
                normalizedVerdict === 'malicious';

            const newScanRecord = {
                id:
                    'SCAN-' + Date.now(),

                timestamp:
                    new Date().toLocaleString(),

                scanType:
                    scanType,

                target:
                    selectedFile.name,

                fullTarget:
                    selectedFile.name,

                isThreat:
                    isThreat,

                verdict:
                    verdict,

                confidence:
                    confidence,

                score:
                    Number(result.score || result.internal_score || 0),

                ml:
                    result.ml || null,

                user:
                    currentUser
                        ? currentUser.username
                        : 'Anonymous'
            };

            currentLatestScan =
                newScanRecord;

            scanHistory.unshift(
                newScanRecord
            );

            localStorage.setItem(
                'cyberGuard_history',
                JSON.stringify(
                    scanHistory
                )
            );

            totalAnalyzed++;

            if (isThreat) {
                totalIdentified++;
            }

            localStorage.setItem(
                'cyberGuard_analyzed',
                totalAnalyzed
            );

            localStorage.setItem(
                'cyberGuard_identified',
                totalIdentified
            );

            updateStatsUI();

            hideToast();

            btn.disabled = false;

            showResultModal(
                newScanRecord
            );

            fileInput.value = '';

            if (fileNameDisplay) {
                fileNameDisplay.textContent = '';
            }

        } catch (error) {

            console.error(
                'Ransomware scan error:',
                error
            );

            hideToast();

            btn.disabled = false;

            alert(
                error.message ||
                'Unable to connect to the ransomware scan service.'
            );
        }

        return;
    }





            // No legacy/random simulation is used.
            return;
        });
    });

    // Result & Report Modals
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');

function showResultModal(scanRecord) {
    const scoreRaw = Number(scanRecord.score);
    const score = Number.isFinite(scoreRaw)
        ? Math.max(0, Math.min(100, scoreRaw))
        : 0;

    const normalizedVerdict = String(scanRecord.verdict || '').toLowerCase();
    const isDangerous = score >= 81 || normalizedVerdict === 'dangerous' || normalizedVerdict === 'malicious';
    const isSuspicious = !isDangerous && (score >= 51 || normalizedVerdict === 'suspicious');

    modal.classList.remove('result-safe', 'result-suspicious', 'result-malicious');

    if (isDangerous) {
        modalIcon.innerHTML = '<i class="ph-fill ph-warning-circle"></i>';
        modalIcon.className = 'modal-icon-container danger';
        modalTitle.textContent = 'Malicious Threat Detected!';
        modal.classList.add('result-malicious');
    } else if (isSuspicious) {
        modalIcon.innerHTML = '<i class="ph-fill ph-warning-circle"></i>';
        modalIcon.className = 'modal-icon-container warning';
        modalTitle.textContent = 'Suspicious Activity Detected';
        modal.classList.add('result-suspicious');
    } else {
        modalIcon.innerHTML = '<i class="ph-fill ph-check-circle"></i>';
        modalIcon.className = 'modal-icon-container success';
        modalTitle.textContent = 'Target Appears Safe';
        modal.classList.add('result-safe');
    }

    const displayVerdict = isDangerous ? 'Malicious' : isSuspicious ? 'Suspicious' : 'Safe';
    let reasonsForModal = scanRecord.modalReasons || scanRecord.reasons || [];
    if (!Array.isArray(reasonsForModal)) reasonsForModal = [String(reasonsForModal)];
    const reasonsText = reasonsForModal.length
        ? reasonsForModal.slice(0, 3).join('\n')
        : 'No specific reasons were returned.';

    modalMessage.textContent =
        `Verdict: ${displayVerdict} | Score: ${score.toFixed(0)}/100 | ` +
        `Confidence: ${scanRecord.confidence || 'limited'}.\n${reasonsText}`;

    modal.classList.remove('hidden');
}

// -------------------------------------------------------------
// RESULT / REPORT MODAL CLOSE BUTTONS
// -------------------------------------------------------------

document.addEventListener('click', event => {
    const resultClose = event.target.closest(
        '#result-modal .close-modal-btn, #result-modal .close-btn'
    );

    if (resultClose && modal) {
        event.preventDefault();
        event.stopPropagation();
        modal.classList.add('hidden');
        return;
    }

    const reportClose = event.target.closest(
        '#report-modal .close-modal-btn, #report-modal .close-btn'
    );

    if (reportClose && reportModal) {
        event.preventDefault();
        event.stopPropagation();
        reportModal.classList.add('hidden');
    }
});

    // Open the detailed report for the most recent scan.
    if (viewDetailedReportBtn) {
        viewDetailedReportBtn.addEventListener('click', () => {
            if (!currentLatestScan) {
                alert('No scan report is available yet.');
                return;
            }

            if (modal) {
                modal.classList.add('hidden');
            }

            displayReportModal(currentLatestScan);
        });
    }

    function displayReportModal(scan) {
        const verdict = String(scan.final_verdict || scan.verdict || 'Unknown');
        const normalizedVerdict = verdict.toLowerCase();
        const isThreat = ['dangerous', 'malicious', 'phishing'].includes(normalizedVerdict);
        const isSuspicious = normalizedVerdict === 'suspicious';
        const scoreValue = scan.riskScore ?? scan.score ?? scan.internal_score ?? 0;
        const score = Number.isFinite(Number(scoreValue)) ? Number(scoreValue) : 0;
        const target = scan.fullTarget || scan.target || scan.url || scan.filename || scan.input_content || scan.ocr_text || 'N/A';
        const isFileAnalyzer = Boolean(
            scan.scanType === 'AI Malicious File Analyzer' ||
            scan.scan_type === 'malicious_file' ||
            scan.staticAnalysis ||
            scan.fileType ||
            scan.sha256
        );

        let reasons = [];
        if (Array.isArray(scan.reasons)) {
            reasons = scan.reasons;
        } else if (typeof scan.reasons === 'string') {
            try {
                const parsed = JSON.parse(scan.reasons);
                reasons = Array.isArray(parsed) ? parsed : [scan.reasons];
            } catch {
                reasons = [scan.reasons];
            }
        }

        reportTitle.textContent = isFileAnalyzer
            ? 'AI Malicious File Analyzer Report'
            : `${scan.scanType || scan.scan_type || 'Security'} Assessment Report`;
        reportTimestamp.textContent = `Generated: ${scan.timestamp ? new Date(scan.timestamp).toLocaleString() : new Date().toLocaleString()} | Ref ID: ${scan.id || 'N/A'}`;

        if (isThreat) {
            reportIcon.innerHTML = '<i class="ph-fill ph-shield-warning"></i>';
            reportIcon.className = 'modal-icon-container danger';
        } else if (isSuspicious) {
            reportIcon.innerHTML = '<i class="ph-fill ph-warning-circle"></i>';
            reportIcon.className = 'modal-icon-container warning';
        } else {
            reportIcon.innerHTML = '<i class="ph-fill ph-shield-check"></i>';
            reportIcon.className = 'modal-icon-container success';
        }

        const findingsHtml = reasons.length
            ? `<ul>${reasons.map(reason => `<li>${escapeHtml(reason)}</li>`).join('')}</ul>`
            : '<p>No specific findings were returned.</p>';

        const ml = scan.ml || null;
        const staticAnalysis = scan.staticAnalysis || scan.static_analysis || null;
        const assessment = scan.assessment || null;

        let fileSectionHtml = '';
        if (isFileAnalyzer) {
            const probability = ml?.probabilities?.malicious;
            const benignProbability = ml?.probabilities?.benign;
            const safeFilename = scan.fileType || scan.file_type || 'PE';
            const sections = Array.isArray(staticAnalysis?.sections) ? staticAnalysis.sections : [];
            const suspiciousImports = Number(staticAnalysis?.suspicious_imports || 0);
            const suspiciousSections = Array.isArray(staticAnalysis?.suspicious_section_names)
                ? staticAnalysis.suspicious_section_names
                : [];
            const maxEntropy = Number(staticAnalysis?.max_entropy || 0);
            const why = Array.isArray(assessment?.why) ? assessment.why : [];
            const limitations = Array.isArray(assessment?.limitations) ? assessment.limitations : [];
            const recommendation = assessment?.recommendation || 'Review the findings before interacting with this file.';
            const fileMeta = getFileVerdictMeta(verdict);
            const points = why.length ? why : reasons;

            const pointsHtml = points.length
                ? points.map(point => `<li class="file-analyzer-point ${fileMeta.key === 'safe' ? 'safe-point' : fileMeta.key === 'dangerous' ? 'danger-point' : 'warning-point'}"><i class="ph ${fileMeta.key === 'safe' ? 'ph-check-circle' : fileMeta.key === 'dangerous' ? 'ph-warning-circle' : 'ph-info'}"></i><span>${escapeHtml(point)}</span></li>`).join('')
                : '<li class="file-analyzer-point"><i class="ph ph-info"></i><span>No additional explanation was returned.</span></li>';

            fileSectionHtml = `
                <div class="file-report-status ${fileMeta.key}">
                    <div>
                        <span class="file-report-status-label">${escapeHtml(fileMeta.label)}</span>
                        <span class="file-report-status-subtitle">Local ML + static file analysis</span>
                    </div>
                    <strong>${escapeHtml(score)} / 100</strong>
                </div>
                <div class="report-item">
                    <strong>File</strong>
                    <p><code>${escapeHtml(target)}</code></p>
                    <p><b>Type:</b> ${escapeHtml(safeFilename)} &nbsp; <b>Size:</b> ${humanSize(scan.fileSize ?? scan.size)}</p>
                </div>
                <div class="report-item">
                    <strong>Detection</strong>
                    <p><b>Model:</b> ${escapeHtml(ml?.model || 'N/A')}</p>
                    <p><b>Classification:</b> ${escapeHtml(ml?.label || 'N/A')} &nbsp; <b>Malicious probability:</b> ${formatProbability(probability)}</p>
                </div>
                <div class="report-item">
                    <strong>Key findings</strong>
                    <ul class="file-report-points">${pointsHtml}</ul>
                </div>
                <div class="report-item">
                    <strong>Recommendation</strong>
                    <p class="file-report-recommendation">${escapeHtml(recommendation)}</p>
                </div>
            `;

        }

        const mlHtml = !isFileAnalyzer && ml && !ml.error ? `
            <div class="report-item">
                <strong>Machine Learning Analysis:</strong>
                <p><strong>${escapeHtml(ml.model || 'ML Classifier')}</strong></p>
                <p>Classification: <strong>${escapeHtml(ml.label || 'N/A')}</strong></p>
                ${ml.probabilities ? `<p>Probabilities: ${escapeHtml(JSON.stringify(ml.probabilities))}</p>` : ''}
            </div>
        ` : '';

        if (isFileAnalyzer) {
            reportBody.innerHTML = fileSectionHtml;
        } else {
            const recommendation = isThreat
                ? 'Do NOT open links or execute files. Isolate the source and report the incident to your security team.'
                : isSuspicious
                    ? 'Treat the target with caution and verify it through a trusted source before interacting with it.'
                    : 'The analyzed target did not produce a confirmed malicious verdict from the available evidence.';

            reportBody.innerHTML = `
                <div class="report-item">
                    <strong>Target Analyzed:</strong>
                    <p><code>${escapeHtml(target)}</code></p>
                </div>
                <div class="report-item">
                    <strong>Risk Score & Verdict:</strong>
                    <p><span class="${isThreat ? 'text-danger' : isSuspicious ? 'text-warning' : 'text-safe'} font-bold">${escapeHtml(score)} / 100 (${escapeHtml(verdict)})</span></p>
                </div>
                ${scan.extractedText ? `
                <div class="report-item">
                    <strong>OCR Extracted Text:</strong>
                    <p><code>${escapeHtml(scan.extractedText)}</code></p>
                </div>` : ''}
                ${mlHtml}
                <div class="report-item">
                    <strong>Inspection Findings:</strong>
                    ${findingsHtml}
                </div>
                <div class="report-item">
                    <strong>Confidence:</strong>
                    <p>${escapeHtml(scan.confidence || 'limited')}</p>
                </div>
                <div class="report-item">
                    <strong>Recommendation:</strong>
                    <p>${recommendation}</p>
                </div>
            `;
        }

        reportModal.classList.remove('hidden');
    }

    if (printReportBtn) {
        printReportBtn.addEventListener('click', () => {
            window.print();
        });
    }

    if (downloadReportBtn) {
        downloadReportBtn.addEventListener('click', () => {
            if (!currentLatestScan || !reportBody) {
                alert('No scan report is available yet.');
                return;
            }

            const scan = currentLatestScan;
            const verdict = String(scan.final_verdict || scan.verdict || 'Unknown');
            const score = Number(scan.riskScore ?? scan.score ?? scan.internal_score ?? 0);
            const assessment = scan.assessment || {};
            const ml = scan.ml || {};
            const staticAnalysis = scan.staticAnalysis || scan.static_analysis || {};
            const lines = [
                'CYBER DEFENCE PLATFORM',
                'Security Assessment Report',
                '========================================',
                `Generated: ${new Date().toLocaleString()}`,
                `Scan ID: ${scan.id || 'N/A'}`,
                '',
                `Result: ${verdict}`,
                `Threat Score: ${Number.isFinite(score) ? score : 0} / 100`,
                `Target: ${scan.fullTarget || scan.target || scan.filename || scan.input_content || 'N/A'}`,
                ''
            ];

            if (scan.sha256) lines.push(`SHA-256: ${scan.sha256}`);
            if (scan.fileType || scan.file_type) lines.push(`File Type: ${scan.fileType || scan.file_type}`);
            if (scan.fileSize ?? scan.size) lines.push(`File Size: ${humanSize(scan.fileSize ?? scan.size)}`);
            lines.push('');

            if (ml.model) {
                lines.push('MACHINE LEARNING');
                lines.push(`Model: ${ml.model}`);
                lines.push(`Classification: ${ml.label || 'N/A'}`);
                if (ml.probabilities?.malicious != null) lines.push(`Malicious Probability: ${formatProbability(ml.probabilities.malicious)}`);
                if (ml.probabilities?.benign != null) lines.push(`Benign Probability: ${formatProbability(ml.probabilities.benign)}`);
                lines.push('');
            }

            if (staticAnalysis) {
                lines.push('STATIC ANALYSIS');
                lines.push(`PE Sections Parsed: ${staticAnalysis.section_count ?? (Array.isArray(staticAnalysis.sections) ? staticAnalysis.sections.length : 'N/A')}`);
                lines.push(`Suspicious Imports: ${staticAnalysis.suspicious_imports ?? 0}`);
                lines.push(`Highest Section Entropy: ${Number.isFinite(Number(staticAnalysis.max_entropy)) ? Number(staticAnalysis.max_entropy).toFixed(2) : 'N/A'}`);
                if (Array.isArray(staticAnalysis.suspicious_section_names) && staticAnalysis.suspicious_section_names.length) {
                    lines.push(`Suspicious Section Names: ${staticAnalysis.suspicious_section_names.join(', ')}`);
                }
                lines.push('');
            }

            const why = Array.isArray(assessment.why) ? assessment.why : (Array.isArray(scan.reasons) ? scan.reasons : []);
            if (why.length) {
                lines.push('WHY THIS RESULT');
                why.forEach((point, index) => lines.push(`${index + 1}. ${point}`));
                lines.push('');
            }

            if (assessment.recommendation) {
                lines.push('RECOMMENDED ACTION');
                lines.push(assessment.recommendation);
                lines.push('');
            }

            const limitations = Array.isArray(assessment.limitations) ? assessment.limitations : [];
            if (limitations.length) {
                lines.push('SAFETY & LIMITATIONS');
                limitations.forEach((point, index) => lines.push(`${index + 1}. ${point}`));
            }

            const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `cyber-defence-report-${String(scan.id || Date.now()).replace(/[^a-zA-Z0-9_-]/g, '-')}.txt`;
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
        });
    }

    // Close open modals with the Escape key.
    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        [modal, reportModal, profileModal, loginPromptModal, regEmailModal, forgotPasswordModal, resetPasswordModal].forEach(activeModal => {
            if (activeModal) activeModal.classList.add('hidden');
        });
    });

    // -------------------------------------------------------------
    // History UI Management
    // -------------------------------------------------------------
    async function renderHistoryUI() {
    if (!historyTableBody || !historyEmpty) {
        return;
    }

    historyTableBody.innerHTML = '';

    try {
        const response = await fetch(
            `${API_BASE}/scan/history`,
            {
                method: 'GET',
                credentials: 'include'
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || 'Unable to load scan history.'
            );
        }

        const history = Array.isArray(
            data.history
        )
            ? data.history
            : [];

        if (history.length === 0) {
            historyEmpty.classList.remove(
                'hidden'
            );
            return;
        }

        historyEmpty.classList.add(
            'hidden'
        );

        history.forEach(scan => {

            const row = document.createElement(
                'tr'
            );

            const verdict = String(
                scan.final_verdict || 'Unknown'
            );

            const normalizedVerdict =
                verdict.toLowerCase();

            const isThreat =
                normalizedVerdict === 'dangerous' ||
                normalizedVerdict === 'malicious';

            const statusClass =
                isThreat
                    ? 'text-danger'
                    : normalizedVerdict === 'suspicious'
                        ? 'text-warning'
                        : 'text-green';

            let target = '';

            if (scan.url) {
                target = scan.url;
            } else if (scan.filename) {
                target = scan.filename;
            } else if (scan.input_content) {
                target = scan.input_content;
            } else if (scan.ocr_text) {
                target = scan.ocr_text;
            } else {
                target = 'N/A';
            }

            if (target.length > 60) {
                target =
                    target.substring(0, 60) +
                    '...';
            }

            const timestamp = scan.timestamp
                ? new Date(
                    scan.timestamp
                  ).toLocaleString()
                : 'N/A';

            row.innerHTML = `
                <td>${timestamp}</td>

                <td>
                    ${scan.scan_type || 'Unknown'}
                </td>

                <td>
                    ${target}
                </td>

                <td>
                    <span class="${statusClass}">
                        ${verdict}
                    </span>
                </td>

                <td>
                    ${scan.internal_score ?? 0}
                </td>

                <td>
                    <button
                        class="btn btn-secondary btn-sm history-report-btn"
                        data-scan-id="${scan.id}"
                    >
                        View Report
                    </button>
                </td>
            `;

            historyTableBody.appendChild(
                row
            );
        });

        document
            .querySelectorAll(
                '.history-report-btn'
            )
            .forEach(button => {

                button.addEventListener(
                    'click',
                    () => {

                        const scanId =
                            button.dataset.scanId;

                        const selectedScan =
                            history.find(
                                item =>
                                    String(
                                        item.id
                                    ) ===
                                    String(
                                        scanId
                                    )
                            );

                        if (selectedScan) {
                            displayReportModal(
                                selectedScan
                            );
                        }
                    }
                );
            });

    } catch (error) {

        console.error(
            'History loading error:',
            error
        );

        historyEmpty.classList.remove(
            'hidden'
        );

        historyEmpty.querySelector('p')?.replaceChildren(
            document.createTextNode(
                'Unable to load scan history.'
            )
        );
    }
}

    // -------------------------------------------------------------
    // Admin Management Console Logic
    // -------------------------------------------------------------
    async function renderAdminUI() {
    if (!adminUserTableBody) {
        return;
    }

    // Admin page should only work for an authenticated admin.
    if (
        !currentUser ||
        currentUser.role !== 'admin'
    ) {
        return;
    }

    try {
        // -----------------------------
        // Load admin statistics
        // -----------------------------

        const statsResponse = await fetch(
            `${API_BASE}/auth/admin/stats`,
            {
                method: 'GET',
                credentials: 'include'
            }
        );

        const statsData =
            await statsResponse.json();

        if (!statsResponse.ok) {
            throw new Error(
                statsData.message ||
                'Unable to load admin statistics.'
            );
        }

        if (statsData.stats) {
            if (adminStatUsers) {
                adminStatUsers.textContent =
                    statsData.stats.total_users;
            }

            if (adminStatScans) {
                adminStatScans.textContent =
                    statsData.stats.total_scans;
            }

            if (adminStatThreats) {
                adminStatThreats.textContent =
                    statsData.stats.threats_detected;
            }
        }

        // -----------------------------
        // Load users
        // -----------------------------

        const usersResponse = await fetch(
            `${API_BASE}/auth/admin/users`,
            {
                method: 'GET',
                credentials: 'include'
            }
        );

        const usersData =
            await usersResponse.json();

        if (!usersResponse.ok) {
            throw new Error(
                usersData.message ||
                'Unable to load users.'
            );
        }

        const adminUsers =
            Array.isArray(usersData.users)
                ? usersData.users
                : [];

        adminUserTableBody.innerHTML = '';

        adminUsers.forEach(user => {
            const tr =
                document.createElement('tr');

            const isAdmin =
                user.role === 'admin';

            const createdAt =
                user.created_at
                    ? new Date(
                        user.created_at
                    ).toLocaleDateString()
                    : 'N/A';

            tr.innerHTML = `
                <td>
                    ${user.name || 'N/A'}
                </td>

                <td>
                    <code>
                        ${user.username || 'N/A'}
                    </code>
                </td>

                <td>
                    ${user.email || 'N/A'}
                </td>

                <td>
                    <span class="${
                        isAdmin
                            ? 'badge-admin'
                            : 'badge-user'
                    }">
                        ${(
                            user.role || 'user'
                        ).toUpperCase()}
                    </span>
                </td>

                <td>
                    ${createdAt}
                </td>

                <td>
                    ${
                        isAdmin
                            ? '<span class="text-muted text-sm">Protected</span>'
                            : `
                                <button
                                    class="btn btn-outline-danger btn-sm admin-delete-user-btn"
                                    data-user-id="${user.id}"
                                    data-username="${user.username}"
                                >
                                    <i class="ph ph-user-minus"></i>
                                    Delete
                                </button>
                            `
                    }
                </td>
            `;

            adminUserTableBody.appendChild(tr);
        });

        // -----------------------------
        // Delete user
        // -----------------------------

        document
            .querySelectorAll(
                '.admin-delete-user-btn'
            )
            .forEach(button => {

                button.addEventListener(
                    'click',
                    async () => {

                        const userId =
                            button.dataset.userId;

                        const username =
                            button.dataset.username;

                        if (!userId) {
                            return;
                        }

                        const confirmed =
                            confirm(
                                `Delete user "${username}" permanently?`
                            );

                        if (!confirmed) {
                            return;
                        }

                        try {
                            showToast(
                                'Deleting user...',
                                false,
                                true
                            );

                            const deleteResponse =
                                await fetch(
                                    `${API_BASE}/auth/admin/users/${userId}`,
                                    {
                                        method: 'DELETE',
                                        credentials: 'include'
                                    }
                                );

                            const deleteData =
                                await deleteResponse.json();

                            hideToast();

                            if (!deleteResponse.ok) {
                                throw new Error(
                                    deleteData.message ||
                                    'Unable to delete user.'
                                );
                            }

                            showToast(
                                'User deleted successfully.'
                            );

                            // Reload real admin data.
                            await renderAdminUI();

                        } catch (error) {

                            hideToast();

                            console.error(
                                'Admin delete error:',
                                error
                            );

                            alert(
                                error.message ||
                                'Unable to delete user.'
                            );
                        }
                    }
                );
            });

    } catch (error) {

        console.error(
            'Admin UI loading error:',
            error
        );

        if (adminUserTableBody) {
            adminUserTableBody.innerHTML = `
                <tr>
                    <td colspan="6">
                        Unable to load admin data.
                    </td>
                </tr>
            `;
        }

        if (adminStatUsers) {
            adminStatUsers.textContent = '0';
        }

        if (adminStatScans) {
            adminStatScans.textContent = '0';
        }

        if (adminStatThreats) {
            adminStatThreats.textContent = '0';
        }
    }
}

    // -------------------------------------------------------------
    // Stats & Toast Helpers
    // -------------------------------------------------------------
    function updateStatsUI() {
        const statUploaded = document.getElementById('stat-uploaded');
        const statIdentified = document.getElementById('stat-identified');
        if (statUploaded) statUploaded.textContent = totalAnalyzed.toLocaleString();
        if (statIdentified) statIdentified.textContent = totalIdentified.toLocaleString();
    }

    function showToast(msg, isError = false, isLoading = false) {
        toastMessage.textContent = msg;
        const toastIcon = document.getElementById('toast-icon');
        if (isLoading) {
            toastIcon.className = 'ph ph-spinner ph-spin';
        } else if (isError) {
            toastIcon.className = 'ph ph-warning-circle text-danger';
        } else {
            toastIcon.className = 'ph ph-check-circle text-primary';
        }
        toast.classList.remove('hidden');
        if (!isLoading) {
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3500);
        }
    }

    function hideToast() {
        toast.classList.add('hidden');
    }

    const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document
            .getElementById('contact-first-name')
            .value
            .trim();

        const lastName = document
            .getElementById('contact-last-name')
            .value
            .trim();

        const email = document
            .getElementById('contact-email')
            .value
            .trim();

        const company = document
            .getElementById('contact-company')
            .value
            .trim();

        const message = document
            .getElementById('contact-message')
            .value
            .trim();

        if (
            !firstName ||
            !lastName ||
            !email ||
            !message
        ) {
            alert(
                'Please fill in all required fields.'
            );
            return;
        }

        try {
            showToast(
                'Sending your inquiry...',
                false,
                true
            );

            const response = await fetch(
                `${API_BASE}/contact`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    credentials: 'include',

                    body: JSON.stringify({
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        company: company,
                        message: message
                    })
                }
            );

            const data = await response.json();

            hideToast();

            if (!response.ok) {
                alert(
                    data.message ||
                    'Unable to send your inquiry.'
                );
                return;
            }

            showToast(
                'Your inquiry has been sent to our SOC security team.'
            );

            contactForm.reset();

            setTimeout(() => {
                if (profileModal) {
                    profileModal.classList.add('hidden');
                }
            }, 1200);

        } catch (error) {
            hideToast();

            console.error(
                'Contact inquiry error:',
                error
            );

            alert(
                'Unable to connect to the Cyber Defence backend.'
            );
        }
    });
}


    // -------------------------------------------------------------
    // AI MALICIOUS FILE ANALYZER
    // -------------------------------------------------------------
    const fileAnalyzerBtn = document.getElementById('file-analyzer-btn');
    const fileAnalyzerInput = document.getElementById('file-analyzer-file');
    const fileAnalyzerName = document.getElementById('file-analyzer-name');
    const fileAnalyzerDropZone = document.getElementById('file-analyzer-drop-zone');
    const fileAnalyzerQuarantine = document.getElementById('file-analyzer-quarantine');
    const fileAnalyzerResult = document.getElementById('file-analyzer-result');

    function setFileAnalyzerSelection(file) {
        if (!fileAnalyzerName || !file) return;
        fileAnalyzerName.textContent = `Selected File: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    }


    async function refreshFileAnalyzerModelStatus() {
        const statusEl = document.getElementById('file-analyzer-model-status');
        if (!statusEl) return;
        statusEl.className = 'file-analyzer-model-status pending';
        statusEl.innerHTML = '<i class="ph ph-circle-notch ph-spin"></i> Checking ML model...';
        try {
            const response = await fetch(`${API_BASE}/scan/ml-status`, { credentials: 'include' });
            const data = await response.json();
            const peReady = Boolean(data?.models?.malicious_file?.available);
            const pdfReady = Boolean(data?.models?.pdf?.available);
            const elfReady = Boolean(data?.models?.elf?.available);
            if (!response.ok || (!peReady && !pdfReady && !elfReady)) throw new Error('ML model unavailable');
            statusEl.className = 'file-analyzer-model-status ready';
            const readyTypes = [peReady ? 'PE' : '', pdfReady ? 'PDF' : '', elfReady ? 'ELF' : ''].filter(Boolean).join(' / ');
            statusEl.innerHTML = `<i class="ph ph-check-circle"></i> ML ready: ${readyTypes}`;
        } catch (error) {
            statusEl.className = 'file-analyzer-model-status error';
            statusEl.innerHTML = '<i class="ph ph-warning-circle"></i> ML model unavailable';
        }
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function getFileVerdictMeta(verdict, score = null) {
        const numericScore = Number(score);
        if (Number.isFinite(numericScore)) {
            if (numericScore >= 81) {
                return { key: 'dangerous', label: 'Malicious', icon: 'ph-shield-warning', color: '#DC2626' };
            }
            if (numericScore >= 51) {
                return { key: 'suspicious', label: 'Suspicious', icon: 'ph-warning-circle', color: '#D97706' };
            }
            return { key: 'safe', label: 'Safe', icon: 'ph-shield-check', color: '#16A34A' };
        }
        const normalized = String(verdict || '').toLowerCase();
        if (normalized === 'dangerous' || normalized === 'malicious') {
            return { key: 'dangerous', label: 'Malicious', icon: 'ph-shield-warning', color: '#DC2626' };
        }
        if (normalized === 'suspicious') {
            return { key: 'suspicious', label: 'Suspicious', icon: 'ph-warning-circle', color: '#D97706' };
        }
        return { key: 'safe', label: 'Safe', icon: 'ph-shield-check', color: '#16A34A' };
    }

    function formatProbability(value) {
        const number = Number(value);
        return Number.isFinite(number) ? `${(number * 100).toFixed(2)}%` : 'N/A';
    }

    function humanSize(bytes) {
        const size = Number(bytes);
        if (!Number.isFinite(size)) return 'N/A';
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }

    function renderFileAnalysisResult(result) {
        if (!fileAnalyzerResult) return;

        const verdict = String(result.verdict || 'Unknown');
        const scoreRaw = Number(result.score ?? 0);
        const score = Number.isFinite(scoreRaw) ? Math.max(0, Math.min(100, scoreRaw)) : 0;
        const meta = getFileVerdictMeta(verdict, score);
        const ml = result.ml || {};
        const probabilities = ml.probabilities || {};
        const maliciousProbability = Number(probabilities.malicious);
        const staticAnalysis = result.static_analysis || {};
        const sections = Array.isArray(staticAnalysis.sections) ? staticAnalysis.sections : [];
        const suspiciousImports = Number(staticAnalysis.suspicious_imports || 0);
        const suspiciousSections = Array.isArray(staticAnalysis.suspicious_section_names)
            ? staticAnalysis.suspicious_section_names
            : [];
        const maxEntropy = Number(staticAnalysis.max_entropy || 0);
        const assessment = result.assessment || {};
        const why = Array.isArray(assessment.why) ? assessment.why : [];
        const recommendation = assessment.recommendation || 'Review the findings before interacting with the file.';
        const limitations = Array.isArray(assessment.limitations) ? assessment.limitations : [];

        const whyHtml = why.length
            ? why.map(point => `
                <li class="file-analyzer-point ${meta.key === 'safe' ? 'safe-point' : meta.key === 'dangerous' ? 'danger-point' : 'warning-point'}">
                    <i class="ph ${meta.key === 'safe' ? 'ph-check-circle' : meta.key === 'dangerous' ? 'ph-warning-circle' : 'ph-info'}"></i>
                    <span>${escapeHtml(point)}</span>
                </li>`).join('')
            : '<li class="file-analyzer-point"><i class="ph ph-info"></i><span>No additional explanation was returned.</span></li>';

        const limitationsHtml = limitations.length
            ? limitations.map(point => `<li>${escapeHtml(point)}</li>`).join('')
            : '<li>Results are based on the implemented static checks and trained ML model.</li>';

        const staticNamesHtml = suspiciousSections.length
            ? `<div class="file-analyzer-detail-row"><span>Suspicious section names</span><span>${escapeHtml(suspiciousSections.slice(0, 8).join(', '))}</span></div>`
            : '';

        fileAnalyzerResult.innerHTML = `
            <div class="file-analyzer-result-shell">
                <div class="file-analyzer-status-banner ${meta.key}">
                    <div class="file-analyzer-status-top">
                        <div class="file-analyzer-status-left">
                            <div class="file-analyzer-status-icon"><i class="ph-fill ${meta.icon}"></i></div>
                            <div class="file-analyzer-status-copy">
                                <h3>${escapeHtml(meta.label)}</h3>
                                <p>Assessment completed using local ML + static file analysis.</p>
                            </div>
                        </div>
                        <div class="file-analyzer-score-pill">
                            <strong style="color:${meta.color}">${score.toFixed(0)} / 100</strong>
                            <span>Threat score</span>
                        </div>
                    </div>
                    <div class="file-analyzer-score-track" aria-label="Threat score">
                        <div class="file-analyzer-score-fill ${meta.key}" style="width:${score}%;"></div>
                    </div>
                </div>

                <div class="file-analyzer-result-grid">
                    <div class="file-analyzer-mini-card">
                        <h4><i class="ph ph-file"></i> File information</h4>
                        <div class="file-analyzer-detail-row"><span>Name</span><span>${escapeHtml(result.filename || 'N/A')}</span></div>
                        <div class="file-analyzer-detail-row"><span>Type</span><span>${escapeHtml(result.file_type || 'PE')}</span></div>
                        <div class="file-analyzer-detail-row"><span>Size</span><span>${humanSize(result.size)}</span></div>
                        <div class="file-analyzer-detail-row"><span>Scan ID</span><span>${escapeHtml(result.scan_id || currentLatestScan?.id || 'N/A')}</span></div>
                    </div>

                    <div class="file-analyzer-mini-card">
                        <h4><i class="ph ph-brain"></i> ML assessment</h4>
                        <div class="file-analyzer-detail-row"><span>Model</span><span>${escapeHtml(ml.model || 'N/A')}</span></div>
                        <div class="file-analyzer-detail-row"><span>Malicious probability</span><span>${formatProbability(maliciousProbability)}</span></div>
                        <div class="file-analyzer-detail-row"><span>Benign probability</span><span>${formatProbability(probabilities.benign)}</span></div>
                        <div class="file-analyzer-detail-row"><span>Classifier output</span><span>${escapeHtml(ml.label || 'N/A')}</span></div>
                    </div>
                </div>

                <div class="file-analyzer-mini-card" style="margin:0 1.15rem 1rem;">
                    <h4><i class="ph ph-fingerprint"></i> SHA-256 fingerprint</h4>
                    <div class="file-analyzer-hash-row">
                        <code class="file-analyzer-hash">${escapeHtml(result.sha256 || 'N/A')}</code>
                        <button type="button" class="btn btn-secondary btn-sm" id="file-analyzer-copy-hash-btn" title="Copy SHA-256">
                            <i class="ph ph-copy"></i> Copy
                        </button>
                    </div>
                </div>

                <div class="file-analyzer-result-grid" style="padding-top:0;">
                    <div class="file-analyzer-mini-card">
                        <h4><i class="ph ph-magnifying-glass"></i> Static analysis</h4>
                        <div class="file-analyzer-detail-row"><span>Detected type</span><span>${escapeHtml(result.file_type || result.file_kind || 'N/A')}</span></div>
                        <div class="file-analyzer-detail-row"><span>Static indicators</span><span>${escapeHtml((Array.isArray(result.assessment?.why) ? result.assessment.why.length : 0))}</span></div>
                        <div class="file-analyzer-detail-row"><span>Highest entropy</span><span>${Number.isFinite(maxEntropy) ? maxEntropy.toFixed(2) : 'N/A'}</span></div>
                        ${staticNamesHtml}
                    </div>
                    <div class="file-analyzer-mini-card">
                        <h4><i class="ph ph-list-checks"></i> Scan engines</h4>
                        <div class="file-analyzer-detail-row"><span>Static parser</span><span>Completed</span></div>
                        <div class="file-analyzer-detail-row"><span>Local ML model</span><span>Completed</span></div>
                        <div class="file-analyzer-detail-row"><span>File execution</span><span>Never performed</span></div>
                        <div class="file-analyzer-detail-row"><span>Quarantine</span><span>${result.quarantine?.quarantined ? 'Applied' : 'Not requested'}</span></div>
                    </div>
                </div>

                <div class="file-analyzer-points">
                    <div class="file-analyzer-section-title"><i class="ph ph-seal-check"></i> Why this result?</div>
                    <ul>${whyHtml}</ul>
                </div>

                <div class="file-analyzer-recommendation">
                    <strong><i class="ph ph-shield-warning"></i> Recommended action</strong>
                    <div style="margin-top:.3rem;">${escapeHtml(recommendation)}</div>
                </div>

                <div class="file-analyzer-empty">
                    <strong>Important:</strong>
                    <ul style="margin:.35rem 0 0 1rem;">${limitationsHtml}</ul>
                </div>

                <div class="file-analyzer-actions">
                    <button type="button" class="btn btn-secondary" id="file-analyzer-view-report-btn">
                        <i class="ph ph-file-text"></i> View Full Report
                    </button>
                    <button type="button" class="btn btn-outline-danger hidden" id="file-analyzer-quarantine-status-btn"></button>
                    <button type="button" class="btn btn-primary" id="file-analyzer-new-scan-btn">
                        <i class="ph ph-arrow-counter-clockwise"></i> Analyze Another File
                    </button>
                </div>
            </div>
        `;

        fileAnalyzerResult.classList.remove('hidden');

        const reportButton = document.getElementById('file-analyzer-view-report-btn');
        if (reportButton) {
            reportButton.addEventListener('click', () => {
                if (currentLatestScan) displayReportModal(currentLatestScan);
            });
        }

        const copyHashButton = document.getElementById('file-analyzer-copy-hash-btn');
        if (copyHashButton) {
            copyHashButton.addEventListener('click', async () => {
                const hash = String(result.sha256 || '');
                if (!hash) return;
                try {
                    await navigator.clipboard.writeText(hash);
                    showToast('SHA-256 copied to clipboard.');
                } catch (_) {
                    showToast('Copy failed. Select the SHA-256 value manually.');
                }
            });
        }

        const newScanButton = document.getElementById('file-analyzer-new-scan-btn');
        if (newScanButton) {
            newScanButton.addEventListener('click', () => {
                fileAnalyzerResult.classList.add('hidden');
                fileAnalyzerInput.value = '';
                if (fileAnalyzerName) fileAnalyzerName.textContent = '';
                fileAnalyzerInput.focus();
            });
        }

        const quarantineStatusButton = document.getElementById('file-analyzer-quarantine-status-btn');
        if (quarantineStatusButton && result.quarantine?.quarantined) {
            quarantineStatusButton.textContent = 'Quarantine Applied';
            quarantineStatusButton.classList.remove('hidden');
        }
    }

    async function scanMaliciousFile(file, quarantine) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('quarantine', quarantine ? 'true' : 'false');

        const response = await fetch(`${API_BASE}/scan/file`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Malicious file analysis failed.');
        }
        return data;
    }

    if (fileAnalyzerDropZone && fileAnalyzerInput) {
        ['dragenter', 'dragover'].forEach(eventName => {
            fileAnalyzerDropZone.addEventListener(eventName, event => {
                event.preventDefault();
                event.stopPropagation();
                fileAnalyzerDropZone.classList.add('drag-over');
            });
        });
        ['dragleave', 'drop'].forEach(eventName => {
            fileAnalyzerDropZone.addEventListener(eventName, event => {
                event.preventDefault();
                event.stopPropagation();
                fileAnalyzerDropZone.classList.remove('drag-over');
            });
        });
        fileAnalyzerDropZone.addEventListener('drop', event => {
            const file = event.dataTransfer.files && event.dataTransfer.files[0];
            if (file) {
                setFileAnalyzerSelection(file);
                try {
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    fileAnalyzerInput.files = dt.files;
                } catch (_) {}
            }
        });
        fileAnalyzerInput.addEventListener('change', () => {
            if (fileAnalyzerInput.files && fileAnalyzerInput.files[0]) {
                setFileAnalyzerSelection(fileAnalyzerInput.files[0]);
            }
        });
    }

    if (fileAnalyzerBtn && fileAnalyzerInput) {
        fileAnalyzerBtn.addEventListener('click', async () => {
            if (!currentUser || currentUser.role === 'guest') {
                showLoginPromptModal();
                return;
            }

            const file = fileAnalyzerInput.files && fileAnalyzerInput.files[0];
            if (!file) {
                alert('Please select a file to analyze.');
                return;
            }

            if (file.size <= 0) {
                alert('The selected file is empty.');
                return;
            }
            if (file.size > 50 * 1024 * 1024) {
                alert('The selected file exceeds the 50 MB analysis limit.');
                return;
            }

            refreshFileAnalyzerModelStatus();
            fileAnalyzerBtn.disabled = true;
            fileAnalyzerBtn.innerHTML = '<i class="ph ph-circle-notch ph-spin"></i> Analyzing File...';
            showToast('Running static ML file analysis...', false, true);

            try {
                const data = await scanMaliciousFile(
                    file,
                    Boolean(fileAnalyzerQuarantine && fileAnalyzerQuarantine.checked)
                );
                const result = data.result || {};
                if (data.result && data.result.scan_id) result.scan_id = data.result.scan_id;

                const verdict = String(result.verdict || 'Unknown');
                const normalized = verdict.toLowerCase();
                const record = {
                    id: result.scan_id ? `SCAN-${result.scan_id}` : `SCAN-${Date.now()}`,
                    timestamp: new Date().toLocaleString(),
                    scanType: 'AI Malicious File Analyzer',
                    target: file.name,
                    fullTarget: file.name,
                    isThreat: ['dangerous', 'malicious'].includes(normalized),
                    verdict,
                    confidence: result.confidence || 'model',
                    score: Number(result.score || 0),
                    reasons: Array.isArray(result.reasons) ? result.reasons : [],
                    modalReasons: [
                        `ML classification: ${result.ml?.label || 'unavailable'}`,
                        result.ml?.probabilities?.malicious !== undefined
                            ? `Malicious probability: ${(Number(result.ml.probabilities.malicious) * 100).toFixed(2)}%`
                            : null,
                        Array.isArray(result.assessment?.why) && result.assessment.why.length
                            ? result.assessment.why[0]
                            : null
                    ].filter(Boolean),
                    assessment: result.assessment || null,
                    ml: result.ml || null,
                    staticAnalysis: result.static_analysis || null,
                    sha256: result.sha256,
                    fileType: result.file_type,
                    fileSize: result.size,
                    quarantine: result.quarantine || null,
                    user: currentUser.username
                };

                currentLatestScan = record;
                scanHistory.unshift(record);
                localStorage.setItem('cyberGuard_history', JSON.stringify(scanHistory));

                totalAnalyzed++;
                if (record.isThreat) totalIdentified++;
                localStorage.setItem('cyberGuard_analyzed', totalAnalyzed);
                localStorage.setItem('cyberGuard_identified', totalIdentified);

                updateStatsUI();
                renderFileAnalysisResult(result);
                hideToast();
                showResultModal(record);

                if (result.quarantine && result.quarantine.quarantined) {
                    showToast('File analyzed and moved to application quarantine.');
                }

                fileAnalyzerInput.value = '';
                if (fileAnalyzerName) fileAnalyzerName.textContent = '';
            } catch (error) {
                console.error('AI file analysis error:', error);
                hideToast();
                alert(error.message || 'Unable to analyze the file.');
            } finally {
                fileAnalyzerBtn.disabled = false;
                fileAnalyzerBtn.innerHTML = '<i class="ph ph-brain"></i> Analyze File with AI';
            }
        });
    }


    refreshFileAnalyzerModelStatus();



    // -------------------------------------------------------------
    // Initial Startup
    // -------------------------------------------------------------
   applyTheme(currentTheme);
updateUserUI();

if (currentUser && currentUser.role === 'guest') {
    showView('dashboard');
} else {
    restoreBackendSession();
}

});
