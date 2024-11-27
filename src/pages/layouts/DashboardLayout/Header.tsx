import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Flex, Select, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { FunctionComponent, useEffect, useState } from "react";
import { BranchNameDto } from "../../../@types/response/branch";
import { callGetAllBranchNames } from "../../../services/branch";

interface HeaderProps {}

const DashboardLayoutHeader: FunctionComponent<HeaderProps> = () => {
  const [branchNames, setBranchNames] = useState<BranchNameDto[]>([]);
  useEffect(() => {
    const fetchBranches = async () => {
      const res = await callGetAllBranchNames();
      if (res.succeeded) {
        setBranchNames(res.data);
      }
    };
    fetchBranches();
  }, []);
  console.log(branchNames);
  return (
    <Header className="bg-neutral-50">
      <Flex justify="space-between">
        <Space>
          <strong className=" ">Foody.io</strong>
          <div className="flex items-center">
            <Select
              options={branchNames.map((branch) => ({
                label: branch.name,
                value: branch.branchId,
              }))}
              placeholder="Choose a branch..."
            />
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
