import { Avatar, Card, Col, Divider, Flex, Row, Typography } from "antd";
import { FunctionComponent, useState } from "react";
import Status from "./Status";
import OrderDetail from "./OrderDetail";
import PaymentModal from "./PaymentModal";

interface OrderItemProps {}

const details = [
  {
    name: "Scrambled eggs with toast",
    quantity: 1,
    price: 16.99,
  },
  {
    name: "Scrambled eggs with toast",
    quantity: 1,
    price: 16.99,
  },
  {
    name: "Scrambled eggs with toast",
    quantity: 1,
    price: 16.99,
  },
  {
    name: "Scrambled eggs with toast",
    quantity: 1,
    price: 16.99,
  },
];

const OrderItem: FunctionComponent<OrderItemProps> = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showBills, setShowBills] = useState<boolean>(false);
  return (
    <>
      {showDetail && <OrderDetail onHide={() => setShowDetail(false)} />}
      {showBills && <PaymentModal onHide={() => setShowBills(false)} />}
      <Card>
        <Flex gap={"middle"}>
          <Avatar shape="square" className="bg-green-600">
            A4
          </Avatar>
          <Flex justify="space-between" className="flex-1">
            <div>
              <div className="font-bold">Ariel Hikmat</div>
              <div className="text-xs text-gray-400 flex justify-between">
                <div>Order #025 / Dine in</div>
              </div>
            </div>
            <div>
              <Status status="ready" />
              <div className="text-xs text-gray-400 text-right">3 people</div>
            </div>
          </Flex>
        </Flex>
        <Flex className="mt-2 text-xs" justify="space-between">
          <div>Wed, July 12, 2023</div>
          <div>06:12 PM</div>
        </Flex>
        <hr className="py-2 mt-2" />
        <div className="h-36 overflow-hidden">
          <Row>
            <Col span={12} className="text-gray-400 text-xs">
              Items
            </Col>
            <Col span={3} className="text-center text-gray-400 text-xs">
              Qty
            </Col>
            <Col span={9} className="text-right text-gray-400 text-xs">
              Price
            </Col>
          </Row>
          {details.map((detail, index) => (
            <Row key={`${detail.name}-${index}`} className="py-2">
              <Col span={12}>
                <Typography.Paragraph
                  className="text-xs"
                  ellipsis={{ rows: 1 }}
                >
                  {detail.name}
                </Typography.Paragraph>
              </Col>
              <Col span={3} className="text-center">
                <Typography.Paragraph
                  className="text-xs"
                  ellipsis={{ rows: 1 }}
                >
                  {detail.quantity}
                </Typography.Paragraph>
              </Col>
              <Col span={9} className="text-right">
                <Typography.Paragraph
                  className="text-xs"
                  ellipsis={{ rows: 1 }}
                >
                  ${detail.price}
                </Typography.Paragraph>
              </Col>
            </Row>
          ))}
        </div>
        <Divider orientation="center">
          <span className="text-xs">+3 more</span>
        </Divider>
        <Flex justify="space-between">
          <div className="font-bold">Total</div>
          <div className="font-bold">$87.34</div>
        </Flex>

        <Row gutter={16} className="mt-4" justify="center">
          <Col span={12}>
            <button
              onClick={() => setShowDetail(true)}
              className="rounded-md py-1 text-sm text-green-700 w-full bg-gray-100 font-bold"
            >
              See Details
            </button>
          </Col>
          <Col span={12}>
            <button
              onClick={() => setShowBills(true)}
              className="rounded-md py-1 w-full bg-yellow-400 font-bold"
            >
              Pay Bills
            </button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default OrderItem;
