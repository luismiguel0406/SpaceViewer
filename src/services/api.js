import axios from 'axios';

const baseURL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY';

const api = axios.create({
  baseURL: baseURL,
});

export async function getData() {
  try {
    const response = await api.get();
    return response.data;
  } catch (error) {
    console.error('An error has occurred', error);
    throw error;
  }
}