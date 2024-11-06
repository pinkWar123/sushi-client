import { Col, Row } from "antd";
import { FunctionComponent } from "react";
import Filter from "./Filter";
import Dishes from "./Dishes";

export interface MenuPageProps {}

const MenuPage: FunctionComponent<MenuPageProps> = () => {
  return (
    <Row gutter={16}>
      <Col span={5}>
        <div className="sticky top-0">
          <Filter />
        </div>
      </Col>
      <Col span={19}>
        <Dishes />
      </Col>
    </Row>
  );
};

export default MenuPage;
