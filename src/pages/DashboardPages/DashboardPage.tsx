import React, { FunctionComponent } from "react";

export interface DashboardPageProps {}

const _DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  return <>This is dashboard page</>;
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
