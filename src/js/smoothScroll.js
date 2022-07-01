const galleryRef = document.querySelector(".gallery");

export function smoothScroll () {
  const { height: cardHeight } = 
    galleryRef.firstElementChild.getBoundingClientRect();
    window.scrollBy(0,{
    top: cardHeight * 2,
    behavior: "smooth",
  });
}