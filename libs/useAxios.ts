import axios from 'axios'
import { userToken } from '~/services/auth/user';

const BASE_URL =
  (import.meta.env.VITE_BASE_URL as string) ?? "http://localhost:8090";
const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "ngrok-skip-browser-warning": "69420",

} as Record<string, string>
const useAxios = (
    use_auth = false,
    use_multipart_header = false,
    use_form_encoded = false,
) => {
    if (use_auth) {
        headers['Authorization'] = `Bearer ${userToken.value}`;
    }
    else if (use_multipart_header) {
        headers['Content-Type'] = 'multipart/form-data';
      }
      else if (use_form_encoded) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
      }
      else {
        headers['Content-Type'] = 'application/json';
        headers['Accept'] = 'application/json';
      }
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers,
        // withCredentials: true
    })
    axiosInstance.interceptors.response.use(response => {
      return response;
  }, error => {
      if (error.response) {
        console.error('Error response:', error.response);
      }
      return Promise.reject(error);
  });
    return axiosInstance
}


export default useAxios