const body = document.querySelector('body');
const vidList = document.querySelector('.vidList');
const key = 'AIzaSyCe4VTdOeeczNpK2P90-h1K2ZmPWygTVOY';
const playlistId = 'PLB11APmWdapRtpUvss55ipqwUpcIxj3Eq';
const num = 9;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

fetch(url)
	.then((data) => {
		return data.json();
	})
	.then((json) => {
		let items = json.items;
		let result = '';

		items.map((el) => {
			let title = el.snippet.title;
			if (title.length > 25) {
				title = title.substr(0, 25) + '...';
			}
			let desc = el.snippet.description;
			if (desc.length > 90) {
				desc = desc.substr(0, 90) + '...';
			}
			let date = el.snippet.publishedAt;
			date = date.split('T')[0];

			result += `
        <article>
          <a href="${el.snippet.resourceId.videoId}" class="pic">
            <img src="${el.snippet.thumbnails.high.url}">
          </a>
          <div class="con">
            <h2>${title}</h2>
            <p>${desc}</p>
            <span>${date}</span>
          </div>
        </article>
      `;
		});
		vidList.innerHTML = result;
	});

vidList.addEventListener('click', (e) => {
	e.preventDefault();
	if (!e.target.closest('a')) return;
	const vidId = e.target.closest('a').getAttribute('href');

	let pop = document.createElement('aside');
	pop.classList.add('pop');
	pop.innerHTML = `
			<div class="box">
   		   <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
			</div>
      <span class="btnCloseVid">+</span>
    `;
	body.append(pop);
	body.style.overflow = 'hidden';
});

body.addEventListener('click', (e) => {
	let pop = body.querySelector('.pop');

	if (pop) {
		let close = pop.querySelector('.btnCloseVid');
		if (e.target == close) {
			pop.remove();
			body.style.overflow = 'auto';
		}
	}
});
