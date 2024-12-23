import {
  Button,
  DatePicker,
  Form,
  Input,
  Table,
  TableProps,
  TimeRangePickerProps,
} from "antd";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { callGetAllInvoices } from "../../../services/invoice";
import {
  IUserInvoice,
  IUserInvoiceResponse,
} from "../../../@types/response/invoice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { IUserInvoiceQuery } from "../../../@types/request/request";
import {
  faMoneyBillTrendUp,
  faMoneyBillWave,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faIdCard,
  faQuestionCircle,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

interface InvoicesPageProps {}

const initialDates: [Dayjs, Dayjs] = [
  dayjs().subtract(7, "days"), // Start date: 7 days ago
  dayjs(), // End date: Today
];

const rangePresets: TimeRangePickerProps["presets"] = [
  { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
  { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
  { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
];
const InvoicesPage: FunctionComponent<InvoicesPageProps> = () => {
  const [invoices, setInvoices] = useState<IUserInvoiceResponse>([]);
  const { branchId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [form] = Form.useForm<IUserInvoiceQuery>();
  const columns: TableProps<IUserInvoice>["columns"] = [
    {
      title: (
        <p>
          <FontAwesomeIcon icon={faIdCard} /> ID
        </p>
      ),
      dataIndex: "id",
      key: "id",
    },
    {
      title: (
        <p>
          <FontAwesomeIcon icon={faUser} /> Customer Name
        </p>
      ),
      dataIndex: "name",
      key: "name",
    },
    {
      title: (
        <p>
          <FontAwesomeIcon icon={faSignal} /> Status
        </p>
      ),
      dataIndex: "paid",
      key: "orderId",
      render: (value) => {
        if (value === "True") {
          return (
            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
              Paid
            </span>
          );
        } else {
          return (
            <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Unpaid
            </span>
          );
        }
      },
    },
    {
      title: (
        <p>
          <FontAwesomeIcon icon={faPaypal} /> Payment Method
        </p>
      ),
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (value) => {
        let icon;
        let colorClass;

        switch (value) {
          case "credit":
            icon = faCreditCard;
            colorClass = "text-blue-500";
            break;
          case "cash":
            icon = faMoneyBillWave;
            colorClass = "text-green-500";
            break;
          default:
            icon = faQuestionCircle;
            colorClass = "text-gray-500";
        }

        return (
          <span className={`flex items-center ${colorClass}`}>
            <FontAwesomeIcon icon={icon} className="mr-2" />
            {(value === "credit" || value === "cash") &&
              value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
    {
      title: (
        <span className="">
          <FontAwesomeIcon icon={faMoneyBillTrendUp} /> Bonus
        </span>
      ),
      dataIndex: "bonusPoint",
      render: (value) => (
        <span className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded  border border-blue-400 inline-flex items-center justify-center">
          {value}
        </span>
      ),
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_, record) => (
    //     <span>
    //       <Button type="link">View</Button>
    //       <Button type="link">Edit</Button>
    //       <Button type="link" danger>
    //         Delete
    //       </Button>
    //     </span>
    //   ),
    // },
  ];

  const fetchInvoices = useCallback(async () => {
    console.log("re render");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const customerName = searchParams.get("customerName");
    const invoices = await callGetAllInvoices({
      branchId: branchId ?? "",
      startDate: startDate || initialDates[0],
      endDate: endDate || initialDates[1],
      customerName: customerName ?? "",
    });
    setInvoices(invoices.data);
  }, [location.search]);

  useEffect(() => {
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const customerName = searchParams.get("customerName");
    console.log(initialDates[0].toString());
    form.setFieldsValue({
      branchId,
      startDate: startDate ? dayjs(startDate, "YYYY-MM-DD") : initialDates[0],
      endDate: endDate ? dayjs(endDate, "YYYY-MM-DD") : initialDates[1],
      customerName: customerName || "",
    });
    fetchInvoices();
  }, [fetchInvoices]);

  const handleSearch = () => {
    const { customerName, startDate, endDate } = form.getFieldsValue();
    if (startDate)
      searchParams.set("startDate", dayjs(startDate).format("YYYY-MM-DD"));
    else searchParams.delete("startDate");

    if (endDate)
      searchParams.set("endDate", dayjs(endDate).format("YYYY-MM-DD"));
    else searchParams.delete("endDate");

    if (customerName) searchParams.set("customerName", customerName);
    else searchParams.delete("customerName");

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <>
      <Form onFinish={handleSearch} method="get" layout="inline" form={form}>
        <Form.Item name={"customerName"}>
          <Input.Search placeholder="Customer name" />
        </Form.Item>
        <Form.Item label="From:" name={"startDate"}>
          <DatePicker format={"YYYY-MM-DD"} />
        </Form.Item>
        <Form.Item label="To:" name={"endDate"}>
          <DatePicker format={"YYYY-MM-DD"} />
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
          >
            Search
          </button>
        </Form.Item>
      </Form>
      <Table dataSource={invoices} columns={columns} />
    </>
  );
};

export default InvoicesPage;
