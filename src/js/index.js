import { fetchBreeds, fetchCatByBreed } from './cat-api'

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

function renderBreeds(breeds) {
     const markup = breeds
          .map((breed) => {
               return `<option value="${breed.id}">${breed.name}</option>`
          })
          .join("");
     selector.innerHTML = markup;
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
     fetchCatByBreed(selector.value)
});

