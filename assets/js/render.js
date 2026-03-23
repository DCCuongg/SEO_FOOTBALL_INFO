/* QUản trị code render dùng chung cho nhiều page */
/**
 * Chuyển đổi đường dẫn tương đối (./) thành đường dẫn tương đối rộng (../../)
 */
export function fixRelativePath(relativePath) {
  const repoName = "SEO_FOOTBALL_INFO"; // Tên repository của bạn
  const pathName = window.location.pathname;

  // 1. Chia nhỏ đường dẫn thành các phần
  const pathSegments = pathName.split('/').filter(p => p !== "" && !p.endsWith('.html'));

  // 2. Tìm vị trí của tên Repo trong mảng đường dẫn
  const repoIndex = pathSegments.indexOf(repoName);

  // 3. Độ sâu thực tế = Tổng số folder phía sau tên Repo
  // Nếu không tìm thấy repo (chạy localhost), ta tính từ gốc /
  const depth = repoIndex !== -1
    ? pathSegments.length - (repoIndex + 1)
    : pathSegments.length;

  // 4. Tạo prefix ../
  let prefix = "";
  for (let i = 0; i < depth; i++) {
    prefix += "../";
  }

  // 5. Xử lý path đầu vào
  let cleanPath = relativePath.replace(/^\.\//, "");

  return prefix + cleanPath;
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