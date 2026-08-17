const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".mobile-sidebar");
const closeBtn = document.querySelector(".close-sidebar");
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("section");

hamburger.addEventListener("click", () => {
    sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");
        if (item.getAttribute("href").includes(current)) {
            item.classList.add("active");
        }
    });

    const glassNav = document.querySelector(".glass-nav");
    if(window.scrollY > 50) {
        glassNav.style.background = "rgba(255, 255, 255, 0.9)";
        glassNav.style.boxShadow = "0 20px 50px rgba(0,0,0,0.1)";
    } else {
        glassNav.style.background = "rgba(255, 255, 255, 0.18)";
        glassNav.style.boxShadow = "0 15px 45px rgba(0, 0, 0, 0.08)";
    }
});

document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
});

document.addEventListener("mousemove", (e) => {
    const glow = document.querySelector(".hero-glow");
    if(glow) {
        glow.style.left = (e.clientX - 350) + "px";
        glow.style.top = (e.clientY - 350) + "px";
    }
});
const stats = document.querySelectorAll('.stat-number');
const speed = 200;

const startCounters = () => {
    stats.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsContainer = document.querySelector('.stats-grid-container');
if(statsContainer) statsObserver.observe(statsContainer);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
const serviceReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(60px)";
    card.style.transition = "all 0.9s cubic-bezier(0.165, 0.84, 0.44, 1)";
    serviceReveal.observe(card);
});
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
});

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.style.transitionDelay = `${(index % 4) * 0.1}s`;
});
const whyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => whyObserver.observe(el));
