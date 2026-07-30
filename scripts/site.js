const contactDrawer = document.querySelector("[data-contact-drawer]");
const contactOpeners = Array.from(document.querySelectorAll("[data-contact-open]"));
const contactCloser = document.querySelector("[data-contact-close]");
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const tabContainer = document.querySelector("[data-tabs]");
const tabTriggers = Array.from(document.querySelectorAll("[data-tab-target]"));
const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));
const conversationForm = document.querySelector("[data-conversation-form]");
const conversationFormEl = document.querySelector("[data-conversation-form-el]");
const conversationSuccess = document.querySelector("[data-conversation-success]");

// 구글 시트에 연동된 Apps Script 웹 앱 URL을 여기에 붙여넣으세요.
const CONTACT_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

if (conversationFormEl) {
  const messageField = conversationFormEl.querySelector("textarea[name='message']");
  if (messageField) {
    const autoGrow = () => {
      messageField.style.height = "auto";
      messageField.style.height = messageField.scrollHeight + "px";
    };
    messageField.addEventListener("input", autoGrow);
  }

  conversationFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = conversationFormEl.querySelector(".conversation-submit");
    const formData = new FormData(conversationFormEl);
    const payload = {
      company: formData.get("name") || "",
      manager: formData.get("manager") || "",
      contact: formData.get("contact") || "",
      message: formData.get("message") || ""
    };

    submitButton.disabled = true;
    submitButton.classList.add("is-loading");
    submitButton.textContent = "전송 중...";

    fetch(CONTACT_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then(() => {
        conversationFormEl.reset();
        if (messageField) messageField.style.height = "auto";
        conversationFormEl.hidden = true;
        if (conversationSuccess) conversationSuccess.hidden = false;
      })
      .catch(() => {
        alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.classList.remove("is-loading");
        submitButton.textContent = "문의하기";
      });
  });
}

const revealVisibleItems = (scope) => {
  Array.from(scope.querySelectorAll(".reveal")).forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) item.classList.add("is-visible");
  });
};

const setActiveTab = (id, options = {}) => {
  const nextPanel = tabPanels.find((panel) => panel.dataset.tabPanel === id);
  if (!nextPanel) return;

  tabPanels.forEach((panel) => {
    const isActive = panel === nextPanel;
    panel.hidden = !isActive;
    panel.classList.toggle("is-active", isActive);
  });

  tabTriggers.forEach((trigger) => {
    const isActive = trigger.dataset.tabTarget === id;
    trigger.classList.toggle("is-current", isActive);
  });

  if (options.updateHash) {
    history.replaceState(null, "", `#${id}`);
  }

  if (options.scroll && tabContainer) {
    tabContainer.scrollIntoView({
      behavior: options.instant ? "auto" : "smooth",
      block: "start"
    });
  }

  window.requestAnimationFrame(() => revealVisibleItems(nextPanel));
};

const openContact = () => {
  contactDrawer?.classList.add("is-open");
  contactDrawer?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (conversationFormEl && conversationFormEl.hidden) {
    conversationFormEl.hidden = false;
    if (conversationSuccess) conversationSuccess.hidden = true;
  }
};

const closeContact = () => {
  contactDrawer?.classList.remove("is-open");
  contactDrawer?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

const tabFromHash = () => {
  const id = window.location.hash.replace("#", "");
  return tabPanels.some((panel) => panel.dataset.tabPanel === id) ? id : null;
};

contactOpeners.forEach((button) => button.addEventListener("click", openContact));
contactCloser?.addEventListener("click", closeContact);
contactDrawer?.addEventListener("click", (event) => {
  if (event.target === contactDrawer) closeContact();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeContact();
});

tabTriggers.forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveTab(trigger.dataset.tabTarget, { scroll: true, updateHash: true });
    closeContact();
  });
});

window.addEventListener("hashchange", () => {
  const id = tabFromHash();
  if (id) setActiveTab(id, { scroll: true });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("is-visible", entry.isIntersecting);
  });
}, {
  rootMargin: "0px 0px -12% 0px",
  threshold: 0.12
});

revealItems.forEach((item) => revealObserver.observe(item));
setActiveTab(tabFromHash() || "main");

window.addEventListener("load", () => {
  if (window.lucide) window.lucide.createIcons();
  revealItems.slice(0, 3).forEach((item) => item.classList.add("is-visible"));
  const id = tabFromHash();
  setActiveTab(id || "main", { scroll: Boolean(id), instant: true });
});







const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerClose = document.querySelector(".viewer-close");
const viewerPrev = document.querySelector(".viewer-prev");
const viewerNext = document.querySelector(".viewer-next");
const viewerThumbs = document.getElementById("viewerThumbs");
let currentProject = [];
let currentIndex = 0;




let projects = {};
const portfolioGridEl = document.querySelector("[data-portfolio-grid]");

fetch("portfolio.json")
  .then((res) => res.json())
  .then((data) => {
    const items = data.items;
    items.forEach((item) => {
      projects[item.id] = item.images;
    });

    if (portfolioGridEl) {
      portfolioGridEl.innerHTML = items
        .map((item) => {
          const labelText =
            item.category === "brand"
              ? item.brand
              : item.category === "personal"
              ? "Profile"
              : capitalize(item.category);
          return `
            <article class="portfolio-card" data-category="${item.category}">
              <figure>
                <img class="project-trigger" data-project="${item.id}" src="${item.images[0]}">
                <div class="portfolio-overlay">
                  ${item.title ? `<span class="portfolio-overlay-title">${item.title}</span>` : ""}
                  <span class="portfolio-overlay-meta">${[item.date, labelText].filter(Boolean).join(" · ")}</span>
                </div>
              </figure>
            </article>
          `;
        })
        .join("");
    }

    // 히어로 배경: 무작위 16장을 4장씩 4묶음으로 나눠 그룹 단위로 페이드
    const heroSlidesEl = document.querySelector("[data-hero-slides]");
    if (heroSlidesEl) {
      const allImages = items.flatMap((item) => item.images);
      const shuffled = allImages.sort(() => Math.random() - 0.5);
      const heroPicks = shuffled.slice(0, 16);

      const groups = [];
      for (let i = 0; i < heroPicks.length; i += 4) {
        groups.push(heroPicks.slice(i, i + 4));
      }

      heroSlidesEl.innerHTML = groups
        .map((group, gi) => {
          const imgs = group.map((src) => `<img alt="" src="${src}">`).join("");
          return `<div class="hero-bg-group${gi === 0 ? " is-active" : ""}">${imgs}</div>`;
        })
        .join("");

      initHeroSlideshow();
    }
  })
  .catch((err) => console.error("portfolio.json 로드 실패:", err));

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// project-trigger는 이제 동적으로 생성되므로, 그리드 컨테이너에 이벤트 위임으로 처리
if (portfolioGridEl) {
  portfolioGridEl.addEventListener("click", (e) => {
    const img = e.target.closest(".project-trigger");
    if (!img) return;

    currentProject = projects[img.dataset.project];
    openViewer(0);
  });
}

function openViewer(index) {
    currentIndex = index;
    viewerImage.src = currentProject[currentIndex];
    viewerImage.classList.remove("slide-next", "slide-prev");

    viewerThumbs.innerHTML = currentProject
      .map((src, i) => `<img src="${src}" class="${i === currentIndex ? "is-active" : ""}" data-index="${i}">`)
      .join("");

    updateViewerNav();

    imageViewer.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeViewer() {
    imageViewer.classList.remove("active");
    document.body.style.overflow = "";
}

viewerThumbs.addEventListener("click", e => {
    const thumb = e.target.closest("img");
    if (!thumb) return;
    showImage(Number(thumb.dataset.index), null);
});

// 닫기
viewerClose.addEventListener("click", closeViewer);

// 배경 클릭
imageViewer.addEventListener("click", e => {

    if(e.target === imageViewer){

        closeViewer();

    }

});
function showImage(index, direction){

    // 처음/마지막에서는 더 이상 넘어가지 않음 (순환 없음)
    if (index < 0 || index >= currentProject.length) {
        return;
    }

    currentIndex = index;
    viewerImage.src = currentProject[currentIndex];

    viewerImage.classList.remove("slide-next", "slide-prev");
    void viewerImage.offsetWidth; // 애니메이션 재시작을 위한 강제 리플로우
    if (direction === "next") viewerImage.classList.add("slide-next");
    if (direction === "prev") viewerImage.classList.add("slide-prev");

    viewerThumbs.querySelectorAll("img").forEach((thumb, i) => {
        thumb.classList.toggle("is-active", i === currentIndex);
    });

    updateViewerNav();

}

function updateViewerNav(){
    viewerPrev.style.display = currentIndex === 0 ? "none" : "";
    viewerNext.style.display = currentIndex === currentProject.length - 1 ? "none" : "";
}

viewerPrev.addEventListener("click", () => {

    showImage(currentIndex - 1, "prev");

});

viewerNext.addEventListener("click", () => {

    showImage(currentIndex + 1, "next");

});
// ESC
// 키보드 제어
document.addEventListener("keydown", e => {

    // 이미지 뷰어가 열려있을 때
    if (imageViewer.classList.contains("active")) {

        if (e.key === "ArrowRight") {
            showImage(currentIndex + 1, "next");
            return;
        }

        if (e.key === "ArrowLeft") {
            showImage(currentIndex - 1, "prev");
            return;
        }

        if (e.key === "Escape") {
            closeViewer();
            return;
        }

    }

});
let touchStartX = 0;
let touchEndX = 0;

imageViewer.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].clientX;
});

imageViewer.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].clientX;

    const diff = touchStartX - touchEndX;

    if (diff > 50) showImage(currentIndex + 1, "next");
    if (diff < -50) showImage(currentIndex - 1, "prev");
});
// 히어로 배경 슬라이드쇼 (확대 + 크로스페이드)
// 히어로 배경 그룹 순환 (페이드 + 줌)
function initHeroSlideshow() {
  const groups = document.querySelectorAll(".hero-bg-group");
  if (groups.length > 1) {
    let idx = 0;
    setInterval(() => {
      groups[idx].classList.remove("is-active");
      idx = (idx + 1) % groups.length;
      groups[idx].classList.add("is-active");
    }, 6000);
  }
}

// 포트폴리오 카테고리 필터
const portfolioFilters = document.querySelector("[data-portfolio-filters]");

if (portfolioFilters) {
  portfolioFilters.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-filter]");
    if (!btn) return;

    portfolioFilters.querySelectorAll("button").forEach((b) => {
      b.classList.remove("is-active");
    });
    btn.classList.add("is-active");

    const filter = btn.dataset.filter;
    const grid = document.querySelector("[data-portfolio-grid]");

    if (grid) grid.classList.add("is-fading");

    setTimeout(() => {
      document.querySelectorAll(".portfolio-card").forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.hidden = !match;
      });
      if (grid) grid.classList.remove("is-fading");
    }, 200);
  });
}

// 스크롤 방향에 따라 헤더 숨김/등장
const siteHeader = document.querySelector(".site-header");
let lastScrollY = window.scrollY;

if (siteHeader) {
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 120) {
      siteHeader.classList.add("is-hidden");
    } else {
      siteHeader.classList.remove("is-hidden");
    }

    lastScrollY = currentScrollY;
  });
}
