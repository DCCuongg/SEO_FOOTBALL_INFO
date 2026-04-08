// Thêm một số sự kiện trang chủ
import { fixRelativePath, renderSportSection, renderMoreNews, renderLatestNews, renderHotNews } from './render.js';

//.........HEADER
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

toggle.onclick = () => {
  menu.classList.toggle("active");
};
// cuộn trang thì tắt header
let lastScroll = 0;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll) {
    // scroll xuống
    header.classList.add("hide");
    menu.classList.remove("active");
  } else {
    // scroll lên
    header.classList.remove("hide");
  }

  lastScroll = currentScroll;
});


//.........MAIN
async function initNews() {
  /**
//    * posts.json
//      │
//      ▼
// fetch()
//      │
//      ▼
// sort theo date
//      │
//      ▼
// ┌─────────────┬─────────────┬─────────────┐
// │ hot news    │ latest news │ more news   │
// │ posts[0]    │ posts[1-6]  │ posts[7-12] │
// └─────────────┴─────────────┴─────────────┘

// sau đó

// lọc category
// → Bóng đá
// → Bóng chuyền
// → NBA
   */
  const res = await fetch("./data/posts.json");
  const data = await res.json();

  let posts = data.posts;

  // sort theo ngày mới nhất
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 1 hot news
  renderHotNews(posts[0]);

  // 6 tin mới
  renderLatestNews(posts.slice(1, 7));

  // 6 tin thêm
  renderMoreNews(posts.slice(7, 13));

  // render theo category
  renderSportSection(posts, "Bóng đá", 0);
  renderSportSection(posts, "Bóng chuyền", 1);
  renderSportSection(posts, "NBA", 2);
  renderSportSection(posts, "E-sports", 3);

}

initNews();