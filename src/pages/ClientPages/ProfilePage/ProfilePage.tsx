import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  List,
  Typography,
  Form,
  Input,
  DatePicker,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faStar,
  faReceipt,
  faCoins,
  faPercent,
  faDollarSign,
  faBarcode,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import Header from "../../layouts/ClientLayout/Header";
import { useAppSelector } from "../../../hooks/redux";
import {
  faCalendarAlt,
  faCheckCircle,
  faCreditCard,
} from "@fortawesome/free-regular-svg-icons";
import { formatMoney } from "../../../utils/money";
import { ILastestCustomerInvoiceResponse } from "../../../@types/response/invoice";
import { callGetLatestInvoicesByCustomer } from "../../../services/invoice";
import DetailModal from "./DetailModal";

export interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const user = useAppSelector((state) => state.account);

  const [invoices, setInvoices] = useState<ILastestCustomerInvoiceResponse>([]);
  const [activeInvoiceId, setActiveInvoiceId] = useState<string>();
  useEffect(() => {
    const fetchInvoices = async () => {
      if (!user.customerId) return;
      const response = await callGetLatestInvoicesByCustomer(user.customerId);
      setInvoices(response.data);
    };
    fetchInvoices();
  }, []);

  const handleShowDetails = (invoiceId: string) => {
    setActiveInvoiceId(invoiceId);
  };

  const onHide = () => setActiveInvoiceId(undefined);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 mt-16">
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Bonus Points" className="mb-4">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCoins}
                  className="text-yellow-500 mr-2"
                />
                <span className="text-xl">{user.point}</span>
              </div>
            </Card>
            <Card
              title="Membership Rank"
              className={`mb-4 ${
                user.rank === "Gold"
                  ? "bg-yellow-100"
                  : user.rank === "Silver"
                  ? "bg-gray-100"
                  : "bg-blue-100"
              }`}
            >
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faStar}
                  className={`mr-2 ${
                    user.rank === "Gold"
                      ? "text-yellow-500"
                      : user.rank === "Silver"
                      ? "text-gray-500"
                      : "text-blue-500"
                  }`}
                />
                <span
                  className={`text-xl ${
                    user?.rank === "Gold"
                      ? "text-yellow-500"
                      : user.rank === "Silver"
                      ? "text-gray-500"
                      : "text-blue-500"
                  }`}
                >
                  {user.rank === null
                    ? "Unknown"
                    : user?.rank?.charAt(0).toUpperCase() +
                      user?.rank?.slice(1)}
                </span>
              </div>
            </Card>
          </Col>
          <Col span={16}>
            <Typography.Title>User information</Typography.Title>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Name">
                    <Input value={user?.name ?? ""} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="ID">
                    <Input value={user.customerId ?? ""} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Phone number">
                    <Input value={user?.phone ?? ""} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Card
              title={
                <span className="font-bold text-xl text-gray-800">
                  Latest Invoices
                </span>
              }
              className="bg-gray-100 shadow-lg rounded-lg p-4"
            >
              <List
                itemLayout="horizontal"
                dataSource={invoices}
                renderItem={(invoice) => (
                  <List.Item className="bg-white shadow-md rounded-lg p-6 mb-4">
                    <List.Item.Meta
                      avatar={
                        <FontAwesomeIcon
                          icon={faReceipt}
                          className="text-green-500 text-3xl ml-4"
                        />
                      }
                      title={
                        <span className="font-bold text-lg text-gray-800">
                          Invoice #{invoice.id}
                        </span>
                      }
                      description={
                        <div className="space-y-3 text-gray-700">
                          <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className="text-gray-500"
                            />
                            <span className="font-medium">
                              Date:{" "}
                              {dayjs(invoice.datedOn).format("MMM DD, YYYY")}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                              icon={faDollarSign}
                              className="text-green-500"
                            />
                            <span className="font-medium">
                              Total: {formatMoney(invoice.total)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                              icon={faPercent}
                              className="text-red-500"
                            />
                            <span className="font-medium">
                              After Discount:{" "}
                              {formatMoney(invoice.afterDiscount)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                              icon={faCreditCard}
                              className="text-blue-500"
                            />
                            <span className="font-medium">
                              Payment Method: {invoice.paymentMethod}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                              icon={faCoins}
                              className="text-yellow-500"
                            />
                            <span className="font-medium">
                              Bonus Points: {invoice.bonusPoint}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="text-violet-500"
                            />
                            <span className="font-medium">
                              Paid: {invoice.paid ? "Yes" : "No"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FontAwesomeIcon
                              icon={faBarcode}
                              className="text-orange-500"
                            />
                            <span className="font-medium">
                              Order ID: {invoice.orderId}
                            </span>
                          </div>
                          <div>
                            <button
                              onClick={() => handleShowDetails(invoice.id)}
                              type="button"
                              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                              See details
                            </button>
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
            {activeInvoiceId && (
              <DetailModal onHide={onHide} invoiceId={activeInvoiceId} />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfilePage;
