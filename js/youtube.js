const vidList = document.querySelector(".vidList");
const key = 'AIzaSyCe4VTdOeeczNpK2P90-h1K2ZmPWygTVOY';
const playlistId = 'PLB11APmWdapRtpUvss55ipqwUpcIxj3Eq';
const num = 6;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

fetch(url)
  .then((data) => {
    return data.json();
  })
  .then((json) => {
    let items = json.items;
    console.log(items);
    let result = '';

    items.map((el) => {
      let title = el.snippet.title;
      if (title.length > 20) {
        title = title.substr(0, 20) + "...";
      }
      let con = el.snippet.description;
      if (con.length > 40) {
        con = con.substr(0, 40) + "...";
      }
      let date = el.snippet.publishedAt;
      date = date.split("T")[0];

      result += `
        <article>
          <a href="${el.snippet.resourceId.videoId}" class="pic">
            <img src="${el.snippet.thumbnails.high.url}">
          </a>
          <div class="con">
            <h2>${title}</h2>
            <p>${con}</p>
            <span>${date}</span>
          </div>
        </article>
      `;
    })
    vidList.innerHTML = result;
  });

vidList.addEventListener("click", (e) => {
  e.preventDefault();


  const vidId = e.target.closest("a").getAttribute("href");

  let pop = document.createElement("figure");
  pop.classList.add("pop");
  pop.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
      <span class="btnClose">close</span>
    `;
  vidList.append(pop);
})

vidList.addEventListener("click", (e) => {
  const pop = vidList.querySelector(".pop");

  if (pop) {
    const close = pop.querySelector("span");
    if (e.target == close) pop.remove();
  }
})
