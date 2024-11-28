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
          title="Close"
          icon={<CloseOutlined />}
          onChange={onClose}
          customStyle={{
            width: "150px",
            backgroundColor: "#EB4345",
          }}
        />
        <CustomButton
          onChange={onSubmit}
          title="Save"
          icon={<CheckOutlined />}
          customStyle={{
            width: "150px",
            backgroundColor: "#71CF48",
          }}
        />
      </Flex>
    </Modal>
  );
};

export default CustomDeleteModal;
