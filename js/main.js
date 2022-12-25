// skipNavi 관련---------------
const skipNavi = document.querySelectorAll('#skipNavi li a');

for (let el of skipNavi) {
	el.addEventListener('focusin', () => {
		el.classList.add('on');
	});
	el.addEventListener('focusout', () => {
		el.classList.remove('on');
	});
}
// scroll 관련----------------------------------
const scrollView = document.querySelectorAll('.scrollView');
const btnScroll = document.querySelectorAll('.scroll li');
let posArr = [];
const base = -300;
const scrollSpeed = 500;
for (let el of scrollView) {
	posArr.push(el.offsetTop);
}

window.addEventListener('scroll', () => {
	let scroll = window.scrollY || window.pageYOffset;

	scrollView.forEach((el, index) => {
		if (scroll >= posArr[index] + base) {
			btnScroll.forEach((el, index) => {
				el.classList.remove('on');
			});
			btnScroll[index].classList.add('on');
			scrollView[index].classList.add('on');
		}
	});
});
btnScroll.forEach((el, index) => {
	el.addEventListener('click', () => {
		new Anim(window, {
			prop: 'scroll',
			value: posArr[index],
			duration: scrollSpeed,
		});
		for (let i of btnScroll) {
			i.classList.remove('on');
		}
		el.classList.add('on');
	});
});

// view content 관련---------------------
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
	new Anim(_top, {
		prop: 'width',
		value: '100%',
		duration: viewSpeed,
		callback: () => {
			new Anim(_right, {
				prop: 'height',
				value: '100%',
				duration: viewSpeed,
				callback: () => {
					new Anim(_bottom, {
						prop: 'width',
						value: '100%',
						duration: viewSpeed,
						callback: () => {
							new Anim(_left, {
								prop: 'height',
								value: '100%',
								duration: viewSpeed,
								callback: () => {
									new Anim(_inner, {
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

	new Anim(_inner, {
		prop: 'opacity',
		value: 0,
		duration: viewSpeed,
		callback: () => {
			new Anim(_top, {
				prop: 'width',
				value: '0%',
				duration: viewSpeed,
			});
			new Anim(_right, {
				prop: 'height',
				value: '0%',
				duration: viewSpeed,
			});
			new Anim(_bottom, {
				prop: 'width',
				value: '0%',
				duration: viewSpeed,
			});
			new Anim(_left, {
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

// tab menu 관련 js--------------------------
const tab_menu = document.querySelector('.tab_menu');
const tab_btns = tab_menu.querySelectorAll('ul li');
const tab_boxes = tab_menu.querySelectorAll('section article');
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
