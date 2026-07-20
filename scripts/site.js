const contactDrawer = document.querySelector("[data-contact-drawer]");
const contactOpeners = Array.from(document.querySelectorAll("[data-contact-open]"));
const contactCloser = document.querySelector("[data-contact-close]");
const revealItems = Array.from(document.querySelectorAll(".reveal"));
const tabContainer = document.querySelector("[data-tabs]");
const tabTriggers = Array.from(document.querySelectorAll("[data-tab-target]"));
const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));
const conversationToggle =
  document.querySelector("[data-conversation-toggle]");

if (conversationToggle) {
  conversationToggle.addEventListener("click", () => {
    window.open(
      "https://naver.me/FVF4ThAW",
      "_blank"
    );
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



// 여기서부터
nom13: [
	"image/nom13/nom01.jpg",
	"image/nom13/nom02.jpg",
	"image/nom13/nom03.jpg",
	"image/nom13/nom04.jpg",
	"image/nom13/nom05.jpg",
	"image/nom13/nom06.jpg",
	"image/nom13/nom07.jpg",
	"image/nom13/nom08.jpg",
	"image/nom13/nom09.jpg",
	"image/nom13/nom010.jpg",
	"image/nom13/nom011.jpg",
	"image/nom13/nom012.jpg"
    ],


nom14: [
	"image/nom14/nom02.jpg",
	"image/nom14/nom03.jpg",
	"image/nom14/nom04.jpg",
	"image/nom14/nom05.jpg",
	"image/nom14/nom06.jpg",
	"image/nom14/nom07.jpg",
	"image/nom14/nom08.jpg",
	"image/nom14/nom09.jpg",
	"image/nom14/nom010.jpg",
	"image/nom14/nom011.jpg",
	"image/nom14/nom012.jpg",
	"image/nom14/nom013.jpg",
	"image/nom14/nom014.jpg",
	"image/nom14/nom015.jpg",
	"image/nom14/nom016.jpg",
	"image/nom14/nom017.jpg",
	"image/nom14/nom018.jpg",
	"image/nom14/nom019.jpg",
	"image/nom14/nom020.jpg",
	"image/nom14/nom021.jpg",
	"image/nom14/nom022.jpg",
	"image/nom14/nom023.jpg",
	"image/nom14/nom024.jpg",
	"image/nom14/nom025.jpg",
	"image/nom14/nom026.jpg",
	"image/nom14/nom027.jpg",
	"image/nom14/nom028.jpg",
	"image/nom14/nom029.jpg",
	"image/nom14/nom030.jpg",
	"image/nom14/nom031.jpg",
	"image/nom14/nom032.jpg",
	"image/nom14/nom033.jpg",
	"image/nom14/nom034.jpg",
	"image/nom14/nom035.jpg",
	"image/nom14/nom036.jpg"
    ],

	


nom15: [
	"image/nom15/nom01.jpg",
	"image/nom15/nom02.jpg",
	"image/nom15/nom03.jpg",
	"image/nom15/nom04.jpg",
	"image/nom15/nom05.jpg",
	"image/nom15/nom06.jpg",
	"image/nom15/nom07.jpg",
	"image/nom15/nom08.jpg",
	"image/nom15/nom09.jpg",
	"image/nom15/nom010.jpg",
	"image/nom15/nom011.jpg",
	"image/nom15/nom012.jpg",
	"image/nom15/nom013.jpg",
	"image/nom15/nom014.jpg",
	"image/nom15/nom015.jpg",
	"image/nom15/nom016.jpg",
	"image/nom15/nom017.jpg",
	"image/nom15/nom018.jpg",
	"image/nom15/nom019.jpg",
	"image/nom15/nom020.jpg",
	"image/nom15/nom021.jpg",
	"image/nom15/nom022.jpg",
	"image/nom15/nom023.jpg",
	"image/nom15/nom024.jpg",
	"image/nom15/nom025.jpg",
	"image/nom15/nom026.jpg"
    ],

nom16: [
	"image/nom16/nom01.jpg",
	"image/nom16/nom02.jpg",
	"image/nom16/nom03.jpg",
	"image/nom16/nom04.jpg",
	"image/nom16/nom05.jpg",
	"image/nom16/nom06.jpg",
	"image/nom16/nom07.jpg",
	"image/nom16/nom08.jpg",
	"image/nom16/nom09.jpg",
	"image/nom16/nom010.jpg",
	"image/nom16/nom011.jpg",
	"image/nom16/nom012.jpg",
	"image/nom16/nom013.jpg",
 ],

nom17: [
	"image/nom17/nom01.jpg",
	"image/nom17/nom02.jpg",
	"image/nom17/nom03.jpg",
	"image/nom17/nom04.jpg",
	"image/nom17/nom05.jpg",
	"image/nom17/nom06.jpg",
	"image/nom17/nom07.jpg",
	"image/nom17/nom08.jpg",
	"image/nom17/nom09.jpg",
	"image/nom17/nom010.jpg",
	"image/nom17/nom011.jpg",
	"image/nom17/nom012.jpg",
	"image/nom17/nom013.jpg",
	"image/nom17/nom014.jpg",
	"image/nom17/nom015.jpg",
	"image/nom17/nom016.jpg",
	"image/nom17/nom017.jpg",
	"image/nom17/nom018.jpg",
 ],


nom18: [
	"image/nom18/nom01.jpg",
	"image/nom18/nom02.jpg",
	"image/nom18/nom03.jpg",
	"image/nom18/nom04.jpg",
	"image/nom18/nom05.jpg",
	"image/nom18/nom06.jpg",
	"image/nom18/nom07.jpg",
	"image/nom18/nom08.jpg",
	"image/nom18/nom09.jpg",
	"image/nom18/nom010.jpg",
	"image/nom18/nom011.jpg",
 ],




nom19: [
	"image/nom19/nom01.jpg",
	"image/nom19/nom02.jpg",
	"image/nom19/nom03.jpg",
	"image/nom19/nom04.jpg",
	"image/nom19/nom05.jpg",
	"image/nom19/nom06.jpg",
	"image/nom19/nom07.jpg",
	"image/nom19/nom08.jpg",
	"image/nom19/nom09.jpg",
	"image/nom19/nom010.jpg",
	"image/nom19/nom011.jpg",
	"image/nom19/nom012.jpg",
	"image/nom19/nom013.jpg",
	"image/nom19/nom014.jpg",
	"image/nom19/nom015.jpg",
	"image/nom19/nom016.jpg",
	"image/nom19/nom017.jpg",
	"image/nom19/nom018.jpg",
 ],

nom20: [
	"image/nom20/nom01.jpg",
	"image/nom20/nom02.jpg",
	"image/nom20/nom03.jpg",
	"image/nom20/nom04.jpg",
	"image/nom20/nom05.jpg",
	"image/nom20/nom06.jpg",
	"image/nom20/nom07.jpg",
	"image/nom20/nom08.jpg",
	"image/nom20/nom09.jpg",
 ],


nom21: [
	"image/nom21/nom01.jpg",
	"image/nom21/nom02.jpg",
	"image/nom21/nom03.jpg",
	"image/nom21/nom04.jpg",
	"image/nom21/nom05.jpg",
	"image/nom21/nom06.jpg",
	"image/nom21/nom07.jpg",
 ],

nom22: [
	"image/nom22/nom01.jpg",
	"image/nom22/nom02.jpg",
	"image/nom22/nom03.jpg",
	"image/nom22/nom04.jpg",
	"image/nom22/nom05.jpg",
	"image/nom22/nom06.jpg",
	"image/nom22/nom07.jpg",
	"image/nom22/nom08.jpg",
	"image/nom22/nom09.jpg",
	"image/nom22/nom10.jpg",
 ],

nom23: [
	"image/nom23/nom01.jpg",
	"image/nom23/nom02.jpg",
	"image/nom23/nom03.jpg",
	"image/nom23/nom04.jpg",
	"image/nom23/nom05.jpg",
	"image/nom23/nom06.jpg",
	"image/nom23/nom07.jpg",
	"image/nom23/nom08.jpg",
	"image/nom23/nom09.jpg",
	"image/nom23/nom10.jpg",
	"image/nom23/nom11.jpg",
	"image/nom23/nom12.jpg",
	"image/nom23/nom13.jpg",
 ],


nom24: [
	"image/nom24/nom01.jpg",
	"image/nom24/nom02.jpg",
	"image/nom24/nom03.jpg",
	"image/nom24/nom04.jpg",
	"image/nom24/nom05.jpg",
	"image/nom24/nom06.jpg",
	"image/nom24/nom07.jpg",
	"image/nom24/nom08.jpg",
	"image/nom24/nom09.jpg",
	"image/nom24/nom10.jpg",
	"image/nom24/nom11.jpg",
	"image/nom24/nom12.jpg",
	"image/nom24/nom13.jpg",
	"image/nom24/nom14.jpg",
	"image/nom24/nom15.jpg",
	"image/nom24/nom16.jpg",
	"image/nom24/nom17.jpg",
 ],


nom25: [
	"image/nom25/nom01.jpg",
	"image/nom25/nom02.jpg",
	"image/nom25/nom03.jpg",
	"image/nom25/nom04.jpg",
	"image/nom25/nom05.jpg",
	"image/nom25/nom06.jpg",
	"image/nom25/nom07.jpg",
	"image/nom25/nom08.jpg",
	"image/nom25/nom09.jpg",
	"image/nom25/nom10.jpg",
	"image/nom25/nom11.jpg",
	"image/nom25/nom12.jpg",
	"image/nom25/nom13.jpg",
	"image/nom25/nom14.jpg",
	"image/nom25/nom15.jpg",
 ],

nom26: [
	"image/nom26/nom01.jpg",
	"image/nom26/nom02.jpg",
	"image/nom26/nom03.jpg",
	"image/nom26/nom04.jpg",
	"image/nom26/nom05.jpg",
 ],

nom27: [
	"image/nom27/nom01.jpg",
	"image/nom27/nom02.jpg",
 ],

nom28: [
	"image/nom28/nom01.jpg",
	"image/nom28/nom02.jpg",
	"image/nom28/nom03.jpg",
	"image/nom28/nom04.jpg",
 ],
	
nom29: [
	"image/nom29/nom01.jpg",
	"image/nom29/nom02.jpg",
	"image/nom29/nom03.jpg",
	"image/nom29/nom04.jpg",
	"image/nom29/nom05.jpg",
	"image/nom29/nom06.jpg",
	"image/nom29/nom07.jpg",
	"image/nom29/nom08.jpg",
	"image/nom29/nom09.jpg",
 ],
	
nom30: [
	"image/nom30/nom01.jpg",
	"image/nom30/nom02.jpg",
 ],
	
nom31: [
	"image/nom31/nom01.jpg",
	"image/nom31/nom02.jpg",
	"image/nom31/nom03.jpg",
	"image/nom31/nom04.jpg",
 ],
	
nom32: [
	"image/nom32/nom01.jpg",
 ],

	nom33: [
	"image/nom33/nom01.jpg",
	"image/nom33/nom02.jpg",
	"image/nom33/nom03.jpg",
	"image/nom33/nom04.jpg",
	"image/nom33/nom05.jpg",
	"image/nom33/nom06.jpg",
	"image/nom33/nom07.jpg",
	"image/nom33/nom08.jpg",
	"image/nom33/nom09.jpg",
	"image/nom33/nom010.jpg",
	"image/nom33/nom011.jpg",
	"image/nom33/nom012.jpg",
	"image/nom33/nom013.jpg",
	"image/nom33/nom014.jpg",
	"image/nom33/nom015.jpg",
	"image/nom33/nom016.jpg",
	"image/nom33/nom017.jpg",
 ],

nom34: [
	"image/nom34/nom01.jpg",
	"image/nom34/nom02.jpg",
	"image/nom34/nom03.jpg",
	"image/nom34/nom04.jpg",
	"image/nom34/nom05.jpg",
	"image/nom34/nom06.jpg",
	"image/nom34/nom07.jpg",
	"image/nom34/nom08.jpg",
	"image/nom34/nom09.jpg",
	"image/nom34/nom010.jpg",
	"image/nom34/nom011.jpg",
	"image/nom34/nom012.jpg",
 ],

nom35: [
	"image/nom35/nom01.jpg",
	"image/nom35/nom02.jpg",
	"image/nom35/nom03.jpg",
	"image/nom35/nom04.jpg",
	"image/nom35/nom05.jpg",
	"image/nom35/nom06.jpg",
	"image/nom35/nom07.jpg",
	"image/nom35/nom08.jpg",
	"image/nom35/nom09.jpg",
 ],

nom36: [
	"image/nom36/nom01.jpg",
	"image/nom36/nom02.jpg",
	"image/nom36/nom03.jpg",
	"image/nom36/nom04.jpg",
	"image/nom36/nom05.jpg",
	"image/nom36/nom06.jpg",
	"image/nom36/nom07.jpg",
	"image/nom36/nom08.jpg",
	"image/nom36/nom09.jpg",
	"image/nom36/nom010.jpg",
	"image/nom36/nom011.jpg",
 ],

nom37: [
	"image/nom37/nom01.jpg",
	"image/nom37/nom02.jpg",
	"image/nom37/nom03.jpg",
	"image/nom37/nom04.jpg",
	"image/nom37/nom05.jpg",
	"image/nom37/nom06.jpg",
	"image/nom37/nom07.jpg",
	"image/nom37/nom08.jpg",
	"image/nom37/nom09.jpg",
 ],

nom38: [
	"image/nom38/nom01.jpg",
	"image/nom38/nom02.jpg",
	"image/nom38/nom03.jpg",
	"image/nom38/nom04.jpg",
	"image/nom38/nom05.jpg",
	"image/nom38/nom06.jpg",
	"image/nom38/nom07.jpg",
	"image/nom38/nom08.jpg",
	"image/nom38/nom09.jpg",
	"image/nom38/nom010.jpg",
	"image/nom38/nom011.jpg",
	"image/nom38/nom012.jpg",
	"image/nom38/nom013.jpg",
	"image/nom38/nom014.jpg",
	"image/nom38/nom015.jpg",
	"image/nom38/nom016.jpg",
	"image/nom38/nom017.jpg",
	"image/nom38/nom018.jpg",
	"image/nom38/nom019.jpg",
 ],

nom39: [
	"image/nom39/nom01.jpg",
	"image/nom39/nom02.jpg",
	"image/nom39/nom03.jpg",
	"image/nom39/nom04.jpg",
 ],

nom40: [
	"image/nom40/nom01.jpg",
	"image/nom40/nom02.jpg",
	"image/nom40/nom03.jpg",
	"image/nom40/nom04.jpg",
 ],

nom41: [
	"image/nom41/nom01.jpg",
	"image/nom41/nom02.jpg",
	"image/nom41/nom03.jpg",
	"image/nom41/nom04.jpg",
	"image/nom41/nom05.jpg",
	"image/nom41/nom06.jpg",
	"image/nom41/nom07.jpg",
],

nom42: [
	"image/nom42/nom01.jpg",
	"image/nom42/nom02.jpg",
	"image/nom42/nom03.jpg",
	"image/nom42/nom04.jpg",
	"image/nom42/nom05.jpg",
	"image/nom42/nom06.jpg",
	"image/nom42/nom07.jpg",
	"image/nom42/nom08.jpg",
	"image/nom42/nom09.jpg",
	"image/nom42/nom010.jpg",
	"image/nom42/nom011.jpg",
	"image/nom42/nom012.jpg",
	"image/nom42/nom013.jpg",
	"image/nom42/nom014.jpg",
	"image/nom42/nom015.jpg",
	"image/nom42/nom016.jpg",
	"image/nom42/nom017.jpg",
 ],

nom43: [
	"image/nom43/nom01.jpg",
	"image/nom43/nom02.jpg",
	"image/nom43/nom03.jpg",
	"image/nom43/nom04.jpg",
	"image/nom43/nom05.jpg",
	"image/nom43/nom06.jpg",
	"image/nom43/nom07.jpg",
 ],

nom44: [
	"image/nom44/nom01.jpg",
	"image/nom44/nom02.jpg",
	"image/nom44/nom03.jpg",
	"image/nom44/nom04.jpg",
	"image/nom44/nom05.jpg",
	"image/nom44/nom06.jpg",
	"image/nom44/nom07.jpg",
	"image/nom44/nom08.jpg",
	"image/nom44/nom09.jpg",
	"image/nom44/nom010.jpg",
	"image/nom44/nom011.jpg",
	"image/nom44/nom012.jpg",
 ],

nom45: [
	"image/nom45/nom01.jpg",
	"image/nom45/nom02.jpg",
	"image/nom45/nom03.jpg",
	"image/nom45/nom04.jpg",
	"image/nom45/nom05.jpg",
	"image/nom45/nom06.jpg",
	"image/nom45/nom07.jpg",
	"image/nom45/nom08.jpg",
	"image/nom45/nom09.jpg",
 ],

nom46: [
	"image/nom46/nom01.jpg",
	"image/nom46/nom02.jpg",
	"image/nom46/nom03.jpg",
	"image/nom46/nom04.jpg",
	"image/nom46/nom05.jpg",
 ],

nom47: [
	"image/nom47/nom01.jpg",
	"image/nom47/nom02.jpg",
	"image/nom47/nom03.jpg",
	"image/nom47/nom04.jpg",
	"image/nom47/nom05.jpg",
	"image/nom47/nom06.jpg",
	"image/nom47/nom07.jpg",
	"image/nom47/nom08.jpg",
	"image/nom47/nom09.jpg",
	"image/nom47/nom010.jpg",
	"image/nom47/nom011.jpg",
	"image/nom47/nom012.jpg",
	"image/nom47/nom013.jpg",
	"image/nom47/nom014.jpg",
	"image/nom47/nom015.jpg",
 ],

nom48: [
	"image/nom48/nom01.jpg",
	"image/nom48/nom02.jpg",
	"image/nom48/nom03.jpg",
	"image/nom48/nom04.jpg",
	"image/nom48/nom05.jpg",
	"image/nom48/nom06.jpg",
	"image/nom48/nom07.jpg",
	"image/nom48/nom08.jpg",
	"image/nom48/nom09.jpg",
	"image/nom48/nom010.jpg",
	"image/nom48/nom011.jpg",
	"image/nom48/nom012.jpg",
	"image/nom48/nom013.jpg",
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
