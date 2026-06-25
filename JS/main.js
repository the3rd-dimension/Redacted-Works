document.addEventListener('DOMContentLoaded', () => {
    const ADMIN_USERNAME = 'Kotrix';
    const ADMIN_PASSWORD = 't3dIsGoat';
    const STORAGE_KEY = 'redactedWorksContent';
    const SESSION_KEY = 'redactedWorksAdminSession';

    const defaultContent = {
        announcements: [
            {
                id: createId(),
                date: '2025-12-17',
                tag: 'NEW FEATURES',
                title: 'Added SCP-1025 & New Diseases',
                body: 'Current diseases: Common Cold - Slower Stamina Regen (0.25 Instead of normal 1). Lung Cancer- Works Like Common Cold. Somoge disease- works like common cold and lung cancer but after some time. Cardiac Arrest- Your heart beat speeds up until you die. A lot of new diseases are planned for future updates.'
            },
            {
                id: createId(),
                date: '2025-12-10',
                tag: 'MAJOR_UPDATE',
                title: 'New Collab & Multiple Major Updates',
                body: 'COLABORATION WITH SCP CB Pelne Spolszczie (SCP CB IN POLISH LAUNGUAGE), IMPROVED MENU, IMPROVED NEW GAME CREATION DIFFICULTIES, SAFE EUCLID KETER, AUDIO SLIDERS, AJUSTABLE FOV, AJUSTABLE MOUSE SENSITIVITY, ADDED SAVE SLOTS, ADDED LAUNGUAGE SETTING, FIXED VOLUMETRIC FOG AND AMBIENT OCCLUSION, ADDED CROUCHING, WAKING UP ANIMATION, IMPROVED INTRO, ADDED CREDITS SEQUENCE, FIXED EVENT CHANCE, ADDED MORE PA SYSTEM DIALOGS IN INTRO SEQUENCE.'
            },
            {
                id: createId(),
                date: '2025-08-11',
                tag: 'DEVLOG',
                title: 'DevLog Stream',
                body: 'SCP CB Unreal Engine Remake Devlog Stream'
            }
        ],
        projects: [
            {
                id: createId(),
                title: 'SCP CB UE5 Edition',
                description: 'A complete port of the original SCP Containment Breach into UE5 with graphical improvements and addons.',
                image: 'Assets/Media/SCP_CB_Cover.png'
            },
            {
                id: createId(),
                title: 'SCP: ER',
                description: 'A multiplayer SCP game where players play as characters from the SCP universe.',
                image: 'Assets/Media/SCP_ER_Cover.png'
            }
        ],
        team: [
            { id: createId(), name: 'Bartosz Kotecki', role: 'Director & Founder', color: 'bg-pink-600', highlight: true },
            { id: createId(), name: 'The 3rd Dimension', role: 'Senior Programmer, 3D Artist & Web Designer', color: 'bg-red-600', highlight: true },
            { id: createId(), name: 'jagaaa', role: 'Programmer & Audio', color: 'bg-yellow-600', highlight: false },
            { id: createId(), name: 'SKYER', role: '3D Artist', color: 'bg-acid', highlight: false },
            { id: createId(), name: 'A4110', role: 'Music & Audio', color: 'bg-blue-600', highlight: false },
            { id: createId(), name: 'Alex1101', role: 'Music & Audio', color: 'bg-blue-600', highlight: false },
            { id: createId(), name: 'PartyX01', role: 'Concept Artist', color: 'bg-orange-600', highlight: false }
        ]
    };

    let content = loadContent();

    function createId() {
        if (window.crypto && typeof window.crypto.randomUUID === 'function') {
            return window.crypto.randomUUID();
        }

        return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }

    function deepClone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function loadContent() {
        const savedContent = localStorage.getItem(STORAGE_KEY);
        if (!savedContent) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContent));
            return deepClone(defaultContent);
        }

        try {
            return JSON.parse(savedContent);
        } catch {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultContent));
            return deepClone(defaultContent);
        }
    }

    function saveContent() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    }

    function isLoggedIn() {
        return sessionStorage.getItem(SESSION_KEY) === 'true';
    }

    function formatDate(date) {
        return date.split('-').join('.');
    }

    function createDeleteButton(type, id) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'admin-delete-button admin-only hover-trigger';
        button.dataset.type = type;
        button.dataset.id = id;
        button.textContent = 'REMOVE';
        return button;
    }

    function renderProjects() {
        const list = document.getElementById('projects-list');
        list.innerHTML = '';

        if (!content.projects.length) {
            list.innerHTML = '<p class="empty-state md:col-span-2">NO PROJECTS PUBLISHED.</p>';
            return;
        }

        content.projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card group relative border border-white/10 bg-white/5 overflow-hidden hover-trigger h-96 gsap-fade-up';

            const imageLayer = document.createElement('div');
            imageLayer.className = 'absolute inset-0 bg-gray-900 z-0';

            const image = document.createElement('div');
            image.className = 'w-full h-full opacity-40 bg-cover bg-center transition-transform duration-700 group-hover:scale-110';
            image.style.backgroundImage = `url("${project.image || 'Assets/Media/SCP_CB_Cover.png'}")`;
            imageLayer.appendChild(image);

            const glitch = document.createElement('div');
            glitch.className = 'glitch-overlay';

            const contentLayer = document.createElement('div');
            contentLayer.className = 'absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/90 to-transparent z-10';

            const row = document.createElement('div');
            row.className = 'flex justify-between items-end gap-4';

            const text = document.createElement('div');
            const title = document.createElement('h3');
            title.className = 'text-2xl font-bold text-white mb-2 group-hover:text-acid transition-colors';
            title.textContent = project.title;

            const description = document.createElement('p');
            description.className = 'text-gray-400 text-sm max-w-xs';
            description.textContent = project.description;

            text.append(title, description);

            const aside = document.createElement('div');
            aside.className = 'flex flex-col items-end gap-3';
            const number = document.createElement('span');
            number.className = 'text-4xl text-white/10 font-bold group-hover:text-acid/20';
            number.textContent = String(index + 1).padStart(2, '0');
            aside.append(number, createDeleteButton('projects', project.id));

            row.append(text, aside);
            contentLayer.appendChild(row);
            card.append(imageLayer, glitch, contentLayer);
            list.appendChild(card);
        });
    }

    function renderAnnouncements() {
        const list = document.getElementById('announcements-list');
        list.innerHTML = '';

        if (!content.announcements.length) {
            list.innerHTML = '<p class="empty-state">NO ANNOUNCEMENTS PUBLISHED.</p>';
            return;
        }

        content.announcements.forEach((post) => {
            const item = document.createElement('div');
            item.className = 'group relative bg-white/[0.03] border-l-2 border-white/10 hover:border-acid p-6 transition-all duration-300 hover:bg-white/[0.05] hover-trigger gsap-fade-up';

            const top = document.createElement('div');
            top.className = 'flex flex-col md:flex-row gap-4 items-start md:items-center justify-between';

            const meta = document.createElement('div');
            meta.className = 'flex flex-col md:flex-row gap-4 md:items-center';

            const date = document.createElement('span');
            date.className = 'font-mono text-xs text-gray-500 border border-white/10 px-2 py-1 rounded';
            date.textContent = formatDate(post.date);

            const tag = document.createElement('span');
            tag.className = 'text-gray-400 text-xs font-bold tracking-wider uppercase';
            tag.textContent = `[${post.tag}]`;

            const title = document.createElement('h3');
            title.className = 'text-lg md:text-xl font-bold text-gray-200 group-hover:text-white group-hover:translate-x-2 transition-transform duration-300';
            title.textContent = post.title;

            meta.append(date, tag, title);

            const actions = document.createElement('div');
            actions.className = 'flex items-center gap-3';
            const arrow = document.createElement('span');
            arrow.className = 'text-acid text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300';
            arrow.textContent = '>';
            actions.append(createDeleteButton('announcements', post.id), arrow);

            const body = document.createElement('p');
            body.className = 'text-gray-500 text-sm mt-2 md:ml-36 max-w-2xl group-hover:text-gray-400 transition-colors';
            body.textContent = post.body;

            top.append(meta, actions);
            item.append(top, body);
            list.appendChild(item);
        });
    }

    function renderTeam() {
        const list = document.getElementById('team-list');
        list.innerHTML = '';

        if (!content.team.length) {
            list.innerHTML = '<p class="empty-state lg:col-span-4">NO TEAM MEMBERS LISTED.</p>';
            return;
        }

        content.team.forEach((member) => {
            const card = document.createElement('div');
            card.className = 'border border-white/10 p-6 hover:border-acid/50 transition-colors duration-300 gsap-fade-up hover-trigger bg-white/[0.02]';

            const dot = document.createElement('div');
            dot.className = `h-2 w-2 ${member.color || 'bg-acid'} mb-4 rounded-full`;

            const titleRow = document.createElement('div');
            titleRow.className = 'flex items-start justify-between gap-3';

            const name = document.createElement('h3');
            name.className = 'text-xl font-bold mb-1';
            name.textContent = member.name;

            const role = document.createElement('p');
            role.className = `text-xs ${member.highlight ? 'text-acid' : 'text-gray-400'} mb-4 uppercase tracking-wider`;
            role.textContent = member.role;

            titleRow.append(name, createDeleteButton('team', member.id));
            card.append(dot, titleRow, role);
            list.appendChild(card);
        });
    }

    function renderContent() {
        renderProjects();
        renderAnnouncements();
        renderTeam();
        renderAdminState();

        if (window.ScrollTrigger) {
            ScrollTrigger.refresh();
        }
    }

    function renderAdminState() {
        const loggedIn = isLoggedIn();
        document.body.classList.toggle('admin-logged-in', loggedIn);
        document.getElementById('admin-login').classList.toggle('hidden', loggedIn);
        document.getElementById('admin-dashboard').classList.toggle('hidden', !loggedIn);
        document.getElementById('admin-logout').classList.toggle('hidden', !loggedIn);
    }

    function addItem(type, item) {
        content[type].unshift({ id: createId(), ...item });
        saveContent();
        renderContent();
    }

    function removeItem(type, id) {
        content[type] = content[type].filter((item) => item.id !== id);
        saveContent();
        renderContent();
    }

    function wireAdminForms() {
        const loginForm = document.getElementById('login-form');
        const loginMessage = document.getElementById('login-message');

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('admin-username').value.trim();
            const password = document.getElementById('admin-password').value;

            if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
                sessionStorage.setItem(SESSION_KEY, 'true');
                loginForm.reset();
                loginMessage.textContent = '';
                renderContent();
                return;
            }

            loginMessage.textContent = 'ACCESS DENIED';
        });

        document.getElementById('admin-logout').addEventListener('click', () => {
            sessionStorage.removeItem(SESSION_KEY);
            renderContent();
        });

        document.getElementById('announcement-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            addItem('announcements', {
                date: formData.get('date'),
                tag: formData.get('tag').trim().toUpperCase(),
                title: formData.get('title').trim(),
                body: formData.get('body').trim()
            });
            event.currentTarget.reset();
            setTodayOnDateInput();
        });

        document.getElementById('team-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            addItem('team', {
                name: formData.get('name').trim(),
                role: formData.get('role').trim(),
                color: formData.get('color'),
                highlight: false
            });
            event.currentTarget.reset();
        });

        document.getElementById('project-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            addItem('projects', {
                title: formData.get('title').trim(),
                description: formData.get('description').trim(),
                image: formData.get('image').trim() || 'Assets/Media/SCP_CB_Cover.png'
            });
            event.currentTarget.reset();
        });

        document.addEventListener('click', (event) => {
            const deleteButton = event.target.closest('.admin-delete-button');
            if (!deleteButton || !isLoggedIn()) {
                return;
            }

            const confirmed = confirm('Remove this item?');
            if (confirmed) {
                removeItem(deleteButton.dataset.type, deleteButton.dataset.id);
            }
        });
    }

    function setTodayOnDateInput() {
        const dateInput = document.querySelector('#announcement-form input[name="date"]');
        if (dateInput) {
            dateInput.valueAsDate = new Date();
        }
    }

    // --- 1. Custom Cursor Logic ---
    const cursor = document.getElementById('cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseover', (event) => {
        if (event.target.closest('.hover-trigger')) {
            cursor.classList.add('hovered');
        }
    });

    document.addEventListener('mouseout', (event) => {
        if (event.target.closest('.hover-trigger')) {
            cursor.classList.remove('hovered');
        }
    });

    // --- 2. Three.js Background (Data Core) ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
        size: 0.15,
        color: '#ef4444',
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    });

    function animate() {
        targetX = mouseX * 0.001;
        targetY = mouseY * 0.001;

        particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
        particlesMesh.rotation.z += 0.001;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    wireAdminForms();
    setTodayOnDateInput();
    renderContent();

    // --- 3. GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    const title = document.querySelector('.scramble-text');
    const originalText = title.innerText;

    let iterations = 0;
    const interval = setInterval(() => {
        title.innerText = title.innerText.split('')
            .map((letter, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iterations >= originalText.length) {
            clearInterval(interval);
        }
        iterations += 1 / 3;
    }, 30);

    gsap.to('#hero-subtitle', {
        opacity: 1,
        duration: 2,
        delay: 1,
        ease: 'power2.out'
    });

    const heroText = 'Developing High-Quality Experiences using Unreal Engine 5';
    const heroTypewriter = document.querySelector('.typewriter-hero');
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < heroText.length) {
            heroTypewriter.innerHTML += heroText.charAt(typeIndex);
            typeIndex++;
            setTimeout(typeWriter, 50);
        }
    }
    setTimeout(typeWriter, 1500);

    const fadeElements = document.querySelectorAll('.gsap-fade-up');

    fadeElements.forEach(element => {
        gsap.fromTo(element,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 85%',
                }
            }
        );
    });
});
