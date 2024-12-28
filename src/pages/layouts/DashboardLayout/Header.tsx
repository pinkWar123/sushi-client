import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Flex, Select, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { FunctionComponent, useEffect, useState } from "react";
import { BranchNameDto } from "../../../@types/response/branch";
import { callGetAllBranchNames } from "../../../services/branch";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NotFound from "../../ErrorPages/NotFound";
import { PATH } from "../../../constants/paths";
import { useAppSelector } from "../../../hooks/redux";
import logo from "../../../assets/icon/logo.png";
import "../ClientLayout/Header.css";
interface HeaderProps {}

const DashboardLayoutHeader: FunctionComponent<HeaderProps> = () => {
  const [branchNames, setBranchNames] = useState<BranchNameDto[]>([]);
  const { branchId } = useParams();
  const { name } = useAppSelector((state) => state.account);
  console.log(name);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBranches = async () => {
      const res = await callGetAllBranchNames();
      if (res.succeeded) {
        setBranchNames(res.data);
      }
    };
    fetchBranches();
  }, []);

  const handleNavigate = (branchId: string) => {
    const currentPath = location.pathname; // Full path without query params
    const query = location.search; // Extract query string (e.g., ?datedOn=...)

    const segments = currentPath.split("/"); // Split path into parts
    segments[1] = branchId; // Replace branchId (2nd segment)

    const updatedPath = segments.join("/") + query; // Reconstruct path with query
    navigate(updatedPath); // Navigate to the updated URL
  };

  if (!branchId) return <NotFound />;
  if (
    branchNames.length > 0 &&
    !branchNames.map((b) => b.branchId).includes(branchId)
  )
    return <Navigate to={PATH.HOME} />;

  return (
    <Header className="bg-neutral-50">
      <Flex justify="space-between">
        <Space>
          <div className="logo-container">
            <a href="/welcome">
              <img src={logo} alt="Logo" className="logo-img" />
            </a>
          </div>
          <div className="flex items-center">
            {/* <Select
              options={branchNames.map((branch) => ({
                label: <div>{branch.name}</div>,
                value: branch.branchId,
              }))}
              value={branchId}
              onChange={(value) => handleNavigate(value)}
              placeholder="Choose a branch..."
            /> */}
          </div>
        </Space>
        <Space>
          <FontAwesomeIcon icon={faBell} />
          {/* <Avatar /> */}
          <strong>{name}</strong>
        </Space>
      </Flex>
    </Header>
  );
};

export default DashboardLayoutHeader;
