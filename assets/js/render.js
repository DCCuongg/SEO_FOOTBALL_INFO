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
  console.log("Depth:", depth, "Prefix:", prefix, "Clean Path:", cleanPath);
  return prefix + cleanPath;
}

export function renderHotNews(post) {
  /**
   * Hàm render tin HOT (bài đầu tiên)
   */
  const hotNews = document.querySelector(".hot-news");

  hotNews.innerHTML = `
    <a href="${fixRelativePath(post.url)}">
      <img src="${fixRelativePath(post.image)}" alt="${post.title}" fetchpriority="high">
    </a>

    <h2 class="limit-text">
      <a href="${fixRelativePath(post.url)}">${post.title}</a>
    </h2>
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
      <p class="limit-text-2">
        <a href="${fixRelativePath(post.url)}">${post.title}</a>
      </p>
      ${index !== posts.length - 1 ? '<div class="line"></div>' : ''}
    `;
  });
}

export function renderMoreNews(posts) {
  const container = document.querySelector(".more-news");

  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += `
      <div class="card">

        <a href="${fixRelativePath(post.url)}">
          <img src="${fixRelativePath(post.image)}" loading="lazy" alt="${post.title}">
        </a>

        <div class="card-content">
          <h3 class="limit-text-2">
            <a href="${fixRelativePath(post.url)}">${post.title}</a>
          </h3>

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
  const container = document.querySelector(".more-news-in-page div:first-child");

  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += `
      <div class="card">

        <a href="${fixRelativePath(post.url)}">
          <img src="${fixRelativePath(post.image)}" loading="lazy" alt="${post.title}">
        </a>

        <div class="card-content">
          <h3 class="limit-text-2">
            <a href="${fixRelativePath(post.url)}">${post.title}</a>
          </h3>

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
  const sections = document.querySelectorAll(".sport-section");
  const container = sections[sectionIndex].querySelector(".sport-row");

  container.innerHTML = "";

  const filtered = posts
    .filter(p => p.category === category)
    .slice(0, 15);

  filtered.forEach(post => {
    container.innerHTML += `
      <div class="box">

        <a href="${fixRelativePath(post.url)}">
          <img src="${fixRelativePath(post.image)}" loading="lazy" alt="${post.title}">
        </a>

        <div class="card-content">
          <h3 class="limit-text">
            <a href="${fixRelativePath(post.url)}">${post.title}</a>
          </h3>

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