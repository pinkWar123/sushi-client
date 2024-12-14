import { useEffect } from "react";
import "./App.css";
import { AppRoutes } from "./routes";
import { App as AntdApp } from "antd";
import { useAppDispatch } from "./hooks/redux";
import { getUserCredentials } from "./redux/accountSlice";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserCredentials());
  }, [dispatch]);
  return (
    <AntdApp>
      <AppRoutes />
    </AntdApp>
  );
}

export default App;
