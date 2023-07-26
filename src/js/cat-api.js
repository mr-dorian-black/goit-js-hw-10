import axios from "axios";
import { result } from "lodash";

const apiKey = 'live_sW0PYRsVvFmIP6p9uFgJzQTR6aDBktZBD4fKfgnGbCKgtHdhwf7guufZawFBfnm7'
axios.defaults.headers.common["x-api-key"] = apiKey;


export const fetchBreeds = () => {
     return axios.get('https://api.thecatapi.com/v1/breeds').then((response) => {
          if (!response.data) {
               new Error(response.status);
          }
          else {
               return response.data;
          }
     })
}

export const fetchCatByBreed = (id) => {
     let params = new URLSearchParams({
          breed_ids: id,
     });
     return axios.get(`https://api.thecatapi.com/v1/images/search?${params}`).then((response) => {
          if (!response.data) {
               new Error(response.status);
          }
          else {
               return response.data[0];
          }
     })
}