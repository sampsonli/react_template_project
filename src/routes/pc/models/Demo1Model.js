import { service, Model } from 'redux-spring';

import api from './api';

@service(module.id)
class Demo1Model extends Model {
    loaded = false;

    list = [
        {id: 1, title: 'hello1'},
        {id: 2, title: 'hello2'},
        {id: 3, title: 'hello3'},
        {id: 4, title: 'hello4'},
        {id: 5, title: 'hello5'},
    ]

    init() {

    }

}
export default Demo1Model;

module.hot && module.hot.accept();
