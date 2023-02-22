// map ---------------------------------------------------`-----
const mapContainer = document.getElementById('map');
const branch_btns = document.querySelectorAll('.branch li');

mapOption = {
	center: new kakao.maps.LatLng(37.4261458, 126.648286),
	level: 3,
};

const map = new kakao.maps.Map(mapContainer, mapOption);

const markerOptions = [
	{
		title: '본점',
		latlng: new kakao.maps.LatLng(37.4261458, 126.648286),
		imgSrc: 'img/placeholder.png',
		imgSize: new kakao.maps.Size(64, 64),
		imgPos: { offset: new kakao.maps.Point(32, 64) },
		button: branch_btns[0],
	},
	{
		title: '안양지점',
		latlng: new kakao.maps.LatLng(37.3851989, 126.9510398),
		imgSrc: 'img/placeholder.png',
		imgSize: new kakao.maps.Size(64, 64),
		imgPos: { offset: new kakao.maps.Point(32, 66) },
		button: branch_btns[1],
	},
	{
		title: '서울지점',
		latlng: new kakao.maps.LatLng(37.4706014, 126.9369485),
		imgSrc: 'img/placeholder.png',
		imgSize: new kakao.maps.Size(64, 64),
		imgPos: { offset: new kakao.maps.Point(32, 64) },
		button: branch_btns[2],
	},
];

for (let i = 0; i < markerOptions.length; i++) {
	new kakao.maps.Marker({
		map: map,
		position: markerOptions[i].latlng,
		title: markerOptions[i].title,
		image: new kakao.maps.MarkerImage(
			markerOptions[i].imgSrc,
			markerOptions[i].imgSize,
			markerOptions[i].imgPos
		),
	});

	markerOptions[i].button.onclick = (e) => {
		e.preventDefault();
		for (let k = 0; k < markerOptions.length; k++) {
			markerOptions[k].button.classList.remove('on');
		}
		markerOptions[i].button.classList.add('on');
		moveTo(markerOptions[i].latlng);
	};
}

window.onresize = () => {
	let active_btn = document.querySelector('.branch li.on');
	let active_index = active_btn.getAttribute('data-index');
	map.setCenter(markerOptions[active_index].latlng);
};

const mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

const zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

setZoomable(false);

setDraggable(true);

function setZoomable(Zoomable) {
	map.setZoomable(Zoomable);
}
function setDraggable(draggable) {
	map.setDraggable(draggable);
}
function moveTo(target) {
	const moveLatlng = target;
	map.setCenter(moveLatlng);
}
