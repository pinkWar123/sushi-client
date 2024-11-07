import { faStickyNote } from "@fortawesome/free-regular-svg-icons";
import {
  faCog,
  faGauge,
  faHamburger,
  faSignOutAlt,
  faUsers,
  faUsersLine,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { FunctionComponent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface DashboardLayoutSidebarProps {}

interface NavigateItemProps {
  icon: JSX.Element;
  title: string;
  isActive?: boolean;
}

const items: NavigateItemProps[] = [
  {
    icon: <FontAwesomeIcon icon={faGauge} />,
    title: "Dashboard",
  },
  // {
  //   icon: <FontAwesomeIcon icon={faChartLine} />,
  //   title: "Report",
  // },
  {
    icon: <FontAwesomeIcon icon={faStickyNote} />,
    title: "Orders",
  },
  {
    icon: <FontAwesomeIcon icon={faHamburger} />,
    title: "Menu",
  },
  {
    icon: <FontAwesomeIcon icon={faUsersLine} />,
    title: "Employee",
  },
  {
    icon: <FontAwesomeIcon icon={faUsers} />,
    title: "Customers",
  },
];

const NavigateItem: FunctionComponent<NavigateItemProps> = (
  props: NavigateItemProps
) => {
  const navigate = useNavigate();
  return (
    <div
      className={`py-2 cursor-pointer ${
        props.isActive ? "text-violet-700 " : "text-zinc-400"
      }`}
      onClick={() =>
        navigate(
          `/dashboard${
            props.title.toLowerCase() === "dashboard"
              ? ""
              : "/" + props.title.toLowerCase()
          }`
        )
      }
    >
      <div
        className={`h-1/2 ${
          props.isActive ? "border-r-2 border-r-violet-700" : ""
        }`}
      >
        <Space className={`ml-8`}>
          <div>{props.icon}</div>
          <div
            className={` ${
              props.isActive ? "text-violet-700 " : "text-zinc-400"
            }`}
          >
            {props.title}
          </div>
        </Space>
      </div>
    </div>
  );
};

const DashboardLayoutSidebar: FunctionComponent<
  DashboardLayoutSidebarProps
> = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  return (
    <Sider
      className="bg-neutral-50 start-0 h-screen fixed top-18 "
      width={"15%"}
    >
      {items.map((item) => (
        <NavigateItem
          {...item}
          isActive={item.title.toLowerCase() === lastSegment}
        />
      ))}
      <div className=" mt-40">
        <Divider />
        <div className="py-2 cursor-pointer">
          <Space className="ml-8">
            <FontAwesomeIcon className="text-zinc-400" icon={faCog} />
            <div className="text-zinc-400">Settings</div>
          </Space>
        </div>
        <div className="py-2 cursor-pointer">
          <Space className="ml-8">
            <FontAwesomeIcon className="text-zinc-400" icon={faSignOutAlt} />
            <div className="text-zinc-400">Log out</div>
          </Space>
        </div>
      </div>
    </Sider>
  );
};

export default DashboardLayoutSidebar;
