document.addEventListener('DOMContentLoaded', () => {
            
            // --- 1. Custom Cursor Logic ---
            const cursor = document.getElementById('cursor');
            
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });

            const interactiveElements = document.querySelectorAll('.hover-trigger');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
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

            // Create Particles
            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 2000;
            const posArray = new Float32Array(particlesCount * 3);

            for(let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 100;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            // Material - Acid Green
            const material = new THREE.PointsMaterial({
                size: 0.15,
                color: '#ef4444',
                transparent: true,
                opacity: 0.8,
            });

            const particlesMesh = new THREE.Points(particlesGeometry, material);
            scene.add(particlesMesh);

            // Mouse Interaction Variables
            let mouseX = 0;
            let mouseY = 0;
            let targetX = 0;
            let targetY = 0;

            const windowHalfX = window.innerWidth / 2;
            const windowHalfY = window.innerHeight / 2;

            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX - windowHalfX);
                mouseY = (event.clientY - windowHalfY);
            });

            // Animation Loop
            const clock = new THREE.Clock();

            function animate() {
                targetX = mouseX * 0.001;
                targetY = mouseY * 0.001;

                particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);
                particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
                particlesMesh.rotation.z += 0.001; // Constant slow rotation

                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            }
            animate();

            // Resize Handler
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });

            // --- 3. GSAP Animations ---
            gsap.registerPlugin(ScrollTrigger);

            // Text Scramble Effect for Hero Title
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
            const title = document.querySelector('.scramble-text');
            const originalText = title.innerText;
            
            let iterations = 0;
            const interval = setInterval(() => {
                title.innerText = title.innerText.split("")
                    .map((letter, index) => {
                        if(index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)]
                    })
                    .join("");
                
                if(iterations >= originalText.length){ 
                    clearInterval(interval);
                }
                iterations += 1/3; 
            }, 30);

            // Subtitle Reveal
            gsap.to('#hero-subtitle', {
                opacity: 1,
                duration: 2,
                delay: 1,
                ease: "power2.out"
            });

            // Typewriter Effect for Hero Description
            const heroText = "Developing High-Quality Experiences using Unreal Engine 5";
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

            // ScrollTrigger for Sections
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
                        ease: "power4.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                        }
                    }
                );
            });
        });