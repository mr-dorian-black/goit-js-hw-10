import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.backdrop');
const catInfo = document.querySelector('.cat-info');


function renderBreeds(breeds) {
     const markup = breeds
          .map((breed) => {
               return `<option value="${breed.id}">${breed.name}</option>`
          })
          .join("");
     selector.innerHTML = markup;
}

function renderInfo(info) {
     let breed = info.breeds[0];
     const markup = `<img class="image" src="${info.url}" alt="${breed.name}" height="${info.height}" width="${info.width}">
     <div class="content">
     <h2 class="title">${breed.name}</h2>
     <p class="description">${breed.description}</p>
     <p><span class="temperament">Temperament: </span>${breed.temperament}</p>
     <p class="link">More details: <a href="${breed.wikipedia_url}" target="_blank">Wikipedia</a></p>
     </div>`
     catInfo.innerHTML = markup;

}

fetchBreeds()
     .then(result => {
          renderBreeds(result);
          selector.classList.toggle('is-hidden');
          loader.classList.toggle('is-hidden');
     }).then(() => {
          new SlimSelect({
               select: '.breed-select'
          })
     })
     .catch(() => {
          Notiflix.Notify.failure(
               `Oops! Something went wrong! Try reloading the page!`,
               {
                    timeout: 4000,
                    useIcon: false
               },
          )
     });

selector.addEventListener("change", () => {
     loader.classList.toggle('is-hidden');
     fetchCatByBreed(selector.value).then((result) => {
          loader.classList.toggle('is-hidden');
          renderInfo(result);
     })
          .catch(() => {
               Notiflix.Notify.failure(
                    `Oops! Something went wrong! Try reloading the page!`,
                    {
                         timeout: 4000,
                         useIcon: false
                    },
               )
          });
});


