import {
    createStore,
} from 'redux';
import spring from 'redux-spring';

const store = createStore(
    () => {},
    window.__INITIAL_STATE__,
);
spring(store);
export default store;
