import React, {useEffect} from 'react';
import {useModel} from 'mtor';
import HomeModel from '~/routes/h5/models/HomeModel';

const Home = () => {
    const model = useModel(HomeModel);
    useEffect(() => {
        model.init();
    }, []);
    const {name} = model;
    return (
        <div>
                {name}
        </div>
    );
};
export default Home;
