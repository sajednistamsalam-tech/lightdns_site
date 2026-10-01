document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;

    const languageBtn = document.getElementById("languageBtn");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    let currentLanguage = "fa";


    /* =========================================
       LANGUAGE
    ========================================= */

    function updateLanguage() {

        const elements = document.querySelectorAll("[data-fa][data-en]");

        elements.forEach(element => {

            if (currentLanguage === "fa") {
                element.textContent = element.getAttribute("data-fa");
            } else {
                element.textContent = element.getAttribute("data-en");
            }

        });

        if (currentLanguage === "fa") {

            body.classList.remove("en");
            body.setAttribute("dir", "rtl");
            body.setAttribute("lang", "fa");

            languageBtn.textContent = "EN";

            document.querySelectorAll(".nav-links a").forEach(link => {

                const fa = link.getAttribute("data-fa");
                const en = link.getAttribute("data-en");

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

            languageBtn.textContent = "FA";

            document.querySelectorAll(".nav-links a").forEach(link => {

                const fa = link.getAttribute("data-fa");
                const en = link.getAttribute("data-en");

                if (en) {
                    link.textContent = en;
                } else if (fa) {
                    link.textContent = fa;
                }

            });

        }

    }


    languageBtn.addEventListener("click", () => {

        currentLanguage = currentLanguage === "fa" ? "en" : "fa";

        updateLanguage();

    });


    /* =========================================
       MOBILE MENU
    ========================================= */

    mobileMenuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

    });


    document.querySelectorAll(".mobile-menu a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

        });

    });


    /* =========================================
       FAQ
    ========================================= */

    document.querySelectorAll(".faq-question").forEach(button => {

        button.addEventListener("click", () => {

            const item = button.closest(".faq-item");

            document.querySelectorAll(".faq-item").forEach(other => {

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

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(entry.target);

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


    /* =========================================
       CURSOR GLOW
    ========================================= */

    const cursorGlow =
        document.querySelector(".cursor-glow");

    if (cursorGlow) {

        document.addEventListener("mousemove", event => {

            cursorGlow.style.left = event.clientX + "px";
            cursorGlow.style.top = event.clientY + "px";

        });

    }


    /* =========================================
       NAVBAR SCROLL
    ========================================= */

    const navbar =
        document.querySelector(".navbar");

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 30) {

                navbar.style.background =
                    "rgba(5,3,10,.88)";

            } else {

                navbar.style.background =
                    "rgba(5,3,10,.68)";

            }

        },
        {
            passive: true
        }
    );


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
       SMOOTH ANCHOR HANDLING
    ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       INITIAL STATE
    ========================================= */

    updateLanguage();

});
