const galleryRef = document.querySelector(".gallery");

export function smoothScroll () {
  const { height: cardHeight } = 
    galleryRef.firstElementChild.getBoundingClientRect();
    window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}