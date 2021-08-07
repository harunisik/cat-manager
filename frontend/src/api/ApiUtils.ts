import axios from 'axios';

export function handleResponse(response: any) {
  return response.data;
}

export function handleError(error: any) {
  if (error.message) {
    throw new Error(error);
  }

  throw new Error('Unable to perform this action, if the problem persists please raise a ticket on the Service Desk');
}

export default axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
  timeout: 10000,
  headers: {
    'X-API-KEY': '412cc915-ece9-4c8c-bc46-4cfc03c43eb5',
  },
});
