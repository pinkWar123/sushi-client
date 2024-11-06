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

interface EditCustomerDrawerProps {
  onHide: () => void;
}

const EditCustomerDrawer: FunctionComponent<EditCustomerDrawerProps> = ({
  onHide,
}) => {
  return (
    <Drawer onClose={onHide} open>
      <Flex justify="space-between">
        <Typography.Title level={5}>Customer overview</Typography.Title>
        <Avatar
          size={48}
          src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
        />
      </Flex>

      <Form layout="vertical">
        <Row gutter={6}>
          <Col span={12}>
            <Form.Item label="First name">
              <Input value={"Ramisa "} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last name">
              <Input value={"Sanjana"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Gender">
              <Select
                value={"male"}
                options={[
                  {
                    label: "Male",
                    value: "male",
                  },
                  {
                    label: "Female",
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
                value={dayjs("13/04/1976", "DD/MM/YYYY")}
                format={"DD/MM/YYYY"}
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Citizen ID">
              <Input value={"123456789"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone number">
              <Input value={"123456789"} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Email">
              <Input prefix="@" value={"sanjana@gmail.com"} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <hr />
      <Card className="bg-yellow-400">
        <div className="text-white font-bold flex justify-center">
          Gold membership
        </div>
        <Flex justify="space-between">
          <div className=" text-xs">Discount:</div>
          <div className="font-bold text-xs">20%</div>
        </Flex>
        <Flex justify="space-between">
          <div className=" text-xs">Accumulated points:</div>
          <div className="font-bold text-xs">1970</div>
        </Flex>
        <Flex justify="space-between">
          <div className=" text-xs">Start date:</div>
          <div className="font-bold text-xs">13/03/2024</div>
        </Flex>
        <Flex justify="space-between">
          <div className=" text-xs">Accumulated date:</div>
          <div className="font-bold text-xs">11/07/2004</div>
        </Flex>
      </Card>

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
    </Drawer>
  );
};

export default EditCustomerDrawer;
