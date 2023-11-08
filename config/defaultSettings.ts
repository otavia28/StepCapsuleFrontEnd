import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  logo: "https://cdnjson.com/images/2023/11/03/StepCapsuleLOGO-WHITE-512x512.png",
  headerHeight: 0,
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Step Capsule',
  pwa: false,
  iconfontUrl: '',
};

export default Settings;
