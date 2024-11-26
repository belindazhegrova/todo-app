import { Button, Col, Row, Typography } from "antd";
import React from "react";
const { Text } = Typography;

const Categories = ({ categories, onChange }) => {
  return (
    <Row justify="center" gutter={24}>
      {categories.map((cat) => {
        return (
          <Col xs={24} sm={12} md={8} lg={4} key={cat.id}>
            <Button
              onClick={() => onChange(cat)}
              className="custom-button"
              style={{
                backgroundColor: cat.backgroundColor,
                borderRadius: "5px",
                width: "100%",
                height: "110px",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                lineHeight: "unset",
                gap: "0px",
              }}
            >
              <Text
                style={{
                  fontSize: "55px",
                  lineHeight: "unset",
                  color: "#ffffff",
                  fontWeight: 600,
                }}
              >
                {cat.items.length}
              </Text>
              <Text style={{ fontSize: "14px", color: "#ffffff" }}>
                {cat.status}
              </Text>
            </Button>
          </Col>
        );
      })}
    </Row>
  );
};

export default Categories;
