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


const projects={

portrait:{
title:"Portrait",
images:[
"참조/이미지-03.jpeg",
"참조/이미지-07.jpeg",
"참조/이미지-01.jpeg"
]
},

actor:{
title:"Actor Profile",
images:[
"참조/이미지-04.jpeg",
"참조/이미지-11.jpg"
]
},

professional:{
title:"Professional",
images:[
"참조/이미지-05.jpeg"
]
},

editorial:{
title:"Editorial",
images:[
"참조/이미지-06.jpeg"
]
}

};

const lightbox=document.getElementById("lightbox");
const lightboxImg=document.getElementById("lightbox-img");
const lightboxTitle=document.getElementById("lightbox-title");
const lightboxCount=document.getElementById("lightbox-count");

let currentProject=null;
let currentIndex=0;

document.querySelectorAll(".project-trigger").forEach(img=>{

img.addEventListener("click",()=>{

currentProject=projects[img.dataset.project];

currentIndex=0;

showImage();

lightbox.classList.add("active");

document.body.style.overflow="hidden";

});

});

function showImage(){

lightboxImg.classList.remove("show");

setTimeout(()=>{

lightboxImg.src=currentProject.images[currentIndex];

lightboxTitle.textContent=currentProject.title;

lightboxCount.textContent=`${currentIndex+1} / ${currentProject.images.length}`;

lightboxImg.onload=()=>{

lightboxImg.classList.add("show");

};

},120);

}

function nextImage(e){

if(e)e.stopPropagation();

currentIndex++;

if(currentIndex>=currentProject.images.length){

currentIndex=0;

}

showImage();

}

function prevImage(e){

if(e)e.stopPropagation();

currentIndex--;

if(currentIndex<0){

currentIndex=currentProject.images.length-1;

}

showImage();

}

function closeImage(){

lightbox.classList.remove("active");

document.body.style.overflow="";

}

document.addEventListener("keydown",e=>{

if(!lightbox.classList.contains("active")) return;

if(e.key==="ArrowRight") nextImage();

if(e.key==="ArrowLeft") prevImage();

if(e.key==="Escape") closeImage();

});



document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){
        closeImage();
    }

});