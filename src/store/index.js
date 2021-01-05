import {
    createStore,
} from 'redux';
import spring from 'redux-spring';

const store = createStore(
    () => {},
    window.__INITIAL_STATE__,
);
export default spring(store);
