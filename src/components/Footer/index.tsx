import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from 'umi';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'otavia28出品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Handbook',
          title: '用户手册',
          href: 'https://www.yuque.com/otavia28/agaatw/sltggg358wctrccb',
          blankTarget: true,
        },
        // {
        //   key: 'Github',
        //   title: <GithubOutlined />,
        //   href: 'https://github.com/otavia28',
        //   blankTarget: true,
        // },
        {
          key: 'VersionInfo',
          title: '版本信息',
          href: 'https://www.yuque.com/otavia28/agaatw/ub0l0wgeez9g4gu9',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
