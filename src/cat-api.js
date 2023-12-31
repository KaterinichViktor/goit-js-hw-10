import axios from "axios";

const API_KEY = "live_buPoK8GFs9fNqSxVwgxc2DY14Nv0GeyFXGq2qsNcwWGVPxoKj16fmmdAiN44WHUa";
axios.defaults.headers.common["x-api-key"] = API_KEY;

export async function fetchBreeds() {
  try {
    const response = await axios.get("https://api.thecatapi.com/v1/breeds");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    throw error;
  }
}