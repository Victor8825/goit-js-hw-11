import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


axios.defaults.baseURL = "https://pixabay.com/api/";
const DEFAULT_PAGE = 1;
let page = DEFAULT_PAGE;

const formRef = document.querySelector(".search-form");
const galleryRef = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");
let imageName = "";


// const modalGalleryOptions = {
//   captionsData: 'alt',
//   captionDelay: 250
// }
// const modalGallery = new SimpleLightbox(".gallery a", modalGalleryOptions );

function resetPage() {
  page = DEFAULT_PAGE;
  galleryRef.innerHTML = "";
};

const onRequest = event => {
  event.preventDefault();
  imageName = event.currentTarget.elements.searchQuery.value;
  if(imageName === "") {
    return Notify.warning("Please type the text in the search bar!");
  }
  resetPage();
  loadMoreBtn.classList.remove("is-visible");
  fetchImages(imageName)
  .then(response => {
      if(response.hits.length === 0 ) {
      return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      // if(response.hits.length === response.totalHits) {
      //   console.log(response.totalHits);
      //   Notify.info("We're sorry, but you've reached the end of search results.");
      //   loadMoreBtn.classList.remove("is-visible");
      //   return;
      // }
      galleryRef.insertAdjacentHTML("beforeend", buildMarkup(response.hits));
      loadMoreBtn.classList.add("is-visible");
      Notify.info(`Hooray! We found ${response.totalHits} totalHits images`);
      console.log(response.totalHits);
  })
  .catch(error => console.log(error));

};
formRef.addEventListener("submit", onRequest )



function buildMarkup(imagesArray) {
  return imagesArray.map( ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
  `<div class="photo-card">
  <div class="gallery__item"><a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy"/></a></div>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${likes}
    </p>
    <p class="info-item">
      <b>Views</b><br>${views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${downloads}
    </p>
  </div>
</div>`).join("");
}

async function fetchImages (imageName) {
  const searchParams = new URLSearchParams({
    key: "28318270-6b0da933c6f7f5e767acec2c6",
    q:imageName,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page,
    per_page: 5,
  });

  const response = await axios.get(`?${searchParams}`);
  page += 1;
  return response.data;
};

loadMoreBtn.addEventListener("click", () => {
  fetchImages(imageName)
  .then(response => galleryRef.insertAdjacentHTML("beforeend", buildMarkup(response.hits)));
});

const simplelightboxOptions = {
  captionsData: 'alt',
  captionDelay: 250
}
const lightbox = new SimpleLightbox('.gallery div', simplelightboxOptions);