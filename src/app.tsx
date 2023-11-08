import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import {RequestConfig} from "@@/plugin-request/request";
import React from "react";
import { useHistory } from 'react-router-dom';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * 白名单，无需重定向
 */
const NO_NEED_LOGIN_WHITE_LIST = ['/user/register', loginPath];

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export const request: RequestConfig = {
  timeout: 1000000,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{      // getInitialState 方法是每次刷新页面时优先执行的方法
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrentUser();
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是无需登录的页面，则不执行
  if (NO_NEED_LOGIN_WHITE_LIST.includes(history.location.pathname)) {
    return {
      fetchUserInfo,
      settings: defaultSettings,
    };
  }
  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,        // 前端用户登录态
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    // 修改此处
    rightContentRender: () => {
      const currentPath = history.location.pathname;
      // 仅在 /welcome 页面渲染 RightContent，即只在欢迎页显示头像
      if (currentPath === '/welcome') {
        return <RightContent />;
      }
      // 其他页面不渲染头像
      return null;
    },

    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    footerRender: () => {
      // 检查当前路径是否为欢迎页、管理页、个人信息页的路径
      const currentPath = history.location.pathname;
      if (currentPath === '/welcome' || currentPath === '/admin' || currentPath === '/userInfo') {
        return null;
      }
      // 其他页面显示Footer
      return <Footer />;
    },
    onPageChange: () => {
      const { location } = history;
      if (NO_NEED_LOGIN_WHITE_LIST.includes(location.pathname)) {
        return;
      }
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser) {
        history.push(loginPath);
      }
    },
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs" key="docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],

    // 移除链接
    links: [], // 直接设置为空数组，移除所有链接

    // 修改默认重定向，重定向到 welcome
    menuHeaderRender: (logoDom, titleDom) => {
      const history = useHistory(); // 使用 useHistory 钩子获取 history 实例
      const redirectToWelcome = () => {
        history.push('/welcome'); // 使用 history.push 来改变路由
      };

      return (
        <div style={{ lineHeight: '40px', height: '30px', display: 'flex' }} onClick={redirectToWelcome}> {/* 添加点击事件 */}
          <div style={{ width: '24px', height: '24px', marginLeft: '6px' }}>
            {logoDom && React.cloneElement(logoDom, {
              style: { maxHeight: '100%', maxWidth: '100%' },
              onClick: (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                redirectToWelcome(); // 也可以对标题添加重定向
              }
            })}
          </div>
          <div style={{ marginLeft: '0px' }}>
            {titleDom && React.cloneElement(titleDom, { onClick: (e) => {
                e.stopPropagation(); // 阻止事件冒泡
                redirectToWelcome(); // 也可以对标题添加重定向
              }})
            }
          </div>
        </div>
      );
    },


    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
