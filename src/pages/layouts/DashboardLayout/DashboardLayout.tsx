import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FunctionComponent } from "react";
import DashboardLayoutHeader from "./Header";
import DashboardLayoutSidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

interface DashboardLayoutProps {}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = () => {
  return (
    <Layout className="rounded-sm ">
      <div className="sticky top-0 z-10">
        <DashboardLayoutHeader />
      </div>
      <Layout hasSider className="h-full">
        <DashboardLayoutSidebar />
        <Content
          style={{ marginInlineStart: 180 }}
          className="flex justify-center "
        >
          <div className="w-11/12 mt-4 ">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
