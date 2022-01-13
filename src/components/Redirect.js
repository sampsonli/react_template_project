import {useEffect} from 'react';
import {useNavigate} from "react-router";

const Redirect = ({to = ''}) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, {replace: true});
    }, []);
    return null;
};
export default Redirect;
