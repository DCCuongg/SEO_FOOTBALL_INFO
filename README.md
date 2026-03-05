# SEO_FOOTBALL_INFO

# Kiến trúc mã nguồn Static Site Structure (kiểu CMS tĩnh).
blog-site/
│
├── index.html              # Trang chủ
├── sitemap.xml
├── robots.txt
│
├── pages/                  # Các trang tĩnh
│   ├── about.html
│   ├── contact.html
│
├── posts/                  # Các bài viết
│   ├── post-1/
│   │   └── index.html
│   ├── post-2/
│   │   └── index.html
│
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   └── router.js
│   └── img/
│
├── components/             # các phần tái sử dụng
│   ├── header.html
│   └── footer.html
│
└── data/
    └── posts.json          # danh sách bài viết