import { Modal, Select, Table, TableProps } from "antd";
import { FunctionComponent } from "react";
import { IOrderDetail } from "../../../@types/response/order";
import { OrderStatus } from "../../../constants/order";

interface OrderDetailProps {
  onHide: () => void;
  details: IOrderDetail[];
  reservationId: string;
}
interface DishProps extends IOrderDetail {}

const columns: TableProps<DishProps>["columns"] = [
  {
    title: "Dish",
    dataIndex: "dishName",
    key: "dish",
  },
  {
    title: "Id",
    dataIndex: "dishId",
    key: "dishId",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "dish",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
];
const OrderDetail: FunctionComponent<OrderDetailProps> = ({
  onHide,
  reservationId,
  details,
}) => {
  return (
    <Modal
      open
      width={"50%"}
      title={`Reservation ${reservationId}`}
      onCancel={onHide}
      onClose={onHide}
    >
      <Table pagination={false} columns={columns} dataSource={details} />
    </Modal>
  );
};

export default OrderDetail;
