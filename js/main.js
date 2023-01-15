// skipNavi ------------------------------
const skipNavi = document.querySelectorAll('#skipNavi li a');

for (let el of skipNavi) {
	el.addEventListener('focusin', () => {
		el.classList.add('on');
	});
	el.addEventListener('focusout', () => {
		el.classList.remove('on');
	});
}
// scroll ----------------------------------
const scrollView = document.querySelectorAll('.scrollView');
const btnScroll = document.querySelectorAll('.btnScroll li');
const btnScroll_arr = Array.from(btnScroll);
const base = -window.innerHeight / 2;
const scrollSpeed = 500;
let posArr = [];

getPos();

window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

window.addEventListener('resize', modifyPos);

window.addEventListener('scroll', scrollActive);

btnScroll.forEach((btn, idx) => {
	btn.addEventListener('click', (e) => {
		const scroll = window.scrollY;
		const isOn = e.currentTarget.classList.contains('on');
		if (isOn && scroll === posArr[idx]) return;
		moveScroll(idx);
	});
});

function getPos() {
	posArr = [];
	for (const el of scrollView) posArr.push(el.offsetTop);
}

function modifyPos() {
	getPos();
	const scrollActive = document.querySelector('li.on');
	const active_index = btnScroll_arr.indexOf(scrollActive);
	window.scroll(0, posArr[active_index]);
}

function scrollActive() {
	const scroll = window.scrollY || window.pageYOffset;

	scrollView.forEach((_, idx) => {
		if (scroll >= posArr[idx] + base) {
			for (const el of btnScroll) el.classList.remove('on');
			btnScroll[idx].classList.add('on');
			scrollView[idx].classList.add('on');
		}
	});
}

function moveScroll(index) {
	new Anime(window, {
		prop: 'scroll',
		value: posArr[index],
		duration: scrollSpeed,
	});
}

// #visual .btnViewOpen -------------------
const btnViewOpen = document.querySelector('.btnViewOpen');
const visual = document.querySelector('#visual');
const aside = document.querySelector('#aside');
const btnViewClose = aside.querySelector('.btnViewClose');
const _top = aside.querySelector('.top');
const _right = aside.querySelector('.right');
const _bottom = aside.querySelector('.bottom');
const _left = aside.querySelector('.left');
const _inner = aside.querySelector('.inner');
const viewSpeed = 500;

btnViewOpen.addEventListener('click', (e) => {
	e.preventDefault();
	aside.style.display = 'block';
	visual.classList.add('off');
	new Anime(_top, {
		prop: 'width',
		value: '100%',
		duration: viewSpeed,
		callback: () => {
			new Anime(_right, {
				prop: 'height',
				value: '100%',
				duration: viewSpeed,
				callback: () => {
					new Anime(_bottom, {
						prop: 'width',
						value: '100%',
						duration: viewSpeed,
						callback: () => {
							new Anime(_left, {
								prop: 'height',
								value: '100%',
								duration: viewSpeed,
								callback: () => {
									new Anime(_inner, {
										prop: 'opacity',
										value: 1,
										duration: viewSpeed,
									});
								},
							});
						},
					});
				},
			});
		},
	});
});

btnViewClose.addEventListener('click', (e) => {
	e.preventDefault();

	new Anime(_inner, {
		prop: 'opacity',
		value: 0,
		duration: viewSpeed,
		callback: () => {
			new Anime(_top, {
				prop: 'width',
				value: '0%',
				duration: viewSpeed,
			});
			new Anime(_right, {
				prop: 'height',
				value: '0%',
				duration: viewSpeed,
			});
			new Anime(_bottom, {
				prop: 'width',
				value: '0%',
				duration: viewSpeed,
			});
			new Anime(_left, {
				prop: 'height',
				value: '0%',
				duration: viewSpeed,
				callback: () => {
					aside.style.display = 'none';

					visual.classList.remove('off');
				},
			});
		},
	});
});

// #visual .slider-------------------------
const slider = document.querySelector('.slider');
const frame = slider.querySelector('ul');
const boxs = frame.querySelectorAll('li');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const delay = convertSpeed(boxs[0]);

let enableClick = true;

init();

next.addEventListener('click', nextslide);

prev.addEventListener('click', prevslide);

function init() {
	frame.prepend(frame.lastElementChild);
	frame.prepend(frame.lastElementChild);
	boxs[0].classList.add('on');
}
function nextslide(e) {
	e.preventDefault();
	if (!enableClick) return;
	enableClick = false;
	next.classList.add('on');

	setTimeout(() => next.classList.remove('on'), 500);

	frame.append(frame.firstElementChild);
	activationSlide();
}
function prevslide(e) {
	e.preventDefault();
	if (!enableClick) return;
	enableClick = false;
	prev.classList.add('on');

	setTimeout(() => prev.classList.remove('on'), 500);

	frame.prepend(frame.lastElementChild);
	activationSlide();
}
function activationSlide() {
	setTimeout(() => {
		const boxs = frame.querySelectorAll('li');
		for (const el of boxs) el.classList.remove('on');
		boxs[2].classList.add('on');
		enableClick = true;
	}, delay);
}
function convertSpeed(el) {
	return parseFloat(getComputedStyle(el).transitionDuration) * 1000;
}

// #portfolio #tab -------------------------
const tab_container = document.querySelector('.tab_container');
const tab_btns = tab_container.querySelectorAll('ul li');
const tab_boxes = tab_container.querySelectorAll('section article');
const tabSpeed = 300;

tab_btns.forEach((_el, _ind) => {
	_el.addEventListener('click', (e) => {
		e.preventDefault();

		let isOn = e.currentTarget.classList.contains('on');
		if (isOn) return;

		if (enableClick) {
			enableClick = false;

			activation(tab_btns, _ind);
			activation(tab_boxes, _ind);
		}
	});
});

function activation(list, index) {
	for (let k of list) {
		k.classList.remove('on');
		list[index].classList.add('on');

		setTimeout(() => {
			enableClick = true;
		}, tabSpeed);
	}
}
