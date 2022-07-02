import { Notify } from "notiflix/build/notiflix-notify-aio";
import { addImagesToPage } from "./js/addImagesToPage";
import axios from "axios";


const formRef = document.querySelector(".search-form");
const scroolControlRef = document.querySelector(".scroll-control");
const galleryRef = document.querySelector(".gallery");

let inputText = "";
let totalHits = 0;
const DEFAULT_PAGE = 1;
const PER_PAGE = 40;
let page = DEFAULT_PAGE;
axios.defaults.baseURL = "https://pixabay.com/api/";


formRef.addEventListener("submit", getRequestedImages);

function getRequestedImages (event) {
  event.preventDefault();
  inputText = event.currentTarget.elements.searchQuery.value;
  if(inputText === "") {
    return Notify.warning("Please type the text in the search bar!");
  }

  fetchImages(inputText)
  .then(response => {
      page = DEFAULT_PAGE;
      galleryRef.innerHTML = "";

      window.scrollTo(0,0);
      totalHits = response.totalHits;
    
      if(response.hits.length === 0 ) {
      return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }

      addImagesToPage(response);
      scroolControlRef.classList.remove("is-hidden");
      Notify.info(`Hooray! We found ${response.totalHits} totalHits images`);     
  })
  .catch(error => console.log(error));
};

function isThereNextPage () {
  return page <= Math.ceil(totalHits / PER_PAGE);
}

const observerOptions = {
  rootMargin: "350px",
  threshold: 1.0
}

const observer = new IntersectionObserver( (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;

      if (isThereNextPage()) {
        fetchImages(inputText, page)
        .then(response => addImagesToPage(response));
      } else {
        Notify.warning("We're sorry, but you've reached the end of search results.");
      }
    }
  });
}, observerOptions);

observer.observe(scroolControlRef);

async function fetchImages (inputText, page=1) {
  const searchParams = new URLSearchParams({
    key: "28318270-6b0da933c6f7f5e767acec2c6",
    q:inputText,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page: page,
    per_page: PER_PAGE,
  });

  const response = await axios.get(`?${searchParams}`);
  return response.data;
};
