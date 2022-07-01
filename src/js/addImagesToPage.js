import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { buildMarkup } from "./buildMarkup";

const galleryRef = document.querySelector(".gallery");
export function addImagesToPage(response) {
  galleryRef.insertAdjacentHTML("beforeend", buildMarkup(response.hits));
  lightbox.refresh();
}

const simpleLightboxOptions = {
  close: true,
  closeText: 'X',
  overlayOpacity: 0.9,
  captionDelay: 250,
  showCounter: true
}
const lightbox = new SimpleLightbox(".gallery a", simpleLightboxOptions);