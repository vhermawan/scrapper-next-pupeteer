import { API } from '@/common/api';

export async function scrappingData(username: string) {
  const data = await API.get(`api/scrapping?username=${username}`)
  return data;
}