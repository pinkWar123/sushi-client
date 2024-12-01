import {
  Avatar,
  Col,
  DatePicker,
  Drawer,
  Flex,
  Form,
  InputNumber,
  Row,
  Select,
} from "antd";
import Input from "antd/es/input/Input";
import { FunctionComponent } from "react";
import { IEmployee } from "../../../@types/response/employee";

interface EmployeeEditDrawerProps {
  onHide: () => void;
  employee: IEmployee;
}

const branches = [
  {
    name: "SpiceStreet Grill - Downtown Branch",
    location: "101 Main St, Downtown City Center",
    uniqueFeature: "Known for weekly 'Grill Nights' with live music",
    manager: "Sarah Thompson",
    contact: "(555) 123-4567",
  },
  {
    name: "SpiceStreet Grill - Riverside Branch",
    location: "200 Riverwalk Dr, Riverside District",
    uniqueFeature: "Beautiful outdoor patio with river views",
    manager: "Jake Morrison",
    contact: "(555) 234-5678",
  },
  {
    name: "SpiceStreet Grill - Uptown Branch",
    location: "300 Uptown Ave, Uptown Plaza",
    uniqueFeature: "Upscale ambiance with a VIP lounge area",
    manager: "Linda Green",
    contact: "(555) 345-6789",
  },
  {
    name: "SpiceStreet Grill - Suburban Branch",
    location: "150 Suburban Mall Rd, Suburban Mall",
    uniqueFeature: "Kid-friendly, with a play area and family deals",
    manager: "Tom Baker",
    contact: "(555) 456-7890",
  },
  {
    name: "SpiceStreet Grill - Airport Branch",
    location: "Terminal 3, City Airport",
    uniqueFeature: "Quick-serve for travelers, grab-and-go meals",
    manager: "Emily Chen",
    contact: "(555) 567-8901",
  },
  {
    name: "SpiceStreet Grill - Beachfront Branch",
    location: "1 Ocean Blvd, Beachfront Area",
    uniqueFeature: "Seasonal seafood specials and sunset views",
    manager: "Ryan Lee",
    contact: "(555) 678-9012",
  },
  {
    name: "SpiceStreet Grill - Midtown Branch",
    location: "500 Midtown St, Business District",
    uniqueFeature: "Power lunches for business professionals",
    manager: "Dana Collins",
    contact: "(555) 789-0123",
  },
];

const EmployeeEditDrawer: FunctionComponent<EmployeeEditDrawerProps> = ({
  onHide,
  employee,
}) => {
  return (
    <Drawer
      footer={
        <Flex justify="space-between">
          <button
            onClick={onHide}
            className="rounded-md bg-gray-200 py-1 px-4 "
          >
            Cancel
          </button>
          <button className="rounded-md bg-violet-500 py-1 px-4 text-white">
            Save
          </button>
        </Flex>
      }
      title="Edit employee details"
      width={"50%"}
      onClose={onHide}
      open
    >
      <Form layout="vertical" title="Edit employee details">
        <Avatar
          size={64}
          className="mb-4"
          src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
        />
        <Form.Item label="Name">
          <Input value={employee.name} />
        </Form.Item>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item label="Position">
              <Input value={"Chef"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Gender">
              <Select
                value={employee.gender}
                options={[
                  {
                    label: "Male",
                    value: "Nam",
                  },
                  {
                    label: "Female",
                    value: "Nữ",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Age" className="w-full">
              <InputNumber className="w-full" min={1} value={20} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email">
              <Input type="email" value={"lesliealexander@gmail.com"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Employee ID">
              <Input value={employee.id} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Address">
              <Input value={"9458 Main Street, Apt 5B, Springfield, IL 6"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone number">
              <Input type="phone" value={"+1 830 4824 9321"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Date applied">
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Branch">
          <Select
            options={branches.map((branch) => ({
              label: branch.name,
            }))}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EmployeeEditDrawer;
