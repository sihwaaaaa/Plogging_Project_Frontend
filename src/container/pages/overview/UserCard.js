import React from 'react';
import UilEnvelope from '@iconscout/react-unicons/icons/uil-envelope';
import UilUserPlus from '@iconscout/react-unicons/icons/uil-user-plus';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row } from 'antd';
import { UserCard } from '../style';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Button } from '../../../components/buttons/buttons';
import img1 from '../../../../src/static/img/profile/post/70.png';
import profileStyle from '../../../../src/static/css/profileStyle.scss'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
// { user }
function UserCards() {

  {/* 중괄호 내에 텍스트 표현 대신 변수가 들어갈 예정 */}  
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleEditProfile = () => {
    dispatch(() => history("/profile/edit"));
  }
  
  return (
    <UserCard>
      <div className="card user-card">
        <Cards headless>
          <figure>
            {/* <img src={require(`../../../${img}`)} alt="" /> */}
          </figure>
          <Card>
            <div className="card-image">
              <img src={img1} alt='뱃지 이미지'/>
            </div>
            <div className="card__content">
              <div>
                <h2>{Cookies.get("nickName")}</h2>
              </div>
              <div>
                {Cookies.get("intro") == null ? (
                  <p>입력된 값이 존재하지 않습니다.</p>
                ) : (
                  <p>{"안녕하세요, 저는 환경지킴이 박연재라고 합니다."}</p>  
                )}
              </div>
              <div as="h6">
                <div>
                  <span>{"챌린지 누적 횟수 1 "}</span>
                  <span>{"현재 포인트 2 "}</span>
                </div>
                <div>
                  <span>{"누적 포인트 3 "}</span>
                  <span>{"등급 포인트 4 "}</span>
                </div>
              </div>
            </div>
            <div className="card__actions">
              <Button size="default" type="white" onClick={handleEditProfile}>
                <UilEnvelope />
                프로필 편집
              </Button>
              <Button size="default" type="white">
                <UilUserPlus />
                ...
              </Button>
            </div>
          </Card>
        </Cards>
      </div>
    </UserCard>
  );
}

UserCards.propTypes = {
  user: PropTypes.object,
};

export default UserCards;
