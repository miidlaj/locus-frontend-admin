import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";


export const AuthGuard = ({children, roles}) => {

    const currentUser = useSelector(state => state.user);


    const authorize = () => {
        if (!currentUser) {
            return (<Navigate to={{pathname: '/login'}}/>)
        }

        var access = false;
    
        currentUser.roles.forEach(role => {
            if (roles?.indexOf(role.name) === 0) {
                
                access = true;
            }
        });
        
        if (!access) {
            return (<Navigate to={{pathname: '/401'}}/>)
        }
        

        return children;
    };

    return (authorize());
};