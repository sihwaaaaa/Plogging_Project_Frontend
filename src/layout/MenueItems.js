import { UilCircle, UilUserCircle } from "@iconscout/react-unicons";

import { Avatar, Menu } from "antd";
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import propTypes from 'prop-types';
import '../static/css/sideBarStyle.scss';
import Cookies from "js-cookie";
import { UserOutlined } from "@ant-design/icons";
import { AvatarWraperStyle } from "../container/ui-elements/ui-elements-styled";
import { logOut } from "../redux/authentication/actionCreator";


function MenuItems({ toggleCollapsed }) {
  const { t } = useTranslation();

  const userOn = Cookies.get('logedIn');

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const { topMenu } = useSelector((state) => {
    return {
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  });

  const path = '/';

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');


  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOut(() => history('/signin')));
  };

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  const items = [
    getItem(
      <NavLink onClick={toggleCollapsed} to={`pages/plogging`}>
        {t('플로깅하기')}
      </NavLink>,
      'plogging',
      !topMenu && (
        <NavLink className="menuItem-icon" to={`pages/plgging`}>
          <UilCircle />
        </NavLink>
      ),
    ),
    getItem(
      '함께하기','together',null,[
        getItem(
          <NavLink onClick={toggleCollapsed} to={`pages/board`}>
            {t('커뮤니티')}
          </NavLink>,
          'board',
          null,
        ),
        getItem(
          <NavLink onClick={toggleCollapsed} to={`pages/challenge`}>
            {t('챌린지')}
          </NavLink>,
          'challenge',
          null,
        ),
      ]
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`pages/reward`}>
        {t('리워드')}
      </NavLink>,
      'reward',
      null,
    ),
    userOn && getItem(
      <NavLink className="mypage-friend" onClick={toggleCollapsed} to={`pages/friend`}>
        {t('플친 / 채팅')}
      </NavLink>,
      'friend',
      null,
    ),
  ];

  return (
    <div className="sidebar-wrapper">
      <Menu
        onOpenChange={onOpenChange}
        onClick={onClick}
        mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
        // // eslint-disable-next-line no-nested-ternary
        defaultSelectedKeys={
          !topMenu
            ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
            : []
        }
        defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
        overflowedIndicator={<UilEllipsisV />}
        openKeys={openKeys}
        items={items}
      />
      {userOn && !!Cookies.get('userId') ? (

        <div className="myinfo-tab">
          <div className="mypage-wrapper">
            <span style={{maxWidth:150}}>플로거 {Cookies.get('nickName')} 님</span>
            <NavLink className="mypage-tab" onClick={toggleCollapsed} to={`pages/profile`}>
              <AvatarWraperStyle>
                <Avatar icon={<UserOutlined style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "40px",
                }} />} size={60} />
              </AvatarWraperStyle>
            </NavLink>
          </div>
          <div className="signout-wrapper">
            <Link to="/" onClick={handleLogout}>
              <span>로그아웃</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="signin-tab" style={{justifyContent: "flex-end"}}>
          <div className="signin-wrapper">
            <Link to="/member/signin">
              <span>로그인</span>< br />
              <span>더 편리하게 줍깅을 이용하세요</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

MenuItems.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
