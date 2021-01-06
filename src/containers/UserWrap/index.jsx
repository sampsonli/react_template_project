import {useEffect} from 'react';
import {useModel} from 'redux-spring';
import UserModel from '~/models/UserModel';

const UserWrap = ({children}) => {
    const model = useModel(UserModel);
    useEffect(() => {
        if (!model.info) {
            model.init();
        }
    }, []);
    return model.info ? children : null;
};
export default UserWrap;
