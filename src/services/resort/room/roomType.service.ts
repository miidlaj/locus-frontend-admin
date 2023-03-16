import axios from "axios";
import { ROOM_API_URL } from "../../../common/Constants";

const BASE_URL = ROOM_API_URL + "/api/rooms";

type RoomTypeToBackend = {
    name: string;
};
class CategoryService {

    async getRoomTypeList() {
        return await axios.get(BASE_URL + '/type', );
    }

    async newRoomType(roomType:RoomTypeToBackend ) {
        return await axios.post(BASE_URL + '/type', roomType);
    }

    async deleteRoomType(id: number) {
        return await axios.delete(BASE_URL + '/type/' + id);
    }
}

export default new CategoryService();