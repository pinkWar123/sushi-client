import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FunctionComponent } from "react";
import DashboardLayoutHeader from "./Header";
import DashboardLayoutSidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

interface DashboardLayoutProps {}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = () => {
  return (
    <Layout className="rounded-sm overflow-hidden">
      <DashboardLayoutHeader />
      <Layout className="h-screen">
        <DashboardLayoutSidebar />
        <Content className="flex justify-center">
          <div className="w-11/12 mt-4">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
