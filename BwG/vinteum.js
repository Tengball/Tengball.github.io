// GSAP + ScrollTrigger 등록
gsap.registerPlugin(ScrollTrigger);

// 각 이미지/캡션 등장 애니메이션
gsap.utils.toArray('.project-shot').forEach((shot, index) => {
    const img = shot.querySelector('.project-shot-image');
    const caption = shot.querySelector('.project-shot-caption');

    // 이미지: 아래에서 위로 + 페이드인 + 약간 스케일 업
    gsap.from(img, {
        scrollTrigger: {
            trigger: shot,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: 'power2.out'
    });

    // 캡션: 약간 더 나중에 부드럽게
    if (caption) {
        gsap.from(caption, {
            scrollTrigger: {
                trigger: shot,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 20,
            opacity: 0,
            duration: 0.7,
            delay: 0.1,
            ease: 'power2.out'
        });
    }
});

// 상단 네비 살짝 그림자 추가 (스크롤 시)
const detailNav = document.querySelector('.detail-nav');

if (detailNav) {
    window.addEventListener('scroll', () => {
        const y = window.scrollY || window.pageYOffset;
        detailNav.style.boxShadow = y > 10
            ? '0 4px 20px rgba(15, 23, 42, 0.06)'
            : 'none';
    });
}

// 뒤로가기 클릭 시, index.html로 이동하되 해시는 남기지 않고,
// index에서만 projects 섹션으로 부드럽게 스크롤하는 방식

const backToProjects = document.getElementById('back-to-projects');

if (backToProjects) {
    backToProjects.addEventListener('click', function (e) {
        e.preventDefault();
        // 해시 없이 index.html로만 이동
        window.location.href = 'index.html?from=projects';
    });
}
