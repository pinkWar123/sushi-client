import {
  faAddressBook,
  faCalendarDays,
  faPenToSquare,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBriefcase,
  faCodeBranch,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Flex,
  Form,
  Select,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import Search from "antd/es/transfer/search";
import { FunctionComponent, useState } from "react";
import EmployeeEditDrawer from "./EmployeeEditDrawer";

interface EmployeePageProps {}

interface Employee {
  id: string;
  name: string;
  department: string;
  contact: string;
  joinedDate: string;
  branch: string;
}

const DEPARTMENTS = ["chef", "waiter", "cashier"];

interface Employee {
  id: string;
  name: string;
  department: string;
  contact: string;
  joinedDate: string;
  branch: string;
}

const EMPLOYEES: Employee[] = [
  {
    id: "1",
    name: "Alice Johnson",
    department: "chef",
    contact: "alice.johnson@example.com",
    joinedDate: "15 Jan, 2023",
    branch: "Downtown",
  },
  {
    id: "2",
    name: "Bob Smith",
    department: "waiter",
    contact: "bob.smith@example.com",
    joinedDate: "22 Nov, 2022",
    branch: "Uptown",
  },
  {
    id: "3",
    name: "Carol Evans",
    department: "cashier",
    contact: "carol.evans@example.com",
    joinedDate: "05 Jun, 2021",
    branch: "Midtown",
  },
  {
    id: "4",
    name: "David Brown",
    department: "chef",
    contact: "david.brown@example.com",
    joinedDate: "10 Mar, 2023",
    branch: "Downtown",
  },
  {
    id: "5",
    name: "Eve Thompson",
    department: "waiter",
    contact: "eve.thompson@example.com",
    joinedDate: "12 Sep, 2022",
    branch: "Suburbs",
  },
  {
    id: "6",
    name: "Frank White",
    department: "cashier",
    contact: "frank.white@example.com",
    joinedDate: "18 Apr, 2020",
    branch: "Uptown",
  },
];

const EmployeePage: FunctionComponent<EmployeePageProps> = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const columns: TableProps<Employee>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (value) => <strong className="text-xs">{value}</strong>,
      width: "5%",
    },
    {
      title: (
        <Space>
          <FontAwesomeIcon icon={faUser} /> Name
        </Space>
      ),
      dataIndex: "name",
      key: "name",
      render: (value) => (
        <Space className="text-xs font-bold">
          <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />{" "}
          {value}
        </Space>
      ),
      width: "30%",
    },
    {
      title: (
        <Space>
          <FontAwesomeIcon icon={faBriefcase} /> Department
        </Space>
      ),
      dataIndex: "department",
      key: "department",
      render: (value) => <strong className="text-xs">{value}</strong>,
      width: "10%",
    },
    {
      title: (
        <Space>
          <FontAwesomeIcon icon={faAddressBook} /> Contact
        </Space>
      ),
      dataIndex: "contact",
      key: "contact",
      render: (value) => (
        <div className="text-blue-400 rounded-md ring-1 ring-gray-200 text-xs px-4 w-fit font-bold">
          {value}
        </div>
      ),
      width: "15%",
    },
    {
      title: (
        <Space>
          <FontAwesomeIcon icon={faCalendarDays} /> Joined
        </Space>
      ),
      dataIndex: "joinedDate",
      key: "joinedDate",
      render: (value) => <strong className="text-xs">{value}</strong>,
    },
    {
      title: (
        <Space>
          <FontAwesomeIcon icon={faCodeBranch} /> Branch
        </Space>
      ),
      dataIndex: "branch",
      key: "branch",
      render: (value) => <strong className="text-xs">{value}</strong>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space>
          <FontAwesomeIcon
            className="text-green-400 cursor-pointer"
            icon={faPenToSquare}
            onClick={() => setShowDrawer(true)}
          />
          <FontAwesomeIcon
            className="text-red-600 cursor-pointer"
            icon={faTrash}
          />
        </Space>
      ),
    },
  ];
  return (
    <>
      {showDrawer && <EmployeeEditDrawer onHide={() => setShowDrawer(false)} />}
      <Flex justify="space-between">
        <Typography.Title level={3}>Employee</Typography.Title>
        <div className="rounded-md py-1 px-4 h-fit text-white text-sm bg-violet-400 cursor-pointer">
          <FontAwesomeIcon icon={faUserPlus} /> Add employee
        </div>
      </Flex>
      <Form layout="inline">
        <Space>
          <Form.Item className="w-64">
            <Search placeholder="Employee name" />
          </Form.Item>
          <Form.Item className="w-32">
            <Select
              placeholder="Department"
              options={DEPARTMENTS.map((department) => ({
                label: department,
                value: department,
              }))}
            />
          </Form.Item>
        </Space>
      </Form>
      <Table dataSource={EMPLOYEES} columns={columns} />
    </>
  );
};

export default EmployeePage;
