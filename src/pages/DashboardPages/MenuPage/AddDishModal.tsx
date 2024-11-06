import { Form, Input, InputNumber, Modal, Select } from "antd";
import { FunctionComponent } from "react";

interface AddDishModalProps {
  onHide: () => void;
}

const AddDishModal: FunctionComponent<AddDishModalProps> = ({ onHide }) => {
  return (
    <Modal onCancel={onHide} onClose={onHide} open title="Create new dish">
      <Form layout="vertical">
        <Form.Item required label="Name">
          <Input placeholder="Name of dish..." />
        </Form.Item>
        <Form.Item required label="Price">
          <InputNumber placeholder="Price" suffix="$" />
        </Form.Item>
        <Form.Item label="Section">
          <Select placeholder="Choose a section that the dish may belong to..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDishModal;
