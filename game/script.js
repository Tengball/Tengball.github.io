// GSAP 등록
gsap.registerPlugin(ScrollTrigger);

// 텍스트 글자별 분리 함수
function splitTextIntoChars(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    const chars = text.split('');
    chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        element.appendChild(span);
    });
    
    return element.querySelectorAll('span');
}

// 페이지 로드 애니메이션
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const heroLines = document.querySelectorAll('.hero-line');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    setTimeout(() => {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                preloader.style.display = 'none';
                
                // 각 라인의 텍스트를 글자별로 분리
                heroLines.forEach((line, lineIndex) => {
                    const chars = splitTextIntoChars(line);
                    
                    // 세 번째 라인에 그라데이션 클래스 추가
                    if (lineIndex === 2) {
                        line.classList.add('gradient-text');
                    }
                    
                    // 글자별 애니메이션
                    gsap.fromTo(chars,
                        {
                            opacity: 0,
                            y: 100,
                            rotationX: -90
                        },
                        {
                            opacity: 1,
                            y: 0,
                            rotationX: 0,
                            duration: 0.8,
                            stagger: 0.03,
                            ease: 'back.out(1.5)',
                            delay: lineIndex * 0.3
                        }
                    );
                });
                
                // 서브타이틀 애니메이션
                gsap.to(heroSubtitle, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    delay: 1.5,
                    ease: 'power2.out'
                });
            }
        });
    }, 1500);
});

// 커스텀 커서
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) ;
    cursorY += (mouseY - cursorY) ;
    
    followerX += (mouseX - followerX) * 0.8;
    followerY += (mouseY - followerY) * 0.8;
    
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    cursorFollower.style.transform = `translate3d(${followerX - 10}px, ${followerY - 10}px, 0)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// 링크 호버 효과
const links = document.querySelectorAll('button, .nav-toggle');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
    });
    
    link.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
    });
});

// 스크롤 프로그레스 바
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
});

// 네비게이션 스크롤 효과
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// About 섹션 카운터 애니메이션 (수정)
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    const label = stat.nextElementSibling.textContent;
                    stat.textContent = target + (label.includes('협업 프로젝트') || label.includes('실무 경험') || label.includes('대외 활동') ? '+' : '');
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 30);
        }
    });
});
// About 섹션 애니메이션 (새로 추가)
gsap.from('.image-wrapper', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    scale: 0.8,
    opacity: 0,
    duration: 1.2,
    ease: 'back.out(1.3)'
});

gsap.from('.about-description', {
    scrollTrigger: {
        trigger: '.about-description',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
});


gsap.from('.about-description2 .stat-item', {
    scrollTrigger: {
        trigger: '.about-description2',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
});


gsap.from('.about-stats .stat-item', {
    scrollTrigger: {
        trigger: '.about-stats',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
});

gsap.from('.info-item', {
    scrollTrigger: {
        trigger: '.about-info',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out'
});


// Experience 섹션 타임라인 애니메이션 (새로 추가)
gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: -50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power2.out'
    });
});

// Timeline 선 애니메이션
gsap.utils.toArray('.timeline').forEach(timeline => {
    gsap.from(timeline.querySelector('::before'), {
        scrollTrigger: {
            trigger: timeline,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power2.out'
    });
});


// 섹션 페이드인 애니메이션
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section.querySelectorAll('.section-title, .section-number'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1
    });
});

// 프로젝트 패럴랙스 효과 (기존 코드를 찾아서 이것으로 교체)
gsap.utils.toArray('.project-item').forEach((project, index) => {
    const image = project.querySelector('.project-image-wrapper');
    const info = project.querySelector('.project-info');
    
    gsap.from(image, {
        scrollTrigger: {
            trigger: project,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 1
        },
       
        opacity: 0
    });
    
    // 짝수 프로젝트(02, 04)는 오른쪽에서 왼쪽으로
    const xDirection = (index + 1) % 2 === 0 ? 50 : -50;
    
    gsap.from(info.children, {
        scrollTrigger: {
            trigger: project,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: xDirection,
        opacity: 0,
        duration: 1,
        stagger: 0.15
    });
});


// 스킬바 애니메이션
const skillBars = document.querySelectorAll('.skill-progress');

skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    
    ScrollTrigger.create({
        trigger: bar,
        start: 'top 85%',
        onEnter: () => {
            gsap.to(bar, {
                width: progress + '%',
                duration: 1.5,
                ease: 'power2.out'
            });
        }
    });
});

// About 이미지 패럴랙스
gsap.to('.image-placeholder', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
    },
    y: -50
});

// 내비/섹션 앵커만 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // #about, #projects 같은 내부 앵커일 때만 기본 동작 막기
        if (href.startsWith('#') && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});



// 모바일 네비게이션 토글
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// 스크롤 인디케이터 페이드아웃
gsap.to('.hero-scroll', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    opacity: 0,
    y: 20
});

// Contact 섹션 애니메이션
gsap.from('.contact-email', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    },
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)'
});

gsap.from('.social-link', {
    scrollTrigger: {
        trigger: '.contact-social',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

// 프로젝트 호버 효과 강화 (기존 코드를 찾아서 이것으로 교체)
document.querySelectorAll('.project-item').forEach(project => {
    project.addEventListener('mouseenter', () => {
        gsap.to(project.querySelector('.project-number'), {
            fontSize: '6rem',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    project.addEventListener('mouseleave', () => {
        gsap.to(project.querySelector('.project-number'), {
            fontSize: '5rem',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// index.html에서만: 쿼리 파라미터를 보고 Projects 섹션으로 스크롤
window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');

    if (from === 'projects') {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            window.scrollTo({
                top: projectsSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }

        // 주소창에서 ?from=projects 제거 (새로고침 시 인트로부터 시작)
        if (window.history && window.history.replaceState) {
            const cleanUrl = window.location.pathname; // 예: /index.html
            window.history.replaceState({}, '', cleanUrl);
        }
    }
});


window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');

    let targetId = null;
    if (from === 'projects') targetId = 'projects';
    if (from === 'contact')  targetId = 'contact';

    if (targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }

        // 새로고침 시 인트로부터 보이도록 쿼리 제거
        if (window.history && window.history.replaceState) {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, '', cleanUrl);
        }
    }
});


// Contact 텍스트 페이드인
gsap.from('.contact-text', {
    scrollTrigger: {
        trigger: '.contact-text',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 20,
    duration: 0.9,
    ease: 'power2.out'
});

// Timeline 토글 기능
document.querySelectorAll('.timeline-content').forEach(content => {
    content.addEventListener('click', function(e) {
        const item = this.closest('.timeline-item');
        const detailText = item.querySelector('.timeline-text-detail');
        const summary = item.querySelector('.timeline-text-summary');
        const toggleText = item.querySelector('.toggle-text');
        const toggleButton = item.querySelector('.timeline-toggle');
        
        if (detailText.style.display === 'none' || !detailText.style.display) {
            detailText.style.display = 'block';
            summary.style.display = 'none';
            toggleText.textContent = '접기';
            toggleButton.classList.add('active');
        } else {
            detailText.style.display = 'none';
            summary.style.display = 'inline';
            toggleText.textContent = '상세보기';
            toggleButton.classList.remove('active');
        }
    });
});
