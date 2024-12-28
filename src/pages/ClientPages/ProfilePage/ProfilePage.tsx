import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import Header from "../../layouts/ClientLayout/Header";
import { useAppSelector } from "../../../hooks/redux";

export interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const bonusPoints = 1200;
  const membershipRank = "Gold";
  const invoices = [
    { id: 1, date: "2023-10-01", amount: "$50.00" },
    { id: 2, date: "2023-09-15", amount: "$30.00" },
    { id: 3, date: "2023-09-01", amount: "$20.00" },
  ];
  const basicInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
  };

  const user = useAppSelector((state) => state.account);
  console.log(user);

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
                  {user?.rank?.charAt(0).toUpperCase() + user?.rank?.slice(1)}
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
                {/* <Col span={12}>
                  <Form.Item label="Citizen ID">
                    <Input value={"7926428722"} />
                  </Form.Item>
                </Col> */}
                {/* <Col span={12}>
                  <Form.Item label="Date of birth">
                    <DatePicker
                      className="w-full"
                      format={"MM-DD-YYYY"}
                      value={dayjs("2024-06-16T00:00:00")}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Gender">
                    <Input value={"Nam"} />
                  </Form.Item>
                </Col> */}
              </Row>
            </Form>
            {/* <Card title="Latest Invoices">
              <List
                itemLayout="horizontal"
                dataSource={invoices}
                renderItem={(invoice) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <FontAwesomeIcon
                          icon={faReceipt}
                          className="text-green-500"
                        />
                      }
                      title={`Invoice #${invoice.id}`}
                      description={`${invoice.date} - ${invoice.amount}`}
                    />
                  </List.Item>
                )}
              />
            </Card> */}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfilePage;
