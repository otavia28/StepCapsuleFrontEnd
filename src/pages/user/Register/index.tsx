import Footer from '@/components/Footer';
import {register} from '@/services/ant-design-pro/api';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import React, {useState} from 'react';
import { FormattedMessage, history, SelectLang, useIntl} from 'umi';
import styles from './index.less';
import {SYSTEM_LOGO_BLUE} from "@/constant";


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');

  const intl = useIntl();

  // 表单提交
  const handleSubmit = async (values: API.RegisterParams) => {
    const { userAccount, userPassword, checkPassword, userName } = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    // @ts-ignore
    try {
      // 注册
      const id = await register(values);
      // @ts-ignore
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const { query } = history.location;
        // 用户注册完跳转到登录页
        history.push({
          pathname: 'user/login',
          query,
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '注册失败，请重试！',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm

          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}

          logo={<img alt="logo" src={SYSTEM_LOGO_BLUE} style={{marginTop: "3px"}}/>}
          title="步步胶囊 StepCapsule"
          subTitle={'基于 Ant Design Pro'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.RegisterParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
                defaultMessage: '账号密码注册',
              })}
            />
          </Tabs>


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


              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.checkPassword.placeholder',
                  defaultMessage: '请确认密码',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.checkPassword.required"
                        defaultMessage="确认密码是必填项！"
                      />
                    ),
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: (
                      <FormattedMessage
                        id="pages.login.checkPassword.min"
                        defaultMessage="确认密码长度不能小于8！"
                      />
                    ),
                  },
                ]}
              />


              <ProFormText
                name="userName"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.userName.placeholder',
                  defaultMessage: '请输入昵称',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.userName.required"
                        defaultMessage="昵称是必填项！"
                      />
                    ),
                  },
                ]}
              />

            </>
          )}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
