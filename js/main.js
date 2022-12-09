// btnCall 관련 js-----------------------
const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");

btnCall.onclick = function (e) {
  e.preventDefault();
  btnCall.classList.toggle("on");
  menuMo.classList.toggle("on");
}

// slider 관련 js--------------------------
const slider = document.querySelector("#slider");
const ul = slider.querySelector("ul");
const lis = ul.querySelectorAll("li");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
let len = lis.length;

// span
const pg = document.querySelector(".pagination");
const sp = pg.querySelector("span");
const total = lis.length;
sp.innerText = total;

// strong --> css까지 완성하고 나서 다시 작성해보기
// const str = pg.querySelector("strong");
// str.innerText = 

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

// tab menu 관련 js--------------------------
const container = document.querySelector(".container");
const btns = container.querySelectorAll("ul li");
const boxes = container.querySelectorAll("section article");
// let enableClick = true;
// let speed = 500;

btns.forEach((_el, _ind) => {
  _el.addEventListener("click", (e) => {
    e.preventDefault();

    let isOn = e.currentTarget.classList.contains("on");
    if (isOn) return;

    if (enableClick) {
      enableClick = false;

      activation(btns, _ind);
      activation(boxes, _ind);
    }
  })
})

function activation(list, index) {
  for (let k of list) {
    k.classList.remove("on");
    list[index].classList.add("on");

    setTimeout(() => {
      enableClick = true;
    }, speed)

  }

}