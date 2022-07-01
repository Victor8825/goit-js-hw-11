import axios from "axios";

const DEFAULT_PAGE = 1;
let page = DEFAULT_PAGE;
let inputText = "";
let currentHits = 0;
axios.defaults.baseURL = "https://pixabay.com/api/";


export async function fetchImages (inputText) {
  const searchParams = new URLSearchParams({
    key: "28318270-6b0da933c6f7f5e767acec2c6",
    q:inputText,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    page,
    per_page: 40,
  });

  const response = await axios.get(`?${searchParams}`);
  page += 1;
  return response.data;
};
