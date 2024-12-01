import { faDollarSign, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card,
  Col,
  Divider,
  Flex,
  Form,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { FunctionComponent } from "react";
import EarningsChart from "./EarningChart";

export interface DashboardPageProps {}

const _DashboardPage: FunctionComponent<DashboardPageProps> = () => {
  return (
    <>
      <Flex justify="space-between">
        <Typography.Title level={3}>Dashboard</Typography.Title>
        <Form.Item label="Filter">
          <Select
            value={"week"}
            options={[
              {
                label: "Week",
                value: "week",
              },
              {
                label: "Month",
              },
              {
                label: "Year",
              },
            ]}
          />
        </Form.Item>
      </Flex>
      <Row gutter={16}>
        <Col lg={6} md={6} sm={12} xs={24}>
          <Card>
            <Flex justify="center">
              <FontAwesomeIcon
                className="text-white bg-purple-500 rounded-full p-2"
                icon={faDollarSign}
              />
            </Flex>
            <div className="flex justify-center items-center ml-2 mt-2">
              <strong>$10,236</strong>
              <Space size={"small"} className="text-green-400 text-xs ml-2  ">
                <FontAwesomeIcon className="mt-2" icon={faSortUp} />
                <div className="-ml-0.5">3.5%</div>
              </Space>
            </div>
            <Flex justify="center">
              <span className="text-stone-400">Total earning</span>
            </Flex>
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12} xs={24}>
          <Card>
            <Flex justify="center">
              <FontAwesomeIcon
                className="text-white bg-purple-500 rounded-full p-2"
                icon={faDollarSign}
              />
            </Flex>
            <div className="flex justify-center items-center ml-2 mt-2">
              <strong>$10,236</strong>
              <Space size={"small"} className="text-green-400 text-xs ml-2  ">
                <FontAwesomeIcon className="mt-2" icon={faSortUp} />
                <div className="-ml-0.5">3.5%</div>
              </Space>
            </div>
            <Flex justify="center">
              <span className="text-stone-400">Total earning</span>
            </Flex>
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12} xs={24}>
          <Card>
            <Flex justify="center">
              <FontAwesomeIcon
                className="text-white bg-purple-500 rounded-full p-2"
                icon={faDollarSign}
              />
            </Flex>
            <div className="flex justify-center items-center ml-2 mt-2">
              <strong>$10,236</strong>
              <Space size={"small"} className="text-green-400 text-xs ml-2  ">
                <FontAwesomeIcon className="mt-2" icon={faSortUp} />
                <div className="-ml-0.5">3.5%</div>
              </Space>
            </div>
            <Flex justify="center">
              <span className="text-stone-400">Total earning</span>
            </Flex>
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12} xs={24}>
          <Card>
            <Flex justify="center">
              <FontAwesomeIcon
                className="text-white bg-purple-500 rounded-full p-2"
                icon={faDollarSign}
              />
            </Flex>
            <div className="flex justify-center items-center ml-2 mt-2">
              <strong>$10,236</strong>
              <Space size={"small"} className="text-green-400 text-xs ml-2  ">
                <FontAwesomeIcon className="mt-2" icon={faSortUp} />
                <div className="-ml-0.5">3.5%</div>
              </Space>
            </div>
            <Flex justify="center">
              <span className="text-stone-400">Total earning</span>
            </Flex>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="mt-8">
        <Col span={16}>
          <EarningsChart />
        </Col>
        <Col span={8}>
          <Card>
            <Row>
              <Col span={18}>
                <Typography.Title level={4}>Top selling items</Typography.Title>
              </Col>
              <Col span={6}>
                <a href="#">View all</a>
              </Col>
            </Row>
            <Row>
              <Col span={18}>
                <Flex gap={"middle"}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pizza_Vi%E1%BB%87t_Nam_%C4%91%E1%BA%BF_d%C3%A0y%2C_x%C3%BAc_x%C3%ADch_%28SNaT_2018%29_%287%29.jpg/440px-Pizza_Vi%E1%BB%87t_Nam_%C4%91%E1%BA%BF_d%C3%A0y%2C_x%C3%BAc_x%C3%ADch_%28SNaT_2018%29_%287%29.jpg"
                    alt=""
                    className="w-8 h-8"
                  />
                  <div>
                    <strong className="text-sm">Pizza Margherita</strong>
                    <div className="text-stone-400 text-xs">Deef coffee</div>
                  </div>
                </Flex>
              </Col>
              <Col span={6}>
                <strong>$ 14.24</strong>
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col span={18}>
                <Flex gap={"middle"}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pizza_Vi%E1%BB%87t_Nam_%C4%91%E1%BA%BF_d%C3%A0y%2C_x%C3%BAc_x%C3%ADch_%28SNaT_2018%29_%287%29.jpg/440px-Pizza_Vi%E1%BB%87t_Nam_%C4%91%E1%BA%BF_d%C3%A0y%2C_x%C3%BAc_x%C3%ADch_%28SNaT_2018%29_%287%29.jpg"
                    alt=""
                    className="w-8 h-8"
                  />
                  <div>
                    <strong className="text-sm">Pizza Margherita</strong>
                    <div className="text-stone-400 text-xs">Deef coffee</div>
                  </div>
                </Flex>
              </Col>
              <Col span={6}>
                <strong>$ 14.24</strong>
              </Col>
              <Divider />
            </Row>
            <Row>
              <Col span={18}>
                <Flex gap={"middle"}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pizza_Vi%E1%BB%87t_Nam_%C4%91%E1%BA%BF_d%C3%A0y%2C_x%C3%BAc_x%C3%ADch_%28SNaT_2018%29_%287%29.jpg/440px-Pizza_Vi%E1%BB%87t_Nam_%C4%91%E1%BA%BF_d%C3%A0y%2C_x%C3%BAc_x%C3%ADch_%28SNaT_2018%29_%287%29.jpg"
                    alt=""
                    className="w-8 h-8"
                  />
                  <div>
                    <strong className="text-sm">Pizza Margherita</strong>
                    <div className="text-stone-400 text-xs">Deef coffee</div>
                  </div>
                </Flex>
              </Col>
              <Col span={6}>
                <strong>$ 14.24</strong>
              </Col>
              <Divider />
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

const DashboardPage = React.memo(_DashboardPage);
export default DashboardPage;
