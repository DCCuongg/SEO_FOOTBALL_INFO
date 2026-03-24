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
  try {
    const res = await fetch("../../data/posts.json");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    if (!data || !data.posts) {
      throw new Error("Data không hợp lệ hoặc thiếu 'posts'");
    }
    let posts = data.posts;

    // sort theo ngày mới nhất
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    const categoryMap = { "football": "Bóng đá", "basketball": "NBA", "volleyball": "Bóng chuyền", "e-sports": "E-sports" };
    // Lấy "football" từ URL
    const pathParts = location.pathname.split('/').filter(Boolean);

    let fileName = pathParts[pathParts.length - 1].replace('.html', '');
    if (fileName === "") {
      fileName = pathParts[pathParts.length - 2];// nếu là /football/ → lấy football
    }
    const category = categoryMap[fileName];

    if (!category) {
      throw new Error(`Không tìm thấy category cho: ${fileName}`);
    }

    const filteredPosts = posts.filter(p => p.category === categoryMap[fileName]);
    console.log(filteredPosts[0]);
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
  } catch (error) {
    console.error("Lỗi initNews:", error);

    // hiển thị lỗi ra UI (rất nên có)
    const container = document.querySelector("#news-container");
    if (container) {
      container.innerHTML = `
      <p style="color:red;">
        Lỗi tải dữ liệu: ${error.message}
      </p>
    `;
    }
  }
}

initNews();