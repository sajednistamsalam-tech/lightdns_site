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
    const phone = document.querySelector(".phone");

    let currentLanguage = "fa";


    /* =========================================
       LANGUAGE
    ========================================= */

    function updateLanguage() {

        const elements = document.querySelectorAll("[data-fa][data-en]");

        elements.forEach(element => {

            if (currentLanguage === "fa") {

                element.textContent =
                    element.getAttribute("data-fa");

            } else {

                element.textContent =
                    element.getAttribute("data-en");

            }

        });


        if (currentLanguage === "fa") {

            body.classList.remove("en");
            body.setAttribute("dir", "rtl");
            body.setAttribute("lang", "fa");

            if (languageBtn) {
                languageBtn.textContent = "EN";
            }

            document
                .querySelectorAll(".nav-links a")
                .forEach(link => {

                    const fa =
                        link.getAttribute("data-fa");

                    const en =
                        link.getAttribute("data-en");

                    if (fa) {
                        link.textContent = fa;
                    } else if (en) {
                        link.textContent = en;
                    }

                });

        } else {

            body.classList.add("en");
            body.setAttribute("dir", "ltr");
            body.setAttribute("lang", "en");

            if (languageBtn) {
                languageBtn.textContent = "FA";
            }

            document
                .querySelectorAll(".nav-links a")
                .forEach(link => {

                    const fa =
                        link.getAttribute("data-fa");

                    const en =
                        link.getAttribute("data-en");

                    if (en) {
                        link.textContent = en;
                    } else if (fa) {
                        link.textContent = fa;
                    }

                });

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

    if (mobileMenuBtn && mobileMenu) {

        mobileMenuBtn.addEventListener("click", () => {

            mobileMenu.classList.toggle("open");

        });


        document
            .querySelectorAll(".mobile-menu a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mobileMenu.classList.remove("open");

                });

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

                document
                    .querySelectorAll(".faq-item")
                    .forEach(other => {

                        if (other !== item) {
                            other.classList.remove("active");
                        }

                    });

                item.classList.toggle("active");

            });

        });


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("visible");

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
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

    if (cursorGlow) {

        let mouseX = 0;
        let mouseY = 0;

        let glowX = 0;
        let glowY = 0;


        document.addEventListener("mousemove", event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        });


        function animateCursor() {

            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;

            cursorGlow.style.left =
                glowX + "px";

            cursorGlow.style.top =
                glowY + "px";

            requestAnimationFrame(
                animateCursor
            );

        }

        animateCursor();

    }


    /* =========================================
       NAVBAR SCROLL
    ========================================= */

    function updateNavbar() {

        if (!navbar) {
            return;
        }

        if (window.scrollY > 30) {

            navbar.style.background =
                "rgba(5,3,10,.90)";

            navbar.style.borderBottomColor =
                "rgba(255,255,255,.08)";

        } else {

            navbar.style.background =
                "rgba(5,3,10,.68)";

            navbar.style.borderBottomColor =
                "rgba(255,255,255,.05)";

        }

    }


    window.addEventListener(
        "scroll",
        updateNavbar,
        {
            passive: true
        }
    );


    updateNavbar();


    /* =========================================
       HERO MOUSE PARALLAX
    ========================================= */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        hero &&
        heroVisual &&
        phone &&
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

                const x =
                    (event.clientX - rect.left)
                    / rect.width;

                const y =
                    (event.clientY - rect.top)
                    / rect.height;

                targetX =
                    (x - 0.5) * 12;

                targetY =
                    (y - 0.5) * -10;

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
                (targetX - currentX) * 0.06;

            currentY +=
                (targetY - currentY) * 0.06;


            phone.style.transform =
                `rotate(${4 + currentX * 0.12}deg)
                 translate3d(${currentX}px, ${currentY}px, 0)`;


            requestAnimationFrame(
                animateHeroParallax
            );

        }


        animateHeroParallax();

    }


    /* =========================================
       HERO CTA FEEDBACK
    ========================================= */

    document
        .querySelectorAll(".primary-btn")
        .forEach(button => {

            button.addEventListener(
                "mouseenter",
                () => {

                    button.style.transition =
                        "transform .25s ease, box-shadow .25s ease";

                }
            );

        });


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
                        document.querySelector(targetId);

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
                        - 12;


                    window.scrollTo({
                        top: targetPosition,
                        behavior: reducedMotion
                            ? "auto"
                            : "smooth"
                    });

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

    updateLanguage();

});
