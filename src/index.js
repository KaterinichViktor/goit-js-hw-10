import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import 'slim-select/dist/slimselect.css'

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const catInfo = document.querySelector(".cat-info");
const catImage = document.querySelector(".cat-image");
const breedName = document.querySelector(".breed-name");
const description = document.querySelector(".description");
const temperament = document.querySelector(".temperament");
const error = document.querySelector(".error");

let slimSelect;



async function populateBreeds() {
  try {
    const breeds = await fetchBreeds();
    const options = breeds.map(breed => ({ value: breed.id, text: breed.name }));
    slimSelect = new SlimSelect({
      select: breedSelect,
      data: options,
      placeholder: 'Select a breed'
    });
  } catch (error) {
    showError();
  }
}

async function showCatInfo(breedId) {
  try {
    const cat = await fetchCatByBreed(breedId);
    catImage.src = cat.url;
    breedName.textContent = cat.breeds[0].name;
    description.textContent = cat.breeds[0].description;
    temperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;
    catInfo.style.display = "flex";
  } catch (error) {
    showError();
  }
}

function showError() {
  error.style.display = "block";
}

breedSelect.addEventListener("change", event => {
  const selectedBreedId = event.target.value;
  loader.style.display = "block";
  catInfo.style.display = "none";
  error.style.display = "none";
  showCatInfo(selectedBreedId).finally(() => {
    loader.style.display = "none";
  });
});

populateBreeds().catch(showError);


