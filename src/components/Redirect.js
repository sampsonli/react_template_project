import React, {useEffect} from 'react';
import { replacePath } from '~/common/pathTools';

const Redirect = ({to = ''}) => {
    useEffect(() => {
        replacePath(to);
    }, []);
    return null;
};
export default Redirect;
