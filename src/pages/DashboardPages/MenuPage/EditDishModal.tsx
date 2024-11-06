import { Form, Input, InputNumber, Modal, Select } from "antd";
import { FunctionComponent } from "react";

interface DishProps {
  name: string;
  description: string;
  price: number;
}

interface EditDishModalProps extends DishProps {
  onHide: () => void;
}

const EditDishModal: FunctionComponent<EditDishModalProps> = ({
  onHide,
  name,
  description,
  price,
}) => {
  const [form] = Form.useForm<DishProps>();
  return (
    <Modal onCancel={onHide} onClose={onHide} open title="Update dish">
      <Form
        form={form}
        initialValues={{
          name,
          description,
          price,
        }}
        layout="vertical"
      >
        <Form.Item required label="Name" name={"name"}>
          <Input placeholder="Name of dish..." />
        </Form.Item>
        <Form.Item required label="Price" name={"price"}>
          <InputNumber placeholder="Price" suffix="$" />
        </Form.Item>
        <Form.Item label="Description" name={"description"}>
          <Input.TextArea rows={4} placeholder="Description..." />
        </Form.Item>
        <Form.Item label="Section" name={"branch"}>
          <Select placeholder="Choose a section that the dish may belong to..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditDishModal;
