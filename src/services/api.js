import axios from 'axios';

const baseURL = 'https://api.nasa.gov';

const api = axios.create({
  baseURL: baseURL,
});

export async function getData(url) {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('An error has occurred', error);
    throw error;
  }
}