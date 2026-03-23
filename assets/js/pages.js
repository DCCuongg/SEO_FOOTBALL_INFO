import { fixRelativePath, renderSportSection, renderMoreNews, renderLatestNews, renderHotNews, renderMoreNewsInPage } from './render.js';
// Thêm một số sự kiện trang chủ
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
  const res = await fetch("../data/posts.json");
  const data = await res.json();

  let posts = data.posts;

  // sort theo ngày mới nhất
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const categoryMap = { "football": "Bóng đá", "basketball": "NBA", "volleyball": "Bóng chuyền", "e-sports": "E-sports" };
  // Lấy "football" từ URL
  const fileName = location.pathname.split('/').pop().replace('.html', '');

  const filteredPosts = posts.filter(p => p.category === categoryMap[fileName]);
  // 1 hot news
  renderHotNews(filteredPosts[0]);

  // 6 tin mới
  renderLatestNews(filteredPosts.slice(1, 7));

  // 6 tin thêm
  renderMoreNewsInPage(filteredPosts.slice(7, 13));
  console.log(filteredPosts.slice(7, 13));

  // render theo category
  // renderSportSection(posts, "Bóng đá", 0);
  // renderSportSection(posts, "Bóng chuyền", 1);
  // renderSportSection(posts, "NBA", 2);

}

initNews();