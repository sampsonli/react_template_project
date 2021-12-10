import React from 'react';
import logo from '../../../assets/logo1.svg';
import style from './style.less';

const Logo = () => (
    <div className={style.sidebarLogoContainer}>
      <img src={logo} className={style.sidebarLogo} alt="logo" />
      <h1 className={style.sidebarTitle}>通用管理后台</h1>
    </div>
  );

export default Logo;
