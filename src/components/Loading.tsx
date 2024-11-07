import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div style={{ textAlign: "center" }}>
        <Spin indicator={antIcon} />
      </div>
    </div>
  );
};
