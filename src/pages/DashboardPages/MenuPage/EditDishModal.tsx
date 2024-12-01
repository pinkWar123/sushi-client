import { Form, Input, InputNumber, Modal, Select } from "antd";
import { FunctionComponent } from "react";
import { useAppSelector } from "../../../hooks/redux";

interface DishProps {
  name: string;
  description: string;
  price: number;
  sectionId: string | null;
}

interface EditDishModalProps extends DishProps {
  onHide: () => void;
}

const EditDishModal: FunctionComponent<EditDishModalProps> = ({
  onHide,
  name,
  description,
  price,
  sectionId,
}) => {
  const [form] = Form.useForm<DishProps>();
  const sections = useAppSelector((state) => state.menu.sections);
  return (
    <Modal onCancel={onHide} onClose={onHide} open title="Update dish">
      <Form
        form={form}
        initialValues={{
          name,
          description,
          price,
          section: sectionId,
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
        <Form.Item label="Section" name={"section"}>
          <Select
            value={sectionId}
            placeholder="Choose a section that the dish may belong to..."
            options={sections.map((section) => ({
              label: section.sectionName,
              value: section.sectionId,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditDishModal;
