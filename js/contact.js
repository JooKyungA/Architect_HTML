// validation
const form = document.querySelector("#contact_form");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", (e) => {
  if (!isTxt("contact_name")) e.preventDefault();
  if (!isTxt("contact_message", 10)) e.preventDefault();
  if (!isEmail("contact_email")) e.preventDefault();
  if (!isSelect("sel_branch")) e.preventDefault();
})

function isTxt(el, len) {
  if (len === undefined) len = 1;
  let input = form.querySelector(`[name=${el}]`);
  let txt = input.value;
  if (txt.length >= len) {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();

    return true;
  } else {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) return false;

    const errMsg = document.createElement("p");
    errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`);
    input.closest("td").append(errMsg);
    return false;
  }
}

function isEmail(el) {
  let input = form.querySelector(`[name=${el}]`);
  let txt = input.value;

  if (/@/.test(txt)) {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
    return true;
  } else {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) return false;

    const errMsg = document.createElement("p");
    errMsg.append("@를 포함한 전체 이메일 주소를 입력하세요");
    input.closest("td").append(errMsg);
    return false;
  }
}

function isSelect(el) {
  let sel = form.querySelector(`[name=${el}]`);
  let sel_index = sel.options.selectedIndex;

  let val = sel[sel_index].value;

  if (val !== "") {
    const errMsgs = sel.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) sel.closest("td").querySelector("p").remove();

    return true;
  } else {
    const errMsgs = sel.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) return false;

    const errMsg = document.createElement("p");
    errMsg.append("항목을 선택해 주세요");
    sel.closest("td").append(errMsg);

    return false;
  }
}

// map --------------------------------------------------------
var mapContainer = document.getElementById('map');

const branch_btns = document.querySelectorAll(".branch li");

let drag = true;
let zoom = true;

mapOption = {
  center: new kakao.maps.LatLng(37.4912654, 126.7520173),
  level: 3
};

var map = new kakao.maps.Map(mapContainer, mapOption);

var markerOptions = [
  {
    title: "본점",
    latlng: new kakao.maps.LatLng(37.4912654, 126.7520173),
    imgSrc: 'img/placeholder.png',
    imgSize: new kakao.maps.Size(64, 64),
    imgPos: { offset: new kakao.maps.Point(32, 64) },
    button: branch_btns[0],
  },
  {
    title: "안양지점",
    latlng: new kakao.maps.LatLng(37.3851989, 126.9510398),
    imgSrc: 'img/placeholder.png',
    imgSize: new kakao.maps.Size(64, 64),
    imgPos: { offset: new kakao.maps.Point(32, 66) },
    button: branch_btns[1],
  },
  {
    title: "서울지점",
    latlng: new kakao.maps.LatLng(37.4706014, 126.9369485),
    imgSrc: 'img/placeholder.png',
    imgSize: new kakao.maps.Size(64, 64),
    imgPos: { offset: new kakao.maps.Point(32, 64) },
    button: branch_btns[2],
  }
];

for (let i = 0; i < markerOptions.length; i++) {
  new kakao.maps.Marker({
    map: map,
    position: markerOptions[i].latlng,
    title: markerOptions[i].title,
    image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos),
  });

  markerOptions[i].button.onclick = (e) => {
    e.preventDefault();
    for (let k = 0; k < markerOptions.length; k++) {
      markerOptions[k].button.classList.remove("on");
    }
    markerOptions[i].button.classList.add("on");
    moveTo(markerOptions[i].latlng);
  }
}

window.onresize = () => {
  let active_btn = document.querySelector(".branch li.on");
  let active_index = active_btn.getAttribute("data-index");
  map.setCenter(markerOptions[active_index].latlng);
}

var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);


setDraggable(drag);
setZoomable(zoom);

function setZoomable(zoomable) {
  map.setZoomable(zoomable);
}
function setDraggable(draggable) {
  map.setDraggable(draggable);
}
function moveTo(target) {
  var moveLatlng = target;
  map.setCenter(moveLatlng);
}