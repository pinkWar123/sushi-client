import {
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
  const dispatch = useAppDispatch();
  const { createInvoiceLoading } = useAppSelector(selectReservationData);

  const handleCreateInvoice = async () => {
    const query: ICreateInvoiceQuery = {
      paymentMethod,
      orderId: info.orderId,
    };
    console.log(query);
    try {
      const result = await dispatch(createInvoice(query)).unwrap();
      message.success(
        `Create invoice for order ${result.orderId} successfully`
      );
      onHide();
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
      title="Invoice Details"
      okText="Create invoice"
      onOk={handleCreateInvoice}
      okButtonProps={{ loading: createInvoiceLoading }}
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
          <strong>{info.totalPrice}</strong>
        </Flex>
        <Flex justify="space-between" className="py-1">
          <strong>Discount:</strong>
          <strong>20%</strong>
        </Flex>
        <Divider></Divider>
        <Flex justify="space-between" className="py-1">
          <strong>Total:</strong>
          <strong>{info.totalPrice}</strong>
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
      </>
    </Modal>
  );
};

export default PaymentModal;
