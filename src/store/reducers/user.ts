import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from "../types";

interface UserType {
    token: string;
    refreshToken: string,
    username: string,
    roles: object
    type: string
}

const userReducer = (state = {}, action: {type: string; payload: UserType}) => {
    switch (action?.type) {
        case SET_CURRENT_USER:
            localStorage.setItem('currentAdmin', JSON.stringify(action?.payload));
            return action?.payload;
        case CLEAR_CURRENT_USER:
            localStorage.removeItem('currentAdmin');
            return null;
        default:
            const storedUser = localStorage.getItem('currentAdmin');
            if (typeof storedUser === 'string'){
                return JSON.parse(storedUser);
            }
            return null;
            
    }
}

export default userReducer;