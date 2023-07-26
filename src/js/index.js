import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select'

new SlimSelect({
     select: '.breed-select'
})

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
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
     console.log(info)
}

fetchBreeds()
     .then(result => {
          renderBreeds(result);
          selector.classList.toggle('is-hidden');
          loader.classList.toggle('is-hidden');
     })
     .catch(() => error.classList.toggle('is-hidden'));

selector.addEventListener("change", () => {
     loader.classList.toggle('is-hidden');
     fetchCatByBreed(selector.value).then((result) => {
          loader.classList.toggle('is-hidden');
          renderInfo(result);
     })
          .catch(() => error.classList.toggle('is-hidden'));
});


