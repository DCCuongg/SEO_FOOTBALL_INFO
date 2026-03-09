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
function renderHotNews(post) {
  /**
   * Hàm render tin HOT (bài đầu tiên)
   */
  const hotNews = document.querySelector(".hot-news");

  hotNews.innerHTML = `
    <img src="./${post.image}" alt="${post.title}">
    <h2>${post.title}</h2>
    <div class="additional-info">
        <span class="author">${post.author}</span>
        <span class="dot">•</span>
        <span class="date">${post.date}</span>
    </div>
  `;
}

function renderLatestNews(posts) {
  /**
   * Hàm render tin mới nhất (6 bài)
   */
  const container = document.querySelector(".latest-news .section-content");

  container.innerHTML = "";

  posts.forEach((post, index) => {
    container.innerHTML += `
      <p>${post.title}</p>
      ${index !== posts.length - 1 ? '<div class="line"></div>' : ''}
    `;
  });
}

function renderMoreNews(posts) {
  /**
   * Hàm render tin thêm (6 bài tiếp)
   */
  const container = document.querySelector(".more-news");

  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += `
      <div class="card">
        <img src="./${post.image}" alt="${post.title}">
        <div class="card-content">
          <h3>${post.title}</h3>
          <div class="additional-info">
            <span class="author">${post.author}</span>
            <span class="dot">•</span>
            <span class="date">${post.date}</span>
          </div>
        </div>
      </div>
    `;
  });
}

function renderSportSection(posts, category, sectionIndex) {
  /**
   * Hàm render section theo thể loại
   */
  const sections = document.querySelectorAll(".sport-section");
  const container = sections[sectionIndex].querySelector(".sport-row");

  container.innerHTML = "";

  const filtered = posts
    .filter(p => p.category === category)
    .slice(0, 15);

  filtered.forEach(post => {
    container.innerHTML += `
      <div class="box">
        <img src="./${post.image}" alt="${post.title}">
        <div class="card-content">
          <h3>${post.title}</h3>
          <div class="additional-info">
            <span class="author">${post.author}</span>
            <span class="dot">•</span>
            <span class="date">${post.date}</span>
          </div>
        </div>
      </div>
    `;
  });

}

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

}

initNews();