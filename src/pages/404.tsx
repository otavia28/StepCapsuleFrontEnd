import { Button, Result } from 'antd';
import { history } from 'umi';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

/**
 * 跳转到 404 界面时不显示任何内容，而是直接重定向到欢迎页
 *
 * @constructor
 */
const NoFoundPage: React.FC = () =>
//   (
//   <Result
//     status="404"
//     title="404"
//     subTitle="Sorry, the page you visited does not exist."
//     extra={
//       <Button type="primary" onClick={() => history.push('/welcome')}>
//         Back Home
//       </Button>
//     }
//   />
// );
  {
    const history = useHistory();

    useEffect(() => {
      history.push('/welcome');
    }, [history]);

    return null; // 或者返回一个空的fragment <> </>
  };


export default NoFoundPage;
