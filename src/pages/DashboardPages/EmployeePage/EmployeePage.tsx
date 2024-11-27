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
  Input,
  PaginationProps,
  Select,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import EmployeeEditDrawer from "./EmployeeEditDrawer";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { Loading } from "../../../components/Loading";
import { IEmployee } from "../../../@types/response/employee";
import {
  fetchEmployee,
  resetPagination,
  selectEmployee,
  updatePageSize,
} from "../../../redux/employeeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { IEmployeeQuery } from "../../../@types/request/request";

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

const EmployeePage: FunctionComponent<EmployeePageProps> = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [form] = Form.useForm<IEmployeeQuery>();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeEmployee, setActiveEmployee] = useState<IEmployee>();
  const {
    data: employee,
    loading,
    pageNumber,
    pageSize,
    totalRecords,
  } = useAppSelector(selectEmployee);
  const dispatch = useAppDispatch();
  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const queryObj: IEmployeeQuery = {
      pageNumber: parseInt(params.get("pageNumber") ?? "") || pageNumber,
      pageSize: parseInt(params.get("pageSize") ?? "") || pageSize,
    };
    const name = params.get("name");
    if (name) {
      queryObj.name = name;
    }
    return queryObj;
  }, [location.search]);
  useEffect(() => {
    dispatch(fetchEmployee(query));
  }, [dispatch, query]);

  const columns: TableProps<IEmployee>["columns"] = [
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
      render: (_, record) => (
        <Space>
          <FontAwesomeIcon
            className="text-green-400 cursor-pointer"
            icon={faPenToSquare}
            onClick={() => {
              setShowDrawer(true);
              setActiveEmployee(record);
            }}
          />
          <FontAwesomeIcon
            className="text-red-600 cursor-pointer"
            icon={faTrash}
          />
        </Space>
      ),
    },
  ];
  const handleSearch = () => {
    const filters = form.getFieldsValue();
    const params = new URLSearchParams(location.search);
    params.delete("pageNumber");
    params.delete("pageSize");
    if (filters.name) params.set("name", filters.name);
    else params.delete("name");
    dispatch(resetPagination());
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };
  const handleChangePage = (pageNumber: number) => {
    const search = new URLSearchParams(location.search);
    search.set("pageNumber", pageNumber.toString());
    search.set("pageSize", pageSize.toString());
    navigate({
      pathname: location.pathname,
      search: search.toString(),
    });
  };
  const handleChangePageSize: PaginationProps["onShowSizeChange"] = (
    current: number,
    size: number
  ) => {
    // dispatch(resetPagination());
    // dispatch(updatePageSize(size));
    const search = new URLSearchParams(location.search);
    search.set("pageSize", size.toString());
    search.set("pageNumber", "1");
    navigate({
      pathname: location.pathname,
      search: search.toString(),
    });
  };
  if (loading) return <Loading />;
  return (
    <>
      {showDrawer && activeEmployee && (
        <EmployeeEditDrawer
          employee={activeEmployee}
          onHide={() => {
            setShowDrawer(false);
            setActiveEmployee(undefined);
          }}
        />
      )}
      <Flex justify="space-between">
        <Typography.Title level={3}>Employee</Typography.Title>
        <div className="rounded-md py-1 px-4 h-fit text-white text-sm bg-violet-400 cursor-pointer">
          <FontAwesomeIcon icon={faUserPlus} /> Add employee
        </div>
      </Flex>
      <Form layout="inline" form={form}>
        <Space>
          <Form.Item className="w-64" name={"name"}>
            <Input placeholder="Employee name" onPressEnter={handleSearch} />
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
      <Table
        dataSource={employee}
        onChange={(config) => {
          handleChangePage(config.current ?? 1);
        }}
        columns={columns}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: totalRecords,
          onShowSizeChange: handleChangePageSize,
        }}
      />
    </>
  );
};

export default EmployeePage;
