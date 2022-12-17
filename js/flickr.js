
const body = document.querySelector("body");
const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");

const input = document.querySelector("#search");
const btnSearch = document.querySelector(".btnSearch");
const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const key = "c56ad21076b0ceff5779ce087e6afed3";
const per_page = 50;
const format = "json";

const url1 = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

const url2 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=바다&privacy_filter=1`;


btnSearch.addEventListener("click", () => {
  let tag = input.value;
  tag = tag.trim();
  const url2 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

  if (tag != '') {
    callData(url2);
  } else {
    alert("검색어를 입력하세요.");
  }

});

input.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    let tag = input.value;
    tag = tag.trim();
    const url2 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
    if (tag != '') {
      callData(url2);
    } else {
      alert("검색어를 입력하세요.");
    }
  }

});

frame.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target == frame) return;

  let target = e.target.closest(".item").querySelector("div");
  console.log(e.target);
  console.log(target);

  if (e.target.closest("div") == target) {


    let imgSrc = e.target.closest(".item").querySelector("a").getAttribute("href");

    let pop = document.createElement("aside");
    pop.classList.add('pop');
    let pops = `
      <img src="${imgSrc}">
      <span class="close">+</span>
    `;
    pop.innerHTML = pops;

    body.append(pop);
    body.style.overflow = "hidden";

  } else {
    return;
  }
})


// frame.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (e.target == frame) return;
//   let target = e.target.closest(".item").querySelector(".thumb");

//   if (e.target == target) {

//     let imgSrc = target.parentElement.getAttribute("href");

//     let pop = document.createElement("aside");
//     pop.classList.add('pop');
//     let pops = `
//       <img src="${imgSrc}">
//       <span class="close">+</span>
//     `;
//     pop.innerHTML = pops;

//     body.append(pop);
//     body.style.overflow = "hidden";


//   } else {
//     return;
//   }






// })

body.addEventListener("click", (e) => {
  let pop = body.querySelector(".pop");

  if (pop != null) {
    let close = pop.querySelector('.close');
    if (e.target == close) {
      pop.remove();
      body.style.overflow = "auto";
    }
  }

})



callData(url1);

function callData(url) {

  frame.innerHTML = "";
  loading.classList.remove("off");
  frame.classList.remove("on");

  fetch(url)
    .then((data) => {

      let result = data.json();
      return result;
    })
    .then((json) => {

      let items = json.photos.photo;

      if (items.length > 0) {
        createList(items);
        delayLoading();
      } else {
        loading.classList.remove("off");
        alert("검색이 되지 않습니다, 검색하신 이미지의 데이터가 없습니다")
      }
    })
}

function createList(items) {
  let htmls = "";

  items.map((el) => {
    console.log(el);

    let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
    let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;

    htmls += `
    <li class="item">
      <div>
        <a href=${imgSrcBig}>
          <img class="thumb" src=${imgSrc}>
        </a>
        <p>${el.title}</p>
      </div>
    </li>
  `;

  })
  frame.innerHTML = htmls;
}

function delayLoading() {
  const imgs = frame.querySelectorAll("div a img");
  const len = imgs.length;

  let count = 0;

  for (let el of imgs) {
    el.addEventListener("load", () => {
      count++;

      if (count == len) isoLayout();
    });


    let thumb = el.closest(".item").querySelector(".thumb");
    thumb.onerror = (e) => {
      e.currentTarget.closest(".item").querySelector("div a img").setAttribute("src", "img/k1.jpg");
    }
  }
}


function isoLayout() {

  loading.classList.add("off");
  frame.classList.add("on");


  new Isotope("#list", {
    itemSelection: ".item",
    columnWidth: ".item",
    transitionDuration: "0.5s",
  });

}