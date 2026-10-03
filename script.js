document.addEventListener("DOMContentLoaded", () => {

const body = document.body;

const languageBtn = document.getElementById("languageBtn");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

const navbar = document.querySelector(".navbar");
const cursorGlow = document.querySelector(".cursor-glow");

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");
const heroVisual = document.querySelector(".hero-visual");

let currentLanguage = "fa";
let ticking = false;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* =========================================
   LANGUAGE
========================================= */

function updateLanguage() {

    const elements = document.querySelectorAll(
        "[data-fa][data-en]"
    );

    elements.forEach(element => {

        const fa = element.getAttribute("data-fa");
        const en = element.getAttribute("data-en");

        if (currentLanguage === "fa") {
            element.textContent = fa;
        } else {
            element.textContent = en;
        }

    });


    if (currentLanguage === "fa") {

        body.classList.remove("en");
        body.setAttribute("dir", "rtl");
        body.setAttribute("lang", "fa");

        if (languageBtn) {
            languageBtn.textContent = "EN";
        }

    } else {

        body.classList.add("en");
        body.setAttribute("dir", "ltr");
        body.setAttribute("lang", "en");

        if (languageBtn) {
            languageBtn.textContent = "FA";
        }

    }

}


if (languageBtn) {

    languageBtn.addEventListener("click", () => {

        currentLanguage =
            currentLanguage === "fa"
                ? "en"
                : "fa";

        updateLanguage();

    });

}


/* =========================================
   MOBILE MENU
========================================= */

function closeMobileMenu() {

    if (!mobileMenu) {
        return;
    }

    mobileMenu.classList.remove("open");

    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute(
            "aria-expanded",
            "false"
        );
    }

}


if (mobileMenuBtn && mobileMenu) {

    mobileMenuBtn.setAttribute(
        "aria-expanded",
        "false"
    );


    mobileMenuBtn.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");

        mobileMenuBtn.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    mobileMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    document.addEventListener("click", event => {

        if (
            !mobileMenu.contains(event.target) &&
            !mobileMenuBtn.contains(event.target)
        ) {
            closeMobileMenu();
        }

    });

}


/* =========================================
   FAQ
========================================= */

document
    .querySelectorAll(".faq-question")
    .forEach(button => {

        button.addEventListener("click", () => {

            const item =
                button.closest(".faq-item");

            if (!item) {
                return;
            }

            const wasActive =
                item.classList.contains("active");


            document
                .querySelectorAll(".faq-item")
                .forEach(other => {

                    other.classList.remove("active");

                });


            if (!wasActive) {

                item.classList.add("active");

            }

        });

    });


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


if (
    "IntersectionObserver" in window &&
    !reducedMotion
) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.10,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("visible");

    });

}


/* =========================================
   CURSOR GLOW
========================================= */

if (
    cursorGlow &&
    !reducedMotion &&
    window.matchMedia("(pointer: fine)").matches
) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        },
        {
            passive: true
        }
    );


    function animateCursor() {

        glowX +=
            (mouseX - glowX) * 0.10;

        glowY +=
            (mouseY - glowY) * 0.10;


        cursorGlow.style.transform =
            `translate3d(${glowX}px, ${glowY}px, 0)`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();

}


/* =========================================
   NAVBAR
========================================= */

function updateNavbar() {

    if (!navbar) {
        return;
    }

    const scrolled =
        window.scrollY > 24;


    navbar.classList.toggle(
        "scrolled",
        scrolled
    );


    if (scrolled) {

        navbar.style.background =
            "rgba(5, 3, 10, .88)";

        navbar.style.borderBottomColor =
            "rgba(255, 255, 255, .08)";

    } else {

        navbar.style.background =
            "rgba(5, 3, 10, .62)";

        navbar.style.borderBottomColor =
            "rgba(255, 255, 255, .05)";

    }

}


/* =========================================
   SCROLL BACKGROUND
========================================= */

function updateScrollBackground() {

    const scrollY = window.scrollY;
    const documentHeight =
        document.documentElement.scrollHeight;

    const viewportHeight =
        window.innerHeight;

    const maxScroll =
        Math.max(
            1,
            documentHeight - viewportHeight
        );

    const progress =
        Math.min(
            1,
            Math.max(
                0,
                scrollY / maxScroll
            )
        );


    body.style.setProperty(
        "--scroll-progress",
        progress.toFixed(3)
    );


    const sections =
        document.querySelectorAll(
            "main > section, section"
        );


    let activeSection = null;
    let smallestDistance = Infinity;


    sections.forEach(section => {

        const rect =
            section.getBoundingClientRect();

        const distance =
            Math.abs(
                rect.top -
                window.innerHeight * 0.35
            );


        if (distance < smallestDistance) {

            smallestDistance = distance;
            activeSection = section;

        }

    });


    if (activeSection) {

        const sectionId =
            activeSection.id ||
            activeSection.dataset.theme ||
            "";


        body.setAttribute(
            "data-active-section",
            sectionId
        );

    }

}


/* =========================================
   HERO PARALLAX
========================================= */

if (
    hero &&
    heroVisual &&
    !reducedMotion &&
    window.innerWidth > 900
) {

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    hero.addEventListener(
        "mousemove",
        event => {

            const rect =
                hero.getBoundingClientRect();

            if (
                rect.width === 0 ||
                rect.height === 0
            ) {
                return;
            }


            const x =
                (event.clientX - rect.left)
                / rect.width;

            const y =
                (event.clientY - rect.top)
                / rect.height;


            targetX =
                (x - 0.5) * 14;

            targetY =
                (y - 0.5) * -10;

        },
        {
            passive: true
        }
    );


    hero.addEventListener(
        "mouseleave",
        () => {

            targetX = 0;
            targetY = 0;

        }
    );


    function animateHeroParallax() {

        currentX +=
            (targetX - currentX) * 0.055;

        currentY +=
            (targetY - currentY) * 0.055;


        if (heroContent) {

            heroContent.style.transform =
                `translate3d(
                    ${currentX * -0.12}px,
                    ${currentY * -0.08}px,
                    0
                )`;

        }


        heroVisual.style.transform =
            `translate3d(
                ${currentX}px,
                ${currentY}px,
                0
            )`;


        requestAnimationFrame(
            animateHeroParallax
        );

    }


    animateHeroParallax();

}


/* =========================================
   HERO POINTER LIGHT
========================================= */

if (
    hero &&
    !reducedMotion &&
    window.matchMedia("(pointer: fine)").matches
) {

    hero.addEventListener(
        "pointermove",
        event => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left)
                / rect.width) * 100;

            const y =
                ((event.clientY - rect.top)
                / rect.height) * 100;


            hero.style.setProperty(
                "--pointer-x",
                `${x}%`
            );

            hero.style.setProperty(
                "--pointer-y",
                `${y}%`
            );

        },
        {
            passive: true
        }
    );

}


/* =========================================
   SCROLL EVENTS
========================================= */

function handleScroll() {

    if (ticking) {
        return;
    }

    ticking = true;


    requestAnimationFrame(() => {

        updateNavbar();
        updateScrollBackground();

        ticking = false;

    });

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    () => {

        updateNavbar();
        updateScrollBackground();

    },
    {
        passive: true
    }
);


updateNavbar();
updateScrollBackground();


/* =========================================
   SMOOTH ANCHOR HANDLING
========================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const navbarHeight =
                    navbar
                        ? navbar.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top
                    + window.scrollY
                    - navbarHeight
                    - 14;


                window.scrollTo({

                    top: targetPosition,

                    behavior:
                        reducedMotion
                            ? "auto"
                            : "smooth"

                });


                closeMobileMenu();

            }
        );

    });


/* =========================================
   CTA MICRO INTERACTION
========================================= */

document
    .querySelectorAll(
        ".primary-btn, .secondary-btn"
    )
    .forEach(button => {

        button.addEventListener(
            "pointerdown",
            () => {

                button.classList.add(
                    "is-pressed"
                );

            }
        );


        button.addEventListener(
            "pointerup",
            () => {

                button.classList.remove(
                    "is-pressed"
                );

            }
        );


        button.addEventListener(
            "pointerleave",
            () => {

                button.classList.remove(
                    "is-pressed"
                );

            }
        );

    });


/* =========================================
   CURRENT YEAR
========================================= */

const year =
    document.getElementById("year");


if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================
   INITIAL STATE
========================================= */


/* PROGRESS + SPOTLIGHT */
const bar=document.querySelector(".scroll-progress");
function setProgress(){
    if(!bar){return;}
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    bar.style.setProperty("--p",Math.min(1,window.scrollY/max).toFixed(4));
}
window.addEventListener("scroll",setProgress,{passive:true});
setProgress();
document.addEventListener("pointermove",e=>{
    const el=e.target.closest&&e.target.closest(".point,.vip-benefit,.official-link,.faq-item,.step");
    if(!el){return;}
    const r=el.getBoundingClientRect();
    el.style.setProperty("--mx",(e.clientX-r.left)+"px");
    el.style.setProperty("--my",(e.clientY-r.top)+"px");
},{passive:true});


/* NETWORK BACKGROUND */
(function(){
    const host=document.querySelector(".background");
    if(!host||reducedMotion){return;}
    const cv=document.createElement("canvas");
    cv.className="net";
    host.prepend(cv);
    const ctx=cv.getContext("2d");
    const cols=["183,156,255","45,212,255","240,98,192"];
    let w,h,dpr,nodes=[],mx=-9999,my=-9999;
    function size(){
        dpr=Math.min(window.devicePixelRatio||1,2);
        w=cv.width=innerWidth*dpr;
        h=cv.height=innerHeight*dpr;
        const n=Math.round(Math.min(70,innerWidth/20));
        nodes=Array.from({length:n},()=>({
            x:Math.random()*w,y:Math.random()*h,
            vx:(Math.random()-.5)*.3*dpr,vy:(Math.random()-.5)*.3*dpr,
            c:cols[Math.random()*3|0]
        }));
    }
    size();
    window.addEventListener("resize",size,{passive:true});
    window.addEventListener("pointermove",e=>{mx=e.clientX*dpr;my=e.clientY*dpr;},{passive:true});
    function frame(){
        ctx.clearRect(0,0,w,h);
        const L=150*dpr;
        nodes.forEach(n=>{
            n.x+=n.vx;n.y+=n.vy;
            if(n.x<0||n.x>w){n.vx*=-1;}
            if(n.y<0||n.y>h){n.vy*=-1;}
        });
        for(let i=0;i<nodes.length;i++){
            const a=nodes[i];
            for(let j=i+1;j<nodes.length;j++){
                const b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
                if(d<L){
                    ctx.strokeStyle="rgba("+a.c+","+((1-d/L)*.22).toFixed(3)+")";
                    ctx.lineWidth=dpr;
                    ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
                }
            }
            const dm=Math.hypot(a.x-mx,a.y-my);
            if(dm<L*1.5){
                ctx.strokeStyle="rgba(255,255,255,"+((1-dm/(L*1.5))*.35).toFixed(3)+")";
                ctx.lineWidth=dpr;
                ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(mx,my);ctx.stroke();
            }
            ctx.fillStyle="rgba("+a.c+",.75)";
            ctx.beginPath();ctx.arc(a.x,a.y,1.7*dpr,0,6.283);ctx.fill();
        }
        requestAnimationFrame(frame);
    }
    frame();
})();

/* TILT + MAGNETIC */
if(!reducedMotion&&window.matchMedia("(pointer: fine)").matches){
    document.querySelectorAll(".step,.official-link,.creator-card").forEach(el=>{
        el.addEventListener("pointermove",e=>{
            const r=el.getBoundingClientRect();
            const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
            el.style.transition="transform .12s";
            el.style.transform="perspective(900px) rotateX("+(-y*7).toFixed(2)+"deg) rotateY("+(x*9).toFixed(2)+"deg) translateY(-6px)";
        });
        el.addEventListener("pointerleave",()=>{el.style.transform="";el.style.transition="";});
    });
    document.querySelectorAll(".primary-btn,.secondary-btn,.vip-button,.nav-download").forEach(el=>{
        el.addEventListener("pointermove",e=>{
            const r=el.getBoundingClientRect();
            el.style.translate=((e.clientX-r.left-r.width/2)*.18).toFixed(1)+"px "+((e.clientY-r.top-r.height/2)*.28).toFixed(1)+"px";
        });
        el.addEventListener("pointerleave",()=>{el.style.translate="";});
    });
}

updateLanguage();

});
