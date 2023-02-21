import axios from "axios";
import { BASE_API_URL } from "../common/Constants";
import { authHeader } from "./base.service";

interface User {
    email: string;
    password: string;
}


const BASE_URL = BASE_API_URL + "/api/auth";

class AuthenticationService {

    login(user: User) {
        return axios.post(BASE_URL + '/login', user);
    }

    checkAuth() {
        return axios.get(BASE_API_URL + '/test',{headers: authHeader()});

}

}

export default new AuthenticationService();