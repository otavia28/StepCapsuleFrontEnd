import Footer from '@/components/Footer';
import { login } from '@/services/ant-design-pro/api';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {Alert, Divider, message, Tabs} from 'antd';
import React, {useState, useRef, useEffect} from 'react';
import {FormattedMessage, history, Link, SelectLang, useIntl, useModel} from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO_BLUE} from "@/constant";

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const AuthorInfo: React.FC = () => (
  <div className={styles.authorInfo}>
    <div className={styles.infoBox}>
      <h3>作者联系方式：</h3>
      --------------------------------<br/>
      · QQ：1504354522<br/>
      · 微信：otavia28<br/>
      · 邮箱：huchenkun28@163.com<br/>
      --------------------------------<br/>
      请提供给作者您的账号
    </div>
  </div>
);

const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  // 鼠标悬停
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  // 鼠标悬停
  const handleMouseOver = () => {
    const tooltip = tooltipRef.current;
    if (tooltip) {
      tooltip.style.display = 'block';
    }
  }

  // 鼠标悬停
  const handleMouseOut = () => {
    const tooltip = tooltipRef.current;
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  }

  // 在组件挂载时隐藏提示框
  useEffect(() => {
    const tooltip = tooltipRef.current;
    if (tooltip) {
      tooltip.style.display = 'none';
    }
  }, []);

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const user = await login({ ...values, type });
      if (user) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: '登录成功！',
        });
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        history.push('/welcome');
        return;
      }
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  const { status, type: loginType } = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO_BLUE} style={{marginTop: "3px"}}/>}
          title="步步胶囊 StepCapsule"
          subTitle={'基于 Ant Design Pro'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '账号密码登录',
              })}
            />
          </Tabs>

          {status === 'error' && loginType === 'account' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账号或密码错误',
              })}
            />
          )}
          {type === 'account' && (
            <>

              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.userAccount.placeholder',
                  defaultMessage: '请输入账号',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userAccount.required"
                        defaultMessage="账号是必填项！"
                      />
                    ),
                  },
                ]}
              />


              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.userPassword.placeholder',
                  defaultMessage: '请输入密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userPassword.required"
                        defaultMessage="密码是必填项！"
                      />
                    ),
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: (
                      <FormattedMessage
                        id="pages.login.userPassword.min"
                        defaultMessage="密码长度不能小于8！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}


          <div style={{ marginBottom: 24, }}>
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>

            <Divider type="vertical"/>
            <Link to="/user/register">新用户注册</Link>
            <Divider type="vertical"/>

            <a
              style={{
                float: 'right',
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <FormattedMessage id="pages.login.forgotuserPassword" defaultMessage="忘记密码请联系作者" />
            </a>
            <div ref={tooltipRef} className={styles.tooltip}>
              <AuthorInfo />
            </div>
          </div>

        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
