import React from "react";
import { Modal } from "antd";

interface CreateCardModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const CreateCardModal: React.FC<CreateCardModalProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const modalStyles = {
    mask: {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  };
  return (
    <Modal
      title={
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>
          Confirm Card Creation
        </span>
      }
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      centered
      okButtonProps={{
        style: {
          backgroundColor: "#ca8a04",
          borderColor: "#f7e2b8",
          color: "white",
          borderRadius: "5px",
        },
      }}
      cancelButtonProps={{
        style: {
          borderRadius: "5px",
        },
      }}
      styles={modalStyles}
    >
      <p style={{ fontSize: "14px", color: "#555", marginBottom: "0" }}>
        Are you sure you want to create a card for this customer?
      </p>
    </Modal>
  );
};

export default CreateCardModal;
