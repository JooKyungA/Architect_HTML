const body = document.querySelector('body');
const frame = document.querySelector('.list');
const loading = document.querySelector('.loading');
const input = document.querySelector('#search');
const btnSearch = document.querySelector('.btnSearch');
const base = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
const method_user = 'flickr.people.getPhotos';
const method_search = 'flickr.photos.search';
const key = 'c56ad21076b0ceff5779ce087e6afed3';
const per_page = 30;
const user_id = '197141079@N07';

const url1 = `${base}&method=${method_user}&api_key=${key}&per_page=${per_page}&user_id=${user_id}`;

btnSearch.addEventListener('click', () => {
	let tag = input.value;
	tag = tag.trim();
	const url = `${base}&method=${method_search}&api_key=${key}&per_page=${per_page}&tags=${tag}`;

	if (tag != '') {
		callData(url);
		input.value = '';
	} else {
		alert('검색어를 입력하세요.');
	}
});

input.addEventListener('keypress', (e) => {
	if (e.keyCode == 13) {
		let tag = input.value;
		tag = tag.trim();
		const url = `${base}&method=${method_search}&api_key=${key}&per_page=${per_page}&tags=${tag}`;
		if (tag != '') {
			callData(url);
			input.value = '';
		} else {
			alert('검색어를 입력하세요.');
		}
	}
});

frame.addEventListener('click', (e) => {
	e.preventDefault();

	let target = e.target.closest('.item').querySelector('div');

	if (e.target.closest('div') === target) {
		let imgSrc = e.target.closest('.item').querySelector('a').getAttribute('href');

		let pop = document.createElement('aside');
		pop.classList.add('pop');
		let pops = `
			<div class="box">
      	<img src="${imgSrc}">
			</div>
      <span class="btnClosePic">+</span>
    `;
		pop.innerHTML = pops;

		body.append(pop);
		body.style.overflow = 'hidden';
	} else {
		return;
	}
});

body.addEventListener('click', (e) => {
	let pop = body.querySelector('.pop');

	if (pop != null) {
		let close = pop.querySelector('.btnClosePic');
		if (e.target == close) {
			pop.remove();
			body.style.overflow = 'auto';
		}
	}
});

callData(url1);

function callData(url) {
	frame.innerHTML = '';
	loading.classList.remove('off');
	frame.classList.remove('on');

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
				loading.classList.remove('off');
				alert('검색하신 이미지의 데이터가 없습니다');
			}
		});
}

function createList(items) {
	let htmls = '';

	items.map((el) => {
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
	});
	frame.innerHTML = htmls;
}

function delayLoading() {
	const imgs = frame.querySelectorAll('div a img');
	const len = imgs.length;

	let count = 0;

	for (let el of imgs) {
		el.addEventListener('load', () => {
			count++;

			if (count == len) isoLayout();
		});
	}
}

function isoLayout() {
	loading.classList.add('off');
	frame.classList.add('on');
	new Isotope('.list', {
		itemSelection: '.item',
		columnWidth: '.item',
		transitionDuration: '0.5s',
	});
}
