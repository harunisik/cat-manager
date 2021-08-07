import API from './ApiUtils';
import { handleResponse, handleError } from './ApiUtils';

export interface ImageData {
  id: string;
  url: string;
  value: number;
  favouriteId?: string;
}

export interface FavouriteImageData {
  image_id: string;
}

export interface VoteImageData {
  image_id: string;
  value: number;
}

export function uploadImage(file: File) {
  var formData = new FormData();
  formData.append('file', file);
  return API.post('/images/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(handleResponse)
    .catch(handleError);
}

export function favouriteImage(data: FavouriteImageData) {
  return API.post('/favourites', data).then(handleResponse).catch(handleError);
}

export function unfavouriteImage(favouriteId: string) {
  return API.delete(`/favourites/${favouriteId}`).then(handleResponse).catch(handleError);
}

export function voteImage(data: VoteImageData) {
  return API.post('/votes', data).then(handleResponse).catch(handleError);
}
