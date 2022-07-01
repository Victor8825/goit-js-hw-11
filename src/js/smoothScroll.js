const galleryRef = document.querySelector(".gallery");

export function smoothScroll () {
  const { height: cardHeight } = 
    galleryRef.firstElementChild.getBoundingClientRect();
    console.log({height: cardHeight});
    window.scrollBy(0,{
    top: cardHeight * 2,
    behavior: "smooth",
  });
}