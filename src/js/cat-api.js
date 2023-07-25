import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_sW0PYRsVvFmIP6p9uFgJzQTR6aDBktZBD4fKfgnGbCKgtHdhwf7guufZawFBfnm7";


export const fetchBreeds = () => {
     return fetch('https://api.thecatapi.com/v1/breeds').then((response) => {
          if (!response.ok) {
               new Error(response.status);
          }
          else {
               return response.json();
          }
     })
}

export const fetchCatByBreed = (id) => {
     let params = new URLSearchParams({
          breed_ids: id
     });
     return fetch(`https://api.thecatapi.com/v1/images/search?${params.toString()}`).then((response) => {
          if (!response.ok) {
               new Error(response.status);
          }
          else {
               return response.json();
          }
     })
}