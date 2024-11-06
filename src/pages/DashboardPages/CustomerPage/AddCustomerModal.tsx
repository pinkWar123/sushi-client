import {
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { FunctionComponent } from "react";

interface AddCustomerModalProps {
  onHide: () => void;
}

const AddCustomerModal: FunctionComponent<AddCustomerModalProps> = ({
  onHide,
}) => {
  return (
    <Modal
      centered
      width={"80%"}
      title="Add new customer"
      open
      onClose={onHide}
      onCancel={onHide}
    >
      <Typography.Title level={3}>New customer</Typography.Title>
      <div className="text-xs text-gray-400">
        As a new ZenShop member, get ready for an exciting shopping journey with
        perks
      </div>
      <Row gutter={16}>
        <Col span={12}>
          <Typography.Title level={4}>Customer overview</Typography.Title>
          <Form layout="vertical">
            <Row gutter={6}>
              <Col span={12}>
                <Form.Item label="First name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Gender">
                  <Select
                    options={[
                      {
                        label: "Male",
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
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Citizen ID">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone number">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email">
                  <Input prefix="@" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={12} className="flex items-center justify-center">
          <Card className="bg-gray-200">
            <Flex justify="center">
              <Typography.Title level={3}>Normal member</Typography.Title>
            </Flex>
            <Form layout="vertical">
              <Row gutter={6}>
                <Col span={12}>
                  <Form.Item label="Start date">
                    <DatePicker className="w-full" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Accumulated date">
                    <DatePicker className="w-full" />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddCustomerModal;
