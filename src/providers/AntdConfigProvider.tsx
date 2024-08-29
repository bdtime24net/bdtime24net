import { ConfigProvider } from "antd";

const AntdConfigProvider = ({ children }: Props) => {
  return <ConfigProvider>{children}</ConfigProvider>;
};

type Props = {
  children: React.ReactNode;
};

export default AntdConfigProvider;
