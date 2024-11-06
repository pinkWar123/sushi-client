import "./App.css";
import { AppRoutes } from "./routes";
import { App as AntdApp } from "antd";
function App() {
  return (
    <AntdApp>
      <AppRoutes />
    </AntdApp>
  );
}

export default App;
