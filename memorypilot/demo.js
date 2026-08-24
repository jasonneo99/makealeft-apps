(() => {
  const dialog = document.querySelector("#demo-dialog");
  const slides = [...document.querySelectorAll("[data-demo-slide]")];
  const label = document.querySelector("#demo-step-label");
  const progress = document.querySelector(".demo-progress span");
  let current = 0;
  let timer;

  const showSlide = (index) => {
    current = index % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === current));
    label.textContent = `${current + 1} of ${slides.length}`;
    progress.style.animation = "none";
    requestAnimationFrame(() => {
      progress.style.animation = "demo-progress 10s linear forwards";
    });
  };

  const startDemo = () => {
    clearInterval(timer);
    showSlide(0);
    timer = setInterval(() => showSlide(current + 1), 10000);
  };

  document.querySelectorAll("[data-demo-open]").forEach((button) => button.addEventListener("click", () => {
    dialog.showModal();
    startDemo();
    window.gtag?.("event", "demo_start", { product: "memorypilot" });
  }));

  document.querySelector("[data-demo-close]").addEventListener("click", () => dialog.close());
  document.querySelector("[data-demo-replay]").addEventListener("click", startDemo);
  dialog.addEventListener("close", () => clearInterval(timer));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

})();
