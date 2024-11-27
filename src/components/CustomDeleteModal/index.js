import React from "react";
import { Modal } from "antd";

const CustomDeleteModal = ({ open, onSubmit, onClose }) => {
  return (
    <Modal
      open={open}
      onOk={onSubmit}
      onCancel={onClose}
      closable={false}
      style={{ padding: "30px" }}
    >
      Are you sure you want to delete this task? This action cannot be undone.
    </Modal>
  );
};

export default CustomDeleteModal;
