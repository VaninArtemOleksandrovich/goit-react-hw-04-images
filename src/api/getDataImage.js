import axios from 'axios';
const MY_PIXABAY_KEY = '30087713-0176780a5d439b6fbf7b0e04e';

const imagesApi = axios.create({
  baseURL: 'https://pixabay.com/api/',

  params: {
    key: MY_PIXABAY_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  },
});

export const getImage = async (query, page = 1) => {
  const { data } = await imagesApi.get('', {
    params: {
      q: query,
      page,
    },
  });

  return data.hits;
};
