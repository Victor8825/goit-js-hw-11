const DEFAULT_PAGE = 1;
let page = DEFAULT_PAGE;
const galleryRef = document.querySelector(".gallery");

export function resetPage() {
  page = DEFAULT_PAGE;
  galleryRef.innerHTML = "";
};