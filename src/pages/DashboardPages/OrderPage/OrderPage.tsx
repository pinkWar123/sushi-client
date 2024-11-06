import { Col, Flex, Form, Row, Space, Typography } from "antd";
import Search from "antd/es/transfer/search";
import { FunctionComponent } from "react";
import OrderItem from "./OrderItem";

export interface OrderPageProps {}

const OrderPage: FunctionComponent<OrderPageProps> = () => {
  return (
    <>
      <Typography.Title level={2}>Orders</Typography.Title>
      <Flex justify="space-between">
        <Space>
          <div className="bg-white rounded-md py-1 px-2 cursor-pointer text-xs">
            All
          </div>
          <div className="bg-green-800 text-white rounded-md py-1 px-2 cursor-pointer text-xs">
            On Process
          </div>
          <div className="bg-white rounded-md py-1 px-2 cursor-pointer text-xs">
            Completed
          </div>
        </Space>
        <div>
          <Form.Item>
            <Search placeholder="Search a name, order, etc." />
          </Form.Item>
        </div>
      </Flex>
      <Row className="mt-4" gutter={8}>
        {Array.from({ length: 12 }, (_, index) => (
          <Col className="mb-4" span={8} key={`order-${index}`}>
            <OrderItem />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default OrderPage;
