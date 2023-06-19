/* eslint-disable no-restricted-globals */
import React, { useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { TopMenuStyle } from './Style';
import { Dropdown } from '../components/dropdown/dropdown';
import { AvatarWraperStyle } from '../container/ui-elements/ui-elements-styled';
import { logOut } from '../redux/authentication/actionCreator';
import { getItem } from "../utility/localStorageControl";
import Cookies from 'js-cookie';

function TopMenu() {

  // const path  = '/admin';

  useLayoutEffect(() => {
    const active = document.querySelector('.ninjadash-top-menu a.active');
    const activeDefault = () => {
      const megaMenu = active.closest('.megaMenu-wrapper');
      const hasSubMenuLeft = active.closest('.has-subMenu-left');
      if (!megaMenu) {
        active.closest('ul').previousSibling.classList.add('active');
        if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
      } else {
        active.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
      }
    };
    window.addEventListener('load', active && activeDefault);
    return () => window.removeEventListener('load', activeDefault);
  }, []);

  const dispatch = useDispatch();
  const history = useNavigate();

  const handleLogout = () => {
    if(window.confirm("정말로 로그아웃을 하시겠습니까?")){
      alert("로그아웃이 완료되었습니다.");
    } else{
      return false;
    }
    dispatch(logOut(() => history('/')));
  };

  const togetherTab = (
    <>
      <Link to="board">
        <span>커뮤니티</span>
      </Link>
      <Link to="challenge">
        <span>챌린지</span>
      </Link>
    </>
  );

  const profileTab = (
    <>
      <Link to="profile">
        <span>마이페이지</span>
      </Link>
      <Link to="friend">
        <span>플친 / 채팅</span>
      </Link>
      {Cookies.get("logedIn") ?
        (<Button onClick={handleLogout}>
          <span>로그아웃</span>
        </Button>)
        :(<Link to="/member/signin">
        <span>로그인</span>
      </Link>)
      }
    </>
  );

  return (
    <TopMenuStyle>
      <div className="ninjadash-top-menu">
        <ul style={{ alignItems: 'center' }}>
          <li>
            <Link to="plogging">플로깅하기</Link>
          </li>
          <li>
            <Dropdown content={togetherTab} placement="bottomLeft">
              <Link to="#">함께하기</Link>
            </Dropdown>
          </li>
          <li>
            <Link to="reward">리워드</Link>
          </li>
          <li>
            {Cookies.get("logedIn") ? Cookies.get("userId") + "님" : ""}
          </li>
          <li>
            <Dropdown content={profileTab} placement="bottomLeft">
              <Link to="#">
                <AvatarWraperStyle>
                  <Avatar icon={<UserOutlined />} />
                </AvatarWraperStyle>
              </Link>
            </Dropdown>
          </li>
        </ul>
      </div>
    </TopMenuStyle>
  );
}

export default TopMenu;
