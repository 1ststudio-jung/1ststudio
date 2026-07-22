const contactDrawer = document.querySelector("[data-contact-drawer]");
const contactOpeners = Array.from(document.querySelectorAll("[data-contact-open]"));
const contactCloser = document.querySelector("[data-contact-close]");
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const tabContainer = document.querySelector("[data-tabs]");
const tabTriggers = Array.from(document.querySelectorAll("[data-tab-target]"));
const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));
const conversationToggle =
  document.querySelector("[data-conversation-toggle]");
const conversationForm = document.querySelector("[data-conversation-form]");
const conversationFormEl = document.querySelector("[data-conversation-form-el]");
const conversationSuccess = document.querySelector("[data-conversation-success]");

// 구글 시트에 연동된 Apps Script 웹 앱 URL을 여기에 붙여넣으세요.
const CONTACT_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

if (conversationToggle && conversationForm) {
  conversationToggle.addEventListener("click", () => {
    conversationForm.hidden = !conversationForm.hidden;
  });
}

if (conversationFormEl) {
  conversationFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const submitButton = conversationFormEl.querySelector(".conversation-submit");
    const formData = new FormData(conversationFormEl);
    const payload = {
      company: formData.get("name") || "",
      contact: formData.get("contact") || "",
      message: formData.get("message") || ""
    };

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    fetch(CONTACT_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then(() => {
        conversationFormEl.hidden = true;
        if (conversationSuccess) conversationSuccess.hidden = false;
      })
      .catch(() => {
        alert("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = "Send inquiry";
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
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
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







const galleryModal = document.getElementById("galleryModal");
const galleryContent = document.querySelector(".gallery-content");
const galleryClose = document.querySelector(".gallery-close");




let projects = {};
const portfolioGridEl = document.querySelector("[data-portfolio-grid]");

fetch("portfolio.json")
  .then((res) => res.json())
  .then((items) => {
    items.forEach((item) => {
      projects[item.id] = item.images;
    });

    if (portfolioGridEl) {
      portfolioGridEl.innerHTML = items
        .map((item) => {
          const labelText =
            item.category === "brand" ? item.brand : capitalize(item.category);
          return `
            <article class="portfolio-card" data-category="${item.category}">
              <figure>
                <img class="project-trigger" data-project="${item.id}" src="${item.images[0]}">
              </figure>
              <p class="portfolio-label">${labelText}</p>
            </article>
          `;
        })
        .join("");
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

    galleryContent.innerHTML = "";

    projects[img.dataset.project].forEach(src => {

            const image = document.createElement("img");
            image.src = src;
            galleryContent.appendChild(image);

        });

        galleryModal.classList.add("active");
        document.body.style.overflow = "hidden";

    });

}

galleryClose.addEventListener("click", () => {

    galleryModal.classList.remove("active");
    document.body.style.overflow = "";

});

galleryModal.addEventListener("click", e => {

    if (e.target === galleryModal) {

        galleryModal.classList.remove("active");
        document.body.style.overflow = "";

    }
});

const imageViewer = document.getElementById("imageViewer");
const viewerImage = document.getElementById("viewerImage");
const viewerClose = document.querySelector(".viewer-close");
let currentProject = [];
let currentIndex = 0;
const viewerPrev = document.querySelector(".viewer-prev");
const viewerNext = document.querySelector(".viewer-next");

// 갤러리 안의 사진 클릭
galleryContent.addEventListener("click", e => {

    if (e.target.tagName !== "IMG") return;

    const images = [...galleryContent.querySelectorAll("img")];

    currentProject = images.map(img => img.src);
    currentIndex = images.indexOf(e.target);

    viewerImage.src = currentProject[currentIndex];

    imageViewer.classList.add("active");

});

// 닫기
viewerClose.addEventListener("click", () => {

    imageViewer.classList.remove("active");

});

// 배경 클릭
imageViewer.addEventListener("click", e => {

    if(e.target === imageViewer){

        imageViewer.classList.remove("active");

    }

});
function showImage(index){

    if(index < 0){
        index = currentProject.length - 1;
    }

    if(index >= currentProject.length){
        index = 0;
    }

    currentIndex = index;
    viewerImage.src = currentProject[currentIndex];

}

viewerPrev.addEventListener("click", () => {

    showImage(currentIndex - 1);

});

viewerNext.addEventListener("click", () => {

    showImage(currentIndex + 1);

});
// ESC
// 키보드 제어
document.addEventListener("keydown", e => {

    // 이미지 뷰어가 열려있을 때
    if (imageViewer.classList.contains("active")) {

        if (e.key === "ArrowRight") {
            showImage(currentIndex + 1);
            return;
        }

        if (e.key === "ArrowLeft") {
            showImage(currentIndex - 1);
            return;
        }

        if (e.key === "Escape") {
            imageViewer.classList.remove("active");
            return;
        }

    }

    // 갤러리 모달이 열려있을 때 ESC
    if (galleryModal.classList.contains("active") && e.key === "Escape") {

        galleryModal.classList.remove("active");
        document.body.style.overflow = "";

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

    if (diff > 50) showImage(currentIndex + 1);
    if (diff < -50) showImage(currentIndex - 1);
});
// 히어로 배경 슬라이드쇼 (확대 + 크로스페이드)
const heroSlides = document.querySelectorAll(".hero-bg-slide");
if (heroSlides.length > 1) {
  let heroIndex = 0;
  setInterval(() => {
    heroSlides[heroIndex].classList.remove("is-active");
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add("is-active");
  }, 6000);
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
    document.querySelectorAll(".portfolio-card").forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.hidden = !match;
    });
  });
}
