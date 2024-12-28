import {
  faDumbbell,
  faPlus,
  faTrash,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Flex,
  Form,
  Input,
  message,
  Space,
  Table,
  TableProps,
  Typography,
} from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import AddCustomerModal from "./AddCustomerModal";
import { faPenToSquare, faStar } from "@fortawesome/free-regular-svg-icons";
import EditCustomerDrawer from "./EditCustomerDrawer";
import { ICustomer } from "../../../@types/response/customer";
import { callGetAllCustomers } from "../../../services/customer";
import { useLocation, useNavigate } from "react-router-dom";
import { formattedDate } from "../../../utils/time";
import { rankUtils } from "../../../utils/membership";
import { ICustomerQuery } from "../../../@types/request/request";

interface CustomerPageProps {}

const CustomerPage: FunctionComponent<CustomerPageProps> = () => {
  const [openCustomerModal, setOpenCustomerModal] = useState<boolean>(false);
  const [openCustomerDrawer, setOpenCustomerDrawer] = useState<boolean>(false);
  const navigate = useNavigate();
  const columns: TableProps<ICustomer>["columns"] = [
    {
      title: "Id",
      dataIndex: "customerId",
      key: "customerId",
    },
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
      title: <div className="text-gray-400 text-xs">Date of birth</div>,
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (value) => (
        <Typography.Text ellipsis={{ tooltip: true }} className="text-xs w-40">
          {formattedDate(value)}
        </Typography.Text>
      ),
    },
    {
      title: <div className="text-gray-400 text-xs">Rank</div>,
      dataIndex: "rankName",
      key: "rankName",
      render: (value) => {
        let icon;
        const { bgColor, textColor } = rankUtils(value);
        switch (value) {
          case "Membership":
            icon = <FontAwesomeIcon icon={faUserTie} />;
            break;
          case "Silver":
            icon = <FontAwesomeIcon icon={faDumbbell} />;
            break;
          case "Gold":
            icon = <FontAwesomeIcon icon={faStar} />;
            break;
        }
        return (
          <strong
            className={`text-xs px-2 py-1 rounded ${textColor} ${bgColor}`}
          >
            {value} {icon}
          </strong>
        );
      },
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
      render: (_, record) => (
        <Space>
          <FontAwesomeIcon
            className="cursor-pointer text-violet-500"
            icon={faPenToSquare}
            onClick={() => {
              setActiveCustomer(record);
              setOpenCustomerDrawer(true);
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="cursor-pointer text-red-500"
          />
        </Space>
      ),
    },
  ];
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [activeCustomer, setActiveCustomer] = useState<ICustomer>();
  const location = useLocation();
  const [phone, setPhone] = useState<string>();
  const [pagination, setPagination] = useState<{
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
  }>();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageNumberStr = params.get("pageNumber");
    const pageSizeStr = params.get("pageSize");
    const phoneNumber = params.get("phoneNumber");
    setPhone(phoneNumber ?? undefined);
    const query: ICustomerQuery = {
      pageNumber: pageNumberStr !== null ? parseInt(pageNumberStr) : 1,
      pageSize: pageSizeStr !== null ? parseInt(pageSizeStr) : 10,
    };
    if (phoneNumber) query.phoneNumber = phoneNumber;
    const fetchCustomers = async () => {
      try {
        const res = await callGetAllCustomers(query);
        console.log(res);
        setCustomers(res.data);
        setPagination({
          pageNumber: res.pageNumber,
          pageSize: res.pageSize,
          totalRecords: res.totalRecords,
        });
      } catch (error) {
        message.error({ content: "Error fetching customers" });
      }
    };

    fetchCustomers();
  }, [location.search]);

  const handleSearchByPhone = () => {
    const searchParams = new URLSearchParams(location.search);
    if (phone) searchParams.set("phoneNumber", phone);
    else searchParams.delete("phoneNumber");
    navigate({
      pathName: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handleChangePage = (pageNumber: number) => {
    const search = new URLSearchParams(location.search);
    search.set("pageNumber", pageNumber.toString());
    search.set("pageSize", pagination?.pageSize?.toString() ?? "");
    navigate({
      pathname: location.pathname,
      search: search.toString(),
    });
  };

  return (
    <div className="min-h-screen">
      {openCustomerModal && (
        <AddCustomerModal onHide={() => setOpenCustomerModal(false)} />
      )}
      {openCustomerDrawer && (
        <EditCustomerDrawer
          customer={activeCustomer}
          onHide={() => {
            setActiveCustomer(undefined);
            setOpenCustomerDrawer(false);
          }}
        />
      )}
      <Flex justify="space-between">
        <Form.Item>
          <Input.Search
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onPressEnter={() => handleSearchByPhone()}
            placeholder="Search customer by phone number..."
          />
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
      <Table
        onChange={(config) => {
          handleChangePage(config?.current ?? 1);
        }}
        dataSource={customers}
        columns={columns}
        pagination={{
          current: pagination?.pageNumber,
          pageSize: pagination?.pageSize,
          total: pagination?.totalRecords,
        }}
      />
    </div>
  );
};

export default CustomerPage;
