/* QUản trị code render dùng chung cho nhiều page */
/**
 * Chuyển đổi đường dẫn tương đối (./) thành đường dẫn tương đối rộng (../../)
 */
export function fixRelativePath(relativePath) {
  // 1. Lấy đường dẫn thư mục hiện tại (loại bỏ tên file ở cuối)
  // Ví dụ: "/post/2024/page.html" -> "/post/2024/"
  const pathName = window.location.pathname;

  // 2. Đếm số lượng dấu gạch chéo để biết độ sâu (trừ đi 1 cho folder gốc)
  // Cẩn thận với dấu gạch chéo ở đầu và cuối
  const depth = pathName.split('/').filter(p => p !== "").length - 1;

  // 3. Tạo tiền tố (prefix)
  // Nếu ở index (depth = 0) -> prefix = ""
  // Nếu ở post/ (depth = 1) -> prefix = "../"
  // Nếu ở post/page/ (depth = 2) -> prefix = "../../"
  let prefix = "";
  for (let i = 0; i < depth; i++) {
    prefix += "../";
  }

  // 4. Thay thế "./" bằng prefix hoặc nối thêm nếu đường dẫn không có ./
  let newPath = relativePath.replace(/^\.\//, ""); // Xóa bỏ "./" ở đầu

  return prefix + newPath;
}

export function renderHotNews(post) {
  /**
   * Hàm render tin HOT (bài đầu tiên)
   */
  const hotNews = document.querySelector(".hot-news");

  hotNews.innerHTML = `
    <img src="${fixRelativePath(post.image)}" alt="${post.title}">
    <h2 class="limit-text">${post.title}</h2>
    <div class="additional-info">
        <span class="author limit-text-2">${post.author}</span>
        <span class="dot">•</span>
        <span class="date">${post.date}</span>
    </div>
  `;
}

export function renderLatestNews(posts) {
  /**
   * Hàm render tin mới nhất (6 bài)
   */
  const container = document.querySelector(".latest-news .section-content");

  container.innerHTML = "";

  posts.forEach((post, index) => {
    container.innerHTML += `
      <p class="limit-text-2">${post.title}</p>
      ${index !== posts.length - 1 ? '<div class="line"></div>' : ''}
    `;
  });
}

export function renderMoreNews(posts) {
  /**
   * Hàm render tin thêm (6 bài tiếp)
   */
  const container = document.querySelector(".more-news");

  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += `
      <div class="card">
        <img src="${fixRelativePath(post.image)}" alt="${post.title}">
        <div class="card-content">
          <h3 class="limit-text-2">${post.title}</h3>
          <div class="additional-info">
            <span class="author limit-text-2">${post.author}</span>
            <span class="dot">•</span>
            <span class="date">${post.date}</span>
          </div>
        </div>
      </div>
    `;
  });
}
export function renderMoreNewsInPage(posts) {
  /**
   * Hàm render tin thêm (6 bài tiếp)
   */
  const container = document.querySelector(".more-news-in-page div:first-child");

  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += `
      <div class="card">
        <img src="${fixRelativePath(post.image)}" alt="${post.title}">
        <div class="card-content">
          <h3 class="limit-text-2">${post.title}</h3>
          <div class="additional-info">
            <span class="author limit-text-2">${post.author}</span>
            <span class="dot">•</span>
            <span class="date">${post.date}</span>
          </div>
        </div>
      </div>
    `;
  });
}
export function renderSportSection(posts, category, sectionIndex) {
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
        <img src="${fixRelativePath(post.image)}" alt="${post.title}">
        <div class="card-content">
          <h3 class="limit-text">${post.title}</h3>
          <div class="additional-info">
            <span class="author limit-text-2">${post.author}</span>
            <span class="dot">•</span>
            <span class="date">${post.date}</span>
          </div>
        </div>
      </div>
    `;
  });

}