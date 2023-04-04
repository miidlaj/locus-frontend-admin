import axios from "axios";
import { BOOKING_SERVICE } from "../common/Constants";

const BASE_URL = BOOKING_SERVICE + "/api/wallet";

class WalletService {

    getAdminWalletAndTransactions() {
        return axios.get(BASE_URL + '/admin');
    }

}

export default new WalletService();