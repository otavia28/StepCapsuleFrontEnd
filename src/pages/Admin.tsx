import { PageHeaderWrapper } from '@ant-design/pro-components';
import React from 'react';
import UserManage from './UserManage';

const Admin: React.FC = () => {
  return (
    <PageHeaderWrapper content={'您具有管理员权限，可进行用户信息管理'}
                       breadcrumbRender={false}>
      <UserManage/>
    </PageHeaderWrapper>
  );
};

export default Admin;
