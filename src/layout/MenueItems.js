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

  const path = '/jubging';

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
      <NavLink onClick={toggleCollapsed} to={`${path}/pages/plogging`}>
        {t('플로깅하기')}
      </NavLink>,
      'plogging',
      !topMenu && (
        <NavLink className="menuItem-icon" to={`${path}/pages/plgging`}>
          <UilCircle />
        </NavLink>
      ),
    ),
    getItem(
      '함께하기','together',null,[
        getItem(
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/board`}>
            {t('커뮤니티')}
          </NavLink>,
          'board',
          null,
        ),
        getItem(
          <NavLink onClick={toggleCollapsed} to={`${path}/pages/challenge`}>
            {t('챌린지')}
          </NavLink>,
          'challenge',
          null,
        ),
      ]
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/pages/reward`}>
        {t('리워드')}
      </NavLink>,
      'reward',
      null,
    ),
    userOn && getItem(
      <NavLink className="mypage-friend" onClick={toggleCollapsed} to={`${path}/pages/friend`}>
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
      {userOn && (

        <div className="myinfo-tab">
          <div className="signout-wrapper">
            <Link to="/" onClick={handleLogout}>
              <span>로그아웃</span>
            </Link>
          </div>
          <div className="mypage-wrapper">
            <NavLink className="mypage-tab" onClick={toggleCollapsed} to={`${path}/pages/profile`}>
              <AvatarWraperStyle>
                <Avatar icon={<UserOutlined style={{width:"60px", height:"60px", fontSize:"40px"}} />} size={60} />
              </AvatarWraperStyle>
            </NavLink>
            <div className="mypage-text">
              <span>마이 페이지</span>
            </div>
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
