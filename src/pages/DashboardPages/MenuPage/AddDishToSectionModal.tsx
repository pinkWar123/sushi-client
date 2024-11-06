import { Form, Modal, Select } from "antd";
import { FunctionComponent } from "react";

interface AddDishToSectionModalProps {
  onHide: () => void;
}

const AddDishToSectionModal: FunctionComponent<AddDishToSectionModalProps> = ({
  onHide,
}) => {
  return (
    <Modal onCancel={onHide} onClose={onHide} open title="Add dish to section">
      <Form layout="vertical">
        <Form.Item label="Dish" required>
          <Select placeholder="Choose a dish..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddDishToSectionModal;
