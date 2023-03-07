import axios from "axios";
import { RESORT_API_URL } from "../../common/Constants";

const BASE_URL = RESORT_API_URL + "/api/resort";

class ResortService {

    getResortList() {
        return axios.get(BASE_URL + '/listResorts', );
    }

    getResortById(id: string | number) {
        return axios.get(BASE_URL + '/' + id);
    }

    setResortBan(id: number | string) {
        return axios.put(BASE_URL + "/ban/" + id)
    }

    approveResort(id: number | string) {
        return axios.put(BASE_URL + "/approve/" + id)
    }

}

export default new ResortService();