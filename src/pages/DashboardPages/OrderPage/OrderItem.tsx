import { Avatar, Card, Col, Divider, Flex, Row, Typography } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import Status from "./Status";
import { IReservation } from "../../../@types/response/reservation";
import { formattedDate, formattedTime } from "../../../utils/time";
import { OrderStatus } from "../../../constants/order";
import PlacedFooter from "./PlacedFooter";
import InProgressFooter from "./InProgressFooter";
import { formatMoney } from "../../../utils/money";
import { callGetLastestInvoicesByOrder } from "../../../services/invoice";
import { ILastestInvoicesByOrderResponse } from "../../../@types/response/invoice";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faGift,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarAlt,
  faCreditCard,
} from "@fortawesome/free-regular-svg-icons";

interface OrderItemProps {
  info: IReservation;
}

const OrderItem: FunctionComponent<OrderItemProps> = ({ info }) => {
  const [invoices, setInvoices] = useState<ILastestInvoicesByOrderResponse>([]);
  useEffect(() => {
    if (info.status !== OrderStatus.Done) return;
    const fetchInvoices = async () => {
      const res = await callGetLastestInvoicesByOrder(info.orderId);
      setInvoices(res.data);
    };
    fetchInvoices();
  }, []);
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
        {invoices.length > 0 && (
          <>
            <div className="space-y-4 p-4 bg-white shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-green-500"
                  />
                  <span className="font-bold">Total</span>
                </div>
                <span className="font-bold">
                  {formatMoney(invoices[0].total)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-blue-500"
                  />
                  <span className="font-bold">Payment Method</span>
                </div>
                <span className="font-bold">{invoices[0].paymentMethod}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faTags} className="text-red-500" />
                  <span className="font-bold">After Discount</span>
                </div>
                <span className="font-bold">
                  {formatMoney(invoices[0].afterDiscount)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon icon={faGift} className="text-purple-500" />
                  <span className="font-bold">Bonus Point</span>
                </div>
                <span className="font-bold">{invoices[0].bonusPoint}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-gray-500"
                  />
                  <span className="font-bold">Date</span>
                </div>
                <span className="font-bold">
                  {dayjs(invoices[0].datedOn).format("MMM DD, YYYY")}
                </span>
              </div>
            </div>
          </>
        )}

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
