import React, {useEffect} from 'react';
import {useModel} from 'redux-spring';
import style from './style.less';
import DemoModel from '~/routes/demo/models/DemoModel';

export default () => {
    const model = useModel(DemoModel);
    useEffect(() => {
        model.init();
    }, []);
    return (
        <div className={style.container}>
            <div className={style.header}>title12</div>
            <div className={style.content}>

               <div className={style.item}>
                   dkdkkldkldklklfklf444555
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>
               <div className={style.item}>
                   dkdkkldkldklklfklf
               </div>

            </div>
        </div>

    );
};
