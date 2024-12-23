import {
  faAddressBook,
  faCalendarDays,
  faPenToSquare,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faBriefcase,
  faCodeBranch,
  faMoneyBill,
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
} from "../../../redux/employeeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { IEmployeeQuery } from "../../../@types/request/request";
import { fetchBranches } from "../../../redux/client/clientSectionSlice";
import { IDepartmentResponse } from "../../../@types/response/department";
import { callGetAllDepartments } from "../../../services/department";

interface EmployeePageProps {}

const DEPARTMENTS = ["chef", "waiter", "cashier"];

const EmployeePage: FunctionComponent<EmployeePageProps> = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [form] = Form.useForm<IEmployeeQuery>();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeEmployee, setActiveEmployee] = useState<IEmployee>();
  const [departments, setDepartments] = useState<IDepartmentResponse>([]);
  const branches = useAppSelector((state) => state.clientSections.branches);
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
    const departmentId = params.get("departmentId");
    if (departmentId) queryObj.departmentId = departmentId;
    const name = params.get("name");
    if (name) {
      queryObj.name = name;
    }
    return queryObj;
  }, [location.search]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("name") || undefined;
    const departmentId = searchParams.get("departmentId") || "";
    form.setFieldsValue({ name, departmentId });
    dispatch(fetchEmployee(query));
  }, [dispatch, query]);

  useEffect(() => {
    if (!branches.length) dispatch(fetchBranches());
  }, []);
  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await callGetAllDepartments();

      setDepartments(res);
    };

    fetchDepartments();
  }, []);

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
      dataIndex: "departmentName",
      key: "department",
      render: (value) => <strong className="text-xs">{value}</strong>,
      width: "10%",
    },
    {
      title: (
        <Space>
          <FontAwesomeIcon icon={faMoneyBill} /> Salary
        </Space>
      ),
      dataIndex: "salary",
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
          <FontAwesomeIcon icon={faCodeBranch} /> Branch
        </Space>
      ),
      dataIndex: "branchName",
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
    if (filters.departmentId !== "")
      params.set("departmentId", filters.departmentId ?? "");
    else params.delete("departmentId");
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
          <Form.Item name={"departmentId"} className="w-32">
            <Select
              placeholder="Department"
              // value={}
              options={[
                ...departments.map((department) => ({
                  label: department.departmentName,
                  value: department.departmentId,
                })),
                {
                  label: "All",
                  value: "",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <button
              onClick={() => handleSearch()}
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-1 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Search
            </button>
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
