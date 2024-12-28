import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  message,
  Modal,
  Select,
  Table,
  TableProps,
  Typography,
} from "antd";
import { FunctionComponent, useState } from "react";
import { formattedDate } from "../../../utils/time";
import { IReservation } from "../../../@types/response/reservation";
import { IOrderDetail } from "../../../@types/response/order";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import {
  createInvoice,
  selectReservationData,
} from "../../../redux/reservationSlice";
import { ICreateInvoiceQuery } from "../../../@types/request/request";
import Invoice from "./Invoice";
import { ICreateInvoiceResponse } from "../../../@types/response/invoice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { formatMoney } from "../../../utils/money";

interface PaymentModalProps {
  onHide: () => void;
  info: IReservation;
}

const PaymentModal: FunctionComponent<PaymentModalProps> = ({
  onHide,
  info,
}) => {
  const columns: TableProps<IOrderDetail>["columns"] = [
    {
      title: (
        <Typography.Text ellipsis className="font-normal">
          Dish
        </Typography.Text>
      ),
      dataIndex: "dishName",
      key: "Dish",
      render: (value) => (
        <Typography.Text
          ellipsis={{ tooltip: true }}
          className="text-xs font-bold w-24"
        >
          {value}
        </Typography.Text>
      ),
      width: "50%",
    },
    {
      title: (
        <Typography.Text ellipsis={{ tooltip: true }} className="font-normal">
          Price
        </Typography.Text>
      ),
      dataIndex: "price",
      key: "price",
      render: (value) => (
        <Typography.Text
          ellipsis={{ tooltip: true }}
          className="text-xs font-bold"
        >
          {value}
        </Typography.Text>
      ),
      width: "20%",
    },
    {
      width: "10%",
      title: (
        <Typography.Text
          ellipsis={{ tooltip: true }}
          className="font-normal w-10"
        >
          Qty
        </Typography.Text>
      ),
      dataIndex: "quantity",
      key: "quantity",
      render: (value) => (
        <Typography.Text
          ellipsis={{ tooltip: true }}
          className="text-xs font-bold"
        >
          {value}
        </Typography.Text>
      ),
    },
    {
      title: (
        <Typography.Text ellipsis={{ tooltip: true }} className="font-normal">
          Total
        </Typography.Text>
      ),
      key: "total",
      render: (_, record) => (
        <Typography.Text
          ellipsis={{ tooltip: true }}
          className="text-xs font-bold"
        >
          {record.price * record.quantity}
        </Typography.Text>
      ),
      width: "20%",
    },
  ];
  const [paymentMethod, setPaymentMethod] = useState<"Credit" | "Cash">("Cash");
  const [invoice, setInvoice] = useState<ICreateInvoiceResponse>();
  const dispatch = useAppDispatch();
  const { createInvoiceLoading } = useAppSelector(
    (state) => state.reservations
  );

  const caculateMoney = () =>
    info.orderDetails
      .map((o) => o.price * o.quantity)
      .reduce((a, b) => a + b, 0);

  const handleCreateInvoice = async () => {
    const query: ICreateInvoiceQuery = {
      paymentMethod,
      orderId: info.orderId,
    };
    console.log(query);
    try {
      const result = await dispatch(createInvoice(query)).unwrap();
      console.log(result);
      message.success(
        `Create invoice for order ${result.orderId} successfully`
      );
      setInvoice(result);
    } catch (error) {
      console.log(error);
      message.error("Create invoice failed");
    }
  };

  return (
    <Modal
      onCancel={onHide}
      onClose={onHide}
      centered
      className="w-50"
      width={"80%"}
      open
      footer={null}
      title="Invoice Details"
      maskClosable={false}
      keyboard={false}
    >
      <>
        <Flex justify="space-between">
          <div>
            <strong className="text-lg">
              Customer Name: {info.customerName}
            </strong>
            <div>Customer ID: {info.customerId}</div>
            <div>Order ID: {info.orderId}</div>
          </div>
          <div>
            <span className="text-gray-400 text-xs">Date: </span>
            <strong>{formattedDate(info.datedOn)}</strong>
          </div>
        </Flex>
        <Table
          columns={columns}
          pagination={false}
          dataSource={info.orderDetails}
        />
        <Divider></Divider>
        <Flex justify="space-between" className="py-1">
          <strong>Total:</strong>
          <strong>{formatMoney(caculateMoney())}</strong>
        </Flex>
        <Flex justify="space-between" className="py-1">
          <strong>Payment method:</strong>
          <Form.Item>
            <Select
              value={paymentMethod}
              onChange={setPaymentMethod}
              options={[
                {
                  label: "Cash",
                  value: "Cash",
                },
                {
                  label: "Credit",
                  value: "Credit",
                },
              ]}
            />
          </Form.Item>
        </Flex>

        {!invoice && (
          <Button
            loading={createInvoiceLoading}
            type="primary"
            className="w-full"
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleCreateInvoice}
          >
            Create invoice
          </Button>
        )}

        <Flex justify="center">
          {invoice && (
            <Invoice
              info={invoice}
              reservationId={info.reservationId}
              onHide={onHide}
            />
          )}
        </Flex>
      </>
    </Modal>
  );
};

export default PaymentModal;
