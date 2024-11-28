import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { Col, Flex, Input, Modal, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomButton from "../CustomButton";

const { Title } = Typography;

const StyledDiv = styled.div`
  width: 128px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.color};
  color: white;
  cursor: pointer;

  :after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 20px solid white;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
  }
  :before {
    content: "";
    position: absolute;
    right: -20px;
    bottom: 0;
    width: 0;
    height: 0;
    border-left: 20px solid ${(props) => props.color};
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
  }
`;

const CustomModal = ({
  categories,
  onClose,
  onSubmit,
  open,
  filterStatus,
  editMode,
}) => {
  const [hoveredStatus, setHoveredStatus] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    notes: "",
    asignTo: "",
    status: filterStatus.status || "",
    category: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    notes: "",
    asignTo: "",
    status: "",
    category: "",
  });

  useEffect(() => {
    if (editMode) {
      setFormData({
        title: editMode.title,
        notes: editMode.notes,
        asignTo: editMode.asignTo,
        status: editMode.status,
        category: editMode.category,
      });
    }
  }, [editMode]);

  const handleMouseEnter = (status) => setHoveredStatus(status);
  const handleMouseLeave = () => setHoveredStatus(null);

  const handleSubmit = () => {
    if (validateForm()) {
      const taskToSubmit = {
        ...formData,
        id: editMode ? editMode.id : Date.now(),
      };

      onSubmit(taskToSubmit);
      setFormData({
        title: "",
        notes: "",
        asignTo: "",
        status: filterStatus.status || "",
        category: "",
      });
      onClose();
    }
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [key]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    ["title", "category", "asignTo", "notes", "status"].forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
        isValid = false;
      } else {
        newErrors[field] = "";
      }
    });

    setErrors(newErrors);
    return isValid;
  };
  return (
    <Modal
      title={
        <div
          style={{
            height: "45px",
            backgroundColor: "#F8F8FA",
            display: "flex",
            alignItems: "center",
            paddingLeft: "10px",
          }}
        >
          {editMode ? "Edit Task" : "Add Task"}
        </div>
      }
      centered
      open={open}
      onCancel={onClose}
      closable={true}
      width={1000}
      footer={false}
      className="custom-todo-modal"
    >
      <div style={{ margin: "30px" }}>
        <Flex gap="small" align="center" justify="center">
          <InfoCircleTwoTone />{" "}
          <Title style={{ fontSize: "14px" }}>
            Here you're creating a new task, please be careful while filling the
            information below,make sure to select a satus
          </Title>
        </Flex>

        <Row align="center" style={{ gap: "18px" }}>
          {categories.map((cat) => (
            <Col key={cat.status}>
              <StyledDiv
                style={{
                  opacity:
                    formData.status === cat.status ||
                    hoveredStatus === cat.status
                      ? 1
                      : 0.5,
                }}
                onMouseEnter={() => handleMouseEnter(cat.status)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleInputChange("status", cat.status)}
                color={cat.backgroundColor}
              >
                {cat.status}
              </StyledDiv>
            </Col>
          ))}
        </Row>
        {errors.status && (
          <Title
            style={{ textAlign: "center", fontSize: "13px" }}
            type="danger"
          >
            {errors.status}
          </Title>
        )}

        <Row align="center" gutter={16}>
          <Col span={8}>
            <Typography.Title style={{ fontSize: "18px" }}>
              Task Title
            </Typography.Title>
            <Input
              value={formData.title}
              className="custom-input"
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Write Title"
            />
            {errors.title && (
              <Typography.Title style={{ fontSize: "13px" }} type="danger">
                {errors.title}
              </Typography.Title>
            )}
          </Col>
          <Col span={8}>
            <Typography.Title style={{ fontSize: "18px" }}>
              Category
            </Typography.Title>
            <Select
              className="custom-select"
              placeholder="Select task category"
              style={{ width: "100%" }}
              value={formData.category || undefined}
              onChange={(value) => handleInputChange("category", value)}
              options={[
                { value: "test1", label: "Test 1" },
                { value: "test2", label: "Test 2" },
                { value: "test3", label: "Test 3" },
              ]}
            />
            {errors.category && (
              <Typography.Title style={{ fontSize: "13px" }} type="danger">
                {errors.category}
              </Typography.Title>
            )}
          </Col>
          <Col span={8}>
            <Typography.Title style={{ fontSize: "18px" }}>
              Asign To
            </Typography.Title>
            <Select
              placeholder="Select user"
              style={{ width: "100%" }}
              value={formData.asignTo || undefined}
              className="custom-select"
              onChange={(value) => handleInputChange("asignTo", value)}
              options={[
                { value: "test1", label: "User 1" },
                { value: "test2", label: "User 2" },
                { value: "test3", label: "User 3" },
              ]}
            />
            {errors.asignTo && (
              <Typography.Title style={{ fontSize: "13px" }} type="danger">
                {errors.asignTo}
              </Typography.Title>
            )}
          </Col>
          <Col span={24}>
            <Typography.Title style={{ fontSize: "18px" }}>
              Note
            </Typography.Title>
            <ReactQuill
              theme="snow"
              value={formData.notes}
              onChange={(value) => handleInputChange("notes", value)}
            />
            {errors.notes && (
              <Typography.Title style={{ fontSize: "13px" }} type="danger">
                {errors.notes}
              </Typography.Title>
            )}
          </Col>
        </Row>
        <Flex style={{ marginTop: "40px" }} justify="space-between">
          <CustomButton
            title="Close & Dont Save"
            backgroundColor="#EB4345"
            icon={<CloseOutlined />}
            onChange={onClose}
          />
          <CustomButton
            onChange={handleSubmit}
            title="Save Changes"
            backgroundColor="#71CF48"
            icon={<CheckOutlined />}
          />
        </Flex>
      </div>
    </Modal>
  );
};

export default CustomModal;
