import { Modal, Select, Table, TableProps } from "antd";
import { FunctionComponent } from "react";

interface OrderDetailProps {
  onHide: () => void;
}
interface DishProps {
  name: string;
  quantity: number;
  price: number;
  status: "in-progress" | "completed" | "ready";
}
const details: DishProps[] = [
  {
    name: "Scrambled eggs with toast",
    quantity: 1,
    price: 16.99,
    status: "completed",
  },
  {
    name: "Scrambled eggs with toast",
    quantity: 1,
    price: 16.99,
    status: "in-progress",
  },
  {
    name: "Scrambled eggs with toast",
    quantity: 1,
    price: 16.99,
    status: "completed",
  },
  {
    name: "Scrambled eggs with toast",
    quantity: 1,
    price: 16.99,
    status: "ready",
  },
];

const columns: TableProps<DishProps>["columns"] = [
  {
    title: "Dish",
    dataIndex: "name",
    key: "dish",
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
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => (
      <Select
        value={value}
        options={[
          {
            label: "In Progress",
            value: "in-progress",
          },
          {
            label: "Completed",
            value: "completed",
          },
          {
            label: "Ready",
            value: "ready",
          },
        ]}
      />
    ),
  },
];
const OrderDetail: FunctionComponent<OrderDetailProps> = ({ onHide }) => {
  return (
    <Modal open title="Order detail #25" onCancel={onHide} onClose={onHide}>
      <Table pagination={false} columns={columns} dataSource={details} />
    </Modal>
  );
};

export default OrderDetail;
