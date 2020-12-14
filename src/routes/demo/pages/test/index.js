import React, {Component} from 'react';
import PropType from 'prop-types';
import {connect} from 'react-redux';
import style from './style.less';

import HomeModel from '../../models/HomeModel';

/**
 * @extends {Component<{model: HomeModel}>}
 */
class Test extends Component {
  render() {
    const {
      /**
       * @type {HomeModel}
       */
      model,
    } = this.props;
    const {result, user} = model;
    return (
      <div className={style.testContainer}>
        <div className={style.tit}>滑动条</div>
        <div className={style.slider}>
          <div className={style.btn}>-</div>
          num
          <div className={style.btn}>+</div>
        </div>

      </div>
    );
  }
}
Test.propTypes = {
  model: PropType.instanceOf(HomeModel).isRequired,
};
export default connect(state => ({model: state[HomeModel.ns]}))(Test);
