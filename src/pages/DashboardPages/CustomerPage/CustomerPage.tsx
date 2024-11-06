import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Flex, Form, Space, Table, TableProps, Typography } from "antd";
import Search from "antd/es/transfer/search";
import { FunctionComponent, useState } from "react";
import AddCustomerModal from "./AddCustomerModal";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import EditCustomerDrawer from "./EditCustomerDrawer";

interface CustomerPageProps {}

interface Customer {
  name: string;
  email: string;
  address: string;
  orders: number;
  spent: number;
}

const CUSTOMERS: Customer[] = [
  {
    name: "Ramisa Sanjana",
    email: "ramisa@gmail.com",
    address: "14 Clifton Down Road, UK",
    orders: 7,
    spent: 3331.0,
  },
  {
    name: "Mohua Amin",
    email: "mohua@gmail.com",
    address: "405 Kings Road, Chelsea, London",
    orders: 44,
    spent: 74331.0,
  },
  {
    name: "Estiaq Noor",
    email: "estiaqnoor@gmail.com",
    address: "176 Finchley Road, London",
    orders: 4,
    spent: 2331.0,
  },
  {
    name: "Reaz Nahid",
    email: "reaz@hotmail.com",
    address: "12 South Bridge, Edinburgh, UK",
    orders: 27,
    spent: 44131.89,
  },
  {
    name: "Rabbi Amin",
    email: "amin@yourmail.com",
    address: "176 Finchley Road, London",
    orders: 16,
    spent: 7331.0,
  },
  {
    name: "Sakib Al Baky",
    email: "sakib@yahoo.com",
    address: "405 Kings Road, Chelsea, London",
    orders: 47,
    spent: 8231.0,
  },
  {
    name: "Maria Nur",
    email: "maria@gmail.com",
    address: "80 High Street, Winchester",
    orders: 12,
    spent: 9631.0,
  },
  //   {
  //     name: "Ahmed Baky",
  //     email: "maria@gmail.com",
  //     address: "80 High Street, Winchester",
  //     orders: 12,
  //     spent: 9631.0,
  //   },
];

const CustomerPage: FunctionComponent<CustomerPageProps> = () => {
  const [openCustomerModal, setOpenCustomerModal] = useState<boolean>(false);
  const [openCustomerDrawer, setOpenCustomerDrawer] = useState<boolean>(false);
  const columns: TableProps<Customer>["columns"] = [
    {
      title: <div className="text-gray-400 text-xs">Customer</div>,
      dataIndex: "name",
      key: "name",
      render: (value) => (
        <Space>
          <div>
            <Avatar
              size={16}
              src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
            />
          </div>
          <strong className="text-xs">{value}</strong>
        </Space>
      ),
    },
    {
      title: <div className="text-gray-400 text-xs">Email</div>,
      dataIndex: "email",
      key: "email",
      render: (value) => <span className="text-xs">{value}</span>,
    },
    {
      title: <div className="text-gray-400 text-xs">Location</div>,
      dataIndex: "address",
      key: "address",
      render: (value) => (
        <Typography.Text ellipsis={{ tooltip: true }} className="text-xs w-40">
          {value}
        </Typography.Text>
      ),
    },
    {
      title: <div className="text-gray-400 text-xs">Orders</div>,
      dataIndex: "orders",
      key: "orders",
      render: (value) => <strong className="text-xs">{value}</strong>,
    },
    {
      title: <div className="text-gray-400 text-xs">Spent</div>,
      dataIndex: "spent",
      key: "spent",
      render: (value) => <strong className="text-xs">{value}</strong>,
    },
    {
      title: <div className="text-gray-400 text-xs">Action</div>,
      key: "action",
      render: () => (
        <Space>
          <FontAwesomeIcon
            className="cursor-pointer text-violet-500"
            icon={faPenToSquare}
            onClick={() => setOpenCustomerDrawer(true)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="cursor-pointer text-red-500"
          />
        </Space>
      ),
    },
  ];
  return (
    <div className="min-h-screen">
      {openCustomerModal && (
        <AddCustomerModal onHide={() => setOpenCustomerModal(false)} />
      )}
      {openCustomerDrawer && (
        <EditCustomerDrawer onHide={() => setOpenCustomerDrawer(false)} />
      )}
      <Flex justify="space-between">
        <Form.Item>
          <Search placeholder="Search customer..." />
        </Form.Item>
        <Form.Item>
          <button
            onClick={() => setOpenCustomerModal(true)}
            className="py-1 px-4 rounded-md bg-violet-700 text-white font-bold"
          >
            <FontAwesomeIcon icon={faPlus} /> Add customer
          </button>
        </Form.Item>
      </Flex>
      <hr className="" />
      <Table dataSource={CUSTOMERS} columns={columns} />
    </div>
  );
};

export default CustomerPage;
