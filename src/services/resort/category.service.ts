import axios from "axios";
import { RESORT_API_URL } from "../../common/Constants";

const BASE_URL = RESORT_API_URL + "/api/resort";

type categoryToBackend = {
    name: string;
    description: string;
};
class CategoryService {

    async getCategoryList() {
        return await axios.get(BASE_URL + '/category', );
    }

    async newCategory(category:categoryToBackend ) {
        return await axios.post(BASE_URL + '/category', category);
    }

    async deleteCategory(id: number) {
        return await axios.delete(BASE_URL + '/category/' + id);
    }
}

export default new CategoryService();