const contactDrawer = document.querySelector("[data-contact-drawer]");
const contactOpeners = Array.from(document.querySelectorAll("[data-contact-open]"));
const contactCloser = document.querySelector("[data-contact-close]");
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const tabContainer = document.querySelector("[data-tabs]");
const tabTriggers = Array.from(document.querySelectorAll("[data-tab-target]"));
const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));

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

const projects = {

    nom01: [
        "image/nom01/nom01.jpg",
        "image/nom01/nom02.jpg",
        "image/nom01/nom03.jpg",
	"image/nom01/nom04.jpg",
	"image/nom01/nom05.jpg",
	"image/nom01/nom06.jpg",
	"image/nom01/nom07.jpg",
	"image/nom01/nom08.jpg",
	"image/nom01/nom09.jpg",
	"image/nom01/nom010.jpg",
	"image/nom01/nom011.jpg",
	"image/nom01/nom012.jpg",
	"image/nom01/nom013.jpg",
	"image/nom01/nom014.jpg",
	"image/nom01/nom015.jpg",
	"image/nom01/nom016.jpg",
	"image/nom01/nom017.jpg",
	"image/nom01/nom018.jpg",
	"image/nom01/nom019.jpg",
	"image/nom01/nom020.jpg",
	"image/nom01/nom021.jpg"
    ],

   nom02: [
	"image/nom02/nom02.jpg",
	"image/nom02/nom03.jpg",
	"image/nom02/nom04.jpg",
	"image/nom02/nom05.jpg",
	"image/nom02/nom06.jpg",
	"image/nom02/nom07.jpg",
	"image/nom02/nom08.jpg",
	"image/nom02/nom09.jpg",
	"image/nom02/nom010.jpg",
	"image/nom02/nom013.jpg",
	"image/nom02/nom016.jpg",
	"image/nom02/nom017.jpg",
	"image/nom02/nom018.jpg",
	"image/nom02/nom020.jpg",
	"image/nom02/nom021.jpg",
	"image/nom02/nom022.jpg",
	"image/nom02/nom023.jpg",
	"image/nom02/nom024.jpg",

    ],

    nom03: [
	"image/nom03/nom01.jpg",
	"image/nom03/nom02.jpg",
	"image/nom03/nom03.jpg",
	"image/nom03/nom04.jpg",
	"image/nom03/nom05.jpg",
	"image/nom03/nom06.jpg",
	"image/nom03/nom07.jpg",
	"image/nom03/nom08.jpg",
	"image/nom03/nom09.jpg",
    ],

    nom04: [
	"image/nom04/nom01.jpg",
	"image/nom04/nom02.jpg",
	"image/nom04/nom03.jpg",
	"image/nom04/nom04.jpg",
	"image/nom04/nom05.jpg",
	"image/nom04/nom06.jpg",
	"image/nom04/nom07.jpg",
	"image/nom04/nom08.jpg",
	"image/nom04/nom09.jpg",
	"image/nom04/nom010.jpg",
	"image/nom04/nom011.jpg",
	"image/nom04/nom012.jpg",
	"image/nom04/nom013.jpg",
	"image/nom04/nom014.jpg",
	"image/nom04/nom015.jpg",
	"image/nom04/nom016.jpg",
	"image/nom04/nom017.jpg",
	"image/nom04/nom018.jpg",
	"image/nom04/nom019.jpg",
    ],

	nom05: [
	"image/nom05/nom01.jpg",
	"image/nom05/nom02.jpg",
	"image/nom05/nom03.jpg",
	"image/nom05/nom04.jpg",
	"image/nom05/nom05.jpg",
	"image/nom05/nom06.jpg",
	"image/nom05/nom07.jpg",
	"image/nom05/nom08.jpg",
	"image/nom05/nom09.jpg",
	"image/nom05/nom010.jpg"
    ],

	nom06: [
	"image/nom06/nom01.jpg",
	"image/nom06/nom02.jpg",
	"image/nom06/nom03.jpg",
	"image/nom06/nom04.jpg",
	"image/nom06/nom05.jpg",
	"image/nom06/nom06.jpg",
	"image/nom06/nom07.jpg",
	"image/nom06/nom08.jpg",
	"image/nom06/nom09.jpg",
	"image/nom06/nom010.jpg",
	"image/nom06/nom011.jpg",
	"image/nom06/nom012.jpg",
	"image/nom06/nom013.jpg",
	"image/nom06/nom014.jpg",
	"image/nom06/nom015.jpg"
    ],

	nom07: [
	"image/nom07/nom02.jpg",
	"image/nom07/nom03.jpg",
	"image/nom07/nom04.jpg",
	"image/nom07/nom05.jpg",
	"image/nom07/nom06.jpg",
	"image/nom07/nom07.jpg",
	"image/nom07/nom08.jpg",
	"image/nom07/nom09.jpg"
    ],

	nom08: [
	"image/nom08/nom02.jpg",
	"image/nom08/nom03.jpg",
	"image/nom08/nom04.jpg",
	"image/nom08/nom05.jpg",
	"image/nom08/nom06.jpg",
	"image/nom08/nom07.jpg",
	"image/nom08/nom08.jpg",
	"image/nom08/nom09.jpg",
	"image/nom08/nom010.jpg"
    ],

	nom09: [
	"image/nom09/nom02.jpg",
	"image/nom09/nom03.jpg",
	"image/nom09/nom04.jpg",
	"image/nom09/nom05.jpg",
	"image/nom09/nom06.jpg",
	"image/nom09/nom07.jpg",
	"image/nom09/nom08.jpg"
    ],

	nom10: [
	"image/nom10/nom01.jpg",
	"image/nom10/nom02.jpg",
	"image/nom10/nom03.jpg",
	"image/nom10/nom04.jpg",
	"image/nom10/nom05.jpg",
	"image/nom10/nom06.jpg",
	"image/nom10/nom07.jpg",
	"image/nom10/nom08.jpg",
	"image/nom10/nom09.jpg",
	"image/nom10/nom010.jpg",
	"image/nom10/nom011.jpg"
    ],

	nom11: [
	"image/nom11/nom01.jpg",
	"image/nom11/nom02.jpg",
	"image/nom11/nom03.jpg",
	"image/nom11/nom04.jpg",
	"image/nom11/nom05.jpg",
	"image/nom11/nom06.jpg",
	"image/nom11/nom07.jpg",
	"image/nom11/nom08.jpg",
	"image/nom11/nom09.jpg",
	"image/nom11/nom010.jpg",
	"image/nom11/nom011.jpg",
	"image/nom11/nom012.jpg",
	"image/nom11/nom013.jpg",
	"image/nom11/nom014.jpg"
    ],

	nom12: [
	"image/nom12/nom01.jpg",
	"image/nom12/nom02.jpg",
	"image/nom12/nom03.jpg",
	"image/nom12/nom04.jpg",
	"image/nom12/nom05.jpg",
	"image/nom12/nom06.jpg",
	"image/nom12/nom07.jpg",
	"image/nom12/nom08.jpg",
	"image/nom12/nom09.jpg",
	"image/nom12/nom010.jpg",
	"image/nom12/nom011.jpg",
	"image/nom12/nom012.jpg",
	"image/nom12/nom013.jpg",
	"image/nom12/nom014.jpg",
	"image/nom12/nom015.jpg",
	"image/nom12/nom016.jpg",
	"image/nom12/nom017.jpg",
	"image/nom12/nom018.jpg",
	"image/nom12/nom019.jpg",
	"image/nom12/nom020.jpg"
    ],



	
};



document.querySelectorAll(".project-trigger").forEach(img => {

    img.addEventListener("click", () => {

        galleryContent.innerHTML = "";

        projects[img.dataset.project].forEach(src => {

            const image = document.createElement("img");
            image.src = src;
            galleryContent.appendChild(image);

        });

        galleryModal.classList.add("active");
        document.body.style.overflow = "hidden";

    });

});

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
