import axios from "axios";
import { ROOM_API_URL } from "../../../common/Constants";


const BASE_URL = ROOM_API_URL + "/api/rooms";

type facilityToBackend = {
    name: string;
    description: string;
};
class RoomFacilityService {

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

export default new RoomFacilityService();