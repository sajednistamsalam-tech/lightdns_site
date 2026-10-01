const translations = {
  fa: {
    nav_features:"قابلیت‌ها",nav_servers:"سرورها",nav_download:"دانلود",nav_faq:"سؤالات",download:"دانلود",
    eyebrow:"اتصال سریع‌تر، تجربه روان‌تر",hero_title:"اینترنتت را<br><span>سبک‌تر</span> کن.",
    hero_text:"Light DNS یک ابزار ساده و قدرتمند برای انتخاب DNS، کاهش تأخیر و تجربه بهتر در بازی‌ها و اینترنت روزمره است.",
    download_myket:"دریافت از مایکت",learn_more:"بیشتر بدانید",trust_fast:"سریع",trust_servers:"سرورهای متنوع",trust_simple:"ساده و کاربردی",
    preview_status:"وضعیت اتصال",preview_ready:"آماده اتصال",connect:"اتصال",
    stat_one:"اپلیکیشن برای مدیریت DNS",stat_two:"قابل استفاده در هر زمان",stat_three:"تمرکز روی سرعت و سادگی",
    kicker_features:"چرا Light DNS؟",features_title:"ابزارهای مهم، بدون پیچیدگی.",features_text:"انتخاب سرور و DNS را ساده کردیم تا سریع‌تر به چیزی که می‌خواهی برسی.",
    feature_1_title:"Gaming DNS",feature_1_text:"انتخاب DNSهای مناسب برای تجربه روان‌تر در بازی‌های آنلاین.",
    feature_2_title:"سرورهای متنوع",feature_2_text:"چند گزینه برای سناریوهای مختلف، از بازی و دانلود تا استفاده روزمره.",
    feature_3_title:"نمایش تأخیر",feature_3_text:"پینگ و وضعیت اتصال را در محیطی ساده و قابل فهم ببین.",
    feature_4_title:"طراحی سبک",feature_4_text:"رابط کاربری مدرن، سریع و مناسب استفاده روزانه.",
    kicker_servers:"SERVER NETWORK",servers_title:"برای هر نیاز، یک انتخاب.",servers_text:"سرورها و DNSها را مستقیماً داخل اپ انتخاب کن.",
    server_1:"VIP SERVER 1",server_1_text:"سرور وایرگارد گیمینگ اختصاصی برای تجربه بهتر بازی.",
    server_2:"VIP SERVER 2",server_2_text:"DNS ویژه با تمرکز روی پینگ و اتصال پایدار.",
    server_3:"VIP SERVER 3",server_3_text:"گزینه‌ای مناسب برای دانلود و استفاده روزمره.",
    kicker_download:"GET LIGHT DNS",download_title:"سبک‌تر وصل شو.",download_text:"نسخه اندروید Light DNS را از مایکت دریافت کن.",download_now:"دانلود Light DNS",
    kicker_faq:"FAQ",faq_title:"سؤالات متداول",
    faq_1_q:"Light DNS برای چه دستگاهی است؟",faq_1_a:"نسخه فعلی سایت برای معرفی نسخه اندروید Light DNS طراحی شده است.",
    faq_2_q:"آیا استفاده از برنامه رایگان است؟",faq_2_a:"نسخه رایگان برنامه در دسترس است و برخی امکانات ویژه نیز به‌صورت جداگانه ارائه می‌شوند.",
    faq_3_q:"از کجا برنامه را دانلود کنم؟",faq_3_a:"روی دکمه دانلود بزن تا وارد صفحه رسمی Light DNS در مایکت شوی.",
    footer:"© 2026 Light DNS. All rights reserved.",back_top:"بازگشت به بالا ↑"
  },
  en: {
    nav_features:"Features",nav_servers:"Servers",nav_download:"Download",nav_faq:"FAQ",download:"Download",
    eyebrow:"Faster connection, smoother experience",hero_title:"Make your internet<br><span>lighter.</span>",
    hero_text:"Light DNS is a simple, powerful tool for choosing DNS servers, reducing latency and improving your everyday and gaming experience.",
    download_myket:"Get it on Myket",learn_more:"Explore more",trust_fast:"Fast",trust_servers:"Multiple servers",trust_simple:"Simple & useful",
    preview_status:"Connection status",preview_ready:"Ready to connect",connect:"Connect",
    stat_one:"app for DNS management",stat_two:"Available around the clock",stat_three:"Built around speed & simplicity",
    kicker_features:"WHY LIGHT DNS?",features_title:"Powerful essentials. No complexity.",features_text:"Choose a server and DNS quickly, without getting lost in technical details.",
    feature_1_title:"Gaming DNS",feature_1_text:"DNS options designed for a smoother experience in online games.",
    feature_2_title:"Multiple servers",feature_2_text:"Different options for gaming, downloads and everyday use.",
    feature_3_title:"Latency display",feature_3_text:"See ping and connection status in a clean, easy-to-read interface.",
    feature_4_title:"Lightweight design",feature_4_text:"A modern, fast interface made for everyday use.",
    kicker_servers:"SERVER NETWORK",servers_title:"One choice for every need.",servers_text:"Choose your server and DNS directly inside the app.",
    server_1:"VIP SERVER 1",server_1_text:"Dedicated WireGuard gaming server for a better gaming experience.",
    server_2:"VIP SERVER 2",server_2_text:"Special DNS focused on ping and stable connectivity.",
    server_3:"VIP SERVER 3",server_3_text:"A suitable option for downloads and everyday use.",
    kicker_download:"GET LIGHT DNS",download_title:"Connect lighter.",download_text:"Get the Android version of Light DNS from Myket.",download_now:"Download Light DNS",
    kicker_faq:"FAQ",faq_title:"Frequently asked questions",
    faq_1_q:"Which devices support Light DNS?",faq_1_a:"This website currently presents the Android version of Light DNS.",
    faq_2_q:"Is the app free?",faq_2_a:"A free version is available, with selected special features offered separately.",
    faq_3_q:"Where can I download it?",faq_3_a:"Use any download button to open the official Light DNS page on Myket.",
    footer:"© 2026 Light DNS. All rights reserved.",back_top:"Back to top ↑"
  }
};

let lang = localStorage.getItem("lightdns-lang") || "fa";
const langBtn = document.getElementById("langBtn");

function applyLanguage(next) {
  lang = next;
  const isFa = lang === "fa";
  document.documentElement.lang = lang;
  document.documentElement.dir = isFa ? "rtl" : "ltr";
  document.body.classList.toggle("en", !isFa);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key] !== undefined) el.innerHTML = translations[lang][key];
  });
  langBtn.textContent = isFa ? "EN" : "FA";
  localStorage.setItem("lightdns-lang", lang);
}
langBtn.addEventListener("click", () => applyLanguage(lang === "fa" ? "en" : "fa"));
applyLanguage(lang);

const demo = document.getElementById("demoConnect");
const demoPing = document.getElementById("demoPing");
demo.addEventListener("click", () => {
  const active = demo.classList.toggle("active");
  demo.textContent = active ? (lang === "fa" ? "متصل شد" : "Connected") : (lang === "fa" ? "اتصال" : "Connect");
  demoPing.textContent = active ? "18 ms" : "32 ms";
});
