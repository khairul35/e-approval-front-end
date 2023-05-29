import axios from "axios";

const repository = axios.create({
  baseURL: 'https://e-approval-backend.as.r.appspot.com/api/',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    'Content-Type': 'application/json',
  },
});

console.log(localStorage.getItem('accessToken'));

// let isRefreshing = false;
let subscribers = [];

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRefreshed() {
  subscribers.map((cb) => cb());
}

async function refreshSession() {
  try {
    // const { data } = await XeroRepository.refreshToken();
    // localStorage.setItem('xeroAccessToken', data.access_token);
    // localStorage.setItem('xeroRefreshToken', data.refresh_token);
    if (localStorage.getItem('logged_in') == 'false') {
      localStorage.setItem('logged_in', 'false');
      window.location.reload();
    }
    // isRefreshing = false;
    onRefreshed();
    subscribers = [];
  } catch (error) {
    console.log(error);
  }
}

repository.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status, data },
    } = error;

    const originalRequest = config;
    if (status === 401) {
      await refreshSession();
      config.headers["Authorization"] = 'Bearer ' + localStorage.getItem('accessToken');
      const requestSubscribers = await new Promise((resolve) =>
        subscribeTokenRefresh(async () => {
          originalRequest.headers["Authorization"] = 'Bearer ' + localStorage.getItem('accessToken');
          resolve(await axios(originalRequest));
        })
      );
      return requestSubscribers;
    }

    return Promise.reject(data);
  }
);

export default repository;
