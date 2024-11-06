import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Flex, Select, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { FunctionComponent } from "react";

interface HeaderProps {}

const DashboardLayoutHeader: FunctionComponent<HeaderProps> = () => {
  return (
    <Header className="bg-neutral-50">
      <Flex justify="space-between">
        <Space>
          <strong className=" ">Foody.io</strong>
          <div className="flex items-center">
            <Select placeholder="Choose a branch..." />
          </div>
        </Space>
        <Space>
          <FontAwesomeIcon icon={faBell} />
          <Avatar />
          <strong>Soif Uddin</strong>
        </Space>
      </Flex>
    </Header>
  );
};

export default DashboardLayoutHeader;
