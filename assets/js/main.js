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