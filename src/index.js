import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/";
const formRef = document.querySelector(".search-form");
const searchParams = new URLSearchParams({
  key: "28318270-6b0da933c6f7f5e767acec2c6",
  q: "",
  image_type: "photo",
  orientation: "horyzontal",
  safesearch: "true"
});
 
const onRequest = event => {
  event.preventDefault();
  // console.log(event);
  console.dir(event.currentTarget);
  searchParams.set("q", event.currentTarget.elements.searchQuery.value)
  console.log(searchParams.get("q"));
  fetchImages().then(response => console.log(response.data)).catch((error) => console.log(error.code + ':  ' + error.message));

};
formRef.addEventListener("submit", onRequest )

async function fetchImages () {
  // try {
    console.log(`${BASE_URL}?${new URLSearchParams(searchParams)}`);
    const response = await axios.get(`${BASE_URL}?${searchParams}`);
    return response;
  // } catch (error) {
    // console.log('error');
    // throw error.status;
  // }
};

 

  


// const body = document.body;
// let userList;

// fetch (`${BASE_URL}&q=cat`)
// .then ( response => {
//   if(!response.ok) {
//     throw new Error (response.status)
//   }
//   return response.json();
// })

// .then(capa => {
//   console.log(capa);
//   for (key in capa) {
//     console.log(key.hits);
//       // `<img ${key.id} >`.join("")
//       // body.innerHTML = userList
  
//   }
// })  
// .catch(error => console.log(error));
