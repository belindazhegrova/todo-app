import { Col, Typography } from "antd";
import React from "react";

const { Title } = Typography;

const CustomHeader = () => {
  return (
    <Col
      style={{
        backgroundColor: "#1F2A44",
        height: "50px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Title
        style={{ fontSize: "16px", paddingLeft: "20px", color: "#ffffff" }}
      >
        Title of the page
      </Title>
    </Col>
  );
};

export default CustomHeader;
