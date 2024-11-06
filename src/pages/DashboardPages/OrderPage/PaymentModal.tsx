import {
  Card,
  Col,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  TableProps,
  Typography,
} from "antd";
import { FunctionComponent, useState } from "react";

const CLIENTS = [
  {
    name: "Nguyen Hong Quan",
    address: "40 Hoang Dieu, p13, q4, HCM",
  },
  {
    name: "Nguyen Phuc Thanh",
    address: "20 An Duong Vuong, p1, q8, HCM",
  },
];

interface DataType {
  title: string;
  quantity: number;
  price: number;
  total: number;
}

const DATA: DataType[] = [
  {
    title:
      "Sushiasddlsaasdlksdaklsadjlkadsjkldaskljsdajlkadsjkladsjlkadjkladsljk",
    quantity: 2,
    price: 20,
    total: 40,
  },
  {
    title: "Sushi",
    quantity: 2,
    price: 20,
    total: 40,
  },
  {
    title: "Sushi",
    quantity: 2,
    price: 20,
    total: 40,
  },
];

const columns: TableProps<DataType>["columns"] = [
  {
    title: (
      <Typography.Text ellipsis className="font-normal">
        Dish
      </Typography.Text>
    ),
    dataIndex: "title",
    key: "title",
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
    dataIndex: "total",
    key: "total",
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
];

interface PaymentModalProps {
  onHide: () => void;
}

const PaymentModal: FunctionComponent<PaymentModalProps> = ({ onHide }) => {
  const [activeClient, setActiveClient] = useState<number>();
  return (
    <Modal
      onCancel={onHide}
      onClose={onHide}
      centered
      className="w-50"
      width={"80%"}
      open
      title="Invoice Details"
    >
      <Row gutter={16}>
        <Col span={12} className="p-8">
          <Form layout="vertical">
            <Form.Item label="ID Invoice">
              <Input prefix="#" value={"2304-ZAK"} />
            </Form.Item>
            <Form.Item label="Date">
              <DatePicker />
            </Form.Item>
            <Typography.Title level={3}>Bill Payment</Typography.Title>
            <Form.Item label="Client name">
              <Select
                value={activeClient}
                onChange={(value) => setActiveClient(value)}
                placeholder="Choose a customer"
                options={CLIENTS.map((client, index) => ({
                  label: client.name,
                  value: index,
                }))}
              />
            </Form.Item>
            <Form.Item label="Address">
              <Input
                disabled
                placeholder="Customer's address..."
                value={
                  activeClient !== undefined
                    ? CLIENTS[activeClient].address
                    : undefined
                }
              />
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} className="bg-gray-100 p-8">
          <Card className="shadow-lg">
            <Typography.Title level={5}>Invoice</Typography.Title>
            <Flex justify="space-between">
              <div className="text-gray-400">ID #2304-ZAK</div>
              <div>
                <span className="text-gray-400">Date: </span>
                <strong>31/03/2004</strong>
              </div>
            </Flex>
            <div>
              <strong>Nguyen Phuc Thanh</strong>
            </div>
            <div>23 An Duong Vuong, p1,q8, HCM</div>
            <Table columns={columns} pagination={false} dataSource={DATA} />
            <Divider></Divider>
            <Flex justify="space-between" className="py-1">
              <strong>Total:</strong>
              <strong>$20</strong>
            </Flex>
            <Flex justify="space-between" className="py-1">
              <strong>Discount:</strong>
              <strong>20%</strong>
            </Flex>
            <Divider></Divider>
            <Flex justify="space-between" className="py-1">
              <strong>Payment:</strong>
              <strong>$16</strong>
            </Flex>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default PaymentModal;
