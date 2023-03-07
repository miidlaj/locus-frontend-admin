import axios from "axios";
import { RESORT_API_URL } from "../../common/Constants";

const BASE_URL = RESORT_API_URL + "/api/resort";

type facilityToBackend = {
    name: string;
    description: string;
};
class FacilityService {

    async getFacilityList() {
        return await axios.get(BASE_URL + '/facility', );
    }
    
    async newFacility(facility:facilityToBackend ) {
        return await axios.post(BASE_URL + '/facility', facility);
    }

    async deleteFacility(id: number) {
        return await axios.delete(BASE_URL + '/facility/' + id);
    }

}

export default new FacilityService();