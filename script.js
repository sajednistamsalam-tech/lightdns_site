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
