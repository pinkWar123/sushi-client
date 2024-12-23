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
import { useAppSelector } from "../../../hooks/redux";

interface EmployeeEditDrawerProps {
  onHide: () => void;
  employee: IEmployee;
}

const EmployeeEditDrawer: FunctionComponent<EmployeeEditDrawerProps> = ({
  onHide,
  employee,
}) => {
  const branches = useAppSelector((state) => state.clientSections.branches);
  console.log(employee);
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
              <Input value={employee.departmentName} />
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
            value={employee.branchId}
            options={branches.map((branch) => ({
              label: branch.name,
              value: branch.branchId,
            }))}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EmployeeEditDrawer;
