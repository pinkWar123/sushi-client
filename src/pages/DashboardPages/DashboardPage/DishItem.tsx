import { Col, Divider, Flex, Row } from "antd";
import { FunctionComponent } from "react";

interface DishItemProps {
  dishName: string;
  orders: number;
}

const DishItem: FunctionComponent<DishItemProps> = ({ dishName, orders }) => {
  return (
    <Row>
      <Col span={18}>
        <Flex gap={"middle"}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pizza_Vi%E1%BB%87t_Nam_%C4%91%E1%BA%BF_d%C3%A0y%2C_x%C3%BAc_x%C3%ADch_%28SNaT_2018%29_%287%29.jpg/440px-Pizza_Vi%E1%BB%87t_Nam_%C4%91%E1%BA%BF_d%C3%A0y%2C_x%C3%BAc_x%C3%ADch_%28SNaT_2018%29_%287%29.jpg"
            alt=""
            className="w-8 h-8"
          />
          <div>
            <strong className="text-sm">{dishName}</strong>
            <div className="text-stone-400 text-xs">Deef coffee</div>
          </div>
        </Flex>
      </Col>
      <Col span={6}>
        <strong>{orders}</strong>
      </Col>
      <Divider />
    </Row>
  );
};

export default DishItem;
