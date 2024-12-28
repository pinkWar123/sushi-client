import { Avatar, Card, Col, Divider, Flex, Row, Typography } from "antd";
import { FunctionComponent } from "react";
import Status from "./Status";
import { IReservation } from "../../../@types/response/reservation";
import { formattedDate, formattedTime } from "../../../utils/time";
import { OrderStatus } from "../../../constants/order";
import PlacedFooter from "./PlacedFooter";
import InProgressFooter from "./InProgressFooter";
import { formatMoney } from "../../../utils/money";

interface OrderItemProps {
  info: IReservation;
}

const OrderItem: FunctionComponent<OrderItemProps> = ({ info }) => {
  const caculateMoney = () =>
    info.orderDetails
      .map((o) => o.price * o.quantity)
      .reduce((a, b) => a + b, 0);
  return (
    <>
      <Card>
        <Flex gap={"middle"}>
          <Avatar shape="square" className="bg-green-600">
            {info.tableNumber}
          </Avatar>
          <Flex justify="space-between" className="flex-1">
            <div>
              <div className="font-bold">{info.customerName}</div>
              <Typography.Paragraph
                ellipsis={{
                  rows: 1,
                  tooltip: true,
                }}
                className="text-xs text-gray-400 w-2/3 justify-between"
              >
                {info.reservationId}
              </Typography.Paragraph>
            </div>
            <div>
              <Status status={info.status} />
              <div className="text-xs text-gray-400 text-right">
                {info.totalPeople} {info.totalPeople > 1 ? "people" : "person"}
              </div>
            </div>
          </Flex>
        </Flex>
        <Flex className="mt-2 text-xs" justify="space-between">
          <div>{formattedDate(info.datedOn)}</div>
          <div>{formattedTime(info.datedOn)}</div>
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
          {info.orderDetails.slice(0, 3).map((detail, index) => (
            <Row key={`${detail.dishName}-${index}`} className="py-2">
              <Col span={12}>
                <Typography.Paragraph
                  className="text-xs"
                  ellipsis={{ rows: 1 }}
                >
                  {detail.dishName}
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
                  {formatMoney(detail.price)}
                </Typography.Paragraph>
              </Col>
            </Row>
          ))}
        </div>
        <Divider orientation="center">
          {info.orderDetails.length > 3 && (
            <span className="text-xs">
              +{info.orderDetails.length - 3} more
            </span>
          )}
        </Divider>
        <Flex justify="space-between">
          <div className="font-bold">Total</div>
          <div className="font-bold">{formatMoney(caculateMoney())}</div>
        </Flex>

        <Row gutter={16} className="mt-4" justify="center">
          {info.status === OrderStatus.Placed && (
            <PlacedFooter reservationId={info.reservationId} />
          )}
          {(info.status === OrderStatus.InProgress ||
            info.status === OrderStatus.Done) && (
            <InProgressFooter
              info={info}
              paybillBtn={info.status === OrderStatus.InProgress}
            />
          )}
        </Row>
      </Card>
    </>
  );
};

export default OrderItem;
