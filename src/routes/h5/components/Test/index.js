import React from 'react';

/**
 *
 * @param {number} value
 * @return {JSX.Element}
 * @constructor
 */
const Test = ({value = 1}) => {
    console.log(value);
    return (
        <div>
            hello-
            {value}
        </div>
    );
};
export default Test;
