// skipNavi 관련---------------
const skipNavi = document.querySelectorAll("#skipNavi li a");

for (let el of skipNavi) {
  el.addEventListener("focusin", () => {
    el.classList.add("on");
  })
  el.addEventListener("focusout", () => {
    el.classList.remove("on");
  })
}
// scroll 관련----------------------------------
const scrollView = document.querySelectorAll(".scrollView");
const btnScroll = document.querySelectorAll(".scroll li");
let posArr = [];
const base = -300;
for (let el of scrollView) {
  posArr.push(el.offsetTop);
}

window.addEventListener("scroll", () => {
  let scroll = window.scrollY || window.pageYOffset;

  scrollView.forEach((el, index) => {
    if (scroll >= posArr[index] + base) {
      btnScroll.forEach((el, index) => {
        el.classList.remove("on");
        // scrollView[index].classList.remove("on");
      })
      btnScroll[index].classList.add('on');
      scrollView[index].classList.add("on");
    }
  })

})
btnScroll.forEach((el, index) => {
  el.addEventListener("click", () => {
    new Anim(window, {
      prop: "scroll",
      value: posArr[index],
      duration: speed,
    });
    for (let i of btnScroll) {
      i.classList.remove("on");
    }
    el.classList.add("on");
  })
})

// view content 관련---------------------
const btnOpen = document.querySelector(".btnOpen");
const visual = document.querySelector("#visual");
const aside = document.querySelector("#aside");
const btnClose = aside.querySelector(".btnClose");
const _top = aside.querySelector(".top");
const _right = aside.querySelector(".right");
const _bottom = aside.querySelector(".bottom");
const _left = aside.querySelector(".left");
const _inner = aside.querySelector(".inner");
// const speed = 500;

btnOpen.addEventListener("click", (e) => {
  e.preventDefault();
  aside.style.display = "block";
  visual.classList.add("off");
  new Anim(_top, {
    prop: "width",
    value: "100%",
    duration: speed,
    callback: () => {

      new Anim(_right, {
        prop: "height",
        value: "100%",
        duration: speed,
        callback: () => {
          new Anim(_bottom, {
            prop: "width",
            value: "100%",
            duration: speed,
            callback: () => {
              new Anim(_left, {
                prop: "height",
                value: "100%",
                duration: speed,
                callback: () => {
                  new Anim(_inner, {
                    prop: "opacity",
                    value: 1,
                    duration: speed,
                  })
                }
              })

            }
          })
        }
      })
    }
  })
})

btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  new Anim(_inner, {
    prop: "opacity",
    value: 0,
    duration: speed,
    callback: () => {
      new Anim(_top, {
        prop: "width",
        value: "0%",
        duration: speed,
      });
      new Anim(_right, {
        prop: "height",
        value: "0%",
        duration: speed,
      });
      new Anim(_bottom, {
        prop: "width",
        value: "0%",
        duration: speed,
      });
      new Anim(_left, {
        prop: "height",
        value: "0%",
        duration: speed,
        callback: () => {
          aside.style.display = "none";

          visual.classList.remove("off");
        }
      });
    }
  })
})


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