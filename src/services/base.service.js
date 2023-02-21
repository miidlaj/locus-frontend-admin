import store from "../store";
import axios from "axios";
import {history} from "../common/history";
import { clearCurrentUser } from "../store/actions/user";


export const authHeader = () => {
    const currentUser = store.getState().user;

    console.log(currentUser);
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + currentUser?.jwtToken,
    };
};


export function handleResponseWithLoginCheck() {
  axios.interceptors.response.use(
      response => response,
      error => {
          const currentUser = store.getState().user;
          const isLoggedIn = currentUser?.jwtToken;
          const status = error?.response.status;

          if (isLoggedIn && status === 409) {
            console.log("sending refresh token....");
        }

          if (isLoggedIn && [401, 403].includes(status)) {
              store.dispatch(clearCurrentUser());
              history.push('/login')
          }

          return Promise.reject(error);
      }
  );
};