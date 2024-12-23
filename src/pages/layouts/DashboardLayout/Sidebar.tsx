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
import { useAppDispatch } from "../../../hooks/redux";
import { logOut } from "../../../redux/accountSlice";

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
      className={`py-2 cursor-pointer hover:text-violet-700 ${
        props.isActive ? "text-violet-700 " : "text-zinc-400"
      }`}
      onClick={() =>
        navigate(
          `${
            props.title.toLowerCase() === "dashboard"
              ? ""
              : "./" + props.title.toLowerCase()
          }`
        )
      }
    >
      <div
        className={`h-1/2 hover:text-violet-700 ${
          props.isActive ? "border-r-2 border-r-violet-700" : ""
        }`}
      >
        <Space className={`ml-8`}>
          <div>{props.icon}</div>
          <div
            className={`hover:text-violet-700 ${
              props.isActive ? "text-violet-700   " : "text-zinc-400"
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/welcome");
  };
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
      <div className="mt-40">
        <Divider />
        <div
          className="py-2 cursor-pointer text-zinc-400 hover:text-violet-700"
          onClick={() => handleLogOut()}
        >
          <Space className="ml-8">
            <div>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
            <div className="text-zinc-400 hover:text-violet-700">Log out</div>
          </Space>
        </div>
      </div>
    </Sider>
  );
};

export default DashboardLayoutSidebar;
