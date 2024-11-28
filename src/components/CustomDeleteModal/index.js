import React from "react";
import { Modal, Flex } from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import CustomButton from "../CustomButton";

const CustomDeleteModal = ({ open, onSubmit, onClose }) => {
  return (
    <Modal
      open={open}
      onOk={onSubmit}
      onCancel={onClose}
      closable={false}
      style={{ padding: "30px" }}
      footer={false}
    >
      <InfoCircleTwoTone /> Are you sure you want to delete this task? This
      action cannot be undone.
      <Flex style={{ marginTop: "40px" }} justify="space-between">
        <CustomButton
          title="Close & Dont Save"
          backgroundColor="#EB4345"
          icon={<CloseOutlined />}
          onChange={onClose}
        />
        <CustomButton
          onChange={onSubmit}
          title="Save Changes"
          backgroundColor="#71CF48"
          icon={<CheckOutlined />}
        />
      </Flex>
    </Modal>
  );
};

export default CustomDeleteModal;
