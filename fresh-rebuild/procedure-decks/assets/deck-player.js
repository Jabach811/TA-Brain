(() => {
  const deck = document.querySelector("[data-deck]");
  if (!deck) return;
  const slides = Array.from(deck.querySelectorAll(".slide"));
  const progress = document.querySelector("[data-progress]");
  const setProgress = () => {
    const idx = Math.max(0, Math.round(deck.scrollTop / window.innerHeight));
    if (progress) progress.textContent = (idx + 1) + " / " + slides.length;
  };
  const go = delta => {
    const idx = Math.max(0, Math.min(slides.length - 1, Math.round(deck.scrollTop / window.innerHeight) + delta));
    slides[idx].scrollIntoView({ behavior: "smooth", block: "start" });
  };
  document.querySelector("[data-prev]")?.addEventListener("click", () => go(-1));
  document.querySelector("[data-next]")?.addEventListener("click", () => go(1));
  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.innerHTML = '<button type="button" aria-label="Close image preview">&times;</button><img alt="">';
  document.body.appendChild(lightbox);
  const lightboxImg = lightbox.querySelector("img");
  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightboxImg.removeAttribute("src");
  };
  deck.querySelectorAll(".image-frame img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.currentSrc || img.src;
      lightbox.classList.add("open");
    });
  });
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox || event.target.tagName === "BUTTON") closeLightbox();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    if (event.key === "ArrowRight" || event.key === "PageDown") go(1);
    if (event.key === "ArrowLeft" || event.key === "PageUp") go(-1);
  });
  deck.addEventListener("scroll", () => requestAnimationFrame(setProgress), { passive: true });
  setProgress();
})();
