import React, {useEffect, useRef} from 'react';
import style from './style.less';
import loadjs from '~/common/loadjs';

export default () => {
    const ref = useRef();
    useEffect(() => {
        loadjs('lib/raindrop.js', 'RaindropFX').then(RaindropFX => {
            // Set canvas size to fit the real size
            const rect = ref.current.getBoundingClientRect();
            ref.current.width = rect.width;
            ref.current.height = rect.height;
            const raindropFx = new RaindropFX({
                canvas: ref.current,
                background: 'bg2.jpg',
                // backgroundBlurSteps: 0,
                mistBlurStep: 2,
            });
            raindropFx.start();
            window.onresize = () => {
                const nrect = ref.current.getBoundingClientRect();
                raindropFx.resize(nrect.width, nrect.height);
            };
        });
        return () => window.onresize = null;
    }, []);
    return (
        <div className={style.container}>
            <canvas ref={ref} />
        </div>

    );
};
