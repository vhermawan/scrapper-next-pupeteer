import axios from 'axios';

export const API = {
  get: async function (endPoint: string) {
    let headers = {};

    return await axios.get(endPoint, { headers: headers, responseType: 'arraybuffer' })
      .then(response => response.data)
      .catch(error => {
        throw error.response;
      });
  },
}