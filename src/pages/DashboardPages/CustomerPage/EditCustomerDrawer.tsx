import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Card,
  Col,
  DatePicker,
  Drawer,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { FunctionComponent } from "react";
import { ICustomer } from "../../../@types/response/customer";
import { rankUtils } from "../../../utils/membership";

interface EditCustomerDrawerProps {
  onHide: () => void;
  customer?: ICustomer;
}

const EditCustomerDrawer: FunctionComponent<EditCustomerDrawerProps> = ({
  onHide,
  customer,
}) => {
  if (!customer) return <></>;
  const { bgColor, textColor } = rankUtils(customer.rankName);
  return (
    <Drawer
      footer={
        <Row gutter={6} className="py-2">
          <Col span={12}>
            <button
              onClick={onHide}
              className="px-4 py-2 bg-gray-200 rounded-md text-black text-xs font-semibold w-full"
            >
              <FontAwesomeIcon icon={faBan} /> Cancel
            </button>
          </Col>
          <Col span={12}>
            <button className="px-4 py-2 bg-violet-500 rounded-md text-white text-xs font-semibold w-full">
              <FontAwesomeIcon icon={faFloppyDisk} /> Save
            </button>
          </Col>
        </Row>
      }
      onClose={onHide}
      open
    >
      <Flex justify="space-between">
        <Typography.Title level={5}>Customer overview</Typography.Title>
        <Avatar
          size={48}
          src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
        />
      </Flex>

      <Form layout="vertical">
        <Row gutter={6}>
          <Col span={24}>
            <Form.Item label="Name">
              <Input disabled readOnly value={customer.name} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Gender">
              <Select
                disabled
                value={customer.gender}
                options={[
                  {
                    label: "Male",
                    value: "1",
                  },
                  {
                    label: "Female",
                    value: "0",
                  },
                  {
                    label: "Other",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date of birth">
              <DatePicker
                disabled
                readOnly
                value={
                  customer.dateOfBirth ? dayjs(customer.dateOfBirth) : null
                }
                format="DD/MM/YYYY"
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Citizen ID">
              <Input disabled readOnly value={customer.citizenId} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone number">
              <Input disabled readOnly value={customer.phone} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Email">
              <Input prefix="@" disabled readOnly value={customer.email} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <hr />
      <Card className={`${bgColor} mt-4`}>
        <div className={`${textColor} font-bold flex justify-center`}>
          {customer.rankName}
        </div>
        {/* <Flex justify="space-between">
          <div className=" text-xs">Discount:</div>
          <div className="font-bold text-xs">20%</div>
        </Flex> */}
        <Flex justify="space-between">
          <div className=" text-xs">Accumulated points:</div>
          <div className="font-bold text-xs">{customer.accumulatedPoints}</div>
        </Flex>
        {/* <Flex justify="space-between">
          <div className=" text-xs">Start date:</div>
          <div className="font-bold text-xs">13/03/2024</div>
        </Flex> */}
        <Flex justify="space-between">
          <div className=" text-xs">Accumulated date:</div>
          <div className="font-bold text-xs">
            {dayjs(customer.accumulatedDate).format("DD/MM/YYYY").toString()}
          </div>
        </Flex>
      </Card>
    </Drawer>
  );
};

export default EditCustomerDrawer;
