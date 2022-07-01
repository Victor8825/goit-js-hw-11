export function buildMarkup(imagesArray) {
  return imagesArray.map( ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
  `<div class="gallery__item">
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
  <div class="gallery__info">
    <p class="gallery__info-item">
      <b>Likes</b><br>${likes}
    </p>
    <p class="gallery__info-item">
      <b>Views</b><br>${views}
    </p>
    <p class="gallery__info-item">
      <b>Comments</b><br>${comments}
    </p>
    <p class="gallery__info-item">
      <b>Downloads</b><br>${downloads}
    </p>
  </div>
</div>`).join("");
}
