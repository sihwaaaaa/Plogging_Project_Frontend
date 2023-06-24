/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
import { Button, Col, Layout, Row } from 'antd';
import propTypes from 'prop-types';
import React, { Component, useEffect, useState } from "react";
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import MenueItems from './MenueItems';

import { FooterStyle, LayoutContainer, SmallScreenAuthInfo } from './Style';
import TopMenu from './TopMenu';
import AuthInfo from '../components/utilities/auth-info/info';
import logodemo from '../static/img/logodemo.png';
import { getItem } from "../utility/localStorageControl";

const { theme } = require('../config/theme/themeVariables');

const { Header, Sider, Content } = Layout;
const userAuth = getItem('authList');

const ThemeLayout = (WrappedComponent) => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        hide: true,
        searchHide: true,
        customizerAction: false,
        activeSearch: false,
      };
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      this.setState({
        collapsed: window.innerWidth <= 1200 && true,
      });
    }

    render() {
      const { collapsed, hide } = this.state;
      const { layoutMode, rtl, topMenu } = this.props;

      const left = !rtl ? 'left' : 'right';
      const toggleCollapsed = () => {
        this.setState({
          collapsed: !collapsed,
        });
      };

      const toggleCollapsedMobile = () => {
        if (window.innerWidth <= 990) {
          this.setState({
            collapsed: !collapsed,
          });
        }
      };

      const SideBarStyle = {
        margin: '63px 0 0 0',
        padding: `${!rtl ? '20px 20px 55px 0' : '20px 0 55px 20px'}`,
        overflowY: 'auto',
        height: '100vh',
        position: 'fixed',
        [left]: 0,
        zIndex: 988,
      };

      const renderView = ({ style }) => {
        const customStyle = {
          marginRight: 'auto',
          [rtl ? 'marginLeft' : 'marginRight']: '-17px',
        };
        return <div style={{ ...style, ...customStyle }} />;
      };

      const renderThumbVertical = ({ style }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
          [left]: '2px',
        };
        return <div style={{ ...style, ...thumbStyle }} />;
      };

      const renderThumbHorizontal = ({ style }) => {
        const { ChangeLayoutMode } = this.props;
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: ChangeLayoutMode ? '#ffffff16' : '#F1F2F6',
        };
        return <div style={{ ...style, ...thumbStyle }} />;
      };

      /**
       * @Author 천은경
       * @Date 23.06.14
       * @returns {JSX.Element|null}
       * @Brief 관리자 권한을 가진 회원에게만 관리자 탭 허용
       */
      const adminTab = () => {
        if(userAuth.indexOf('ROLE_ADMIN') !== -1){
          return (
            <li className="admin_tab"
                style={{
                  listStyle: "none",
                  marginRight: 50
                }}>
              <Link to="admin">
                <span style={{ color: "#F07167", fontWeight: "bold" }}>관리자</span>
              </Link>
            </li>
          )
        }
      }

      return (
        <LayoutContainer>
          <Layout className="layout">
            <Header
              style={{
                position: 'fixed',
                width: '100%',
                top: 0,
                [!rtl ? 'left' : 'right']: 0,
              }}
            >
              <div className="ninjadash-header-content d-flex">
                {/* 헤더 로고 */}
                <div className="ninjadash-header-content__left">
                  <div className="navbar-brand align-cener-v">
                    <Link
                      className={topMenu && window.innerWidth > 991 ? 'ninjadash-logo top-menu' : 'ninjadash-logo'}
                      to="/"
                      style={{ display: 'flex' }}
                    >
                      <img src={logodemo} alt="Logo" />
                      <h1>줍깅</h1>
                    </Link>
                  </div>
                </div>
                {/* 헤더 탑 메뉴 */}
                <div className="ninjadash-header-content__right d-flex">
                  <div className="ninjadash-navbar-menu d-flex align-center-v">

                    {userAuth && Array.isArray(userAuth) ? adminTab() : ''}

                    {topMenu && window.innerWidth > 991 ? <TopMenu /> : null}
                    {!topMenu || window.innerWidth <= 991 ? (
                      <Button type="link" onClick={toggleCollapsed}>
                        <img
                          src={require(`../static/img/icon/${collapsed ? 'left-bar.svg' : 'left-bar.svg'}`)}
                          alt="menu"
                        />
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </Header>
            <div className="ninjadash-header-more">
              <Row>
                <Col md={0} sm={24} xs={24}>
                  <div className="ninjadash-header-more-inner">
                    <SmallScreenAuthInfo hide={hide}>
                      <AuthInfo rtl={rtl} />
                    </SmallScreenAuthInfo>
                  </div>
                </Col>
              </Row>
            </div>
            <Layout>
              {!topMenu || window.innerWidth <= 991 ? (
                <ThemeProvider theme={theme}>
                  <Sider
                    width={280}
                    style={SideBarStyle}
                    collapsed={collapsed}
                    theme={layoutMode === 'lightMode' ? 'light' : 'dark'}
                  >
                    <Scrollbars
                      className="custom-scrollbar"
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}
                      renderThumbHorizontal={renderThumbHorizontal}
                      renderThumbVertical={renderThumbVertical}
                      renderView={renderView}
                      renderTrackVertical={(props) => <div {...props} className="ninjadash-track-vertical" />}
                    >
                      <MenueItems topMenu={topMenu} toggleCollapsed={toggleCollapsedMobile} />
                    </Scrollbars>
                  </Sider>
                </ThemeProvider>
              ) : null}
              <Layout className="atbd-main-layout">
                <Content>
                  <WrappedComponent {...this.props} />
                  <FooterStyle className="admin-footer" >
                    <Row>
                      <Col md={12} xs={24}>
                        <span className="admin-footer__copyright">
                          © 2023<Link to="#">SovWare</Link>
                        </span>
                      </Col>
                      <Col md={12} xs={24}>
                        <div className="admin-footer__links">
                          <NavLink to="#">Team </NavLink>
                        </div>
                      </Col>
                    </Row>
                  </FooterStyle>
                </Content>
              </Layout>
            </Layout>
          </Layout>
          {window.innerWidth <= 991 ? (
            <span className={collapsed ? 'ninjadash-shade' : 'ninjadash-shade show'} onClick={toggleCollapsed} />
          ) : (
            ''
          )}
        </LayoutContainer>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      layoutMode: state.ChangeLayoutMode.mode,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  };

  LayoutComponent.propTypes = {
    layoutMode: propTypes.string,
    rtl: propTypes.bool,
    topMenu: propTypes.bool,
  };

  return connect(mapStateToProps)(LayoutComponent);
};
export default ThemeLayout;
