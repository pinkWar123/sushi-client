import { Modal, Select, Table, TableProps } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { IOrderDetail } from "../../../@types/response/order";
import { formatMoney } from "../../../utils/money";
import { IInvoiceDish } from "../../../@types/response/invoice";
import { callGetInvoiceDetails } from "../../../services/invoice";

interface DetailModalProps {
  onHide: () => void;
  invoiceId: string;
}
interface DishProps extends IOrderDetail {}

const columns: TableProps<IInvoiceDish>["columns"] = [
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
    render: (value) => formatMoney(value),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
];
const DetailModal: FunctionComponent<DetailModalProps> = ({
  onHide,
  invoiceId,
}) => {
  const [dishes, setDishes] = useState<IInvoiceDish[]>([]);
  useEffect(() => {
    const fetchDishes = async () => {
      const res = await callGetInvoiceDetails(invoiceId);
      setDishes(res.data);
    };
    fetchDishes();
  }, []);
  return (
    <Modal
      open
      width={"50%"}
      title={`Invoice detail`}
      onCancel={onHide}
      onClose={onHide}
    >
      <Table pagination={false} columns={columns} dataSource={dishes} />
    </Modal>
  );
};

export default DetailModal;
