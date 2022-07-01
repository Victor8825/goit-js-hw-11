import { Notify } from "notiflix/build/notiflix-notify-aio";
import {resetPage} from "./js/resetPage";
import {fetchImages} from "./js/fetchImages";
import { addImagesToPage } from "./js/addImagesToPage";
import { smoothScroll } from "./js/smoothScroll";

const formRef = document.querySelector(".search-form");
const scroolControlRef = document.querySelector(".scroll-control");
let inputText = "";

formRef.addEventListener("submit", getRequestedImages);

function getRequestedImages (event) {
  event.preventDefault();
  inputText = event.currentTarget.elements.searchQuery.value;
  if(inputText === "") {
    return Notify.warning("Please type the text in the search bar!");
  }
  resetPage();
  fetchImages(inputText)
  .then(response => {
      if(response.hits.length === 0 ) {
      return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }
      addImagesToPage(response);
      scroolControlRef.classList.remove("is-hidden");
      smoothScroll();
      Notify.info(`Hooray! We found ${response.totalHits} totalHits images`);
  })
  .catch(error => console.log(error));
};

const observerOptions = {
  rootMargin: "350px",
  threshold: 1.0
}

const observer = new IntersectionObserver( (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry);
      fetchImages(inputText)
      .then(response => addImagesToPage(response));
    }
  });
}, observerOptions);

observer.observe(scroolControlRef);

