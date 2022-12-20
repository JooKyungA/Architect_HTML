// slider 관련 js--------------------------
const slider = document.querySelector(".slider");
const ul = slider.querySelector("ul");
const lis = ul.querySelectorAll("li");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let len = lis.length;

// slider
let enableClick = true;
let speed = 500;

init();

next.addEventListener("click", (e) => {
  e.preventDefault();
  if (enableClick) {
    nextslide();
    enableClick = false;
  }
})
prev.addEventListener("click", (e) => {
  e.preventDefault();
  if (enableClick) {
    prevslide();
    enableClick = false;
  }
})

function init() {
  ul.style.left = "-100%";
  ul.prepend(ul.lastElementChild);
  ul.style.width = `${100 * len} %`;
  lis.forEach((el) => {
    el.style.width = `${100 / len}%`;
  })
}
function nextslide() {
  new Anim(ul, {
    prop: 'left',
    value: "-200%",
    duration: speed,
    callback: () => {
      ul.style.left = "-100%";
      ul.append(ul.firstElementChild);
      enableClick = true;
    }
  })
}
function prevslide() {
  new Anim(ul, {
    prop: 'left',
    value: "0%",
    duration: speed,
    callback: () => {
      ul.style.left = "-100%";
      ul.prepend(ul.lastElementChild);
      enableClick = true;
    }
  })
}